import type { ChatPageContext, LiliQuickReply } from "@/types/lili";

const MAIN: LiliQuickReply[] = [
  { id: "courses", label: "ما الدورات المتاحة؟", message: "ما الدورات المتاحة؟" },
  { id: "nearest", label: "ما أقرب دورة؟", message: "ما أقرب دورة تبدأ؟" },
  { id: "prices", label: "كم أسعار الدورات؟", message: "كم أسعار الدورات؟" },
  { id: "recommend", label: "ساعديني أختار دورة", message: "ساعديني أختار دورة" },
  { id: "beginner", label: "هل تناسب المبتدئين؟", message: "هل الدورات مناسبة للمبتدئين؟" },
  { id: "location", label: "أين موقعكم؟", message: "أين موقع بيت المصور؟" },
  { id: "register", label: "كيف أسجل؟", message: "كيف أسجل في الدورة؟" },
  { id: "human", label: "أريد التحدث مع موظف", message: "أريد التحدث مع موظف" },
];

const COURSE: LiliQuickReply[] = [
  { id: "price", label: "كم سعر هذه الدورة؟", message: "كم سعر هذه الدورة؟" },
  { id: "when", label: "متى تبدأ؟", message: "متى تبدأ الدورة؟" },
  { id: "duration", label: "كم مدتها؟", message: "كم مدة الدورة؟" },
  { id: "learn", label: "ماذا سأتعلم؟", message: "ماذا سأتعلم في الدورة؟" },
  { id: "beginner", label: "هل تناسب المبتدئين؟", message: "هل هذه الدورة مناسبة للمبتدئين؟" },
  { id: "trainer", label: "من هو المدرب؟", message: "من هو المدرب؟" },
  { id: "cert", label: "هل توجد شهادة؟", message: "هل توجد شهادة؟" },
  { id: "book", label: "سجلني في الدورة", message: "أريد التسجيل في هذه الدورة" },
];

export function getQuickReplies(ctx: ChatPageContext, limit = 6): LiliQuickReply[] {
  const pool = ctx.pageType === "course" ? COURSE : MAIN;
  return pool.slice(0, limit);
}
