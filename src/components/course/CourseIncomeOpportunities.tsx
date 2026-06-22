import { Sparkles } from "lucide-react";
import type { CourseLandingData } from "@/types/course";
import CourseInlineCTA from "@/components/course/CourseInlineCTA";

type Props = {
  course: CourseLandingData;
};

export default function CourseIncomeOpportunities({ course }: Props) {
  const { income } = course;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{income.title}</h2>
      <p className="mt-4 md:mt-5 course-muted max-w-3xl text-base md:text-lg leading-relaxed break-words">
        {income.lead}
      </p>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-w-0">
        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold mb-4 break-words">
            {course.ui.incomeNeedsTitle}
          </h3>
          <ul className="space-y-3">
            {income.requirements.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base course-muted min-w-0">
                <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold mb-4 break-words">
            {course.ui.incomePathsTitle}
          </h3>
          <ul className="space-y-3">
            {income.opportunities.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base min-w-0">
                <Sparkles className="size-4 text-primary shrink-0 mt-1" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 md:mt-8 course-card card-elegant rounded-xl p-5 sm:p-6 text-base course-muted leading-relaxed border-primary/30 break-words">
        {income.disclaimer}
      </p>

      <CourseInlineCTA
        course={course}
        title={course.incomeCta.title}
        buttonLabel={course.ui.ctas.income}
      />
    </section>
  );
}
