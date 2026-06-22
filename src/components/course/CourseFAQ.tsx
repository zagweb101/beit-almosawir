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

export default function CourseFAQ({ course }: Props) {
  const { faq } = course;

  return (
    <section id="faq" className="course-section scroll-mt-24">
      <h2 className="course-h2 font-bold break-words">{faq.title}</h2>
      <div className="divider-brand my-8 md:my-10" />

      <Accordion type="single" collapsible className="w-full max-w-3xl min-w-0 space-y-1">
        {faq.items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className="min-w-0">
            <AccordionTrigger className="text-start hover:no-underline text-base min-h-[3.25rem] py-3.5 gap-3 [&>svg]:shrink-0">
              <span className="break-words pe-2">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="course-muted course-answer pb-4 break-words">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
