export type ChatPageContext = {
  pageType: "home" | "courses" | "course" | "about" | "contact" | "platform" | "other";
  pageTitle: string;
  pageUrl: string;
  courseSlug?: string;
  courseName?: string;
};

export type CourseKnowledge = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  level: string;
  category: string;
  objectives: string[];
  topics: string[];
  targetAudience: string[];
  trainerName?: string;
  priceLabel: string;
  scheduleLabel: string;
  durationDays?: number;
  durationHours?: number;
  location?: string;
  deliveryMode: "حضوري" | "عن بعد" | "هجين";
  certificateAvailable?: boolean;
  requirements?: string[];
  registrationUrl: string;
  whatsappUrl: string;
  heroImage?: string;
  faq: { question: string; answer: string }[];
  updatedAt: string;
};

export type KnowledgeChunk = {
  id: string;
  sourceType: "course" | "site" | "faq" | "policy" | "admin";
  sourceId?: string;
  title: string;
  content: string;
  priority: number;
};

export type LiliKnowledgeBundle = {
  courses: CourseKnowledge[];
  chunks: KnowledgeChunk[];
  syncedAt: string;
  source: "database" | "memory";
};

export type LiliAction =
  | { type: "OPEN_COURSE"; label: string; url: string }
  | { type: "START_REGISTRATION"; label: string; courseId: string; url: string }
  | { type: "OPEN_WHATSAPP"; label: string; url: string }
  | { type: "SHOW_DATES"; label: string; courseId: string }
  | { type: "OPEN_MAP"; label: string; url: string }
  | { type: "HUMAN_HANDOFF"; label: string; url: string };

export type LiliRichCard =
  | {
      type: "course";
      courseId: string;
      title: string;
      description: string;
      level: string;
      scheduleLabel: string;
      priceLabel: string;
      image?: string;
      url: string;
    }
  | { type: "contact"; whatsappUrl: string };

export type LiliMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  actions?: LiliAction[];
  cards?: LiliRichCard[];
};

export type LiliQuickReply = {
  id: string;
  label: string;
  message: string;
};

export type LiliAnalyticsEvent =
  | { type: "conversation_start" }
  | { type: "message"; question: string }
  | { type: "whatsapp_click" }
  | { type: "registration_start"; courseSlug?: string }
  | { type: "handoff" }
  | { type: "unanswered"; question: string }
  | { type: "course_query"; slug: string }
  | { type: "feedback"; value: "yes" | "partial" | "no" };

export type RecommendStep = "level" | "goal" | "mode" | "time" | "done";

export type RecommendState = {
  active: boolean;
  step: RecommendStep;
  level?: string;
  goal?: string;
  mode?: string;
  time?: string;
};

export type LiliFeedback = "yes" | "partial" | "no";

export type LiliLeadPayload = {
  name: string;
  phone: string;
  courseSlug?: string;
  schedulePreference?: string;
  contactMethod: "whatsapp" | "phone";
  privacyAccepted: boolean;
};

export type AssistantSettings = {
  greeting: string;
  whatsappNumber: string;
  disclaimer: string;
  enabled: boolean;
  leadFormEnabled: boolean;
  collectEmail: boolean;
};

export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  courseSlug?: string;
  courseName?: string;
  note?: string;
};

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string;
};

export type LiliAnalyticsSnapshot = {
  conversations: number;
  messages: number;
  whatsappClicks: number;
  registrationStarts: number;
  handoffs: number;
  unanswered: string[];
  courseQueries: Record<string, number>;
  feedback: { yes: number; partial: number; no: number };
};
