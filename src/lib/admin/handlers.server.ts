import { mergedCatalog } from "@/lib/admin/catalog.server";
import { courseToAdminRow } from "@/lib/admin/merge";
import { getCourseCatalog } from "@/data/courses/catalog";
import { readAdminStore, writeAdminStore } from "@/lib/admin/store.server";
import {
  assertAdminSession,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin/auth.server";
import type {
  AdminCustomCourse,
  AdminInstructorFields,
  AdminStore,
  AdminTestimonialFields,
} from "@/lib/admin/types";

export const BUILTIN_SLUGS = new Set([
  "photography-fundamentals",
  "lighting-mastery",
  "beauty-photography",
  "wedding-photography",
]);

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function loginAdmin(password: string) {
  if (!(await verifyAdminPassword(password))) throw new Error("INVALID_PASSWORD");
  return { token: await createAdminSession() };
}

export async function getPublicStore(): Promise<AdminStore> {
  return readAdminStore();
}

export async function listCourses(token: string) {
  await assertAdminSession(token);
  const catalog = await mergedCatalog("ar");
  const store = await readAdminStore();
  return catalog.map((entry) => ({
    ...courseToAdminRow(entry),
    source: store.customCourses.some((c) => c.slug === entry.course.slug)
      ? ("custom" as const)
      : BUILTIN_SLUGS.has(entry.course.slug)
        ? ("builtin" as const)
        : ("custom" as const),
    updatedAt:
      store.overrides[entry.course.slug]?.updatedAt ??
      store.customCourses.find((c) => c.slug === entry.course.slug)?.updatedAt,
  }));
}

export async function getCourse(token: string, slug: string) {
  await assertAdminSession(token);
  const catalog = await mergedCatalog("ar");
  const entry = catalog.find((e) => e.course.slug === slug);
  if (!entry) throw new Error("NOT_FOUND");
  const store = await readAdminStore();
  return {
    ...courseToAdminRow(entry),
    source: store.customCourses.some((c) => c.slug === slug)
      ? ("custom" as const)
      : ("builtin" as const),
  };
}

async function refreshLiliKnowledgeIndex() {
  try {
    const { syncLiliKnowledgeToDatabase } = await import("@/lib/lili/knowledge-server.server");
    await syncLiliKnowledgeToDatabase();
  } catch (error) {
    console.error("[admin] Lili knowledge sync failed:", error);
  }
}

export async function saveCourse(
  token: string,
  slug: string,
  fields: Omit<AdminCustomCourse, "slug" | "createdAt" | "updatedAt">,
) {
  await assertAdminSession(token);
  const store = await readAdminStore();
  const now = new Date().toISOString();

  if (store.customCourses.some((c) => c.slug === slug)) {
    store.customCourses = store.customCourses.map((c) =>
      c.slug === slug ? { ...c, ...fields, updatedAt: now } : c,
    );
  } else if (BUILTIN_SLUGS.has(slug)) {
    store.overrides[slug] = { ...fields, updatedAt: now };
  } else {
    throw new Error("NOT_FOUND");
  }

  await writeAdminStore(store);
  await refreshLiliKnowledgeIndex();
}

export async function createCourse(
  token: string,
  fields: Omit<AdminCustomCourse, "slug" | "createdAt" | "updatedAt">,
  slugInput?: string,
) {
  await assertAdminSession(token);
  const store = await readAdminStore();
  const slug = slugify(slugInput ?? fields.name);
  if (!slug) throw new Error("INVALID_SLUG");

  const exists =
    BUILTIN_SLUGS.has(slug) ||
    store.customCourses.some((c) => c.slug === slug) ||
    getCourseCatalog("ar").some((e) => e.course.slug === slug);

  if (exists) throw new Error("SLUG_EXISTS");

  const now = new Date().toISOString();
  store.customCourses.push({ slug, ...fields, createdAt: now, updatedAt: now });
  store.deletedSlugs = store.deletedSlugs.filter((s) => s !== slug);
  await writeAdminStore(store);
  await refreshLiliKnowledgeIndex();
  return { slug };
}

export async function deleteCourse(token: string, slug: string) {
  await assertAdminSession(token);
  const store = await readAdminStore();

  if (store.customCourses.some((c) => c.slug === slug)) {
    store.customCourses = store.customCourses.filter((c) => c.slug !== slug);
  } else if (BUILTIN_SLUGS.has(slug)) {
    if (!store.deletedSlugs.includes(slug)) store.deletedSlugs.push(slug);
    delete store.overrides[slug];
  } else {
    throw new Error("NOT_FOUND");
  }

  await writeAdminStore(store);
  await refreshLiliKnowledgeIndex();
}

export function getTokenFromRequest(request: Request): string | undefined {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return undefined;
}

// ——— المدربون ———

export async function listInstructorsForAdmin(token: string) {
  await assertAdminSession(token);
  const { listInstructors } = await import("./instructors.server");
  return listInstructors();
}

export async function createInstructorForAdmin(token: string, fields: AdminInstructorFields) {
  await assertAdminSession(token);
  const { createInstructor } = await import("./instructors.server");
  return createInstructor(fields);
}

export async function updateInstructorForAdmin(
  token: string,
  id: string,
  fields: AdminInstructorFields,
) {
  await assertAdminSession(token);
  const { updateInstructor } = await import("./instructors.server");
  return updateInstructor(id, fields);
}

export async function deleteInstructorForAdmin(token: string, id: string) {
  await assertAdminSession(token);
  const { deleteInstructor } = await import("./instructors.server");
  await deleteInstructor(id);
}

// ——— التقييمات ———

export async function listTestimonialsForAdmin(token: string) {
  await assertAdminSession(token);
  const { listTestimonials } = await import("./testimonials.server");
  return listTestimonials();
}

export async function getActiveTestimonials() {
  const { listActiveTestimonials } = await import("./testimonials.server");
  return listActiveTestimonials();
}

export async function createTestimonialForAdmin(token: string, fields: AdminTestimonialFields) {
  await assertAdminSession(token);
  const { createTestimonial } = await import("./testimonials.server");
  return createTestimonial(fields);
}

export async function updateTestimonialForAdmin(
  token: string,
  id: string,
  fields: AdminTestimonialFields,
) {
  await assertAdminSession(token);
  const { updateTestimonial } = await import("./testimonials.server");
  return updateTestimonial(id, fields);
}

export async function deleteTestimonialForAdmin(token: string, id: string) {
  await assertAdminSession(token);
  const { deleteTestimonial } = await import("./testimonials.server");
  await deleteTestimonial(id);
}
