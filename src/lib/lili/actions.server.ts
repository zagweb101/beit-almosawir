import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ChatPageContext, RecommendState } from "@/types/lili";
import { respond } from "./responder";
import { sanitizeUserInput } from "./guardrails";
import { assertAdminSession } from "@/lib/admin/auth.server";
import { loadLiliKnowledgeBundle, syncLiliKnowledgeToDatabase } from "./knowledge-server.server";
import { getAssistantSettings, saveAssistantSettings } from "./assistant-settings.server";
import { createLead, deleteLead, listLeads } from "./leads.server";

const pageContextSchema = z.object({
  pageType: z.enum(["home", "courses", "course", "about", "contact", "platform", "other"]),
  pageTitle: z.string(),
  pageUrl: z.string(),
  courseSlug: z.string().optional(),
  courseName: z.string().optional(),
});

const recommendSchema = z.object({
  active: z.boolean(),
  step: z.enum(["level", "goal", "mode", "time", "done"]),
  level: z.string().optional(),
  goal: z.string().optional(),
  mode: z.string().optional(),
  time: z.string().optional(),
});

export const getLiliKnowledgeFn = createServerFn({ method: "GET" }).handler(async () => {
  return loadLiliKnowledgeBundle();
});

export const syncLiliKnowledgeFn = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().optional() }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return syncLiliKnowledgeToDatabase();
  });

export const askLiliFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      text: z.string(),
      pageContext: pageContextSchema,
      recommend: recommendSchema,
      userName: z.string().optional(),
      assistantName: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const text = sanitizeUserInput(data.text);
    const bundle = await loadLiliKnowledgeBundle();
    const result = respond({
      text,
      knowledge: bundle.courses,
      chunks: bundle.chunks,
      pageContext: data.pageContext as ChatPageContext,
      recommend: data.recommend as RecommendState,
      userName: data.userName,
      assistantName: data.assistantName,
    });
    return {
      ...result,
      knowledgeSource: bundle.source,
    };
  });

// ——— إعدادات المساعد ———

const assistantSettingsSchema = z.object({
  assistantName: z.string(),
  avatar: z.string(),
  greeting: z.string(),
  whatsappNumber: z.string(),
  disclaimer: z.string(),
  enabled: z.boolean(),
  leadFormEnabled: z.boolean(),
  collectEmail: z.boolean(),
});

/** قراءة عامة — يستخدمها widget المساعد على الموقع. */
export const getAssistantSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  return getAssistantSettings();
});

export const saveAssistantSettingsFn = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1), settings: assistantSettingsSchema }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return saveAssistantSettings(data.settings);
  });

// ——— العملاء المحتملون (نموذج الزوار) ———

const leadInputSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional(),
  courseSlug: z.string().optional(),
  courseName: z.string().optional(),
  note: z.string().optional(),
});

/** إرسال عام — لا يتطلب تسجيل دخول. */
export const createLeadFn = createServerFn({ method: "POST" })
  .validator(leadInputSchema)
  .handler(async ({ data }) => createLead(data));

export const listLeadsFn = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    return listLeads();
  });

export const deleteLeadFn = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1), id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await assertAdminSession(data.token);
    await deleteLead(data.id);
    return { ok: true as const };
  });
