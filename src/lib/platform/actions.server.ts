import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { platformDb, uid } from "./storage-db.server";
import { DEFAULT_AFFILIATE } from "./config";
import type {
  AffiliateProfile,
  Conversation,
  DirectMessage,
  ForumReply,
  ForumThread,
  PlatformUser,
} from "@/types/platform";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["trainee", "instructor", "admin"]).default("trainee"),
});

export const platformLoginFn = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().min(1), email: z.string().email() }))
  .handler(async ({ data }) => {
    const user: PlatformUser = {
      id: uid("user"),
      name: data.name.trim(),
      email: data.email.trim(),
      role: "trainee",
    };
    await platformDb.createUser(user);
    return user;
  });

export const platformLoadDataFn = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const [user, threads, replies, conversations, affiliateByUser] = await Promise.all([
      platformDb.getUser(data.userId),
      platformDb.getThreads(),
      platformDb.getReplies(),
      platformDb.getConversations(data.userId),
      Promise.resolve(null as AffiliateProfile | null),
    ]);

    return {
      user,
      threads,
      replies,
      conversations,
      affiliateProfile: affiliateByUser,
    };
  });

export const platformCreateThreadFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      thread: z.object({
        id: z.string(),
        courseSlug: z.string(),
        authorId: z.string(),
        authorName: z.string(),
        title: z.string(),
        body: z.string(),
        createdAt: z.string(),
        replyCount: z.number(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    await platformDb.createThread(data.thread as ForumThread);
    return { ok: true as const };
  });

export const platformAddReplyFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      reply: z.object({
        id: z.string(),
        threadId: z.string(),
        authorId: z.string(),
        authorName: z.string(),
        body: z.string(),
        createdAt: z.string(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    await platformDb.addReply(data.reply as ForumReply);
    return { ok: true as const };
  });

export const platformGetMessagesFn = createServerFn({ method: "POST" })
  .validator(z.object({ conversationId: z.string() }))
  .handler(async ({ data }) => {
    return platformDb.getMessages(data.conversationId);
  });

export const platformSendMessageFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.object({
        id: z.string(),
        conversationId: z.string(),
        senderId: z.string(),
        senderName: z.string(),
        body: z.string(),
        createdAt: z.string(),
        read: z.boolean(),
      }),
    }),
  )
  .handler(async ({ data }) => {
    await platformDb.sendMessage(data.message as DirectMessage);
    return { ok: true as const };
  });

export const platformMarkReadFn = createServerFn({ method: "POST" })
  .validator(z.object({ conversationId: z.string() }))
  .handler(async ({ data }) => {
    await platformDb.markConversationRead(data.conversationId);
    return { ok: true as const };
  });

export const platformEnsureConversationFn = createServerFn({ method: "POST" })
  .validator(userSchema)
  .handler(async ({ data }) => {
    return platformDb.ensureAcademyConversation(data);
  });

export const platformRegisterAffiliateFn = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const code = data.name.trim().toUpperCase().replace(/\s+/g, "").slice(0, 12);
    const profile: AffiliateProfile = {
      code: code || DEFAULT_AFFILIATE.code,
      name: data.name.trim() || DEFAULT_AFFILIATE.name,
      commissionRate: DEFAULT_AFFILIATE.commissionRate,
      clicks: 0,
      conversions: 0,
      earningsSar: 0,
    };
    await platformDb.upsertAffiliateProfile(profile);
    return profile;
  });

export const platformRecordAffiliateClickFn = createServerFn({ method: "POST" })
  .validator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    await platformDb.incrementAffiliateClicks(data.code);
    return { ok: true as const };
  });

export const platformLoadAffiliateFn = createServerFn({ method: "POST" })
  .validator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    return platformDb.getAffiliateProfile(data.code);
  });

export const platformSyncConversationsFn = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const conversations = await platformDb.getConversations(data.userId);
    return conversations satisfies Conversation[];
  });
