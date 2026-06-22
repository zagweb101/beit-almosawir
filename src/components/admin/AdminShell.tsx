import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { clearAdminToken } from "@/lib/admin/session";

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
      <header className="border-b border-border/40 bg-card/40 admin-no-print">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-primary tracking-widest mb-1">لوحة الإدارة</div>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/courses"
              className={cn(
                "px-3 py-2 rounded-md text-sm border min-h-10 inline-flex items-center",
                pathname.startsWith("/admin/courses")
                  ? "bg-primary/15 border-primary/40"
                  : "border-border/60 text-muted-foreground",
              )}
            >
              الدورات
            </Link>
            <Link
              to="/admin/instructors"
              className={cn(
                "px-3 py-2 rounded-md text-sm border min-h-10 inline-flex items-center",
                pathname.startsWith("/admin/instructors")
                  ? "bg-primary/15 border-primary/40"
                  : "border-border/60 text-muted-foreground",
              )}
            >
              المدربون
            </Link>
            <Link
              to="/admin/assistant"
              className={cn(
                "px-3 py-2 rounded-md text-sm border min-h-10 inline-flex items-center",
                pathname.startsWith("/admin/assistant")
                  ? "bg-primary/15 border-primary/40"
                  : "border-border/60 text-muted-foreground",
              )}
            >
              المساعد الذكي
            </Link>
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10 inline-flex items-center"
            >
              الموقع
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                window.location.href = "/admin/login";
              }}
              className="px-3 py-2 rounded-md text-sm border border-border/60 min-h-10"
            >
              خروج
            </button>
            {actions}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
