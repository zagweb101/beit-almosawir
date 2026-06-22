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
import { platformStorage, uid } from "./storage";

type PlatformContextValue = {
  user: PlatformUser | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  appliedCoupon: ReturnType<typeof findCoupon>;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  affiliateRef: string | null;
  affiliateProfile: AffiliateProfile;
  registerAffiliate: (name: string) => void;
  recordAffiliateClick: () => void;
  liveSessions: typeof LIVE_SESSIONS;
  threads: ForumThread[];
  replies: ForumReply[];
  createThread: (courseSlug: string, title: string, body: string) => void;
  addReply: (threadId: string, body: string) => void;
  conversations: Conversation[];
  messages: DirectMessage[];
  ensureAcademyConversation: () => string;
  sendMessage: (conversationId: string, body: string) => void;
  markConversationRead: (conversationId: string) => void;
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

  const search = useRouterState({ select: (s) => s.location.searchStr });

  useEffect(() => {
    setUser(platformStorage.getUser());
    setCurrencyState(platformStorage.getCurrency());
    setAffiliateRef(platformStorage.getAffiliateRef());
    setAffiliateProfile(platformStorage.getAffiliateProfile() ?? seedAffiliateProfile());
    setThreads(platformStorage.getThreads());
    setReplies(platformStorage.getReplies());
    setConversations(platformStorage.getConversations());
    setMessages(platformStorage.getMessages());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const ref = params.get("ref")?.trim().toUpperCase();
    if (!ref) return;
    setAffiliateRef(ref);
    platformStorage.setAffiliateRef(ref);
    setAffiliateProfile((prev) => {
      const next = { ...prev, clicks: prev.clicks + 1 };
      platformStorage.setAffiliateProfile(next);
      return next;
    });
  }, [search, hydrated]);

  const login = useCallback((name: string, email: string) => {
    const next: PlatformUser = {
      id: uid("user"),
      name: name.trim(),
      email: email.trim(),
      role: "trainee",
    };
    setUser(next);
    platformStorage.setUser(next);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    platformStorage.setUser(null);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    platformStorage.setCurrency(c);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = findCoupon(code);
    if (!coupon) return false;
    setCouponCode(coupon.code);
    return true;
  }, []);

  const clearCoupon = useCallback(() => setCouponCode(""), []);

  const registerAffiliate = useCallback(
    (name: string) => {
      const code = name.trim().toUpperCase().replace(/\s+/g, "").slice(0, 12);
      const next: AffiliateProfile = {
        code: code || DEFAULT_AFFILIATE.code,
        name: name.trim() || DEFAULT_AFFILIATE.name,
        commissionRate: DEFAULT_AFFILIATE.commissionRate,
        clicks: affiliateProfile.clicks,
        conversions: affiliateProfile.conversions,
        earningsSar: affiliateProfile.earningsSar,
      };
      setAffiliateProfile(next);
      platformStorage.setAffiliateProfile(next);
    },
    [affiliateProfile.clicks, affiliateProfile.conversions, affiliateProfile.earningsSar],
  );

  const recordAffiliateClick = useCallback(() => {
    setAffiliateProfile((prev) => {
      const next = { ...prev, clicks: prev.clicks + 1 };
      platformStorage.setAffiliateProfile(next);
      return next;
    });
  }, []);

  const createThread = useCallback(
    (courseSlug: string, title: string, body: string) => {
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
      setThreads((prev) => {
        const next = [thread, ...prev];
        platformStorage.setThreads(next);
        return next;
      });
    },
    [user],
  );

  const addReply = useCallback(
    (threadId: string, body: string) => {
      if (!user) return;
      const reply: ForumReply = {
        id: uid("reply"),
        threadId,
        authorId: user.id,
        authorName: user.name,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      };
      setReplies((prev) => {
        const next = [...prev, reply];
        platformStorage.setReplies(next);
        return next;
      });
      setThreads((prev) => {
        const next = prev.map((t) =>
          t.id === threadId ? { ...t, replyCount: t.replyCount + 1 } : t,
        );
        platformStorage.setThreads(next);
        return next;
      });
    },
    [user],
  );

  const ensureAcademyConversation = useCallback(() => {
    if (!user) return "";
    const existing = conversations.find((c) => c.participantIds.includes(ACADEMY_USER_ID));
    if (existing) return existing.id;
    const conv: Conversation = {
      id: uid("conv"),
      participantIds: [user.id, ACADEMY_USER_ID],
      participantNames: [user.name, ACADEMY_USER_NAME.ar],
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
    };
    setConversations((prev) => {
      const next = [conv, ...prev];
      platformStorage.setConversations(next);
      return next;
    });
    return conv.id;
  }, [conversations, user]);

  const sendMessage = useCallback(
    (conversationId: string, body: string) => {
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
      setMessages((prev) => {
        const next = [...prev, msg];
        platformStorage.setMessages(next);
        return next;
      });
      setConversations((prev) => {
        const next = prev.map((c) =>
          c.id === conversationId ? { ...c, lastMessageAt: msg.createdAt } : c,
        );
        platformStorage.setConversations(next);
        return next;
      });
    },
    [user],
  );

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) => {
      const next = prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c));
      platformStorage.setConversations(next);
      return next;
    });
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
