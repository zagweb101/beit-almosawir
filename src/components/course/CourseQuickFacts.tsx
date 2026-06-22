import {
  Building2,
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  MessageCircle,
  User,
  type LucideIcon,
} from "lucide-react";
import type { CourseLandingData } from "@/types/course";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  Building2,
  MessageCircle,
  User,
};

type Props = {
  course: CourseLandingData;
};

export default function CourseQuickFacts({ course }: Props) {
  return (
    <section className="course-shell pt-5 pb-3 md:pt-7 md:pb-5 min-w-0">
      <div className="grid grid-cols-2 min-[540px]:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
        {course.quickFacts.map((fact) => {
          const Icon = iconMap[fact.icon] ?? Calendar;
          return (
            <div
              key={fact.label}
              className="course-card card-elegant rounded-xl p-4 sm:p-4 md:p-5 text-center hover:-translate-y-0.5 transition-transform motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="mx-auto size-9 sm:size-10 rounded-lg bg-gradient-brand grid place-items-center mb-2 sm:mb-3 glow">
                <Icon className="size-4 sm:size-5 text-white" />
              </div>
              <div className="text-sm course-muted break-words">{fact.label}</div>
              <div className="mt-1 text-base font-semibold break-words">{fact.value}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
