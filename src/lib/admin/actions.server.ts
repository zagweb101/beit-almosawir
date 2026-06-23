import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createCourse,
  createInstructorForAdmin,
  createTestimonialForAdmin,
  deleteCourse,
  deleteInstructorForAdmin,
  deleteTestimonialForAdmin,
  getActiveTestimonials,
  getCourse,
  listCourses,
  listInstructorsForAdmin,
  listTestimonialsForAdmin,
  loginAdmin,
  saveCourse,
  updateInstructorForAdmin,
  updateTestimonialForAdmin,
} from "./handlers.server";
import { readAdminStore } from "./store.server";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  getClientIp,
  recordLoginFailure,
} from "./rate-limit.server";
import type { AdminStore } from "./types";

const tokenSchema = z.object({ token: z.string().min(1) });

const fieldsSchema = z.object({
  name: z.string().min(1),
  priceLabel: z.string().min(1),
  scheduleLabel: z.string().min(1),
  durationDays: z.number().int().positive(),
  totalHours: z.number().int().positive(),
  dailyHours: z.number().int().positive(),
  instructorName: z.string(),
  level: z.string().min(1),
  location: z.string().min(1),
  trainingType: z.string().min(1),
  heroSubtitle: z.string().optional(),
});

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const ip = getClientIp();
    const limit = checkLoginRateLimit(ip);
    if (!limit.allowed) {
      throw new Error(`RATE_LIMITED:${limit.retryAfterSec}`);
    }
    try {
      const result = await loginAdmin(data.password);
      clearLoginAttempts(ip);
      return result;
    } catch (error) {
      recordLoginFailure(ip);
      throw error;
    }
  });

export const getPublicAdminStoreFn = createServerFn({ method: "GET" }).handler(async () => {
  return await readAdminStore();
});

export const listAdminCoursesFn = createServerFn({ method: "GET" })
  .validator(tokenSchema)
  .handler(async ({ data }) => listCourses(data.token));

export const getAdminCourseFn = createServerFn({ method: "GET" })
  .validator(tokenSchema.extend({ slug: z.string() }))
  .handler(async ({ data }) => getCourse(data.token, data.slug));

export const saveAdminCourseFn = createServerFn({ method: "POST" })
  .validator(
    tokenSchema.extend({
      slug: z.string(),
      fields: fieldsSchema,
    }),
  )
  .handler(async ({ data }) => {
    await saveCourse(data.token, data.slug, data.fields);
    return { ok: true as const };
  });

export const createAdminCourseFn = createServerFn({ method: "POST" })
  .validator(
    tokenSchema.extend({
      slug: z.string().optional(),
      fields: fieldsSchema,
    }),
  )
  .handler(async ({ data }) => createCourse(data.token, data.fields, data.slug));

export const deleteAdminCourseFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ slug: z.string() }))
  .handler(async ({ data }) => {
    await deleteCourse(data.token, data.slug);
    return { ok: true as const };
  });

// ——— المدربون ———

const instructorFieldsSchema = z.object({
  name: z.string().min(1),
  specialty: z.string(),
  bio: z.string(),
  photoUrl: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  active: z.boolean(),
});

export const listAdminInstructorsFn = createServerFn({ method: "GET" })
  .validator(tokenSchema)
  .handler(async ({ data }) => listInstructorsForAdmin(data.token));

export const createAdminInstructorFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ fields: instructorFieldsSchema }))
  .handler(async ({ data }) => createInstructorForAdmin(data.token, data.fields));

export const updateAdminInstructorFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ id: z.string().min(1), fields: instructorFieldsSchema }))
  .handler(async ({ data }) => updateInstructorForAdmin(data.token, data.id, data.fields));

export const deleteAdminInstructorFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await deleteInstructorForAdmin(data.token, data.id);
    return { ok: true as const };
  });

// ——— التقييمات ———

const testimonialFieldsSchema = z.object({
  authorName: z.string().min(1),
  role: z.string(),
  quote: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  photoUrl: z.string().optional(),
  courseSlug: z.string().optional(),
  featured: z.boolean(),
  active: z.boolean(),
  sortOrder: z.number().int(),
});

/** قراءة عامة — يستخدمها قسم التقييمات على الموقع. */
export const getPublicTestimonialsFn = createServerFn({ method: "GET" }).handler(async () => {
  return getActiveTestimonials();
});

export const listAdminTestimonialsFn = createServerFn({ method: "GET" })
  .validator(tokenSchema)
  .handler(async ({ data }) => listTestimonialsForAdmin(data.token));

export const createAdminTestimonialFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ fields: testimonialFieldsSchema }))
  .handler(async ({ data }) => createTestimonialForAdmin(data.token, data.fields));

export const updateAdminTestimonialFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ id: z.string().min(1), fields: testimonialFieldsSchema }))
  .handler(async ({ data }) => updateTestimonialForAdmin(data.token, data.id, data.fields));

export const deleteAdminTestimonialFn = createServerFn({ method: "POST" })
  .validator(tokenSchema.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await deleteTestimonialForAdmin(data.token, data.id);
    return { ok: true as const };
  });
