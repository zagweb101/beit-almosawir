import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CoursePractical({ course }: Props) {
  const { practical } = course;

  return (
    <section className="course-section">
      <div className="course-card card-elegant rounded-2xl p-6 sm:p-8 md:p-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative min-w-0">
          <h2 className="course-h2 font-bold break-words">{practical.title}</h2>
          <p className="mt-4 md:mt-5 course-muted max-w-3xl text-base md:text-lg leading-relaxed break-words">
            {practical.description}
          </p>
          <div className="divider-brand my-8 md:my-10" />
          <ol className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 min-w-0">
            {practical.steps.map((step, index) => (
              <li
                key={step.text}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3 min-w-0"
              >
                <span className="size-8 shrink-0 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-base font-medium break-words">{step.text}</span>
              </li>
            ))}
          </ol>
          {practical.applications?.length ? (
            <>
              <div className="divider-brand my-8 md:my-10" />
              <h3 className="text-lg md:text-xl font-bold break-words">
                {practical.applicationsTitle ?? course.ui.applicationsTitle}
              </h3>
              <ul className="mt-4 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3 min-w-0">
                {practical.applications.map((item) => (
                  <li
                    key={item.text}
                    className="rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-base break-words"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
