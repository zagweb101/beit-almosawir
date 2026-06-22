import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CourseLandingData } from "@/types/course";
import { useCourseWhatsAppUrl } from "@/hooks/use-course-whatsapp-url";
import { useT } from "@/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  course: CourseLandingData;
};

export default function CourseHero({ course }: Props) {
  const { lang } = useT();
  const whatsappUrl = useCourseWhatsAppUrl(course);
  const BreadcrumbIcon = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={course.heroImage}
          alt={course.heroImageAlt}
          className="w-full h-full object-cover object-[60%_center] md:object-center opacity-40"
          width={1600}
          height={1024}
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="relative course-shell py-8 sm:py-12 md:py-20 max-w-5xl">
        <Breadcrumb className="mb-3 sm:mb-4 hidden sm:block text-sm">
          <BreadcrumbList className="flex-wrap gap-y-1">
            {course.breadcrumb.map((item, index) => (
              <span key={item.label} className="contents">
                {index > 0 && (
                  <BreadcrumbSeparator>
                    <BreadcrumbIcon className="size-3.5 shrink-0" />
                  </BreadcrumbSeparator>
                )}
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="inline-flex max-w-full items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-sm mb-3 sm:mb-4">
          <span className="break-words">{course.badge}</span>
        </div>

        <h1 className="course-h1 font-bold">{course.ui.seoH1}</h1>

        <p className="mt-2 sm:mt-3 course-h2 font-bold">
          <span className="text-gradient break-words">{course.heroTitle}</span>
        </p>

        <p className="mt-2 text-base course-muted leading-relaxed max-w-3xl hidden md:block break-words">
          {course.heroSubtitle}
        </p>

        {course.heroPitchLine ? (
          <p className="mt-3 text-base font-semibold text-primary/90 leading-relaxed max-w-3xl break-words">
            {course.heroPitchLine}
          </p>
        ) : null}

        <p className="mt-3 text-base font-semibold text-foreground/90 md:hidden break-words">
          {course.ui.heroMobileStats}
        </p>

        <p className="mt-2 text-base course-muted leading-relaxed max-w-3xl md:hidden break-words">
          {course.heroSubtitle}
        </p>

        {course.heroPitchLine ? (
          <p className="mt-2 text-base font-semibold text-primary/90 leading-relaxed break-words md:hidden">
            {course.heroPitchLine}
          </p>
        ) : null}

        <div className="mt-4 sm:mt-5 md:mt-8 flex flex-col min-[390px]:flex-row flex-wrap gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero course-btn inline-flex w-full min-[390px]:w-auto items-center justify-center gap-2 px-7 py-3 rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {course.ui.ctas.hero}
          </a>
          <a
            href={course.heroSecondaryCtaTarget}
            className="btn-outline-brand hidden min-[390px]:inline-flex w-full min-[390px]:w-auto items-center justify-center px-7 py-3 course-btn rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {course.heroSecondaryCta}
          </a>
        </div>

        <p className="mt-4 sm:mt-5 text-base md:text-lg course-muted leading-relaxed max-w-3xl hidden sm:block break-words">
          {course.heroDescription}
        </p>
      </div>
    </section>
  );
}
