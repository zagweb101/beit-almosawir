import { describe, it, expect } from "vitest";
import { findCoupon, couponSummary, appendBookingExtras } from "./coupon";

describe("findCoupon", () => {
  it("يجد كوبون نشط صحيح", () => {
    const coupon = findCoupon("BAYT10");
    expect(coupon).toBeDefined();
    expect(coupon?.value).toBe(10);
  });

  it("يجد كوبون بصيغة مختلفة (case-insensitive)", () => {
    const coupon = findCoupon("bayt10");
    expect(coupon).toBeDefined();
  });

  it("يرجع undefined لكوبون غير موجود", () => {
    expect(findCoupon("NONEXISTENT")).toBeUndefined();
  });

  it("يتجاهل المسافات الزائدة", () => {
    const coupon = findCoupon("  BAYT10  ");
    expect(coupon).toBeDefined();
  });
});

describe("couponSummary", () => {
  it("ينسّق كوبون النسبة المئوية بالعربية", () => {
    const coupon = findCoupon("BAYT10")!;
    const summary = couponSummary(coupon, "ar");
    expect(summary).toContain("10%");
    expect(summary).toContain("خصم");
  });

  it("ينسّق كوبون النسبة المئوية بالإنجليزية", () => {
    const coupon = findCoupon("BAYT10")!;
    const summary = couponSummary(coupon, "en");
    expect(summary).toContain("10%");
  });

  it("ينسّق كوبون المبلغ الثابت", () => {
    const coupon = findCoupon("WEDDING500")!;
    const summary = couponSummary(coupon, "ar");
    expect(summary).toContain("500");
  });
});

describe("appendBookingExtras", () => {
  it("يضيف كود الخصم", () => {
    const result = appendBookingExtras("أرغب بالتسجيل", { couponCode: "BAYT10" });
    expect(result).toContain("BAYT10");
    expect(result).toContain("كود الخصم");
  });

  it("يضيف كود الإحالة", () => {
    const result = appendBookingExtras("أرغب بالتسجيل", { affiliateCode: "PARTNER" });
    expect(result).toContain("PARTNER");
    expect(result).toContain("الإحالة");
  });

  it("يضيف العملة المفضلة", () => {
    const result = appendBookingExtras("أرغب بالتسجيل", { currency: "USD" });
    expect(result).toContain("USD");
  });

  it("يرجع الرسالة الأصلية بدون إضافات", () => {
    const result = appendBookingExtras("أرغب بالتسجيل", {});
    expect(result).toBe("أرغب بالتسجيل");
  });
});
