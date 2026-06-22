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
import type { Lang } from "@/lib/i18n";
import type {
  AffiliateProfile,
  Conversation,
  CurrencyCode,
  DirectMessage,
  ForumReply,
  ForumThread,
  PlatformUser,
} from "@/types/platform";
import { ACADEMY_USER_ID, ACADEMY_USER_NAME, DEFAULT_AFFILIATE, LIVE_SESSIONS } from "./config";
import { findCoupon } from "./coupon";
import { uid } from "./storage";
import {
  platformAddReplyFn,
  platformCreateThreadFn,
  platformEnsureConversationFn,
  platformLoadAffiliateFn,
  platformLoadDataFn,
  platformLoginFn,
  platformMarkReadFn,
  platformRecordAffiliateClickFn,
  platformRegisterAffiliateFn,
  platformSendMessageFn,
  platformSyncConversationsFn,
} from "./actions.server";
import { platformDb } from "./storage-db.server";

type PlatformContextValue = {
  user: PlatformUser | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  appliedCoupon: ReturnType<typeof findCoupon>;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  affiliateRef: string | null;
  affiliateProfile: AffiliateProfile;
  registerAffiliate: (name: string) => Promise<void>;
  recordAffiliateClick: () => void;
  liveSessions: typeof LIVE_SESSIONS;
  threads: ForumThread[];
  replies: ForumReply[];
  createThread: (courseSlug: string, title: string, body: string) => Promise<void>;
  addReply: (threadId: string, body: string) => Promise<void>;
  conversations: Conversation[];
  messages: DirectMessage[];
  ensureAcademyConversation: () => Promise<string>;
  sendMessage: (conversationId: string, body: string) => Promise<void>;
  markConversationRead: (conversationId: string) => void;
  loading: boolean;
};

const PlatformCtx = createContext<PlatformContextValue | null>(null);

function seedAffiliateProfile(): AffiliateProfile {
  return {
    ...DEFAULT_AFFILIATE,
    clicks: 0,
    conversions: 0,
    earningsSar: 0,
  };
}

const USER_KEY = "bm_platform_user";
const CURRENCY_KEY = "bm_platform_currency";
const AFFILIATE_REF_KEY = "bm_platform_affiliate_ref";

