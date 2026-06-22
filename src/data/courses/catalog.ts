import type { Lang } from "@/lib/i18n";
import type { CourseLandingData } from "@/types/course";
import { getPhotographyFundamentalsCourse } from "./photography-fundamentals";
import { getLightingMasteryCourse } from "./lighting-mastery";
import { getBeautyPhotographyCourse } from "./beauty-photography";
import { getWeddingPhotographyCourse } from "./wedding-photography";

export type CourseCatalogEntry = {
  path: `/courses/${string}`;
  course: CourseLandingData;
};

export function getCourseCatalog(lang: Lang): CourseCatalogEntry[] {
  return [
    {
      path: "/courses/photography-fundamentals",
      course: getPhotographyFundamentalsCourse(lang),
    },
    {
      path: "/courses/lighting-mastery",
      course: getLightingMasteryCourse(lang),
    },
    {
      path: "/courses/beauty-photography",
      course: getBeautyPhotographyCourse(lang),
    },
    {
      path: "/courses/wedding-photography",
      course: getWeddingPhotographyCourse(lang),
    },
  ];
}
