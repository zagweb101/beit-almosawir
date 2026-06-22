import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseTrainer({ course }: Props) {
  const trainer = course.trainer;
  if (!trainer) return null;

  return (
    <section className="course-section">
      <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-10 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start min-w-0">
        {trainer.image ? (
          <div className="shrink-0 w-full sm:w-40 aspect-square overflow-hidden rounded-xl">
            <img
              src={trainer.image}
              alt={trainer.imageAlt ?? trainer.name}
              loading="lazy"
              width={320}
              height={320}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="shrink-0 w-full sm:w-40 aspect-square rounded-xl bg-gradient-brand grid place-items-center text-3xl font-bold text-white"
            aria-hidden
          >
            {trainer.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="course-kicker text-primary tracking-widest mb-2">
            {course.ui.trainerKicker}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">{trainer.name}</h2>
          <p className="mt-2 text-base text-primary/90 break-words">{trainer.specialty}</p>
          {trainer.todoNote ? (
            <p className="mt-4 text-sm course-muted break-words">{trainer.todoNote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
