import { randomUUID } from "node:crypto";
import { hasDatabase, prisma } from "@/lib/db/prisma.server";
import type { AdminTestimonial, AdminTestimonialFields } from "./types";

// احتياطي في الذاكرة عند غياب قاعدة البيانات (تطوير محلي).
const memoryTestimonials = new Map<string, AdminTestimonial>();

type TestimonialRow = {
  id: string;
  authorName: string;
  role: string;
  quote: string;
  rating: number;
  photoUrl: string | null;
  courseSlug: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function rowToTestimonial(row: TestimonialRow): AdminTestimonial {
  return {
    id: row.id,
    authorName: row.authorName,
    role: row.role,
    quote: row.quote,
    rating: row.rating,
    photoUrl: row.photoUrl ?? undefined,
    courseSlug: row.courseSlug ?? undefined,
    featured: row.featured,
    active: row.active,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function normalize(fields: AdminTestimonialFields) {
  return {
    authorName: fields.authorName.trim(),
    role: fields.role.trim(),
    quote: fields.quote.trim(),
    rating: Math.min(5, Math.max(1, Math.round(fields.rating) || 5)),
    photoUrl: fields.photoUrl?.trim() || null,
    courseSlug: fields.courseSlug?.trim() || null,
    featured: fields.featured,
    active: fields.active,
    sortOrder: Math.round(fields.sortOrder) || 0,
  };
}

const orderBy = [{ sortOrder: "asc" as const }, { createdAt: "desc" as const }];

function sortMemory(items: AdminTestimonial[]): AdminTestimonial[] {
  return items.sort(
    (a, b) => a.sortOrder - b.sortOrder || b.createdAt.localeCompare(a.createdAt),
  );
}

export async function listTestimonials(): Promise<AdminTestimonial[]> {
  if (hasDatabase()) {
    try {
      const rows = await prisma.testimonial.findMany({ orderBy });
      return rows.map(rowToTestimonial);
    } catch (error) {
      console.error("[testimonials] DB list failed, using memory:", error);
    }
  }
  return sortMemory([...memoryTestimonials.values()]);
}

export async function listActiveTestimonials(): Promise<AdminTestimonial[]> {
  if (hasDatabase()) {
    try {
      const rows = await prisma.testimonial.findMany({ where: { active: true }, orderBy });
      return rows.map(rowToTestimonial);
    } catch (error) {
      console.error("[testimonials] DB active list failed, using memory:", error);
    }
  }
  return sortMemory([...memoryTestimonials.values()].filter((t) => t.active));
}

export async function createTestimonial(
  fields: AdminTestimonialFields,
): Promise<AdminTestimonial> {
  const data = normalize(fields);
  if (!data.authorName || !data.quote) throw new Error("INVALID_TESTIMONIAL");

  if (hasDatabase()) {
    try {
      const row = await prisma.testimonial.create({ data });
      return rowToTestimonial(row);
    } catch (error) {
      console.error("[testimonials] DB create failed, using memory:", error);
    }
  }

  const now = new Date().toISOString();
  const testimonial: AdminTestimonial = {
    id: randomUUID(),
    ...data,
    photoUrl: data.photoUrl ?? undefined,
    courseSlug: data.courseSlug ?? undefined,
    createdAt: now,
    updatedAt: now,
  };
  memoryTestimonials.set(testimonial.id, testimonial);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  fields: AdminTestimonialFields,
): Promise<AdminTestimonial> {
  const data = normalize(fields);
  if (!data.authorName || !data.quote) throw new Error("INVALID_TESTIMONIAL");

  if (hasDatabase()) {
    try {
      const row = await prisma.testimonial.update({ where: { id }, data });
      return rowToTestimonial(row);
    } catch (error) {
      console.error("[testimonials] DB update failed, using memory:", error);
    }
  }

  const existing = memoryTestimonials.get(id);
  if (!existing) throw new Error("NOT_FOUND");
  const updated: AdminTestimonial = {
    ...existing,
    ...data,
    photoUrl: data.photoUrl ?? undefined,
    courseSlug: data.courseSlug ?? undefined,
    updatedAt: new Date().toISOString(),
  };
  memoryTestimonials.set(id, updated);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (hasDatabase()) {
    try {
      await prisma.testimonial.delete({ where: { id } });
      return;
    } catch (error) {
      console.error("[testimonials] DB delete failed, using memory:", error);
    }
  }
  memoryTestimonials.delete(id);
}
