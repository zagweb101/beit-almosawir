import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CourseLandingData } from "@/types/course";

type Props = {
  course: CourseLandingData;
};

export default function CourseCurriculum({ course }: Props) {
  const { curriculum } = course;

  return (
    <section id="curriculum" className="course-section scroll-mt-24">
      <div className="course-kicker text-primary tracking-widest mb-3">{curriculum.kicker}</div>
      <h2 className="course-h2 font-bold break-words">{curriculum.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <Accordion type="single" collapsible className="space-y-3 min-w-0">
        {curriculum.modules.map((module) => (
          <AccordionItem
            key={module.number}
            value={`module-${module.number}`}
            className="course-card card-elegant rounded-xl px-4 sm:px-6 border-b-0 min-w-0"
          >
            <AccordionTrigger className="text-start hover:no-underline py-4 sm:py-5 gap-3 min-h-12 [&>svg]:shrink-0">
              <span className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <span className="size-9 shrink-0 rounded-lg bg-gradient-brand grid place-items-center text-sm font-bold text-white">
                  {module.number}
                </span>
                <span className="font-bold text-base md:text-lg break-words text-start">
                  {module.title}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="course-muted text-base leading-relaxed pb-5 ps-0 sm:ps-12 break-words">
              {module.description}
              {module.topics?.length ? (
                <ul className="mt-4 space-y-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
