import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";
import { photographyFundamentalsCourseAr } from "./photography-fundamentals/ar";
import { photographyFundamentalsCourseEn } from "./photography-fundamentals/en";

export { photographyFundamentalsOgImage } from "./photography-fundamentals/shared";

const courses = {
  ar: photographyFundamentalsCourseAr,
  en: photographyFundamentalsCourseEn,
} as const;

export function getPhotographyFundamentalsCourse(lang: Lang): CourseLandingData {
  return courses[lang];
}

/** @deprecated Use getPhotographyFundamentalsCourse(lang) */
export const photographyFundamentalsCourse = photographyFundamentalsCourseAr;
