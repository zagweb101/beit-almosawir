import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";
import { lightingMasteryCourseAr } from "./lighting-mastery/ar";
import { lightingMasteryCourseEn } from "./lighting-mastery/en";

export { lightingMasteryOgImage } from "./lighting-mastery/media";

const courses = {
  ar: lightingMasteryCourseAr,
  en: lightingMasteryCourseEn,
} as const;

export function getLightingMasteryCourse(lang: Lang): CourseLandingData {
  return courses[lang];
}
