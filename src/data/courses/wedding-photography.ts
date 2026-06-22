import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";
import { weddingPhotographyCourseAr } from "./wedding-photography/ar";
import { weddingPhotographyCourseEn } from "./wedding-photography/en";

export { weddingPhotographyOgImage } from "./wedding-photography/media";

const courses = {
  ar: weddingPhotographyCourseAr,
  en: weddingPhotographyCourseEn,
} as const;

export function getWeddingPhotographyCourse(lang: Lang): CourseLandingData {
  return courses[lang];
}
