import type { Lang } from "@/lib/i18n";
import type { CouponDefinition } from "@/types/platform";
import { COUPONS } from "./config";

export function findCoupon(code: string): CouponDefinition | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.active && c.code === normalized);
}

export function couponSummary(coupon: CouponDefinition, lang: Lang): string {
  if (coupon.type === "percent") {
    return lang === "ar"
      ? `خصم ${coupon.value}% — ${coupon.label.ar}`
      : `${coupon.value}% off — ${coupon.label.en}`;
  }
  const amount = coupon.currency === "USD" ? `$${coupon.value}` : `${coupon.value} SAR`;
  return lang === "ar"
    ? `خصم ${amount} — ${coupon.label.ar}`
    : `${amount} off — ${coupon.label.en}`;
}

export function appendBookingExtras(
  message: string,
  extras: { couponCode?: string; affiliateCode?: string; currency?: string },
): string {
  const parts = [message.trim()];
  if (extras.couponCode) {
    parts.push(`\nكود الخصم: ${extras.couponCode}`);
  }
  if (extras.affiliateCode) {
    parts.push(`\nكود الإحالة: ${extras.affiliateCode}`);
  }
  if (extras.currency) {
    parts.push(`\nالعملة المفضلة: ${extras.currency}`);
  }
  return parts.join("");
}
