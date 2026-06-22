import { getCourseCatalog } from "@/data/courses/catalog";
import { applyAdminStoreToCatalog } from "./merge";
import { readAdminStore } from "./store.server";

export async function mergedCatalog(lang: "ar" | "en" = "ar") {
  const store = await readAdminStore();
  return applyAdminStoreToCatalog(getCourseCatalog(lang), store, lang);
}
