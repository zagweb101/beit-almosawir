import type { CourseLandingData } from "@/types/course";
import { useCourseWhatsAppUrl } from "@/hooks/use-course-whatsapp-url";

type Props = {
  course: CourseLandingData;
};

export default function CourseFinalCTA({ course }: Props) {
  const whatsappUrl = useCourseWhatsAppUrl(course);
  const { finalCta } = course;

  return (
    <section className="course-section scroll-mt-20 pb-4 md:pb-0" id="final-cta">
      <div className="relative course-card card-elegant rounded-2xl p-6 sm:p-10 md:p-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none scale-100"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative max-w-2xl mx-auto min-w-0">
          <h2 className="course-h2 font-bold break-words">{finalCta.title}</h2>
          <p className="mt-4 md:mt-5 course-muted text-base md:text-lg leading-relaxed break-words">
            {finalCta.description}
          </p>
          {finalCta.investmentLine ? (
            <p className="mt-3 text-base font-semibold text-primary/90 break-words">
              {finalCta.investmentLine}
            </p>
          ) : null}
          {finalCta.trustNote ? (
            <p className="mt-3 text-sm course-muted break-words">{finalCta.trustNote}</p>
          ) : null}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero mt-6 md:mt-8 inline-flex w-full min-[390px]:w-auto items-center justify-center gap-2 px-8 py-3 course-btn rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {course.ui.ctas.final}
          </a>
        </div>
      </div>
    </section>
  );
}
