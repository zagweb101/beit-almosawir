import { createFileRoute } from "@tanstack/react-router";
import AffiliatePanel from "@/components/platform/AffiliatePanel";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";

export const Route = createFileRoute("/platform/affiliate")({
  component: PlatformAffiliatePage,
});

function PlatformAffiliatePage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);

  return (
    <PlatformShell title={pt.affiliate} lead={pt.affiliateLead}>
      <AffiliatePanel />
    </PlatformShell>
  );
}
