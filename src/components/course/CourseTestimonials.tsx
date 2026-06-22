import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseTestimonials({ course }: Props) {
  const { testimonials } = course;

  if (testimonials.items.length === 0) {
    return (
      <section className="course-section">
        <div className="course-card card-elegant rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold break-words">{testimonials.title}</h2>
          <p className="mt-3 text-sm course-muted">{course.ui.testimonialsEmpty}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="course-section">
      <div className="course-kicker text-primary tracking-widest mb-3">{testimonials.kicker}</div>
      <h2 className="course-h2 font-bold break-words">{testimonials.title}</h2>
      <p className="mt-3 text-sm course-muted max-w-2xl break-words">{testimonials.note}</p>
      <div className="divider-brand my-6 md:my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 min-w-0">
        {testimonials.items.map((item) => (
          <div key={item.name} className="course-card card-elegant rounded-2xl p-6 sm:p-8 min-w-0">
            <p className="text-foreground/90 leading-relaxed text-base break-words">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 min-w-0">
              <div className="size-10 shrink-0 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                {item.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-base break-words">{item.name}</div>
                <div className="text-sm course-muted break-words">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
