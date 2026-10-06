import { useEffect, type ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";

import appCss from "../styles.css?url";
// ported from main.tsx
import "@/i18n";
import { applyClientLanguage } from "@/i18n";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteHeader from "@/components/SiteHeader";
import CookieBanner from "@/components/CookieBanner";
import ShopCartDrawer from "@/components/ShopCartDrawer";
import NotFound from "@/pages/NotFound";
import { usePageTracking } from "@/hooks/usePageTracking";
import { initAnalytics, initCtaTracking } from "@/lib/analytics";
import { useLocation } from "@/lib/router-compat";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const GA_CONSENT_DEFAULT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);`;

const GA_CONFIG = `gtag('js', new Date());
gtag('config', 'G-Y2627FR6GY', { anonymize_ip: true });`;

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AviSafe",
  url: "https://avisafe.no",
  logo: "https://avisafe.no/logo.png",
  description: "Norsk B2B SaaS-plattform for droneoperatører: flåtestyring, sikkerhetsstyring (SMS), hendelsesrapportering, SORA-risikovurdering og live luftromsbilde.",
  foundingDate: "2025",
  email: "kontakt@avisafe.no",
  sameAs: [
    "https://www.linkedin.com/company/avisafe-as/",
    "https://www.facebook.com/profile.php?id=61583893445784",
  ],
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AviSafe",
  url: "https://avisafe.no",
  inLanguage: "nb-NO",
  description: "Komplett operasjonssystem for droneoperatører i Norge.",
};

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">This page didn't load</h1>
        <p className="mb-6 text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "author", content: "AviSafe" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AviSafe" },
      { property: "og:locale", content: "nb_NO" },
      { name: "google-site-verification", content: "AFU5Se7MOVV3UB4QjmdaQOuYOjap8yMn9-PjdwiJQQE" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png?v=5" },
      { rel: "shortcut icon", href: "/favicon.png?v=5" },
      { rel: "apple-touch-icon", href: "/favicon.png?v=5" },
    ],
    scripts: [
      { children: GA_CONSENT_DEFAULT },
      { src: "https://www.googletagmanager.com/gtag/js?id=G-Y2627FR6GY", async: true },
      { children: GA_CONFIG },
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_LD) },
      { type: "application/ld+json", children: JSON.stringify(WEBSITE_LD) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppChrome() {
  const location = useLocation();
  const hideHeader =
    location.pathname.startsWith("/artikler") || location.pathname.startsWith("/statistikk");
  usePageTracking();
  return (
    <>
      {!hideHeader && <SiteHeader />}
      <Outlet />
      <CookieBanner />
      <ShopCartDrawer />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initAnalytics();
    initCtaTracking();
    void applyClientLanguage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppChrome />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
