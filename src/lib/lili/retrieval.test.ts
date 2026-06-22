import { describe, it, expect } from "vitest";
import { normalize, matchIntent, searchKnowledge, searchKnowledgeChunks } from "./retrieval";
import type { CourseKnowledge, KnowledgeChunk } from "@/types/lili";

function makeCourse(overrides: Partial<CourseKnowledge> = {}): CourseKnowledge {
  return {
    id: "c1",
    title: "أساسيات التصوير",
    slug: "photography-fundamentals",
    shortDescription: "تعلم أساسيات الكاميرا والتصوير",
    level: "مبتدئ",
    category: "أساسيات التصوير",
    objectives: ["فهم إعدادات الكاميرا"],
    topics: ["التعريض", "التركيز البؤري"],
    targetAudience: ["المبتدئون"],
    trainerName: "أحمد",
    priceLabel: "1500 ريال",
    scheduleLabel: "يبدأ 1 يوليو",
    durationDays: 5,
    durationHours: 20,
    location: "جدة",
    deliveryMode: "حضوري",
    certificateAvailable: true,
    requirements: ["لا توجد متطلبات"],
    registrationUrl: "/courses/photography-fundamentals",
    whatsappUrl: "https://wa.me/123",
    faq: [{ question: "هل هناك شهادة؟", answer: "نعم شهادة حضور" }],
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("normalize", () => {
  it("يحوّل لأسفل ويُنظف الرموز", () => {
    expect(normalize("Hello WORLD")).toBe("hello world");
    expect(normalize("price! 100")).toBe("price 100");
  });

  it("يوحد المسافات", () => {
    expect(normalize("a   b\tc")).toBe("a b c");
  });

  it("يرجع نص فارغ للمدخلات الفارغة", () => {
    expect(normalize("")).toBe("");
    expect(normalize("!!!")).toBe("");
  });
});

describe("matchIntent", () => {
  it("يكتشف التحية", () => {
    expect(matchIntent("مرحبا").greeting).toBe(true);
    expect(matchIntent("السلام عليكم").greeting).toBe(true);
    expect(matchIntent("hello").greeting).toBe(true);
  });

  it("يكتشف سؤال السعر", () => {
    expect(matchIntent("كم سعر الدورة").price).toBe(true);
    expect(matchIntent("what is the cost").price).toBe(true);
  });

  it("يكتشف سؤال الموعد", () => {
    expect(matchIntent("متى يبدأ التدريب").schedule).toBe(true);
  });

  it("يكتشف سؤال المدة", () => {
    expect(matchIntent("كم مدة الدورة").duration).toBe(true);
  });

  it("يكتشف سؤال المدرب", () => {
    expect(matchIntent("من هو المدرب").instructor).toBe(true);
  });

  it("يكتشف طلب التوصية", () => {
    expect(matchIntent("ساعديني أختار دورة").recommend).toBe(true);
  });

  it("يصنف المواضيع خارج النطاق", () => {
    expect(matchIntent("كيف الطقس اليوم").offTopic).toBe(true);
    expect(matchIntent("football match results").offTopic).toBe(true);
  });

  it("لا يصنف الأسئلة العادية كموضيع خارج النطاق", () => {
    expect(matchIntent("كم سعر الدورة").offTopic).toBe(false);
  });
});

describe("searchKnowledge", () => {
  const courses = [
    makeCourse(),
    makeCourse({
      id: "c2",
      title: "احتراف الإضاءة",
      slug: "lighting-mastery",
      category: "الإضاءة",
      shortDescription: "إضاءة استوديو احترافية",
    }),
  ];

  it("يرجع نتائج مطابقة لكلمة البحث", () => {
    const hits = searchKnowledge("إضاءة", courses);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].slug).toBe("lighting-mastery");
  });

  it("يعزز النتائج حسب التطابق مع slug", () => {
    const hits = searchKnowledge("أساسيات", courses);
    expect(hits[0].slug).toBe("photography-fundamentals");
  });

  it("يرجع كل الدورات لمدخلات فارغة", () => {
    const hits = searchKnowledge("", courses);
    expect(hits.length).toBe(2);
  });

  it("يرجع قائمة فارغة لمدخلات غير مطابقة", () => {
    const hits = searchKnowledge("xyznonexistent", courses);
    expect(hits.length).toBe(0);
  });
});

describe("searchKnowledgeChunks", () => {
  const chunks: KnowledgeChunk[] = [
    {
      id: "chunk1",
      sourceType: "course",
      title: "أساسيات التصوير",
      content: "تعلم التعريض والتركيز البؤري",
      priority: 9,
    },
    {
      id: "chunk2",
      sourceType: "faq",
      title: "سؤال عن الشهادة",
      content: "نعم يحصل المتدرب على شهادة حضور",
      priority: 7,
    },
  ];

  it("يرجع أفضل مقطع مطابق", () => {
    const hit = searchKnowledgeChunks("التعريض", chunks);
    expect(hit).not.toBeNull();
    expect(hit?.id).toBe("chunk1");
  });

  it("يرجع null لعدم وجود تطابق كافٍ", () => {
    const hit = searchKnowledgeChunks("zzz", chunks);
    expect(hit).toBeNull();
  });

  it("يرجع null لقائمة فارغة", () => {
    expect(searchKnowledgeChunks("anything", [])).toBeNull();
  });
});
