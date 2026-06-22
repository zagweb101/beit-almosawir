import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import { mergedCatalog } from "@/lib/admin/catalog.server";
import { buildCourseKnowledge, LILI_SITE_KNOWLEDGE } from "@/lib/lili/knowledge";
import type { CourseKnowledge, KnowledgeChunk, LiliKnowledgeBundle } from "@/types/lili";

function buildMemoryChunks(courses: CourseKnowledge[]): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "site-brand",
    sourceType: "site",
    title: "بيت المصور",
    content: `${LILI_SITE_KNOWLEDGE.brand} — أكاديمية تعليم التصوير. الموقع: ${LILI_SITE_KNOWLEDGE.location}.`,
    priority: 10,
  });

  for (const [key, text] of Object.entries(LILI_SITE_KNOWLEDGE.policies)) {
    chunks.push({
      id: `policy-${key}`,
      sourceType: "policy",
      title: key,
      content: text,
      priority: 8,
    });
  }

  for (const course of courses) {
    chunks.push({
      id: `course-summary-${course.slug}`,
      sourceType: "course",
      sourceId: course.slug,
      title: course.title,
      content: [
        course.shortDescription,
        `المستوى: ${course.level}`,
        `السعر: ${course.priceLabel}`,
        `الموعد: ${course.scheduleLabel}`,
        course.durationDays ? `المدة: ${course.durationDays} أيام` : "",
        course.durationHours ? `الساعات: ${course.durationHours}` : "",
        course.trainerName ? `المدرب: ${course.trainerName}` : "",
        course.location ? `الموقع: ${course.location}` : "",
        `نوع التدريب: ${course.deliveryMode}`,
      ]
        .filter(Boolean)
        .join("\n"),
      priority: 9,
    });

    for (const topic of course.topics.slice(0, 12)) {
      chunks.push({
        id: `course-topic-${course.slug}-${topic.slice(0, 24)}`,
        sourceType: "course",
        sourceId: course.slug,
        title: `${course.title} — محور`,
        content: topic,
        priority: 5,
      });
    }

    for (const faq of course.faq) {
      chunks.push({
        id: `faq-${course.slug}-${faq.question.slice(0, 24)}`,
        sourceType: "faq",
        sourceId: course.slug,
        title: faq.question,
        content: faq.answer,
        priority: 7,
      });
    }
  }

  return chunks;
}

export async function loadLiliKnowledgeBundle(): Promise<LiliKnowledgeBundle> {
  const catalog = await mergedCatalog("ar");
  const courses = buildCourseKnowledge(catalog);
  const syncedAt = new Date().toISOString();

  if (hasDatabase()) {
    try {
      const rows = await prisma.knowledgeChunk.findMany({
        where: { active: true },
        orderBy: [{ priority: "desc" }, { updatedAt: "desc" }],
      });
      if (rows.length > 0) {
        return {
          courses,
          chunks: rows.map((row) => ({
            id: row.id,
            sourceType: row.sourceType as KnowledgeChunk["sourceType"],
            sourceId: row.sourceId ?? undefined,
            title: row.title,
            content: row.content,
            priority: row.priority,
          })),
          syncedAt,
          source: "database",
        };
      }
    } catch (error) {
      console.error("[lili-knowledge] DB load failed:", error);
    }
  }

  return {
    courses,
    chunks: buildMemoryChunks(courses),
    syncedAt,
    source: "memory",
  };
}

export async function syncLiliKnowledgeToDatabase(): Promise<{ count: number }> {
  const catalog = await mergedCatalog("ar");
  const courses = buildCourseKnowledge(catalog);
  const chunks = buildMemoryChunks(courses);

  if (!hasDatabase()) {
    return { count: chunks.length };
  }

  await prisma.$transaction(async (tx) => {
    await tx.knowledgeChunk.deleteMany({
      where: { sourceType: { in: ["course", "site", "faq", "policy"] } },
    });

    for (const chunk of chunks) {
      await tx.knowledgeChunk.create({
        data: {
          sourceType: chunk.sourceType,
          sourceId: chunk.sourceId ?? null,
          title: chunk.title,
          content: chunk.content,
          priority: chunk.priority,
          active: true,
        },
      });
    }
  });

  return { count: chunks.length };
}
