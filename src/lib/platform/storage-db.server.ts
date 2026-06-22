import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import type {
  AffiliateProfile,
  Conversation,
  DirectMessage,
  ForumReply,
  ForumThread,
  PlatformUser,
} from "@/types/platform";
import { ACADEMY_USER_ID, ACADEMY_USER_NAME } from "./config";

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

type AffiliateRow = {
  code: string;
  name: string;
  commissionRate: number;
  clicks: number;
  conversions: number;
  earningsSar: number;
};

function rowToAffiliate(row: AffiliateRow): AffiliateProfile {
  return {
    code: row.code,
    name: row.name,
    commissionRate: row.commissionRate,
    clicks: row.clicks,
    conversions: row.conversions,
    earningsSar: row.earningsSar,
  };
}

export const platformDb = {
  async getUser(userId: string | null): Promise<PlatformUser | null> {
    if (!userId) return null;
    if (!hasDatabase()) return null;
    try {
      const row = await prisma.platformUser.findUnique({ where: { id: userId } });
      if (!row) return null;
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role as PlatformUser["role"],
      };
    } catch (error) {
      console.error("[platform-db] getUser failed:", error);
      return null;
    }
  },

  async createUser(user: PlatformUser): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.platformUser.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        update: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[platform-db] createUser failed:", error);
    }
  },

  async getThreads(): Promise<ForumThread[]> {
    if (!hasDatabase()) return [];
    try {
      const rows = await prisma.forumThread.findMany({
        orderBy: { createdAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        courseSlug: r.courseSlug,
        authorId: r.authorId,
        authorName: r.authorName,
        title: r.title,
        body: r.body,
        createdAt: r.createdAt.toISOString(),
        replyCount: r.replyCount,
      }));
    } catch (error) {
      console.error("[platform-db] getThreads failed:", error);
      return [];
    }
  },

  async createThread(thread: ForumThread): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.forumThread.create({
        data: {
          id: thread.id,
          courseSlug: thread.courseSlug,
          authorId: thread.authorId,
          authorName: thread.authorName,
          title: thread.title,
          body: thread.body,
          replyCount: 0,
        },
      });
    } catch (error) {
      console.error("[platform-db] createThread failed:", error);
    }
  },

  async getReplies(): Promise<ForumReply[]> {
    if (!hasDatabase()) return [];
    try {
      const rows = await prisma.forumReply.findMany({
        orderBy: { createdAt: "asc" },
      });
      return rows.map((r) => ({
        id: r.id,
        threadId: r.threadId,
        authorId: r.authorId,
        authorName: r.authorName,
        body: r.body,
        createdAt: r.createdAt.toISOString(),
      }));
    } catch (error) {
      console.error("[platform-db] getReplies failed:", error);
      return [];
    }
  },

  async addReply(reply: ForumReply): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.$transaction([
        prisma.forumReply.create({
          data: {
            id: reply.id,
            threadId: reply.threadId,
            authorId: reply.authorId,
            authorName: reply.authorName,
            body: reply.body,
          },
        }),
        prisma.forumThread.update({
          where: { id: reply.threadId },
          data: { replyCount: { increment: 1 } },
        }),
      ]);
    } catch (error) {
      console.error("[platform-db] addReply failed:", error);
    }
  },

  async getConversations(userId: string): Promise<Conversation[]> {
    if (!hasDatabase()) return [];
    try {
      const rows = await prisma.conversation.findMany({
        where: { participantIds: { has: userId } },
        orderBy: { lastMessageAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        participantIds: r.participantIds,
        participantNames: r.participantNames,
        lastMessageAt: r.lastMessageAt.toISOString(),
        unreadCount: r.unreadCount,
      }));
    } catch (error) {
      console.error("[platform-db] getConversations failed:", error);
      return [];
    }
  },

  async createConversation(conv: Conversation): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.conversation.create({
        data: {
          id: conv.id,
          participantIds: conv.participantIds,
          participantNames: conv.participantNames,
          lastMessageAt: new Date(conv.lastMessageAt),
          unreadCount: conv.unreadCount,
        },
      });
    } catch (error) {
      console.error("[platform-db] createConversation failed:", error);
    }
  },

  async getMessages(conversationId: string): Promise<DirectMessage[]> {
    if (!hasDatabase()) return [];
    try {
      const rows = await prisma.directMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
      });
      return rows.map((r) => ({
        id: r.id,
        conversationId: r.conversationId,
        senderId: r.senderId,
        senderName: r.senderName,
        body: r.body,
        createdAt: r.createdAt.toISOString(),
        read: r.read,
      }));
    } catch (error) {
      console.error("[platform-db] getMessages failed:", error);
      return [];
    }
  },

  async sendMessage(msg: DirectMessage): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.$transaction([
        prisma.directMessage.create({
          data: {
            id: msg.id,
            conversationId: msg.conversationId,
            senderId: msg.senderId,
            senderName: msg.senderName,
            body: msg.body,
            read: msg.read,
          },
        }),
        prisma.conversation.update({
          where: { id: msg.conversationId },
          data: { lastMessageAt: new Date(msg.createdAt) },
        }),
      ]);
    } catch (error) {
      console.error("[platform-db] sendMessage failed:", error);
    }
  },

  async markConversationRead(conversationId: string): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { unreadCount: 0 },
      });
    } catch (error) {
      console.error("[platform-db] markConversationRead failed:", error);
    }
  },

  async getAffiliateProfile(code: string): Promise<AffiliateProfile | null> {
    if (!hasDatabase()) return null;
    try {
      const row = await prisma.affiliateProfile.findUnique({ where: { code } });
      return row ? rowToAffiliate(row) : null;
    } catch (error) {
      console.error("[platform-db] getAffiliateProfile failed:", error);
      return null;
    }
  },

  async upsertAffiliateProfile(profile: AffiliateProfile): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.affiliateProfile.upsert({
        where: { code: profile.code },
        create: {
          code: profile.code,
          name: profile.name,
          commissionRate: profile.commissionRate,
          clicks: profile.clicks,
          conversions: profile.conversions,
          earningsSar: profile.earningsSar,
        },
        update: {
          name: profile.name,
          commissionRate: profile.commissionRate,
          clicks: profile.clicks,
          conversions: profile.conversions,
          earningsSar: profile.earningsSar,
        },
      });
    } catch (error) {
      console.error("[platform-db] upsertAffiliateProfile failed:", error);
    }
  },

  async incrementAffiliateClicks(code: string): Promise<void> {
    if (!hasDatabase()) return;
    try {
      await prisma.affiliateProfile.update({
        where: { code },
        data: { clicks: { increment: 1 } },
      });
    } catch (error) {
      console.error("[platform-db] incrementAffiliateClicks failed:", error);
    }
  },

  async ensureAcademyConversation(user: PlatformUser): Promise<Conversation | null> {
    if (!hasDatabase()) return null;
    try {
      const existing = await prisma.conversation.findFirst({
        where: { participantIds: { has: ACADEMY_USER_ID } },
      });
      if (existing) {
        return {
          id: existing.id,
          participantIds: existing.participantIds,
          participantNames: existing.participantNames,
          lastMessageAt: existing.lastMessageAt.toISOString(),
          unreadCount: existing.unreadCount,
        };
      }
      const conv: Conversation = {
        id: uid("conv"),
        participantIds: [user.id, ACADEMY_USER_ID],
        participantNames: [user.name, ACADEMY_USER_NAME.ar],
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
      };
      await this.createConversation(conv);
      return conv;
    } catch (error) {
      console.error("[platform-db] ensureAcademyConversation failed:", error);
      return null;
    }
  },
};

export const ACADEMY_CONSTANTS = { ACADEMY_USER_ID, ACADEMY_USER_NAME };
