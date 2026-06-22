import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCourseCatalog } from "@/lib/admin/context";
import { SITE } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import CourseCatalogCard from "@/components/course/CourseCatalogCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";

const seoTitleAr = "دورات أكاديمية بيت المصور في جدة | بيت المصور";
const seoDescAr =
  "استكشف دورات التصوير والإضاءة الحضورية في جدة: أساسيات التصوير واحتراف الإضاءة الشاملة مع تدريب عملي داخل الاستوديو.";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: seoTitleAr },
      { name: "description", content: seoDescAr },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: seoTitleAr },
      { property: "og:description", content: seoDescAr },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.siteUrl}/courses` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.siteUrl}/courses` }],
  }),
  component: CoursesIndexPage,
});

function CoursesIndexPage() {
  const { t, lang } = useT();
  const catalog = useCourseCatalog();
  const BreadcrumbIcon = lang === "ar" ? ChevronLeft : ChevronRight;

  useEffect(() => {
    document.title = t.coursesPage.seoTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.coursesPage.seoDescription);
  }, [t]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.coursesPage.title,
    itemListElement: catalog.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.course.name,
      url: `${SITE.siteUrl}${entry.path}`,
    })),
  };

  return (
    <div className="course-page overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="course-shell py-8 sm:py-12 md:py-16 min-w-0">
        <Breadcrumb className="mb-4 text-sm">
          <BreadcrumbList className="flex-wrap gap-y-1">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">{t.nav.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <BreadcrumbIcon className="size-3.5 shrink-0" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{t.nav.courses}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="course-kicker text-primary tracking-widest mb-3">
          {t.coursesPage.kicker}
        </div>
        <h1 className="course-h1 font-bold break-words">{t.coursesPage.title}</h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg course-muted leading-relaxed break-words">
          {t.coursesPage.lead}
        </p>
        <div className="divider-brand my-8 md:my-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 min-w-0">
          {catalog.map((entry) => (
            <CourseCatalogCard key={entry.path} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
