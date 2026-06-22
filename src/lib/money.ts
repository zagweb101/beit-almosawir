import type { CurrencyCode } from "@/types/platform";
import { USD_PER_SAR } from "./platform/config";

export function convertAmount(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount;
  if (from === "SAR" && to === "USD") return Math.round(amount * USD_PER_SAR * 100) / 100;
  if (from === "USD" && to === "SAR") return Math.round((amount / USD_PER_SAR) * 100) / 100;
  return amount;
}

export function formatMoney(amount: number, currency: CurrencyCode, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "SAR" ? 0 : 2,
  }).format(amount);
}

export function currencyLabel(currency: CurrencyCode, lang: "ar" | "en"): string {
  if (currency === "SAR") return lang === "ar" ? "ريال سعودي" : "Saudi Riyal";
  return lang === "ar" ? "دولار أمريكي" : "US Dollar";
}
