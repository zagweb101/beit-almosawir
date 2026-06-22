import { describe, it, expect } from "vitest";
import { buildCourseBriefing } from "./briefing";
import type { CourseKnowledge } from "@/types/lili";

function makeCourse(overrides: Partial<CourseKnowledge> = {}): CourseKnowledge {
  return {
    id: "c1",
    title: "أساسيات التصوير",
    slug: "photography-fundamentals",
    shortDescription: "دورة تمهيدية",
    level: "مبتدئ",
    category: "تصوير",
    objectives: [],
    topics: ["الكاميرا", "التكوين", "الإضاءة", "المعالجة", "العدسات", "الحركة", "إضافي"],
    targetAudience: [],
    trainerName: "أحمد",
    priceLabel: "1500 ريال",
    scheduleLabel: "يبدأ يوليو",
    durationDays: 5,
    durationHours: 20,
    location: "جدة",
    deliveryMode: "حضوري",
    registrationUrl: "/courses/photography-fundamentals",
    whatsappUrl: "https://wa.me/000",
    faq: [],
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("buildCourseBriefing", () => {
  it("يتضمن السعر والموعد والمكان والمدة والمدرب", () => {
    const out = buildCourseBriefing(makeCourse());
    expect(out).toContain("1500 ريال");
    expect(out).toContain("يبدأ يوليو");
    expect(out).toContain("حضوري");
    expect(out).toContain("جدة");
    expect(out).toContain("5 أيام");
    expect(out).toContain("20 ساعة");
    expect(out).toContain("أحمد");
  });

  it("يحيّي الزائر باسمه إن وُجد", () => {
    const out = buildCourseBriefing(makeCourse(), "سارة");
    expect(out).toContain("سارة");
  });

  it("يعرض حتى 6 محاور ثم يشير للمزيد", () => {
    const out = buildCourseBriefing(makeCourse());
    expect(out).toContain("الكاميرا");
    expect(out).toContain("والمزيد");
    expect(out).not.toContain("إضافي");
  });

  it("يضيف التنويه عند تمريره", () => {
    const out = buildCourseBriefing(makeCourse(), undefined, "تنويه مهم");
    expect(out).toContain("تنويه مهم");
  });

  it("يتعامل مع غياب المدة والمدرب", () => {
    const out = buildCourseBriefing(
      makeCourse({ durationDays: undefined, durationHours: undefined, trainerName: undefined }),
    );
    expect(out).toContain("1500 ريال");
    expect(out).not.toContain("المدرب:");
  });
});
