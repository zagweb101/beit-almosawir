import type {
  ChatPageContext,
  CourseKnowledge,
  KnowledgeChunk,
  LiliAction,
  LiliMessage,
  LiliRichCard,
} from "@/types/lili";
import type { RecommendState } from "@/types/lili";
import { LILI_DISCLAIMER, LILI_UNKNOWN } from "./constants";
import { courseActions, handoffAction, mapAction } from "./actions";
import { injectionResponse, isPromptInjection } from "./guardrails";
import { getKnowledgeBySlug, LILI_SITE_KNOWLEDGE } from "./knowledge";
import { matchIntent, normalize, searchKnowledge, searchKnowledgeChunks } from "./retrieval";

export type RespondParams = {
  text: string;
  knowledge: CourseKnowledge[];
  chunks?: KnowledgeChunk[];
  pageContext: ChatPageContext;
  recommend: RecommendState;
  userName?: string;
  assistantName?: string;
};

export type RespondOutput = {
  reply: string;
  actions?: LiliAction[];
  cards?: LiliRichCard[];
  recommend: RecommendState;
  unanswered?: boolean;
};

function uid() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createAssistantMessage(
  content: string,
  extras?: Pick<LiliMessage, "actions" | "cards">,
): LiliMessage {
  return {
    id: uid(),
    role: "assistant",
    content,
    createdAt: new Date().toISOString(),
    ...extras,
  };
}

function courseCard(course: CourseKnowledge): LiliRichCard {
  return {
    type: "course",
    courseId: course.slug,
    title: course.title,
    description: course.shortDescription.slice(0, 120),
    level: course.level,
    scheduleLabel: course.scheduleLabel,
    priceLabel: course.priceLabel,
    image: course.heroImage,
    url: course.registrationUrl,
  };
}

function primaryCourse(params: RespondParams): CourseKnowledge | undefined {
  if (params.pageContext.courseSlug) {
    return getKnowledgeBySlug(params.pageContext.courseSlug, params.knowledge);
  }
  const hits = searchKnowledge(params.text, params.knowledge);
  return hits[0] ?? params.knowledge[0];
}

function scoreCourse(slug: string, state: RecommendState): number {
  let score = 0;
  const goal = state.goal ?? "";
  const level = state.level ?? "";

  if (slug === "photography-fundamentals") {
    if (/صفر|أساس|مبتد/.test(level)) score += 5;
    if (/كامير|أساس|content|محتو/.test(goal)) score += 3;
  }
  if (slug === "lighting-mastery") {
    if (/إضاء|light/.test(goal)) score += 6;
    if (/متوسط|احتر/.test(level)) score += 2;
  }
  if (slug === "beauty-photography") {
    if (/بيوت|جمال|reels|فيد/.test(goal)) score += 6;
  }
  if (slug === "wedding-photography") {
    if (/عرس|زفاف|فيد/.test(goal)) score += 6;
  }
  return score;
}

function pickRecommendation(knowledge: CourseKnowledge[], state: RecommendState) {
  const ranked = [...knowledge].sort(
    (a, b) => scoreCourse(b.slug, state) - scoreCourse(a.slug, state),
  );
  return { primary: ranked[0], alt: ranked[1] };
}

function handleRecommendFlow(params: RespondParams): RespondOutput | null {
  const { recommend, text, knowledge } = params;
  if (!recommend.active) return null;

  const q = normalize(text);

  if (recommend.step === "level") {
    return {
      reply:
        "ممتاز. وش المهارة اللي حاب تطورها أكثر؟ أساسيات الكاميرا، الإضاءة، تصوير الأشخاص، البيوتي، الأعراس، أو الفيديو؟",
      recommend: { ...recommend, step: "goal", level: text },
    };
  }
  if (recommend.step === "goal") {
    return {
      reply: "تمام. تفضل تدريب حضوري، عن بعد، أو ما يهمك؟",
      recommend: { ...recommend, step: "mode", goal: text },
    };
  }
  if (recommend.step === "mode") {
    return {
      reply: "أخيرًا، الوقت المناسب لك: صباحي، مسائي، نهاية الأسبوع، أو أي وقت؟",
      recommend: { ...recommend, step: "time", mode: text },
    };
  }
  if (recommend.step === "time") {
    const state = { ...recommend, step: "done" as const, time: text, active: false };
    const { primary, alt } = pickRecommendation(knowledge, state);
    const altLine = alt ? ` بديل مناسب: ${alt.title}.` : "";
    return {
      reply: `أرشح لك دورة «${primary.title}» لأنها تناسب مستواك وتركز على اهتمامك. ${primary.scheduleLabel}. ${primary.priceLabel}.${altLine}`,
      actions: courseActions(primary),
      cards: [courseCard(primary)],
      recommend: state,
    };
  }

  if (/ابدأ|من جديد|restart/.test(q)) {
    return {
      reply: "بكل سرور. مستواك في التصوير: مبتدئ، متوسط، أو محترف؟",
      recommend: { active: true, step: "level" },
    };
  }

  return null;
}

