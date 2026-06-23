import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import type {
  ChatPageContext,
  LiliAction,
  LiliFeedback,
  LiliLeadPayload,
  LiliMessage,
  RecommendState,
} from "@/types/lili";
import { LILI_DISCLAIMER, LILI_OPENING } from "./constants";
import { enrichPageContext, resolvePageContext } from "./page-context";
import { getQuickReplies } from "./quick-replies";
import { createAssistantMessage } from "./responder";
import {
  askLiliFn,
  createLeadFn,
  getAssistantSettingsFn,
  getLiliKnowledgeFn,
} from "./actions.server";
import { courseActions, handoffAction } from "./actions";
import { buildCourseBriefing } from "./briefing";
import { sanitizeUserInput } from "./guardrails";
import { liliAnalytics } from "./analytics";
import { liliStorage } from "./storage";
import { liliTts } from "./tts";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_ASSISTANT_SETTINGS } from "./assistant-settings.defaults";
import type {
  AssistantSettings,
  CourseKnowledge,
  LeadInput,
  LiliKnowledgeBundle,
} from "@/types/lili";

export type CourseOption = { slug: string; title: string };

export type IntakeSubmission = {
  name: string;
  phone: string;
  email?: string;
  courseSlug: string;
};

type LiliContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  messages: LiliMessage[];
  quickReplies: ReturnType<typeof getQuickReplies>;
  pageContext: ChatPageContext;
  voiceEnabled: boolean;
  toggleVoice: () => void;
  isTyping: boolean;
  showLeadForm: boolean;
  leadCourseSlug?: string;
  sendMessage: (text: string) => void;
  runAction: (action: LiliAction) => void;
  newConversation: () => void;
  submitLead: (payload: LiliLeadPayload) => string;
  submitFeedback: (value: LiliFeedback) => void;
  showFeedback: boolean;
  teaserVisible: boolean;
  dismissTeaser: () => void;
  settings: AssistantSettings;
  assistantEnabled: boolean;
  courses: CourseOption[];
  startCourseBriefing: (submission: IntakeSubmission) => void;
};

const LiliContext = createContext<LiliContextValue | null>(null);

function uid() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

const initialRecommend: RecommendState = { active: false, step: "level" };

