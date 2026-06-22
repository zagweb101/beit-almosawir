import { XCircle, CheckCircle2 } from "lucide-react";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseProblemTransform({ course }: Props) {
  const { problem } = course;

  return (
    <section className="course-section">
      <div className="course-kicker text-primary tracking-widest mb-3">
        {course.ui.problemKicker}
      </div>
      <h2 className="course-h2 font-bold max-w-3xl break-words">{problem.question}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-w-0">
        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8 border-destructive/20">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <XCircle className="size-5 text-destructive shrink-0" />
            <h3 className="text-lg md:text-xl font-bold break-words">{course.ui.beforeTitle}</h3>
          </div>
          <ul className="space-y-3">
            {problem.before.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base course-muted min-w-0">
                <span className="mt-2 size-1.5 rounded-full bg-destructive/70 shrink-0" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8 border-primary/30">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <CheckCircle2 className="size-5 text-primary shrink-0" />
            <h3 className="text-lg md:text-xl font-bold break-words">{course.ui.afterTitle}</h3>
          </div>
          <ul className="space-y-3">
            {problem.after.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-base min-w-0">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-1" />
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
