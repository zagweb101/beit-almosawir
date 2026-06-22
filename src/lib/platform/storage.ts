import type {
  AffiliateProfile,
  Conversation,
  DirectMessage,
  ForumReply,
  ForumThread,
  PlatformUser,
} from "@/types/platform";

const KEYS = {
  user: "bm_platform_user",
  currency: "bm_platform_currency",
  affiliateRef: "bm_platform_affiliate_ref",
  affiliateProfile: "bm_platform_affiliate_profile",
  forumThreads: "bm_platform_forum_threads",
  forumReplies: "bm_platform_forum_replies",
  conversations: "bm_platform_conversations",
  messages: "bm_platform_messages",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const platformStorage = {
  getUser(): PlatformUser | null {
    return read<PlatformUser | null>(KEYS.user, null);
  },
  setUser(user: PlatformUser | null) {
    write(KEYS.user, user);
  },
  getCurrency(): "SAR" | "USD" {
    return read<"SAR" | "USD">(KEYS.currency, "SAR");
  },
  setCurrency(currency: "SAR" | "USD") {
    write(KEYS.currency, currency);
  },
  getAffiliateRef(): string | null {
    return read<string | null>(KEYS.affiliateRef, null);
  },
  setAffiliateRef(code: string | null) {
    write(KEYS.affiliateRef, code);
  },
  getAffiliateProfile(): AffiliateProfile | null {
    return read<AffiliateProfile | null>(KEYS.affiliateProfile, null);
  },
  setAffiliateProfile(profile: AffiliateProfile) {
    write(KEYS.affiliateProfile, profile);
  },
  getThreads(): ForumThread[] {
    return read<ForumThread[]>(KEYS.forumThreads, []);
  },
  setThreads(threads: ForumThread[]) {
    write(KEYS.forumThreads, threads);
  },
  getReplies(): ForumReply[] {
    return read<ForumReply[]>(KEYS.forumReplies, []);
  },
  setReplies(replies: ForumReply[]) {
    write(KEYS.forumReplies, replies);
  },
  getConversations(): Conversation[] {
    return read<Conversation[]>(KEYS.conversations, []);
  },
  setConversations(conversations: Conversation[]) {
    write(KEYS.conversations, conversations);
  },
  getMessages(): DirectMessage[] {
    return read<DirectMessage[]>(KEYS.messages, []);
  },
  setMessages(messages: DirectMessage[]) {
    write(KEYS.messages, messages);
  },
};

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
