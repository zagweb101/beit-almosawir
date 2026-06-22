import { describe, it, expect } from "vitest";
import { convertAmount, formatMoney, currencyLabel } from "./money";

describe("convertAmount", () => {
  it("يرجع نفس القيمة عند تطابق العملتين", () => {
    expect(convertAmount(100, "SAR", "SAR")).toBe(100);
    expect(convertAmount(50, "USD", "USD")).toBe(50);
  });

  it("يحوّل من ريال إلى دولار", () => {
    const result = convertAmount(1000, "SAR", "USD");
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1000);
  });

  it("يحوّل من دولار إلى ريال", () => {
    const result = convertAmount(100, "USD", "SAR");
    expect(result).toBeGreaterThan(100);
  });

  it("يقرب لمنزلتين عشريتين", () => {
    const result = convertAmount(333, "SAR", "USD");
    expect(String(result).split(".")[1]?.length ?? 0).toBeLessThanOrEqual(2);
  });
});

describe("formatMoney", () => {
  it("ينسّق الريال بدون كسور", () => {
    const result = formatMoney(1500, "SAR", "en-US");
    expect(result).toContain("1,500");
    expect(result).not.toContain(".");
  });

  it("ينسّق الدولار بكسور", () => {
    const result = formatMoney(99.5, "USD", "en-US");
    expect(result).toContain("99");
  });
});

describe("currencyLabel", () => {
  it("يرجع الاسم العربي", () => {
    expect(currencyLabel("SAR", "ar")).toBe("ريال سعودي");
    expect(currencyLabel("USD", "ar")).toBe("دولار أمريكي");
  });

  it("يرجع الاسم الإنجليزي", () => {
    expect(currencyLabel("SAR", "en")).toBe("Saudi Riyal");
    expect(currencyLabel("USD", "en")).toBe("US Dollar");
  });
});
