import { useState } from "react";
import { Copy, Link2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";
import { SITE } from "@/lib/site-config";
import { formatMoney } from "@/lib/money";

export default function AffiliatePanel() {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { affiliateProfile, registerAffiliate, affiliateRef } = usePlatform();
  const [name, setName] = useState(affiliateProfile.name);
  const [copied, setCopied] = useState(false);

  const link = `${SITE.siteUrl}/courses?ref=${affiliateProfile.code}`;
  const locale = lang === "ar" ? "ar-SA" : "en-US";

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 min-w-0">
      <div className="card-elegant rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold">{pt.registerCode}</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={pt.partnerName}
          className="w-full rounded-md border border-border px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => void registerAffiliate(name)}
          className="btn-hero px-4 py-2 rounded-md text-sm font-semibold"
        >
          {pt.save}
        </button>
        <div className="rounded-lg border border-border/50 bg-background/40 p-4 space-y-2 text-sm">
          <div>
            <span className="course-muted">{pt.yourCode}: </span>
            <strong>{affiliateProfile.code}</strong>
          </div>
          <div className="break-all">
            <span className="course-muted">{pt.yourLink}: </span>
            {link}
          </div>
          {affiliateRef ? (
            <div className="text-xs course-muted">
              {lang === "ar" ? "زيارة عبر إحالة: " : "Visit via referral: "}
              {affiliateRef}
            </div>
          ) : null}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 text-sm text-primary mt-2"
          >
            <Copy className="size-4" />
            {copied ? pt.copied : pt.copyLink}
          </button>
        </div>
      </div>

      <div className="card-elegant rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link2 className="size-5 text-primary" />
          <h2 className="text-lg font-bold">{pt.affiliateTitle}</h2>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="course-muted">{pt.clicks}</dt>
            <dd className="text-2xl font-bold mt-1">{affiliateProfile.clicks}</dd>
          </div>
          <div>
            <dt className="course-muted">{pt.conversions}</dt>
            <dd className="text-2xl font-bold mt-1">{affiliateProfile.conversions}</dd>
          </div>
          <div>
            <dt className="course-muted">{pt.commission}</dt>
            <dd className="text-2xl font-bold mt-1">
              {Math.round(affiliateProfile.commissionRate * 100)}%
            </dd>
          </div>
          <div>
            <dt className="course-muted">{pt.earnings}</dt>
            <dd className="text-2xl font-bold mt-1">
              {formatMoney(affiliateProfile.earningsSar, "SAR", locale)}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-muted-foreground break-words">{pt.affiliateLead}</p>
      </div>
    </div>
  );
}
