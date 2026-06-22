import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseGallery({ course }: Props) {
  const { gallery } = course;

  return (
    <section className="course-section">
      <div className="course-kicker text-primary tracking-widest mb-3">{gallery.kicker}</div>
      <h2 className="course-h2 font-bold break-words">{gallery.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 min-w-0">
        {gallery.images.map((image, index) => (
          <div
            key={`${image.alt}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl min-w-0"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={1024}
              height={768}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
