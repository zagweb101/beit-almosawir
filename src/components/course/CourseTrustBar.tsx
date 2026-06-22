import { CheckCircle2 } from "lucide-react";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseTrustBar({ course }: Props) {
  return (
    <section className="relative z-0 border-y border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="course-shell py-4 md:py-5">
        <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
          {course.trustBar.map((item) => (
            <li
              key={item.text}
              className="flex items-start gap-2 text-sm md:text-base text-foreground/90 leading-snug min-w-0"
            >
              <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
              <span className="break-words">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
