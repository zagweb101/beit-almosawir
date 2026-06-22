import { CheckCircle2 } from "lucide-react";
import type { CourseLandingData } from "@/types/course";
import CourseInlineCTA from "@/components/course/CourseInlineCTA";

type Props = {
  course: CourseLandingData;
};

export default function CourseRegistrationBenefits({ course }: Props) {
  const { registrationBenefits } = course;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{registrationBenefits.title}</h2>
      <div className="divider-brand my-8 md:my-10" />
      <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 md:gap-4 min-w-0">
        {registrationBenefits.items.map((item) => (
          <li
            key={item.text}
            className="course-card card-elegant rounded-xl p-4 sm:p-5 flex items-start gap-3 min-w-0"
          >
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-base leading-relaxed break-words">{item.text}</span>
          </li>
        ))}
      </ul>

      <CourseInlineCTA
        course={course}
        buttonLabel={course.ui.ctas.registration}
        className="border-border/50"
      />
    </section>
  );
}
