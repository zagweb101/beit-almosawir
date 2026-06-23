import { SITE } from "@/lib/site-config";
import type { LeadRecord } from "@/types/lili";

/**
 * إشعار فريق الأكاديمية بطلب جديد. يعمل عند ضبط متغيرات البيئة فقط،
 * وغير معطّل لحفظ الطلب (يُستدعى بأسلوب fire-and-forget).
 *
 * الخيارات:
 * - LEAD_WEBHOOK_URL: يُرسَل JSON الطلب (مناسب لـ Zapier/Make/n8n → واتساب).
 * - RESEND_API_KEY + LEAD_NOTIFY_TO (+ LEAD_NOTIFY_FROM): إشعار بريد.
 */
export async function notifyNewLead(lead: LeadRecord): Promise<void> {
  await Promise.allSettled([sendWebhook(lead), sendEmail(lead)]);
}

async function sendWebhook(lead: LeadRecord): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "new_lead", lead }),
    });
  } catch (error) {
    console.error("[lead-notify] webhook failed:", error);
  }
}

async function sendEmail(lead: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!apiKey || !to) return;
  const from = process.env.LEAD_NOTIFY_FROM || "onboarding@resend.dev";

  const lines = [
    `طلب جديد عبر موقع ${SITE.brandName}:`,
    "",
    `الاسم: ${lead.name}`,
    `الجوال: ${lead.phone}`,
    lead.email ? `البريد: ${lead.email}` : "",
    lead.courseName ? `الدورة: ${lead.courseName}` : "",
    `التاريخ: ${new Date(lead.createdAt).toLocaleString("ar-SA")}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((t) => t.trim()),
        subject: `طلب جديد: ${lead.name}${lead.courseName ? ` — ${lead.courseName}` : ""}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      console.error("[lead-notify] email failed:", res.status, await res.text());
    }
  } catch (error) {
    console.error("[lead-notify] email error:", error);
  }
}
