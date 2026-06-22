import { CheckCircle2 } from "lucide-react";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseLearnOutcomes({ course }: Props) {
  const { learnOutcomes } = course;

  return (
    <section className="course-section">
      <div className="course-kicker text-primary tracking-widest mb-3">{learnOutcomes.kicker}</div>
      <h2 className="course-h2 font-bold break-words">{learnOutcomes.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-3 md:gap-4 min-w-0">
        {learnOutcomes.items.map((item) => (
          <div
            key={item.text}
            className="course-card card-elegant rounded-xl p-4 sm:p-5 flex items-start gap-3 min-w-0"
          >
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-base leading-relaxed break-words">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
