import type {
  AffiliateProfile,
  CouponDefinition,
  CurrencyCode,
  LiveSession,
} from "@/types/platform";

/** Fixed demo rate — replace with live API in production. */
export const USD_PER_SAR = 0.2667;

export const SUPPORTED_CURRENCIES: CurrencyCode[] = ["SAR", "USD"];

export const COUPONS: CouponDefinition[] = [
  {
    code: "BAYT10",
    label: { ar: "خصم 10% للمتدربين الجدد", en: "10% off for new trainees" },
    type: "percent",
    value: 10,
    active: true,
  },
  {
    code: "WEDDING500",
    label: { ar: "خصم 500 ريال على دورة الأعراس", en: "500 SAR off Wedding course" },
    type: "fixed",
    value: 500,
    currency: "SAR",
    active: true,
  },
];

export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: "live-lighting-qna",
    title: { ar: "جلسة مباشرة — أسئلة الإضاءة", en: "Live Q&A — Lighting" },
    courseSlug: "lighting-mastery",
    startsAt: "2026-06-20T18:00:00+03:00",
    provider: "zoom",
    zoomUrl: "https://zoom.us/j/00000000000",
    status: "scheduled",
  },
  {
    id: "live-wedding-lab",
    title: { ar: "ورشة مباشرة — محاكاة زفاف", en: "Live lab — Wedding simulation" },
    courseSlug: "wedding-photography",
    startsAt: "2026-06-22T16:00:00+03:00",
    provider: "webrtc",
    webrtcRoom: "baytalmosawer-wedding-lab",
    status: "scheduled",
  },
];

export const DEFAULT_AFFILIATE: Omit<AffiliateProfile, "clicks" | "conversions" | "earningsSar"> = {
  code: "PARTNER",
  name: "Bayt Al Mosawer Partner",
  commissionRate: 0.1,
};

export const ACADEMY_USER_ID = "academy";
export const ACADEMY_USER_NAME = { ar: "فريق بيت المصور", en: "Bayt Al Mosawer Team" };
