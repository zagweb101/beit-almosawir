import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createCourse,
  createInstructorForAdmin,
  deleteCourse,
  deleteInstructorForAdmin,
  getCourse,
  listCourses,
  listInstructorsForAdmin,
  loginAdmin,
  saveCourse,
  updateInstructorForAdmin,
} from "./handlers.server";
import { readAdminStore } from "./store.server";
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
    return loginAdmin(data.password);
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
