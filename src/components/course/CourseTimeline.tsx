import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseTimeline({ course }: Props) {
  const { timeline } = course;

  return (
    <section className="course-section">
      <h2 className="course-h2 font-bold break-words">{timeline.title}</h2>
      <p className="mt-3 text-sm course-muted break-words">{course.ui.timelineDraftNote}</p>
      <div className="divider-brand my-8 md:my-10" />

      <div className="relative space-y-4 md:space-y-6 min-w-0">
        <div className="absolute top-2 bottom-2 end-4 w-px bg-border hidden md:block" aria-hidden />
        {timeline.days.map((day) => (
          <div key={day.day} className="relative md:pe-12 min-w-0">
            <div className="hidden md:grid absolute end-0 top-1 size-8 rounded-full bg-gradient-brand place-items-center text-sm font-bold text-white glow">
              {day.day}
            </div>
            <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex items-start gap-3 mb-2 min-w-0">
                <span className="md:hidden size-8 shrink-0 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-white">
                  {day.day}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold break-words min-w-0 flex-1">
                  {course.ui.dayPrefix} {day.day}: {day.title}
                </h3>
              </div>
              <p className="text-base course-muted leading-relaxed break-words md:pe-2">
                {day.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
