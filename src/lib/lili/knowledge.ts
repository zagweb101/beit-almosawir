import type { CourseCatalogEntry } from "@/data/courses/catalog";
import { getCourseCatalog } from "@/data/courses/catalog";
import { SITE } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CourseKnowledge } from "@/types/lili";

const CATEGORY_BY_SLUG: Record<string, string> = {
  "photography-fundamentals": "أساسيات التصوير",
  "lighting-mastery": "الإضاءة",
  "beauty-photography": "تصوير البيوتي والجمال",
  "wedding-photography": "تصوير الأعراس",
};

function hasCertificate(slug: string, benefits: string[]): boolean {
  if (slug === "wedding-photography") return true;
  return benefits.some((b) => b.includes("شهادة"));
}

export function buildCourseKnowledge(
  catalog: CourseCatalogEntry[] = getCourseCatalog("ar"),
): CourseKnowledge[] {
  const updatedAt = new Date().toISOString();

  return catalog.map(({ path, course }) => {
    const topics = course.curriculum.modules.flatMap((m) => m.topics ?? [m.title]);
    const objectives = course.learnOutcomes.items.map((i) => i.text);
    const targetAudience = course.audience.groups.map((g) => g.text);
    const benefits = course.registrationBenefits?.items.map((i) => i.text) ?? [];

    return {
      id: course.slug,
      title: course.name,
      slug: course.slug,
      shortDescription: course.heroSubtitle,
      level: course.level,
      category: CATEGORY_BY_SLUG[course.slug] ?? course.name,
      objectives,
      topics,
      targetAudience,
      trainerName: course.instructorName,
      priceLabel: course.priceLabel,
      scheduleLabel: course.scheduleLabel,
      durationDays: course.durationDays,
      durationHours: course.totalHours,
      location: course.location,
      deliveryMode: course.trainingType.includes("حضور")
        ? "حضوري"
        : course.trainingType.includes("بعد")
          ? "عن بعد"
          : "هجين",
      certificateAvailable: hasCertificate(course.slug, benefits),
      requirements: course.audience.experienceAnswer
        ? [course.audience.experienceAnswer]
        : undefined,
      registrationUrl: path,
      whatsappUrl: buildWhatsAppUrl(course.whatsappBookingMessage),
      heroImage: course.heroImage,
      faq: course.faq.items,
      updatedAt,
    };
  });
}

export const LILI_SITE_KNOWLEDGE = {
  brand: SITE.brandName,
  location: SITE.location,
  whatsappUrl: buildWhatsAppUrl("السلام عليكم، أرغب في التواصل مع فريق بيت المصور."),
  siteUrl: SITE.siteUrl,
  policies: {
    pricing:
      "الأسعار والمواعيد تُؤكَّد عبر فريق بيت المصور — لا نعرض أسعارًا رقمية ثابتة على الموقع حاليًا.",
    registration: "التسجيل عبر واتساب أو صفحة الدورة — فريق الأكاديمية يؤكد السعر والموعد.",
    refund: "سياسة التأجيل والاسترداد تُحدَّد حسب شروط الدورة — تواصل مع الفريق للتفاصيل.",
    installment:
      "بعض الدورات تدعم التقسيط عبر تمارا حسب التوفر وقت التسجيل — راجع صفحة الدورة أو اسأل الفريق.",
  },
} as const;

export function getKnowledgeBySlug(slug: string, knowledge = buildCourseKnowledge()) {
  return knowledge.find((c) => c.slug === slug);
}
