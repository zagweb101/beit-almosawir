import { Award, Calendar, Clock, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseLandingData } from "@/types/course";
import { useCourseWhatsAppUrl } from "@/hooks/use-course-whatsapp-url";
import PayPalCheckout from "@/components/course/PayPalCheckout";
import CouponField, { CurrencySelector } from "@/components/platform/CouponField";
import { useT } from "@/lib/i18n";
import { couponSummary } from "@/lib/platform/coupon";
import { usePlatform } from "@/lib/platform/context";

type Props = {
  course: CourseLandingData;
  className?: string;
  variant?: "full" | "compact";
};

export default function CourseBookingCard({ course, className, variant = "full" }: Props) {
  const { lang } = useT();
  const { appliedCoupon } = usePlatform();
  const whatsappUrl = useCourseWhatsAppUrl(course);
  const isCompact = variant === "compact";
  const hasCertificate = course.registrationBenefits?.items?.some((i) => i.text.includes("شهادة"));

  return (
    <div
      className={cn(
        "course-card card-elegant rounded-2xl p-5 sm:p-7 shadow-elegant w-full min-w-0",
        className,
      )}
    >
      <h3 className="text-lg sm:text-xl font-bold text-gradient break-words">{course.name}</h3>
      <div className="divider-brand my-4 sm:my-5" />

      {/* الحقائق التفصيلية تظهر في النسخة الكاملة فقط — الجوال يعتمد على شريط «الحقائق السريعة» */}
      {!isCompact ? (
        <ul className="space-y-3 text-base">
          <li className="flex items-start gap-2 min-w-0">
            <Calendar className="size-4 text-primary shrink-0 mt-1" />
            <span className="break-words">{course.ui.durationText}</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <Clock className="size-4 text-primary shrink-0 mt-1" />
            <span className="break-words">{course.ui.hoursText}</span>
          </li>
          <li className="flex items-start gap-2 min-w-0">
            <MapPin className="size-4 text-primary shrink-0 mt-1" />
            <span className="break-words">
              {course.trainingType} — {course.location}
            </span>
          </li>
          {course.instructorName ? (
            <li className="flex items-start gap-2 min-w-0">
              <span className="size-4 shrink-0 mt-1 text-primary font-bold text-xs">●</span>
              <span className="break-words">
                {course.ui.instructorText}: {course.instructorName}
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}

      <div className={cn("space-y-4", isCompact ? "" : "mt-5 sm:mt-6")}>
        <CurrencySelector />
        <CouponField />
        <div className="rounded-lg border border-border/50 bg-background/40 px-4 py-3 text-sm min-w-0">
          <div className="text-sm course-muted mb-1">{course.ui.priceFieldLabel}</div>
          <div className="text-base leading-relaxed break-words font-semibold">
            {course.priceLabel}
          </div>
          {appliedCoupon ? (
            <div className="mt-2 text-xs text-primary break-words">
              {couponSummary(appliedCoupon, lang)}
            </div>
          ) : null}
          {hasCertificate ? (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-medium">
              <Award className="size-3.5 text-primary" /> يشمل شهادة حضور معتمدة
            </div>
          ) : null}
        </div>
        {/* الموعد يظهر بالنسخة الكاملة فقط (موجود في «الحقائق السريعة» على الجوال) */}
        {!isCompact ? (
          <div className="rounded-lg border border-border/50 bg-background/40 px-4 py-3 text-sm min-w-0">
            <div className="text-sm course-muted mb-1">{course.ui.scheduleFieldLabel}</div>
            <div className="text-base break-words">{course.scheduleLabel}</div>
          </div>
        ) : null}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-hero mt-5 sm:mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 course-btn rounded-md font-semibold text-base transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MessageCircle className="size-4 shrink-0" />
        <span className="break-words text-center">{course.ui.ctas.booking}</span>
      </a>

      {/* الدفع متاح الآن في الجوال وسطح المكتب */}
      <PayPalCheckout courseSlug={course.slug} />

      {!isCompact && course.booking.limitedSeatsNote ? (
        <p className="mt-4 text-sm text-center course-muted break-words">
          {course.booking.limitedSeatsNote}
        </p>
      ) : null}
    </div>
  );
}
