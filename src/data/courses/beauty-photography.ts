import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";
import { beautyPhotographyCourseAr } from "./beauty-photography/ar";
import { beautyPhotographyCourseEn } from "./beauty-photography/en";

export { beautyPhotographyOgImage } from "./beauty-photography/media";

const courses = {
  ar: beautyPhotographyCourseAr,
  en: beautyPhotographyCourseEn,
} as const;

export function getBeautyPhotographyCourse(lang: Lang): CourseLandingData {
  return courses[lang];
}
