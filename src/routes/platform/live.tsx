import { createFileRoute } from "@tanstack/react-router";
import LiveStreamingPanel from "@/components/platform/LiveStreamingPanel";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";

export const Route = createFileRoute("/platform/live")({
  component: PlatformLivePage,
});

function PlatformLivePage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);

  return (
    <PlatformShell title={pt.live}>
      <LiveStreamingPanel />
    </PlatformShell>
  );
}
