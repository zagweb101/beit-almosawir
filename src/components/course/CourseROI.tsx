import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseROI({ course }: Props) {
  const roi = course.roi;
  if (!roi) return null;

  return (
    <section className="course-section">
      <div className="course-card card-elegant rounded-2xl p-5 sm:p-6 md:p-10 min-w-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">{roi.title}</h2>
        <p className="mt-4 text-base course-muted leading-relaxed break-words">{roi.text}</p>
        <p className="mt-4 text-base leading-relaxed break-words">{roi.example}</p>
        <p className="mt-4 text-sm course-muted leading-relaxed break-words">{roi.disclaimer}</p>
      </div>
    </section>
  );
}
