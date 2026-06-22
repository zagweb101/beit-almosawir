import { useState } from "react";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";
import { couponSummary } from "@/lib/platform/coupon";
import { currencyLabel } from "@/lib/money";
import { SUPPORTED_CURRENCIES } from "@/lib/platform/config";
import { cn } from "@/lib/utils";

export default function CouponField({ className }: { className?: string }) {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { appliedCoupon, applyCoupon, clearCoupon } = usePlatform();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm course-muted">{pt.couponLabel}</label>
      {appliedCoupon ? (
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm break-words">
          <div>{couponSummary(appliedCoupon, lang)}</div>
          <button
            type="button"
            onClick={() => {
              clearCoupon();
              setCode("");
            }}
            className="mt-2 text-primary text-xs underline"
          >
            {pt.removeCoupon}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder={pt.couponPlaceholder}
            className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => {
              const ok = applyCoupon(code);
              setError(!ok);
              if (ok) setError(false);
            }}
            className="shrink-0 px-3 py-2 rounded-md border border-border hover:bg-secondary/40 text-sm font-medium"
          >
            {pt.applyCoupon}
          </button>
        </div>
      )}
      {error ? <p className="text-xs text-destructive">{pt.couponInvalid}</p> : null}
    </div>
  );
}

export function CurrencySelector({ className }: { className?: string }) {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { currency, setCurrency } = usePlatform();

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm course-muted">{pt.currencyLabel}</label>
      <div className="flex gap-2">
        {SUPPORTED_CURRENCIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            className={cn(
              "flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors",
              currency === c
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {c} · {currencyLabel(c, lang)}
          </button>
        ))}
      </div>
      <p className="text-xs course-muted break-words">{pt.currencyNote}</p>
    </div>
  );
}
