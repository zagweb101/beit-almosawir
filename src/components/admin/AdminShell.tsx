import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CreditCard,
  ExternalLink,
  LayoutGrid,
  LogOut,
  MessageCircle,
  Star,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAdminToken } from "@/lib/admin/session";

const NAV: { to: string; label: string; Icon: LucideIcon; exact?: boolean }[] = [
  { to: "/admin", label: "الرئيسية", Icon: LayoutGrid, exact: true },
  { to: "/admin/courses", label: "الدورات", Icon: BookOpen },
  { to: "/admin/pricing", label: "الأسعار", Icon: Tag },
  { to: "/admin/instructors", label: "المدربون", Icon: Users },
  { to: "/admin/testimonials", label: "التقييمات", Icon: Star },
  { to: "/admin/assistant", label: "المساعد", Icon: MessageCircle },
  { to: "/admin/orders", label: "الطلبات", Icon: CreditCard },
];

export default function AdminShell({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border/40 bg-card/40 admin-no-print sticky top-0 z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-primary tracking-widest">لوحة الإدارة — بيت المصور</div>
              <h1 className="text-lg font-bold leading-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="size-4" /> الموقع
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearAdminToken();
                  window.location.href = "/admin/login";
                }}
                className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="size-4" /> خروج
              </button>
            </div>
          </div>

          <nav className="mt-3 flex flex-wrap items-center gap-1.5">
            {NAV.map(({ to, label, Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm min-h-10 inline-flex items-center gap-1.5 border transition-colors",
                    active
                      ? "bg-primary/15 border-primary/40 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" /> {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {actions ? (
          <div className="flex flex-wrap items-center justify-end gap-2 mb-5 admin-no-print">
            {actions}
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
