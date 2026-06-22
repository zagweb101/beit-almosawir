import { Users } from "lucide-react";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseAudience({ course }: Props) {
  const { audience } = course;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{audience.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 min-w-0">
        {audience.groups.map((group) => (
          <div
            key={group.text}
            className="course-card card-elegant rounded-xl p-4 sm:p-5 flex items-start gap-3 min-w-0"
          >
            <Users className="size-5 text-primary shrink-0 mt-0.5" />
            <span className="text-base leading-relaxed break-words">{group.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-10">
        <h3 className="text-lg md:text-xl font-bold break-words">{audience.experienceQuestion}</h3>
        <p className="mt-3 text-base course-muted leading-relaxed break-words">
          {audience.experienceAnswer}
        </p>
      </div>
    </section>
  );
}
