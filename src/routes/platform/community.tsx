import { createFileRoute } from "@tanstack/react-router";
import ForumPanel from "@/components/platform/ForumPanel";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";

export const Route = createFileRoute("/platform/community")({
  component: PlatformCommunityPage,
});

function PlatformCommunityPage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);

  return (
    <PlatformShell title={pt.community}>
      <ForumPanel />
    </PlatformShell>
  );
}
