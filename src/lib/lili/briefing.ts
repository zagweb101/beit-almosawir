import type { CourseKnowledge } from "@/types/lili";

/**
 * يبني رسالة تعريفية كاملة عن الدورة يقدّمها المساعد للزائر بعد تعبئة النموذج:
 * السعر، المكان/نوع التدريب، الموعد، المدة (أيام/ساعات)، المدرب، وأبرز المحاور.
 */
export function buildCourseBriefing(
  course: CourseKnowledge,
  visitorName?: string,
  disclaimer?: string,
): string {
  const greeting = visitorName?.trim()
    ? `أهلًا ${visitorName.trim()} 🌷`
    : "أهلًا وسهلًا 🌷";

  const lines: string[] = [
    `${greeting} هذي أبرز تفاصيل دورة «${course.title}»:`,
    "",
    `• 💰 السعر: ${course.priceLabel}`,
    `• 📅 الموعد: ${course.scheduleLabel}`,
  ];

  const duration = formatDuration(course);
  if (duration) lines.push(`• ⏱️ المدة: ${duration}`);

  const place = formatPlace(course);
  if (place) lines.push(`• 📍 المكان: ${place}`);

  if (course.level) lines.push(`• 🎯 المستوى: ${course.level}`);
  if (course.trainerName) lines.push(`• 👤 المدرب: ${course.trainerName}`);

  const topics = course.topics.filter(Boolean).slice(0, 6);
  if (topics.length) {
    lines.push("", "أبرز المحاور:");
    for (const topic of topics) lines.push(`• ${topic}`);
    if (course.topics.length > topics.length) lines.push("• …والمزيد");
  }

  lines.push("", "تحب أعرف لك أي شيء ثاني؟ المتطلبات، الشهادة، أو طريقة التسجيل؟");
  if (disclaimer) lines.push("", disclaimer);

  return lines.join("\n");
}

function formatDuration(course: CourseKnowledge): string {
  const days = course.durationDays ? `${course.durationDays} أيام` : "";
  const hours = course.durationHours ? `${course.durationHours} ساعة تدريبية` : "";
  if (days && hours) return `${days} (${hours})`;
  return days || hours;
}

function formatPlace(course: CourseKnowledge): string {
  const mode = course.deliveryMode;
  const location = course.location?.trim();
  if (mode && location) return `${mode} — ${location}`;
  return location || mode || "";
}
