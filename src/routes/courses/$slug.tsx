import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useDynamicCourse } from "@/hooks/use-course-data";
import { useCourseAdmin } from "@/lib/admin/context";
import { SITE } from "@/lib/site-config";
import { useT } from "@/lib/i18n";
import CourseHero from "@/components/course/CourseHero";
import CourseTrustBar from "@/components/course/CourseTrustBar";
import CourseQuickFacts from "@/components/course/CourseQuickFacts";
import CourseProblemTransform from "@/components/course/CourseProblemTransform";
import CourseWhyStart from "@/components/course/CourseWhyStart";
import CourseLearnOutcomes from "@/components/course/CourseLearnOutcomes";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CoursePractical from "@/components/course/CoursePractical";
import CourseIncomeOpportunities from "@/components/course/CourseIncomeOpportunities";
import CourseAudience from "@/components/course/CourseAudience";
import CourseTimeline from "@/components/course/CourseTimeline";
import CourseRegistrationBenefits from "@/components/course/CourseRegistrationBenefits";
import CourseGallery from "@/components/course/CourseGallery";
import CourseTestimonials from "@/components/course/CourseTestimonials";
import CourseFAQ from "@/components/course/CourseFAQ";
import CourseFinalCTA from "@/components/course/CourseFinalCTA";
import CourseBookingCard from "@/components/course/CourseBookingCard";
import CourseMobileBar from "@/components/course/CourseMobileBar";
import CourseStructuredData from "@/components/course/CourseStructuredData";

const BUILTIN = new Set([
  "photography-fundamentals",
  "lighting-mastery",
  "beauty-photography",
  "wedding-photography",
]);

export const Route = createFileRoute("/courses/$slug")({
  component: DynamicCoursePage,
});

function DynamicCoursePage() {
  const { slug } = Route.useParams();
  const { lang } = useT();
  const { store } = useCourseAdmin();
  const course = useDynamicCourse(slug);
  const isCustom = store.customCourses.some((c) => c.slug === slug);

  if (BUILTIN.has(slug) || !isCustom || !course) {
    throw notFound();
  }

  const ogImageUrl = `${SITE.siteUrl}${course.heroImage}`;
  const canonicalUrl = `${SITE.siteUrl}${course.seo.canonicalPath}`;

  useEffect(() => {
    document.title = course.seo.title;
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
            <CourseIncomeOpportunities course={course} />
            <CourseAudience course={course} />
            <CourseTimeline course={course} />
            <CourseRegistrationBenefits course={course} />
            <CourseGallery course={course} />
            <CourseTestimonials course={course} />
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
