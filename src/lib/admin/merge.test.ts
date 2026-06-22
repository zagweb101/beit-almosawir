import { describe, it, expect } from "vitest";
import { mergeCourseFields, applyAdminStoreToCatalog } from "./merge";
import type { CourseLandingData } from "@/types/course";
import type { AdminStore } from "./types";

function makeBaseCourse(overrides: Partial<CourseLandingData> = {}): CourseLandingData {
  return {
    slug: "photography-fundamentals",
    name: "أساسيات التصوير",
    heroSubtitle: "تعلم الأساسيات",
    priceLabel: "1500 ريال",
    scheduleLabel: "يبدأ يوليو",
    durationDays: 5,
    totalHours: 20,
    dailyHours: 4,
    level: "مبتدئ",
    location: "جدة",
    trainingType: "حضوري",
    instructorName: "أحمد",
    quickFacts: [
      { label: "المدة", value: "5 أيام" },
      { label: "الساعات", value: "20 ساعة" },
      { label: "المستوى", value: "مبتدئ" },
    ],
    ui: {
      durationText: "5 أيام",
      hoursText: "20 ساعة",
      instructorText: "أحمد",
    },
    ...overrides,
  } as unknown as CourseLandingData;
}

describe("mergeCourseFields", () => {
  it("يرجع نفس الدورة لحقول فارغة", () => {
    const course = makeBaseCourse();
    const result = mergeCourseFields(course, {});
    expect(result).toBe(course);
  });

  it("يستبدل السعر", () => {
    const course = makeBaseCourse();
    const result = mergeCourseFields(course, { priceLabel: "2000 ريال" });
    expect(result.priceLabel).toBe("2000 ريال");
  });

  it("يحدّث حقول quickFacts للمدة", () => {
    const course = makeBaseCourse();
    const result = mergeCourseFields(course, { durationDays: 10 });
    const durationFact = result.quickFacts.find((f) => f.label.includes("المدة"));
    expect(durationFact?.value).toContain("10");
  });

  it("يحدّث ui.durationText", () => {
    const course = makeBaseCourse();
    const result = mergeCourseFields(course, { durationDays: 7, totalHours: 28 });
    expect(result.ui.durationText).toContain("7");
    expect(result.ui.hoursText).toContain("28");
  });

  it("يحدّث اسم المدرب في trainer", () => {
    const course = makeBaseCourse({
      trainer: { name: "أحمد", specialty: "تصوير" },
    } as Partial<CourseLandingData>);
    const result = mergeCourseFields(course, { instructorName: "خالد" });
    expect(result.trainer?.name).toBe("خالد");
  });
});

describe("applyAdminStoreToCatalog", () => {
  it("يحذف الدورات الموجودة في deletedSlugs", () => {
    const catalog = [
      { path: "/courses/photography-fundamentals" as const, course: makeBaseCourse() },
    ];
    const store: AdminStore = {
      overrides: {},
      customCourses: [],
      deletedSlugs: ["photography-fundamentals"],
    };
    const result = applyAdminStoreToCatalog(catalog, store, "ar");
    expect(result.length).toBe(0);
  });

  it("يطبّق overrides على الدورات المدمجة", () => {
    const catalog = [
      { path: "/courses/photography-fundamentals" as const, course: makeBaseCourse() },
    ];
    const store: AdminStore = {
      overrides: {
        "photography-fundamentals": {
          priceLabel: "3000 ريال",
          updatedAt: new Date().toISOString(),
        },
      },
      customCourses: [],
      deletedSlugs: [],
    };
    const result = applyAdminStoreToCatalog(catalog, store, "ar");
    expect(result[0].course.priceLabel).toBe("3000 ريال");
  });
});
