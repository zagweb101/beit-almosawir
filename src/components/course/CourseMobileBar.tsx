import type { CourseLandingData } from "@/types/course";
import { useCourseWhatsAppUrl } from "@/hooks/use-course-whatsapp-url";

type Props = {
  course: CourseLandingData;
};

export default function CourseMobileBar({ course }: Props) {
  const whatsappUrl = useCourseWhatsAppUrl(course);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 xl:hidden print:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="region"
      aria-label={course.name}
    >
      <div className="course-shell pt-3 pb-1 flex items-center justify-between gap-2 sm:gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm sm:text-base truncate">{course.name}</div>
          <div className="text-sm course-muted truncate">{course.ui.heroMobileStats}</div>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hero shrink-0 inline-flex items-center justify-center px-3 sm:px-5 py-3 course-btn min-w-11 max-w-[52%] sm:max-w-none rounded-md text-xs sm:text-sm font-semibold text-center leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {course.ui.ctas.mobile}
        </a>
      </div>
    </div>
  );
}
