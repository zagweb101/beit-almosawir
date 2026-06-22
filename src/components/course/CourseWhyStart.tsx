import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseWhyStart({ course }: Props) {
  const { whyStart } = course;

  return (
    <section className="course-section">
      <div className="course-kicker text-primary tracking-widest mb-3">{whyStart.kicker}</div>
      <h2 className="course-h2 font-bold break-words">{whyStart.title}</h2>
      <p className="mt-4 md:mt-5 course-muted max-w-3xl text-base leading-relaxed break-words">
        {whyStart.lead}
      </p>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 min-w-0">
        {whyStart.cards.map((card) => (
          <div
            key={card.title}
            className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-7 hover:-translate-y-1 transition-transform motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <h3 className="text-lg font-bold leading-snug break-words">{card.title}</h3>
            <p className="mt-3 text-base course-muted leading-relaxed break-words">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
