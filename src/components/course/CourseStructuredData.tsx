import { SITE } from "@/lib/site-config";
import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
  ogImageUrl: string;
  lang: Lang;
};

export default function CourseStructuredData({ course, ogImageUrl, lang }: Props) {
  const pageUrl = `${SITE.siteUrl}${course.seo.canonicalPath}`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.seo.description,
    provider: {
      "@type": "Organization",
      name: lang === "ar" ? SITE.brandName : SITE.brandNameEn,
      sameAs: SITE.siteUrl,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${course.durationDays}D`,
      location: {
        "@type": "Place",
        name: course.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jeddah",
          addressCountry: "SA",
        },
      },
    },
    image: ogImageUrl,
    url: pageUrl,
    inLanguage: lang,
    educationalLevel: course.level,
    teaches: course.curriculum.modules.map((m) => m.title),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: course.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${SITE.siteUrl}${item.href === "/" ? "" : item.href}` }
        : { item: pageUrl }),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: course.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const schemas = [courseSchema, breadcrumbSchema, faqSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
