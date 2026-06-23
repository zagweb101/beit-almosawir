import { prisma } from "@/lib/db/prisma.server";
import type { AdminCourseOverride, AdminCustomCourse, AdminStore } from "./types";
import { EMPTY_ADMIN_STORE } from "./types";

function rowToOverride(row: {
  name: string | null;
  priceLabel: string | null;
  priceAmount: number | null;
  currency: string | null;
  scheduleLabel: string | null;
  durationDays: number | null;
  totalHours: number | null;
  dailyHours: number | null;
  instructorName: string | null;
  level: string | null;
  location: string | null;
  trainingType: string | null;
  heroSubtitle: string | null;
  updatedAt: Date;
}): AdminCourseOverride {
  return {
    ...(row.name ? { name: row.name } : {}),
    ...(row.priceLabel ? { priceLabel: row.priceLabel } : {}),
    ...(row.priceAmount != null ? { priceAmount: row.priceAmount } : {}),
    ...(row.currency ? { currency: row.currency } : {}),
    ...(row.scheduleLabel ? { scheduleLabel: row.scheduleLabel } : {}),
    ...(row.durationDays != null ? { durationDays: row.durationDays } : {}),
    ...(row.totalHours != null ? { totalHours: row.totalHours } : {}),
    ...(row.dailyHours != null ? { dailyHours: row.dailyHours } : {}),
    ...(row.instructorName ? { instructorName: row.instructorName } : {}),
    ...(row.level ? { level: row.level } : {}),
    ...(row.location ? { location: row.location } : {}),
    ...(row.trainingType ? { trainingType: row.trainingType } : {}),
    ...(row.heroSubtitle ? { heroSubtitle: row.heroSubtitle } : {}),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readAdminStoreFromDb(): Promise<AdminStore> {
  const [overridesRows, customRows, deletedRows] = await Promise.all([
    prisma.courseOverride.findMany(),
    prisma.customCourse.findMany(),
    prisma.deletedCourse.findMany(),
  ]);

  const overrides: AdminStore["overrides"] = {};
  for (const row of overridesRows) {
    overrides[row.slug] = rowToOverride(row);
  }

  const customCourses: AdminCustomCourse[] = customRows.map((row) => ({
    slug: row.slug,
    name: row.name,
    priceLabel: row.priceLabel,
    priceAmount: row.priceAmount ?? undefined,
    currency: row.currency ?? undefined,
    scheduleLabel: row.scheduleLabel,
    durationDays: row.durationDays,
    totalHours: row.totalHours,
    dailyHours: row.dailyHours,
    instructorName: row.instructorName,
    level: row.level,
    location: row.location,
    trainingType: row.trainingType,
    heroSubtitle: row.heroSubtitle ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));

  return {
    overrides,
    customCourses,
    deletedSlugs: deletedRows.map((r) => r.slug),
  };
}

export async function writeAdminStoreToDb(store: AdminStore): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.courseOverride.deleteMany();
    await tx.customCourse.deleteMany();
    await tx.deletedCourse.deleteMany();

    for (const [slug, override] of Object.entries(store.overrides)) {
      await tx.courseOverride.create({
        data: {
          slug,
          name: override.name ?? null,
          priceLabel: override.priceLabel ?? null,
          priceAmount: override.priceAmount ?? null,
          currency: override.currency ?? null,
          scheduleLabel: override.scheduleLabel ?? null,
          durationDays: override.durationDays ?? null,
          totalHours: override.totalHours ?? null,
          dailyHours: override.dailyHours ?? null,
          instructorName: override.instructorName ?? null,
          level: override.level ?? null,
          location: override.location ?? null,
          trainingType: override.trainingType ?? null,
          heroSubtitle: override.heroSubtitle ?? null,
        },
      });
    }

    for (const course of store.customCourses) {
      await tx.customCourse.create({
        data: {
          slug: course.slug,
          name: course.name,
          priceLabel: course.priceLabel,
          priceAmount: course.priceAmount ?? null,
          currency: course.currency ?? null,
          scheduleLabel: course.scheduleLabel,
          durationDays: course.durationDays,
          totalHours: course.totalHours,
          dailyHours: course.dailyHours,
          instructorName: course.instructorName,
          level: course.level,
          location: course.location,
          trainingType: course.trainingType,
          heroSubtitle: course.heroSubtitle ?? null,
          createdAt: new Date(course.createdAt),
          updatedAt: new Date(course.updatedAt),
        },
      });
    }

    for (const slug of store.deletedSlugs) {
      await tx.deletedCourse.create({ data: { slug } });
    }
  });
}

export async function migrateFileStoreToDb(fileStore: AdminStore): Promise<void> {
  const existing = await prisma.courseOverride.count();
  if (existing > 0) return;
  if (
    Object.keys(fileStore.overrides).length === 0 &&
    fileStore.customCourses.length === 0 &&
    fileStore.deletedSlugs.length === 0
  ) {
    return;
  }
  await writeAdminStoreToDb(fileStore);
}
