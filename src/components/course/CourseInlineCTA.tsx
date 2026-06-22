import type { CourseLandingData } from "@/types/course";
import { useCourseWhatsAppUrl } from "@/hooks/use-course-whatsapp-url";
import { cn } from "@/lib/utils";

type Props = {
  course: CourseLandingData;
  title?: string;
  description?: string;
  buttonLabel: string;
  className?: string;
};

export default function CourseInlineCTA({
  course,
  title,
  description,
  buttonLabel,
  className,
}: Props) {
  const whatsappUrl = useCourseWhatsAppUrl(course);

  return (
    <div
      className={cn(
        "mt-6 md:mt-8 course-card card-elegant rounded-2xl p-6 sm:p-8 md:p-10 text-center border-primary/20 overflow-hidden",
        className,
      )}
    >
      {title ? (
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug break-words">
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="mt-3 text-base course-muted leading-relaxed break-words">{description}</p>
      ) : null}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "btn-hero inline-flex w-full min-[390px]:w-auto items-center justify-center gap-2 px-7 py-3 rounded-md text-base font-semibold course-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          title ? "mt-5 sm:mt-6" : description ? "mt-5 sm:mt-6" : "",
        )}
      >
        {buttonLabel}
      </a>
    </div>
  );
}