export function LiliProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<LiliMessage[]>(() => liliStorage.getMessages());
  const [recommend, setRecommend] = useState<RecommendState>(initialRecommend);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCourseSlug, setLeadCourseSlug] = useState<string>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [knowledgeBundle, setKnowledgeBundle] = useState<LiliKnowledgeBundle | null>(null);
  const [settings, setSettings] = useState<AssistantSettings>(DEFAULT_ASSISTANT_SETTINGS);
  const [userName, setUserName] = useState<string>();

  const knowledge: CourseKnowledge[] = knowledgeBundle?.courses ?? [];
  const courses: CourseOption[] = useMemo(
    () => knowledge.map((c) => ({ slug: c.slug, title: c.title })),
    [knowledge],
  );

  const refreshKnowledge = useCallback(async () => {
    try {
      const bundle = await getLiliKnowledgeFn();
      setKnowledgeBundle(bundle);
    } catch {
      setKnowledgeBundle(null);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const next = await getAssistantSettingsFn();
      setSettings(next);
    } catch {
      setSettings(DEFAULT_ASSISTANT_SETTINGS);
    }
  }, []);

  useEffect(() => {
    void refreshKnowledge();
    void refreshSettings();
    const onUpdate = () => {
      void refreshKnowledge();
      void refreshSettings();
    };
    window.addEventListener("bm-admin-updated", onUpdate);
    return () => window.removeEventListener("bm-admin-updated", onUpdate);
  }, [refreshKnowledge, refreshSettings]);
  const pageContext = useMemo(() => {
    const ctx = resolvePageContext(pathname, search);
    if (ctx.courseSlug) {
      const course = knowledge.find((c) => c.slug === ctx.courseSlug);
      return enrichPageContext(ctx, course?.title);
    }
    return ctx;
  }, [pathname, search, knowledge]);

  const quickReplies = useMemo(() => getQuickReplies(pageContext), [pageContext]);

  useEffect(() => {
    setVoiceEnabled(liliStorage.getVoiceEnabled());
  }, []);

  useEffect(() => {
    if (liliStorage.wasTeaserShown()) return;
    const t = window.setTimeout(() => setTeaserVisible(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaserVisible(false);
    liliStorage.markTeaserShown();
  }, []);

  const pushAssistant = useCallback(
    (content: string, extras?: Pick<LiliMessage, "actions" | "cards">) => {
      const msg = createAssistantMessage(content, extras);
      setMessages((prev) => {
        const next = [...prev, msg];
        liliStorage.setMessages(next);
        return next;
      });
      if (voiceEnabled) liliTts.speak(content, true);
    },
    [voiceEnabled],
  );

  const startIfNeeded = useCallback(() => {
    if (started) return;
    setStarted(true);
    liliAnalytics.track({ type: "conversation_start" });
    const opening =
      pageContext.pageType === "course" && pageContext.courseName
        ? `حياك الله 🌷 أقدر أساعدك في تفاصيل «${pageContext.courseName}» — السعر، الموعد، أو المحاور.`
        : settings.greeting || LILI_OPENING;
    pushAssistant(opening);
  }, [started, pageContext, pushAssistant, settings.greeting]);

  useEffect(() => {
    if (open) startIfNeeded();
  }, [open, startIfNeeded]);

  const sendMessage = useCallback(
    (raw: string) => {
      const text = sanitizeUserInput(raw);
      if (!text) return;
      dismissTeaser();
      if (!started) startIfNeeded();

      const userMsg: LiliMessage = {
        id: uid(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => {
        const next = [...prev, userMsg];
        liliStorage.setMessages(next);
        return next;
      });
      liliAnalytics.track({ type: "message", question: text });
      setIsTyping(true);

      void (async () => {
        try {
          const result = await askLiliFn({
            data: { text, pageContext, recommend, userName, assistantName: settings.assistantName },
          });
          setRecommend(result.recommend);
          if (result.unanswered) {
            liliAnalytics.track({ type: "unanswered", question: text });
          }
          if (pageContext.courseSlug) {
            liliAnalytics.track({ type: "course_query", slug: pageContext.courseSlug });
          }
          pushAssistant(result.reply, {
            actions: result.actions,
            cards: result.cards,
          });
        } catch {
          pushAssistant(
            "يبدو أن الخدمة تواجه مشكلة مؤقتة. تقدر تعيد المحاولة، أو تتواصل مباشرة مع فريق بيت المصور عبر واتساب.",
            { actions: [handoffAction()] },
          );
        } finally {
          setIsTyping(false);
        }
      })();
    },
    [
      dismissTeaser,
      started,
      startIfNeeded,
      pageContext,
      recommend,
      pushAssistant,
      userName,
      settings.assistantName,
    ],
  );

  const runAction = useCallback(
    (action: LiliAction) => {
      switch (action.type) {
        case "OPEN_WHATSAPP":
          liliAnalytics.track({ type: "whatsapp_click" });
          window.open(action.url, "_blank", "noopener,noreferrer");
          break;
        case "HUMAN_HANDOFF":
          liliAnalytics.track({ type: "handoff" });
          window.open(action.url, "_blank", "noopener,noreferrer");
          break;
        case "OPEN_COURSE":
        case "OPEN_MAP":
          window.open(action.url, "_blank", "noopener,noreferrer");
          break;
        case "START_REGISTRATION":
          liliAnalytics.track({ type: "registration_start", courseSlug: action.courseId });
          setLeadCourseSlug(action.courseId);
          setShowLeadForm(true);
          break;
        case "SHOW_DATES":
          sendMessage("متى تبدأ الدورة؟");
          break;
      }
    },
    [sendMessage],
  );

  const newConversation = useCallback(() => {
    liliTts.stop();
    setMessages([]);
    liliStorage.setMessages([]);
    setRecommend(initialRecommend);
    setShowLeadForm(false);
    setShowFeedback(false);
    setStarted(false);
    setOpen(true);
  }, []);

  const submitLead = useCallback(
    (payload: LiliLeadPayload) => {
      const course = knowledge.find((c) => c.slug === payload.courseSlug);
      const courseName = course?.title ?? payload.courseSlug ?? "دورة بيت المصور";
      const msg = `السلام عليكم، أرغب في التسجيل في دورة ${courseName}${payload.schedulePreference ? ` بتاريخ ${payload.schedulePreference}` : ""}. اسمي ${payload.name}. جوالي ${payload.phone}.`;
      const url = buildWhatsAppUrl(msg);
      const leads = JSON.parse(localStorage.getItem("bm_lili_leads") ?? "[]") as LiliLeadPayload[];
      localStorage.setItem("bm_lili_leads", JSON.stringify([payload, ...leads].slice(0, 100)));
      liliAnalytics.track({ type: "registration_start", courseSlug: payload.courseSlug });
      setShowLeadForm(false);
      pushAssistant(
        `تم إرسال طلبك بنجاح 🌷 فريق بيت المصور بيتواصل معك لتأكيد التسجيل والتفاصيل. ${LILI_DISCLAIMER}`,
      );
      setShowFeedback(true);
      return url;
    },
    [knowledge, pushAssistant],
  );

  const startCourseBriefing = useCallback(
    (submission: IntakeSubmission) => {
      const course = knowledge.find((c) => c.slug === submission.courseSlug);
      const courseName = course?.title ?? submission.courseSlug;

      setUserName(submission.name);
      setStarted(true);
      setOpen(true);
      dismissTeaser();
      liliAnalytics.track({ type: "conversation_start" });
      if (submission.courseSlug) {
        liliAnalytics.track({ type: "course_query", slug: submission.courseSlug });
      }

      // حفظ بيانات الزائر (قاعدة البيانات + نسخة محلية احتياطية).
      const lead: LeadInput = {
        name: submission.name,
        phone: submission.phone,
        email: submission.email,
        courseSlug: submission.courseSlug,
        courseName,
      };
      void createLeadFn({ data: lead }).catch(() => {});
      try {
        const prev = JSON.parse(localStorage.getItem("bm_lili_leads") ?? "[]") as LeadInput[];
        localStorage.setItem("bm_lili_leads", JSON.stringify([lead, ...prev].slice(0, 100)));
      } catch {
        /* تجاهل أخطاء التخزين المحلي */
      }

      if (course) {
        pushAssistant(buildCourseBriefing(course, submission.name, settings.disclaimer), {
          actions: courseActions(course),
          cards: [
            {
              type: "course",
              courseId: course.slug,
              title: course.title,
              description: course.shortDescription.slice(0, 120),
              level: course.level,
              scheduleLabel: course.scheduleLabel,
              priceLabel: course.priceLabel,
              image: course.heroImage,
              url: course.registrationUrl,
            },
          ],
        });
      } else {
        pushAssistant(
          `أهلًا ${submission.name} 🌷 سعدنا باهتمامك بـ«${courseName}». فريق بيت المصور بيتواصل معك بأقرب وقت لتزويدك بكل التفاصيل.`,
          { actions: [handoffAction()] },
        );
      }
    },
    [knowledge, dismissTeaser, pushAssistant, settings.disclaimer],
  );

  const submitFeedback = useCallback((value: LiliFeedback) => {
    liliAnalytics.track({ type: "feedback", value });
    setShowFeedback(false);
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((v) => {
      const next = !v;
      liliStorage.setVoiceEnabled(next);
      if (!next) liliTts.stop();
      return next;
    });
  }, []);

  const value: LiliContextValue = {
    open,
    setOpen,
    messages,
    quickReplies,
    pageContext,
    voiceEnabled,
    toggleVoice,
    isTyping,
    showLeadForm,
    leadCourseSlug,
    sendMessage,
    runAction,
    newConversation,
    submitLead,
    submitFeedback,
    showFeedback,
    teaserVisible,
    dismissTeaser,
    settings,
    assistantEnabled: settings.enabled,
    courses,
    startCourseBriefing,
  };

  return <LiliContext.Provider value={value}>{children}</LiliContext.Provider>;
}

export function useLili() {
  const ctx = useContext(LiliContext);
  if (!ctx) throw new Error("useLili must be used within LiliProvider");
  return ctx;
}
