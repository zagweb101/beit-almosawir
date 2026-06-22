import { XCircle, CheckCircle2 } from "lucide-react";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseInvestment({ course }: Props) {
  const investment = course.investment;
  if (!investment) return null;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{investment.title}</h2>
      {investment.lead ? (
        <p className="mt-4 md:mt-5 course-muted max-w-3xl text-base md:text-lg leading-relaxed break-words">
          {investment.lead}
        </p>
      ) : null}
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-w-0">
        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-4 break-words">
            {investment.beforeTitle}
          </h3>
          <ul className="space-y-3">
            {investment.before.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base course-muted min-w-0">
                <XCircle className="size-4 text-destructive shrink-0 mt-1" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8 min-w-0 border-primary/20">
          <h3 className="text-lg md:text-xl font-bold mb-4 break-words">{investment.afterTitle}</h3>
          <ul className="space-y-3">
            {investment.after.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base min-w-0">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-1" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {investment.highlightQuote ? (
        <p className="mt-6 md:mt-8 course-card card-elegant rounded-xl p-5 sm:p-6 text-base md:text-lg font-semibold text-center border-primary/30 break-words">
          {investment.highlightQuote}
        </p>
      ) : null}
    </section>
  );
}
