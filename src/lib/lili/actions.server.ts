import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ChatPageContext, RecommendState } from "@/types/lili";
import { respond } from "./responder";
import { sanitizeUserInput } from "./guardrails";
import {
  loadLiliKnowledgeBundle,
  syncLiliKnowledgeToDatabase,
} from "./knowledge-server.server";

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
  .handler(async () => {
    return syncLiliKnowledgeToDatabase();
  });

export const askLiliFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      text: z.string(),
      pageContext: pageContextSchema,
      recommend: recommendSchema,
      userName: z.string().optional(),
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
    });
    return {
      ...result,
      knowledgeSource: bundle.source,
    };
  });