export function respond(params: RespondParams): RespondOutput {
  const { text, knowledge, pageContext, userName, chunks } = params;
  const { recommend } = params;
  const assistantName = params.assistantName?.trim() || "لي لي";

  if (isPromptInjection(text)) {
    return { reply: injectionResponse(), recommend };
  }

  const recommendResult = handleRecommendFlow(params);
  if (recommendResult) return recommendResult;

  const intent = matchIntent(text);
  const course = primaryCourse(params);
  const namePrefix = userName ? `${userName}، ` : "";

  if (intent.offTopic) {
    return {
      reply: `${namePrefix}اختصاصي هو مساعدتك في دورات وخدمات بيت المصور. اسألني عن الأسعار، المواعيد، المحتوى، أو الدورة المناسبة لك.`,
      recommend,
    };
  }

  if (intent.human || /موظف|بشري/.test(normalize(text))) {
    return {
      reply: "بكل سرور. تقدر تتواصل مباشرة مع فريق بيت المصور عبر واتساب، وبيخدمونك بأقرب وقت.",
      actions: [handoffAction()],
      recommend,
    };
  }

  if (intent.recommend || /ساعديني أختار/.test(text)) {
    return {
      reply: "بكل سرور. مستواك حاليًا في التصوير: مبتدئ، متوسط، أو محترف؟",
      recommend: { active: true, step: "level" },
    };
  }

  if (intent.greeting) {
    if (pageContext.pageType === "course" && course) {
      return {
        reply: `حياك الله${userName ? ` ${userName}` : ""} 🌷 أقدر أساعدك في تفاصيل «${course.title}» — السعر، الموعد، أو المحاور.`,
        actions: courseActions(course),
        recommend,
      };
    }
    return {
      reply: `حياك الله${userName ? ` ${userName}` : ""}، أنا ${assistantName}. كيف أقدر أخدمك اليوم؟`,
      recommend,
    };
  }

  if (intent.courses || /أقرب دورة/.test(normalize(text))) {
    if (/أقرب/.test(normalize(text))) {
      const list = knowledge.map((c) => `• ${c.title}: ${c.scheduleLabel}`).join("\n");
      return {
        reply: `أقرب المواعيد حسب صفحات الدورات:\n${list}\n${LILI_DISCLAIMER}`,
        recommend,
      };
    }
    const list = knowledge.map((c) => `• ${c.title}`).join("\n");
    return {
      reply: `عندنا ${knowledge.length} دورات حاليًا:\n${list}\n${LILI_DISCLAIMER}`,
      recommend,
    };
  }

  if (!course) {
    return { reply: LILI_UNKNOWN, actions: [handoffAction()], recommend, unanswered: true };
  }

  if (intent.price) {
    return {
      reply: `${namePrefix}رسوم «${course.title}»: ${course.priceLabel}. ${LILI_SITE_KNOWLEDGE.policies.pricing}`,
      actions: [handoffAction(`السلام عليكم، أرغب في معرفة سعر دورة ${course.title}.`)],
      cards: [courseCard(course)],
      recommend,
    };
  }

  if (intent.schedule) {
    return {
      reply: `${namePrefix}موعد «${course.title}»: ${course.scheduleLabel}.`,
      actions: courseActions(course),
      recommend,
    };
  }

  if (intent.duration) {
    const days = course.durationDays ? `${course.durationDays} أيام` : "";
    const hours = course.durationHours ? `${course.durationHours} ساعة تدريبية` : "";
    return {
      reply: `${namePrefix}مدة «${course.title}»: ${days}${days && hours ? "، بإجمالي " : ""}${hours}.`,
      recommend,
    };
  }

  if (intent.instructor) {
    if (course.trainerName) {
      return {
        reply: `${namePrefix}مدرب «${course.title}»: ${course.trainerName}.`,
        recommend,
      };
    }
    return { reply: LILI_UNKNOWN, actions: [handoffAction()], recommend, unanswered: true };
  }

  if (intent.location) {
    return {
      reply: `${namePrefix}«${course.title}» ${course.deliveryMode} — ${course.location ?? LILI_SITE_KNOWLEDGE.location}.`,
      actions: [mapAction()],
      recommend,
    };
  }

  if (intent.beginner) {
    const suitable = /مبتد/.test(course.level) ? "نعم" : "تحتاج مراجعة المتطلبات";
    return {
      reply:
        `${namePrefix}${suitable}، «${course.title}» ${course.level}. ${course.requirements?.[0] ?? ""}`.trim(),
      recommend,
    };
  }

  if (intent.certificate) {
    if (course.certificateAvailable) {
      return {
        reply: `${namePrefix}نعم، يحصل المتدرب على شهادة حضور من بيت المصور بعد استكمال «${course.title}» وفق شروط الدورة.`,
        recommend,
      };
    }
    return {
      reply: `${namePrefix}تفاصيل الشهادة لـ«${course.title}» غير مذكورة في صفحتها — ${LILI_UNKNOWN}`,
      actions: [handoffAction()],
      recommend,
      unanswered: true,
    };
  }

  if (intent.register) {
    return {
      reply: `${namePrefix}التسجيل بسيط: افتح صفحة الدورة أو تواصل عبر واتساب، وفريقنا يؤكد السعر والموعد.`,
      actions: [
        {
          type: "START_REGISTRATION",
          label: "ابدأ التسجيل",
          courseId: course.slug,
          url: course.registrationUrl,
        },
        { type: "OPEN_WHATSAPP", label: "واتساب", url: course.whatsappUrl },
      ],
      cards: [courseCard(course)],
      recommend,
    };
  }

  if (intent.topics) {
    const sample = course.topics.slice(0, 4).join(" · ");
    return {
      reply: `${namePrefix}من محاور «${course.title}»: ${sample}${course.topics.length > 4 ? "…" : ""}.`,
      actions: [{ type: "OPEN_COURSE", label: "عرض المحاور كاملة", url: course.registrationUrl }],
      recommend,
    };
  }

  if (intent.installment) {
    const faqHit = course.faq.find((f) => /تقس|تمار/.test(f.question));
    return {
      reply: faqHit?.answer ?? LILI_SITE_KNOWLEDGE.policies.installment,
      actions: [handoffAction()],
      recommend,
    };
  }

  if (intent.compare) {
    const hits = searchKnowledge(text, knowledge).slice(0, 2);
    if (hits.length >= 2) {
      return {
        reply: `«${hits[0].title}» تركز على ${hits[0].category}، و«${hits[1].title}» على ${hits[1].category}. ${hits[0].level} مقابل ${hits[1].level}.`,
        cards: hits.map(courseCard),
        recommend,
      };
    }
  }

  // FAQ match
  const faq = course.faq.find((f) =>
    normalize(f.question)
      .split(" ")
      .some((w) => normalize(text).includes(w) && w.length > 3),
  );
  if (faq) {
    return { reply: faq.answer, actions: courseActions(course), recommend };
  }

  const hits = searchKnowledge(text, knowledge);
  if (hits.length > 0) {
    const hit = hits[0];
    return {
      reply: `بخصوص «${hit.title}»: ${hit.shortDescription.slice(0, 160)}… ${hit.priceLabel}. ${hit.scheduleLabel}.`,
      actions: courseActions(hit),
      cards: [courseCard(hit)],
      recommend,
    };
  }

  const chunkHit = params.chunks ? searchKnowledgeChunks(text, params.chunks) : null;
  if (chunkHit) {
    const related = chunkHit.sourceId
      ? knowledge.find((c) => c.slug === chunkHit.sourceId)
      : undefined;
    return {
      reply: chunkHit.content,
      actions: related ? courseActions(related) : [handoffAction()],
      cards: related ? [courseCard(related)] : undefined,
      recommend,
    };
  }

  return {
    reply: LILI_UNKNOWN,
    actions: [handoffAction()],
    recommend,
    unanswered: true,
  };
}
