import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Award, Clock, MapPin } from "lucide-react";
import type { CourseCatalogEntry } from "@/data/courses/catalog";
import { useT } from "@/lib/i18n";

type Props = {
  entry: CourseCatalogEntry;
};

export default function CourseCatalogCard({ entry }: Props) {
  const { t, lang } = useT();
  const { course, path } = entry;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const hasCertificate = course.registrationBenefits?.items?.some((i) =>
    i.text.includes("شهادة"),
  );

  return (
    <article className="course-card card-elegant rounded-2xl overflow-hidden flex flex-col min-w-0 h-full">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={course.heroImage}
          alt={course.heroImageAlt}
          loading="lazy"
          width={1280}
          height={720}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <span className="absolute top-3 start-3 inline-flex px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-sm">
          {course.badge}
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold break-words">{course.name}</h2>
        <p className="mt-2 text-base course-muted leading-relaxed break-words line-clamp-3">
          {course.seo.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm course-muted">
          <li className="flex items-center gap-1.5 min-w-0">
            <Clock className="size-4 shrink-0 text-primary" />
            <span className="break-words">{course.ui.heroMobileStats}</span>
          </li>
          <li className="flex items-center gap-1.5 min-w-0">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="break-words">{course.location}</span>
          </li>
        </ul>

        <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <div className="text-xs course-muted">{course.ui.priceFieldLabel}</div>
            <div className="text-lg font-bold text-gradient break-words leading-tight">
              {course.priceLabel}
            </div>
          </div>
          {hasCertificate ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-medium shrink-0">
              <Award className="size-3.5 text-primary" /> يشمل شهادة
            </span>
          ) : null}
        </div>

        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          className="btn-hero mt-4 inline-flex w-full items-center justify-center gap-2 px-5 py-3 course-btn rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t.coursesPage.viewCourse}
          <Arrow className="size-4 shrink-0" />
        </Link>
      </div>
    </article>
  );
}
