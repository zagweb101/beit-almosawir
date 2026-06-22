import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CourseCatalogEntry } from "@/data/courses/catalog";
import { getCourseCatalog } from "@/data/courses/catalog";
import { useT } from "@/lib/i18n";
import { applyAdminStoreToCatalog } from "./merge";
import type { AdminStore } from "./types";
import { EMPTY_ADMIN_STORE } from "./types";

type CourseAdminContextValue = {
  store: AdminStore;
  refresh: () => Promise<void>;
  catalog: CourseCatalogEntry[];
};

const CourseAdminContext = createContext<CourseAdminContextValue | null>(null);

export function CourseAdminProvider({ children }: { children: ReactNode }) {
  const { lang } = useT();
  const [store, setStore] = useState<AdminStore>(EMPTY_ADMIN_STORE);

  const refresh = useCallback(async () => {
    try {
      const { getPublicAdminStoreFn } = await import("./actions.server");
      const next = await getPublicAdminStoreFn();
      setStore(next);
    } catch {
      setStore(EMPTY_ADMIN_STORE);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onUpdate = () => void refresh();
    window.addEventListener("bm-admin-updated", onUpdate);
    return () => window.removeEventListener("bm-admin-updated", onUpdate);
  }, [refresh]);

  const catalog = useMemo(
    () => applyAdminStoreToCatalog(getCourseCatalog(lang), store, lang),
    [lang, store],
  );

  return (
    <CourseAdminContext.Provider value={{ store, refresh, catalog }}>
      {children}
    </CourseAdminContext.Provider>
  );
}

export function useCourseAdmin() {
  const ctx = useContext(CourseAdminContext);
  if (!ctx) throw new Error("useCourseAdmin must be used within CourseAdminProvider");
  return ctx;
}

export function useCourseCatalog() {
  return useCourseAdmin().catalog;
}

export function useMergedCourse(getBase: () => import("@/types/course").CourseLandingData) {
  const { store } = useCourseAdmin();
  const { lang } = useT();
  const base = getBase();
  return useMemo(() => {
    const entry = applyAdminStoreToCatalog(
      [{ path: `/courses/${base.slug}` as CourseCatalogEntry["path"], course: base }],
      store,
      lang,
    )[0];
    return entry?.course ?? base;
  }, [base, store, lang]);
}
