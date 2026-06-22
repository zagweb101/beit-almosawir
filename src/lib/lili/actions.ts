import type { CourseKnowledge, LiliAction } from "@/types/lili";
import { LILI_SITE_KNOWLEDGE } from "./knowledge";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function courseActions(course: CourseKnowledge): LiliAction[] {
  return [
    { type: "OPEN_COURSE", label: "عرض تفاصيل الدورة", url: course.registrationUrl },
    { type: "OPEN_WHATSAPP", label: "احجز عبر واتساب", url: course.whatsappUrl },
  ];
}

export function handoffAction(message?: string): LiliAction {
  const text =
    message ??
    "السلام عليكم، أرغب في التحدث مع فريق بيت المصور للمساعدة في اختيار الدورة أو تأكيد التفاصيل.";
  return {
    type: "HUMAN_HANDOFF",
    label: "تواصل مع الفريق",
    url: buildWhatsAppUrl(text),
  };
}

export function mapAction(): LiliAction {
  return {
    type: "OPEN_MAP",
    label: "فتح الموقع على الخريطة",
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LILI_SITE_KNOWLEDGE.location)}`,
  };
}
