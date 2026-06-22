import type { CourseCatalogEntry } from "@/data/courses/catalog";
import type { CourseLandingData } from "@/types/course";
import type { AdminCourseFields, AdminCustomCourse, AdminStore } from "./types";
import { getPhotographyFundamentalsCourse } from "@/data/courses/photography-fundamentals";
import type { Lang } from "@/lib/i18n";

function patchQuickFacts(course: CourseLandingData, fields: Partial<AdminCourseFields>) {
  return course.quickFacts.map((fact) => {
    if (fact.label.includes("المدة") && fields.durationDays != null) {
      return { ...fact, value: `${fields.durationDays} أيام` };
    }
    if (fact.label.includes("الساعات") && fields.totalHours != null) {
      return { ...fact, value: `${fields.totalHours} ساعة` };
    }
    if (fact.label.includes("المستوى") && fields.level) {
      return { ...fact, value: fields.level };
    }
    if (fact.label.includes("نوع") && fields.trainingType) {
      return { ...fact, value: fields.trainingType };
    }
    if (fact.label.includes("الموقع") && fields.location) {
      return { ...fact, value: fields.location };
    }
    return fact;
  });
}

export function mergeCourseFields(
  course: CourseLandingData,
  fields: Partial<AdminCourseFields>,
): CourseLandingData {
  if (!Object.keys(fields).length) return course;

  const durationDays = fields.durationDays ?? course.durationDays;
  const totalHours = fields.totalHours ?? course.totalHours;
  const dailyHours = fields.dailyHours ?? course.dailyHours;

  return {
    ...course,
    name: fields.name ?? course.name,
    heroSubtitle: fields.heroSubtitle ?? course.heroSubtitle,
    priceLabel: fields.priceLabel ?? course.priceLabel,
    scheduleLabel: fields.scheduleLabel ?? course.scheduleLabel,
    durationDays,
    totalHours,
    dailyHours,
    level: fields.level ?? course.level,
    location: fields.location ?? course.location,
    trainingType: fields.trainingType ?? course.trainingType,
    instructorName: fields.instructorName ?? course.instructorName,
    quickFacts: patchQuickFacts(course, fields),
    trainer: course.trainer
      ? {
          ...course.trainer,
          name: fields.instructorName ?? course.trainer.name,
        }
      : fields.instructorName
        ? {
            name: fields.instructorName,
            specialty: course.name,
          }
        : course.trainer,
    ui: {
      ...course.ui,
      durationText: `${durationDays} أيام`,
      hoursText: `${totalHours} ساعة`,
      instructorText: fields.instructorName ?? course.ui.instructorText,
    },
  };
}

export function buildCustomCourseLanding(custom: AdminCustomCourse, lang: Lang): CourseLandingData {
  const base = getPhotographyFundamentalsCourse(lang);
  const path = `/courses/${custom.slug}` as const;
  return mergeCourseFields(
    {
      ...base,
      slug: custom.slug,
      seo: {
        ...base.seo,
        title: `${custom.name} | أكاديمية بيت المصور`,
        description: custom.heroSubtitle ?? base.seo.description,
        canonicalPath: path,
        ogTitle: `${custom.name} | أكاديمية بيت المصور`,
        ogDescription: custom.heroSubtitle ?? base.seo.ogDescription,
      },
      breadcrumb: [
        { label: "الرئيسية", href: "/" },
        { label: "الدورات", href: "/courses" },
        { label: custom.name },
      ],
      whatsappBookingMessage: `السلام عليكم، أرغب في التسجيل في دورة ${custom.name}، وأريد معرفة الموعد والسعر.`,
    },
    custom,
  );
}

export function applyAdminStoreToCatalog(
  catalog: CourseCatalogEntry[],
  store: AdminStore,
  lang: Lang,
): CourseCatalogEntry[] {
  const deleted = new Set(store.deletedSlugs);

  const merged = catalog
    .filter((entry) => !deleted.has(entry.course.slug))
    .map((entry) => {
      const override = store.overrides[entry.course.slug];
      if (!override) return entry;
      const { updatedAt: _u, ...fields } = override;
      return {
        ...entry,
        course: mergeCourseFields(entry.course, fields),
      };
    });

  for (const custom of store.customCourses) {
    if (deleted.has(custom.slug)) continue;
    merged.push({
      path: `/courses/${custom.slug}` as CourseCatalogEntry["path"],
      course: buildCustomCourseLanding(custom, lang),
    });
  }

  return merged;
}

export function courseToAdminRow(entry: CourseCatalogEntry): import("./types").AdminCourseRow {
  const c = entry.course;
  return {
    slug: c.slug,
    path: entry.path,
    source: "builtin",
    name: c.name,
    priceLabel: c.priceLabel,
    scheduleLabel: c.scheduleLabel,
    durationDays: c.durationDays,
    totalHours: c.totalHours,
    dailyHours: c.dailyHours,
    instructorName: c.instructorName ?? c.trainer?.name ?? "",
    level: c.level,
    location: c.location,
    trainingType: c.trainingType,
    heroSubtitle: c.heroSubtitle,
  };
}
