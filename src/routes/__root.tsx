import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import Analytics from "@/components/Analytics";
import SiteLayout from "@/components/SiteLayout";
import { LanguageProvider } from "@/lib/i18n";
import { PlatformProvider } from "@/lib/platform/context";
import { CourseAdminProvider } from "@/lib/admin/context";

function NotFoundComponent() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">الصفحة التي تبحث عنها لم تعد متاحة.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-hero inline-flex items-center px-5 py-2.5 rounded-md text-sm font-semibold"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("[app-error]", error);
  const router = useRouter();
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          نعتذر عن الإزعاج. يرجى إعادة المحاولة، وإن استمرت المشكلة تواصل مع فريق بيت المصور.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn-hero mt-6 inline-flex items-center px-5 py-2.5 rounded-md text-sm font-semibold"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "بيت المصور — أكاديمية احترافية للتصوير الفوتوغرافي والفيديو" },
      {
        name: "description",
        content:
          "أول أكاديمية متخصصة لتعليم التصوير في المملكة العربية السعودية. أكثر من 5,000 متدرب.",
      },
      {
        property: "og:title",
        content: "بيت المصور — أكاديمية احترافية للتصوير الفوتوغرافي والفيديو",
      },
      {
        property: "og:description",
        content:
          "أول أكاديمية متخصصة لتعليم التصوير في المملكة العربية السعودية. أكثر من 5,000 متدرب.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "بيت المصور — أكاديمية احترافية للتصوير الفوتوغرافي والفيديو",
      },
      {
        name: "twitter:description",
        content:
          "أول أكاديمية متخصصة لتعليم التصوير في المملكة العربية السعودية. أكثر من 5,000 متدرب.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd6d14f7-62c6-47bb-bbe1-1835f752fd97/id-preview-82851fb5--77b6948d-19eb-418d-9828-ac770f68dc7a.lovable.app-1778415777880.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd6d14f7-62c6-47bb-bbe1-1835f752fd97/id-preview-82851fb5--77b6948d-19eb-418d-9828-ac770f68dc7a.lovable.app-1778415777880.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CourseAdminProvider>
          <PlatformProvider>
            <SiteLayout />
          </PlatformProvider>
        </CourseAdminProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
