import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseValuePurchase({ course }: Props) {
  const section = course.valuePurchase;
  if (!section) return null;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{section.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 min-w-0">
        {section.cards.map((card) => (
          <div key={card.title} className="course-card card-elegant rounded-xl p-4 sm:p-5 min-w-0">
            <h3 className="text-lg font-bold break-words">{card.title}</h3>
            <p className="mt-2 text-base course-muted leading-relaxed break-words">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
