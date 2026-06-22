import type { LiliMessage } from "@/types/lili";

const MESSAGES_KEY = "bm_lili_messages";
const VOICE_KEY = "bm_lili_voice";
const TEASER_KEY = "bm_lili_teaser";

export const liliStorage = {
  getMessages(): LiliMessage[] {
    if (typeof localStorage === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY) ?? "[]") as LiliMessage[];
    } catch {
      return [];
    }
  },
  setMessages(messages: LiliMessage[]) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages.slice(-40)));
  },
  getVoiceEnabled(): boolean {
    return localStorage.getItem(VOICE_KEY) === "1";
  },
  setVoiceEnabled(on: boolean) {
    localStorage.setItem(VOICE_KEY, on ? "1" : "0");
  },
  wasTeaserShown(): boolean {
    return sessionStorage.getItem(TEASER_KEY) === "1";
  },
  markTeaserShown() {
    sessionStorage.setItem(TEASER_KEY, "1");
  },
};
