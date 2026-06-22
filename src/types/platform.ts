export type CurrencyCode = "SAR" | "USD";

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: "trainee" | "instructor" | "admin";
};

export type CouponDefinition = {
  code: string;
  label: { ar: string; en: string };
  type: "percent" | "fixed";
  value: number;
  currency?: CurrencyCode;
  active: boolean;
};

export type LiveSession = {
  id: string;
  title: { ar: string; en: string };
  courseSlug?: string;
  startsAt: string;
  provider: "zoom" | "webrtc";
  zoomUrl?: string;
  webrtcRoom?: string;
  status: "scheduled" | "live" | "ended";
};

export type ForumThread = {
  id: string;
  courseSlug: string;
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  createdAt: string;
  replyCount: number;
};

export type ForumReply = {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  participantNames: string[];
  lastMessageAt: string;
  unreadCount: number;
};

export type DirectMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type AffiliateProfile = {
  code: string;
  name: string;
  commissionRate: number;
  clicks: number;
  conversions: number;
  earningsSar: number;
};
