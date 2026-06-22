import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Radio, Share2, Users } from "lucide-react";
import PlatformShell from "@/components/platform/PlatformShell";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";

export const Route = createFileRoute("/platform/")({
  component: PlatformHubPage,
});

function PlatformHubPage() {
  const { lang } = useT();
  const pt = usePlatformT(lang);

  const cards = [
    { to: "/platform/live", icon: Radio, ...pt.cards.live },
    { to: "/platform/community", icon: Users, ...pt.cards.community },
    { to: "/platform/messages", icon: MessageSquare, ...pt.cards.messages },
    { to: "/platform/affiliate", icon: Share2, ...pt.cards.affiliate },
  ] as const;

  return (
    <PlatformShell title={pt.hubTitle} lead={pt.hubLead}>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="card-elegant rounded-2xl p-6 hover:translate-y-[-2px] transition-transform block"
          >
            <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center mb-4 glow">
              <Icon className="size-6 text-white" />
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>
    </PlatformShell>
  );
}
