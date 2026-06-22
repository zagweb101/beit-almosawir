import { useT } from "@/lib/i18n";
import { useCourseAdmin } from "@/lib/admin/context";
import { getPhotographyFundamentalsCourse } from "@/data/courses/photography-fundamentals";
import { getLightingMasteryCourse } from "@/data/courses/lighting-mastery";
import { getBeautyPhotographyCourse } from "@/data/courses/beauty-photography";
import { getWeddingPhotographyCourse } from "@/data/courses/wedding-photography";
import { useMemo } from "react";
import type { CourseLandingData } from "@/types/course";

function pickFromCatalog(
  catalog: ReturnType<typeof useCourseAdmin>["catalog"],
  slug: string,
  fallback: CourseLandingData,
) {
  return catalog.find((e) => e.course.slug === slug)?.course ?? fallback;
}

export function usePhotographyFundamentalsCourse() {
  const { lang } = useT();
  const { catalog } = useCourseAdmin();
  return useMemo(
    () =>
      pickFromCatalog(catalog, "photography-fundamentals", getPhotographyFundamentalsCourse(lang)),
    [catalog, lang],
  );
}

export function useLightingMasteryCourse() {
  const { lang } = useT();
  const { catalog } = useCourseAdmin();
  return useMemo(
    () => pickFromCatalog(catalog, "lighting-mastery", getLightingMasteryCourse(lang)),
    [catalog, lang],
  );
}

export function useBeautyPhotographyCourse() {
  const { lang } = useT();
  const { catalog } = useCourseAdmin();
  return useMemo(
    () => pickFromCatalog(catalog, "beauty-photography", getBeautyPhotographyCourse(lang)),
    [catalog, lang],
  );
}

export function useWeddingPhotographyCourse() {
  const { lang } = useT();
  const { catalog } = useCourseAdmin();
  return useMemo(
    () => pickFromCatalog(catalog, "wedding-photography", getWeddingPhotographyCourse(lang)),
    [catalog, lang],
  );
}

export function useDynamicCourse(slug: string, fallback?: CourseLandingData) {
  const { catalog } = useCourseAdmin();
  return useMemo(
    () => catalog.find((e) => e.course.slug === slug)?.course ?? fallback,
    [catalog, slug, fallback],
  );
}
