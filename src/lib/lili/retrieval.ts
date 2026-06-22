import type { CourseKnowledge, KnowledgeChunk } from "@/types/lili";

export function searchKnowledge(query: string, knowledge: CourseKnowledge[]): CourseKnowledge[] {
  const q = normalize(query);
  if (!q) return knowledge;

  const scored = knowledge.map((course) => {
    const haystack = [
      course.title,
      course.category,
      course.shortDescription,
      course.level,
      course.trainerName ?? "",
      ...course.topics,
      ...course.objectives,
      ...course.faq.map((f) => `${f.question} ${f.answer}`),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of q.split(/\s+/)) {
      if (token.length < 2) continue;
      if (haystack.includes(token)) score += 2;
      if (course.slug.includes(token)) score += 3;
    }
    if (q.includes("أساس") && course.slug.includes("fundamentals")) score += 5;
    if (q.includes("إضاء") && course.slug.includes("lighting")) score += 5;
    if (q.includes("بيوت") && course.slug.includes("beauty")) score += 5;
    if (q.includes("عرس") && course.slug.includes("wedding")) score += 5;
    return { course, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.course);
}

export function searchKnowledgeChunks(query: string, chunks: KnowledgeChunk[]): KnowledgeChunk | null {
  const q = normalize(query);
  if (!q || chunks.length === 0) return null;

  let best: { chunk: KnowledgeChunk; score: number } | null = null;

  for (const chunk of chunks) {
    const haystack = `${chunk.title} ${chunk.content}`.toLowerCase();
    let score = chunk.priority;
    for (const token of q.split(/\s+/)) {
      if (token.length < 2) continue;
      if (haystack.includes(token)) score += 2;
    }
    if (chunk.sourceType === "faq" && q.length > 4) score += 1;
    if (!best || score > best.score) best = { chunk, score };
  }

  return best && best.score >= 3 ? best.chunk : null;
}

export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchIntent(text: string) {
  const q = normalize(text);
  return {
    greeting: /^(مرح|سلام|هلا|حيا|اهلا|السلام)/.test(q) || q === "hi" || q === "hello",
    courses: /(دورات|الدورات|متاح|عندكم|وش عندكم)/.test(q),
    price: /(سعر|رسوم|كم|تكلف|price|cost)/.test(q),
    schedule: /(موعد|متى|تاريخ|يبد|start|date)/.test(q),
    duration: /(مدة|كم يوم|ساع|أيام|hours|days)/.test(q),
    instructor: /(مدرب|مدربة|trainer|م instructor)/.test(q) || /(مدرب|أحمد|زغلول)/.test(q),
    location: /(موقع|وين|أين|جدة|مكان|location)/.test(q),
    beginner: /(مبتد|beginner|صفر|أبدأ)/.test(q),
    certificate: /(شهاد)/.test(q),
    register: /(سجل|حجز|اشتر|registration|book)/.test(q),
    human: /(موظف|بشري|تحدث|اتصل|human|whatsapp|واتس)/.test(q),
    recommend: /(اختار|رش|أنسب|ساعد|help me choose|recommend)/.test(q),
    topics: /(محتو|محاور|ماذا أتعلم|learn|topics|curriculum)/.test(q),
    installment: /(تقس|تمار|installment)/.test(q),
    compare: /(فرق|compare|difference)/.test(q),
    offTopic: /(طقس|weather|سياس|politics|football)/.test(q),
  };
}
