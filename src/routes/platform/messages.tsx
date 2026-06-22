import { createFileRoute } from "@tanstack/react-router";
import MessagesPanel from "@/components/platform/MessagesPanel";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";

export const Route = createFileRoute("/platform/messages")({
  component: PlatformMessagesPage,
});

function PlatformMessagesPage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);

  return (
    <PlatformShell title={pt.messages}>
      <MessagesPanel />
    </PlatformShell>
  );
}