function readLocal<T>(key: string, fallback: T): T {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [currency, setCurrencyState] = useState<CurrencyCode>("SAR");
  const [couponCode, setCouponCode] = useState<string>("");
  const [affiliateRef, setAffiliateRef] = useState<string | null>(null);
  const [affiliateProfile, setAffiliateProfile] = useState<AffiliateProfile>(seedAffiliateProfile);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = useRouterState({ select: (s) => s.location.searchStr });

  useEffect(() => {
    const localUser = readLocal<PlatformUser | null>(USER_KEY, null);
    setCurrencyState(readLocal<CurrencyCode>(CURRENCY_KEY, "SAR"));
    setAffiliateRef(readLocal<string | null>(AFFILIATE_REF_KEY, null));
    setUser(localUser);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !user) return;
    let cancelled = false;
    setLoading(true);
    platformLoadDataFn({ data: { userId: user.id } })
      .then((data) => {
        if (cancelled) return;
        setThreads(data.threads ?? []);
        setReplies(data.replies ?? []);
        setConversations(data.conversations ?? []);
        if (data.affiliateProfile) setAffiliateProfile(data.affiliateProfile);
      })
      .catch((error) => console.error("[platform] load failed:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hydrated, user]);

  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const ref = params.get("ref")?.trim().toUpperCase();
    if (!ref) return;
    setAffiliateRef(ref);
    writeLocal(AFFILIATE_REF_KEY, ref);
    setAffiliateProfile((prev) => {
      const next = { ...prev, clicks: prev.clicks + 1 };
      return next;
    });
    platformRecordAffiliateClickFn({ data: { code: ref } }).catch(() => {});
  }, [search, hydrated]);

  const login = useCallback(async (name: string, email: string) => {
    const next = await platformLoginFn({ data: { name, email } });
    setUser(next);
    writeLocal(USER_KEY, next);
    const profile = await platformLoadAffiliateFn({ data: { code: next.id } }).catch(() => null);
    if (profile) setAffiliateProfile(profile);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof localStorage !== "undefined") localStorage.removeItem(USER_KEY);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    writeLocal(CURRENCY_KEY, c);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = findCoupon(code);
    if (!coupon) return false;
    setCouponCode(coupon.code);
    return true;
  }, []);

  const clearCoupon = useCallback(() => setCouponCode(""), []);

  const registerAffiliate = useCallback(async (name: string) => {
    const profile = await platformRegisterAffiliateFn({ data: { name } });
    setAffiliateProfile(profile);
  }, []);

  const recordAffiliateClick = useCallback(() => {
    setAffiliateProfile((prev) => {
      const next = { ...prev, clicks: prev.clicks + 1 };
      return next;
    });
    if (affiliateRef) {
      platformRecordAffiliateClickFn({ data: { code: affiliateRef } }).catch(() => {});
    }
  }, [affiliateRef]);

  const createThread = useCallback(
    async (courseSlug: string, title: string, body: string) => {
      if (!user) return;
      const thread: ForumThread = {
        id: uid("thread"),
        courseSlug,
        authorId: user.id,
        authorName: user.name,
        title: title.trim(),
        body: body.trim(),
        createdAt: new Date().toISOString(),
        replyCount: 0,
      };
      await platformCreateThreadFn({ data: { thread } });
      setThreads((prev) => [thread, ...prev]);
    },
    [user],
  );

  const addReply = useCallback(
    async (threadId: string, body: string) => {
      if (!user) return;
      const reply: ForumReply = {
        id: uid("reply"),
        threadId,
        authorId: user.id,
        authorName: user.name,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      };
      await platformAddReplyFn({ data: { reply } });
      setReplies((prev) => [...prev, reply]);
      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, replyCount: t.replyCount + 1 } : t)),
      );
    },
    [user],
  );

  const ensureAcademyConversation = useCallback(async (): Promise<string> => {
    if (!user) return "";
    const existing = conversations.find((c) => c.participantIds.includes(ACADEMY_USER_ID));
    if (existing) return existing.id;
    const conv = await platformEnsureConversationFn({ data: user });
    if (!conv) return "";
    setConversations((prev) => [conv, ...prev]);
    return conv.id;
  }, [conversations, user]);

  const sendMessage = useCallback(
    async (conversationId: string, body: string) => {
      if (!user || !body.trim()) return;
      const msg: DirectMessage = {
        id: uid("msg"),
        conversationId,
        senderId: user.id,
        senderName: user.name,
        body: body.trim(),
        createdAt: new Date().toISOString(),
        read: true,
      };
      await platformSendMessageFn({ data: { message: msg } });
      setMessages((prev) => [...prev, msg]);
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, lastMessageAt: msg.createdAt } : c)),
      );
    },
    [user],
  );

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
    );
    platformMarkReadFn({ data: { conversationId } }).catch(() => {});
  }, []);

  const appliedCoupon = useMemo(
    () => (couponCode ? findCoupon(couponCode) : undefined),
    [couponCode],
  );

  const value = useMemo<PlatformContextValue>(
    () => ({
      user,
      login,
      logout,
      currency,
      setCurrency,
      appliedCoupon,
      applyCoupon,
      clearCoupon,
      affiliateRef,
      affiliateProfile,
      registerAffiliate,
      recordAffiliateClick,
      liveSessions: LIVE_SESSIONS,
      threads,
      replies,
      createThread,
      addReply,
      conversations,
      messages,
      ensureAcademyConversation,
      sendMessage,
      markConversationRead,
      loading,
    }),
    [
      user,
      login,
      logout,
      currency,
      setCurrency,
      appliedCoupon,
      applyCoupon,
      clearCoupon,
      affiliateRef,
      affiliateProfile,
      registerAffiliate,
      recordAffiliateClick,
      threads,
      replies,
      createThread,
      addReply,
      conversations,
      messages,
      ensureAcademyConversation,
      sendMessage,
      markConversationRead,
      loading,
    ],
  );

  return <PlatformCtx.Provider value={value}>{children}</PlatformCtx.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformCtx);
  if (!ctx) throw new Error("usePlatform must be used within PlatformProvider");
  return ctx;
}

export function academyName(lang: Lang) {
  return lang === "ar" ? ACADEMY_USER_NAME.ar : ACADEMY_USER_NAME.en;
}

export { platformDb };
