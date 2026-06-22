import type { LiliAnalyticsEvent, LiliAnalyticsSnapshot } from "@/types/lili";

const KEY = "bm_lili_analytics";

const empty: LiliAnalyticsSnapshot = {
  conversations: 0,
  messages: 0,
  whatsappClicks: 0,
  registrationStarts: 0,
  handoffs: 0,
  unanswered: [],
  courseQueries: {},
  feedback: { yes: 0, partial: 0, no: 0 },
};

function read(): LiliAnalyticsSnapshot {
  if (typeof localStorage === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

function write(data: LiliAnalyticsSnapshot) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export const liliAnalytics = {
  snapshot(): LiliAnalyticsSnapshot {
    return read();
  },
  track(event: LiliAnalyticsEvent) {
    const data = read();
    switch (event.type) {
      case "conversation_start":
        data.conversations += 1;
        break;
      case "message":
        data.messages += 1;
        break;
      case "whatsapp_click":
        data.whatsappClicks += 1;
        break;
      case "registration_start":
        data.registrationStarts += 1;
        if (event.courseSlug) {
          data.courseQueries[event.courseSlug] = (data.courseQueries[event.courseSlug] ?? 0) + 1;
        }
        break;
      case "handoff":
        data.handoffs += 1;
        break;
      case "unanswered":
        if (!data.unanswered.includes(event.question)) {
          data.unanswered = [event.question, ...data.unanswered].slice(0, 50);
        }
        break;
      case "course_query":
        data.courseQueries[event.slug] = (data.courseQueries[event.slug] ?? 0) + 1;
        break;
      case "feedback":
        data.feedback[event.value] += 1;
        break;
    }
    write(data);
  },
};
