import type { ChatPageContext } from "@/types/lili";

const SLUG_FROM_PATH: Record<string, string> = {
  "/courses/photography-fundamentals": "photography-fundamentals",
  "/courses/lighting-mastery": "lighting-mastery",
  "/courses/beauty-photography": "beauty-photography",
  "/courses/wedding-photography": "wedding-photography",
};

export function resolvePageContext(pathname: string, search: string): ChatPageContext {
  const pageUrl = `${pathname}${search}`;

  if (pathname === "/") {
    return { pageType: "home", pageTitle: "الرئيسية", pageUrl };
  }
  if (pathname === "/courses" || pathname === "/courses/") {
    return { pageType: "courses", pageTitle: "الدورات", pageUrl };
  }
  if (pathname.startsWith("/courses/")) {
    const slug = SLUG_FROM_PATH[pathname];
    return {
      pageType: "course",
      pageTitle: slug ? "صفحة دورة" : "دورة",
      pageUrl,
      courseSlug: slug,
    };
  }
  if (pathname.startsWith("/platform")) {
    return { pageType: "platform", pageTitle: "لوحة المتدرب", pageUrl };
  }
  if (pathname.includes("contact") || pathname.includes("تواصل")) {
    return { pageType: "contact", pageTitle: "تواصل", pageUrl };
  }
  return { pageType: "other", pageTitle: "بيت المصور", pageUrl };
}

export function enrichPageContext(ctx: ChatPageContext, courseName?: string): ChatPageContext {
  if (ctx.pageType === "course" && courseName) {
    return { ...ctx, pageTitle: courseName, courseName };
  }
  return ctx;
}
