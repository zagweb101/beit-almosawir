import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { usePlatformT } from "@/lib/i18n-platform";
import { usePlatform } from "@/lib/platform/context";

const tabs = [
  { to: "/platform", match: (p: string) => p === "/platform" || p === "/platform/" },
  { to: "/platform/live", match: (p: string) => p.startsWith("/platform/live") },
  { to: "/platform/community", match: (p: string) => p.startsWith("/platform/community") },
  { to: "/platform/messages", match: (p: string) => p.startsWith("/platform/messages") },
  { to: "/platform/affiliate", match: (p: string) => p.startsWith("/platform/affiliate") },
  { to: "/platform/lili", match: (p: string) => p.startsWith("/platform/lili") },
] as const;

export default function PlatformShell({
  children,
  title,
  lead,
}: {
  children: React.ReactNode;
  title: string;
  lead?: string;
}) {
  const { lang } = useT();
  const pt = usePlatformT(lang);
  const { user, logout } = usePlatform();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const labels = [pt.hubTitle, pt.live, pt.community, pt.messages, pt.affiliate, pt.liliTab];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="min-w-0">
          <div className="text-sm text-primary tracking-widest mb-2">{pt.nav}</div>
          <h1 className="text-3xl md:text-4xl font-bold break-words">{title}</h1>
          {lead ? <p className="mt-3 text-muted-foreground max-w-2xl break-words">{lead}</p> : null}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground truncate max-w-[12rem]">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary/40"
              >
                {pt.logout}
              </button>
            </>
          ) : (
            <Link
              to="/platform/login"
              className="btn-hero inline-flex px-4 py-2 rounded-md text-sm font-semibold"
            >
              {pt.login}
            </Link>
          )}
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab, i) => {
          const isActive = tab.match(pathname);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm border transition-colors min-h-11 inline-flex items-center",
                isActive
                  ? "bg-primary/15 border-primary/40 text-foreground"
                  : "border-border/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {labels[i]}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
