import { usePlatform } from "@/lib/platform/context";
import { appendBookingExtras } from "@/lib/platform/coupon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CourseLandingData } from "@/types/course";

export function useCourseWhatsAppUrl(course: CourseLandingData) {
  const { appliedCoupon, affiliateRef, currency } = usePlatform();
  const message = appendBookingExtras(course.whatsappBookingMessage, {
    couponCode: appliedCoupon?.code,
    affiliateCode: affiliateRef ?? undefined,
    currency,
  });
  return buildWhatsAppUrl(message);
}
