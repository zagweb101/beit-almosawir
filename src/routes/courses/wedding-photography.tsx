import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  getWeddingPhotographyCourse,
  weddingPhotographyOgImage,
} from "@/data/courses/wedding-photography";
import { SITE } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import { useWeddingPhotographyCourse } from "@/hooks/use-course-data";
import CourseHero from "@/components/course/CourseHero";
import CourseTrustBar from "@/components/course/CourseTrustBar";
import CourseQuickFacts from "@/components/course/CourseQuickFacts";
import CourseProblemTransform from "@/components/course/CourseProblemTransform";
import CourseWhyStart from "@/components/course/CourseWhyStart";
import CourseLearnOutcomes from "@/components/course/CourseLearnOutcomes";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CoursePractical from "@/components/course/CoursePractical";
import CourseInvestment from "@/components/course/CourseInvestment";
import CourseValuePurchase from "@/components/course/CourseValuePurchase";
import CourseIncomeOpportunities from "@/components/course/CourseIncomeOpportunities";
import CourseROI from "@/components/course/CourseROI";
import CourseAudience from "@/components/course/CourseAudience";
import CourseTimeline from "@/components/course/CourseTimeline";
import CourseRegistrationBenefits from "@/components/course/CourseRegistrationBenefits";
import CourseTrainer from "@/components/course/CourseTrainer";
import CourseGallery from "@/components/course/CourseGallery";
import CourseTestimonials from "@/components/course/CourseTestimonials";
import CoursePriceObjection from "@/components/course/CoursePriceObjection";
import CourseFAQ from "@/components/course/CourseFAQ";
import CourseFinalCTA from "@/components/course/CourseFinalCTA";
import CourseBookingCard from "@/components/course/CourseBookingCard";
import CourseMobileBar from "@/components/course/CourseMobileBar";
import CourseStructuredData from "@/components/course/CourseStructuredData";

const defaultCourse = getWeddingPhotographyCourse("ar");
const ogImageUrl = `${SITE.siteUrl}${weddingPhotographyOgImage}`;
const canonicalUrl = `${SITE.siteUrl}${defaultCourse.seo.canonicalPath}`;

export const Route = createFileRoute("/courses/wedding-photography")({
  head: () => ({
    meta: [
      { title: defaultCourse.seo.title },
      { name: "description", content: defaultCourse.seo.description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: defaultCourse.seo.ogTitle },
      { property: "og:description", content: defaultCourse.seo.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: defaultCourse.seo.ogTitle },
      { name: "twitter:description", content: defaultCourse.seo.ogDescription },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  }),
  component: WeddingPhotographyPage,
});

function WeddingPhotographyPage() {
  const { lang } = useT();
  const course = useWeddingPhotographyCourse();

  useEffect(() => {
    document.title = course.seo.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    descriptionMeta?.setAttribute("content", course.seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute("content", course.seo.ogTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute("content", course.seo.ogDescription);
  }, [course]);

  return (
    <div className="course-page overflow-x-clip pb-[calc(88px+env(safe-area-inset-bottom,0px))] xl:pb-0">
      <CourseStructuredData course={course} ogImageUrl={ogImageUrl} lang={lang} />
      <CourseHero course={course} />
      <CourseTrustBar course={course} />
      <CourseQuickFacts course={course} />

      <div className="course-shell xl:hidden pb-2 min-w-0">
        <CourseBookingCard course={course} variant="compact" />
      </div>

      <div className="course-shell pb-6 xl:pb-12 min-w-0">
        <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_min(20rem,320px)] gap-8 xl:gap-10 items-start">
          <div className="min-w-0 overflow-x-clip">
            <CourseProblemTransform course={course} />
            <CourseWhyStart course={course} />
            <CourseLearnOutcomes course={course} />
            <CourseCurriculum course={course} />
            <CoursePractical course={course} />
            <CourseInvestment course={course} />
            <CourseValuePurchase course={course} />
            <CourseIncomeOpportunities course={course} />
            <CourseROI course={course} />
            <CourseAudience course={course} />
            <CourseTimeline course={course} />
            <CourseRegistrationBenefits course={course} />
            <CourseTrainer course={course} />
            <CourseGallery course={course} />
            <CourseTestimonials course={course} />
            <CoursePriceObjection course={course} />
            <CourseFAQ course={course} />
            <CourseFinalCTA course={course} />
          </div>

          <aside className="hidden xl:block min-w-0 self-start">
            <CourseBookingCard
              course={course}
              className="sticky top-24 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain"
            />
          </aside>
        </div>
      </div>

      <CourseMobileBar course={course} />
    </div>
  );
}
