import type { CourseKnowledge, LiliAction, LiliMessage } from "@/types/lili";

export type RecommendStep = "level" | "goal" | "mode" | "time" | "done";

export type RecommendState = {
  active: boolean;
  step: RecommendStep;
  level?: string;
  goal?: string;
  mode?: string;
  time?: string;
};

export type LiliChatState = {
  messages: LiliMessage[];
  recommend: RecommendState;
  userName?: string;
  voiceEnabled: boolean;
  hasGreeted: boolean;
  teaserShown: boolean;
};

export type RespondInput = {
  text: string;
  pageContext: import("@/types/lili").ChatPageContext;
  knowledge: CourseKnowledge[];
  recommend: RecommendState;
  userName?: string;
};

export type RespondResult = {
  messages: LiliMessage[];
  recommend: RecommendState;
  actions?: LiliAction[];
};

export const LILI_OPENING =
  "حياك الله، أنا لي لي، المساعد الذكي لبيت المصور 🌷 أقدر أساعدك في معرفة الدورات والأسعار والمواعيد أو اختيار الدورة الأنسب لك.";

export const LILI_UNKNOWN =
  "المعلومة غير متوفرة عندي حاليًا، لكن أقدر أحولك لفريق بيت المصور للتأكيد.";

export const LILI_DISCLAIMER = "قد تحتاج بعض المعلومات إلى تأكيد من فريق بيت المصور.";
