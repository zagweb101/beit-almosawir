import type { CourseLandingData } from "@/types/course";
import CourseInlineCTA from "@/components/course/CourseInlineCTA";

type Props = {
  course: CourseLandingData;
};

export default function CoursePriceObjection({ course }: Props) {
  const section = course.priceObjection;
  if (!section) return null;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{section.title}</h2>
      <p className="mt-4 md:mt-5 course-muted max-w-3xl text-base md:text-lg leading-relaxed break-words">
        {section.lead}
      </p>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 min-w-0">
        {section.cards.map((card) => (
          <div key={card.title} className="course-card card-elegant rounded-xl p-4 sm:p-5 min-w-0">
            <h3 className="text-lg font-bold break-words">{card.title}</h3>
            <p className="mt-2 text-base course-muted leading-relaxed break-words">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 md:mt-8 text-base md:text-lg font-semibold text-center break-words">
        {section.highlightQuote}
      </p>

      <CourseInlineCTA
        course={course}
        title={section.cta.title}
        description={section.cta.description}
        buttonLabel={section.cta.buttonLabel}
        className="border-border/50"
      />
    </section>
  );
}
