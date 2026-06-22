import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCourseCatalog } from "@/lib/admin/context";
import { useT } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";
import { LiliProvider } from "@/lib/lili/context";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LiliWidget = lazy(() => import("@/components/ask-lili/lili-widget"));

function Header() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const catalog = useCourseCatalog();
  const isCoursesActive = pathname.startsWith("/courses");
  const isPlatformActive = pathname.startsWith("/platform");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const nav = [
    { href: "/#top", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#services", label: t.nav.services },
    { href: "/#achievements", label: t.nav.achievements },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 gap-2 sm:gap-3 min-w-0">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <img src={logo} alt={t.brand.name} className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" />
          <div className="leading-tight min-w-0 hidden min-[360px]:block">
            <div className="font-bold text-base sm:text-lg text-gradient truncate">
              {t.brand.name}
            </div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground tracking-wider truncate">
              {t.brand.sub}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-11",
                isCoursesActive
                  ? "text-foreground bg-secondary/40"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={t.nav.courses}
            >
              {t.nav.courses}
              <ChevronDown className="size-4 shrink-0 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[14rem]">
              <DropdownMenuItem asChild>
                <Link to="/courses" className="cursor-pointer font-semibold">
                  {t.nav.viewAllCourses}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {catalog.map((entry) => (
                <DropdownMenuItem key={entry.path} asChild>
                  <Link to={entry.path} className="cursor-pointer">
                    {entry.course.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/platform"
            className={cn(
              "px-4 py-2 rounded-md text-sm transition-colors min-h-11 inline-flex items-center",
              isPlatformActive
                ? "text-foreground bg-secondary/40"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.nav.platform}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center size-11 min-h-11 min-w-11 rounded-md border border-border/50 bg-secondary/40 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="فتح القائمة"
                aria-expanded={open}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,320px)] max-w-full">
              <SheetTitle className="text-start mb-6 text-base">{t.brand.name}</SheetTitle>
              <nav className="flex flex-col gap-1">
                {nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 min-h-11 flex items-center rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors break-words"
                  >
                    {n.label}
                  </a>
                ))}

                <div className="mt-2 pt-2 border-t border-border/40">
                  <Link
                    to="/courses"
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 min-h-11 flex items-center rounded-md text-base font-semibold text-foreground hover:bg-secondary/40 transition-colors break-words"
                  >
                    {t.nav.viewAllCourses}
                  </Link>
                  {catalog.map((entry) => (
                    <Link
                      key={entry.path}
                      to={entry.path}
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 min-h-11 flex items-center rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors break-words ps-6"
                    >
                      {entry.course.name}
                    </Link>
                  ))}
                  <Link
                    to="/platform"
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 min-h-11 flex items-center rounded-md text-base font-semibold text-foreground hover:bg-secondary/40 transition-colors break-words mt-2"
                  >
                    {t.nav.platform}
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useT();

  return (
    <footer
      className={cn(
        "border-t border-border/40 bg-card/40 mt-24",
        "pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-12",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt={t.brand.name} className="h-10 w-10" />
          <div className="font-bold text-xl text-gradient">{t.brand.name}</div>
        </div>
        <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl break-words px-2">
          {t.footer.tagline}
        </p>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t.brand.name} — {t.footer.rights}
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  return (
    <LiliProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="top" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <LiliWidget />
        </Suspense>
      </div>
    </LiliProvider>
  );
}
