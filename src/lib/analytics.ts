import { supabase } from "@/integrations/supabase/client";

const CONSENT_KEY = "avisafe-cookie-consent";
const SESSION_KEY = "avisafe-session-id";
const GEO_KEY = "avisafe-geo";

export type Consent = {
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || "";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function setConsent(c: Omit<Consent, "decidedAt">) {
  const full: Consent = { ...c, decidedAt: new Date().toISOString() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  applyConsent(full);
  window.dispatchEvent(new CustomEvent("avisafe-consent-change", { detail: full }));
}

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

type Geo = { country?: string; city?: string; country_code?: string };

async function getGeo(): Promise<Geo> {
  try {
    const cached = sessionStorage.getItem(GEO_KEY);
    if (cached) return JSON.parse(cached) as Geo;
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return {};
    const data = await res.json();
    const geo: Geo = {
      country: data?.country_name || data?.country,
      city: data?.city,
      country_code: data?.country_code || data?.country,
    };
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return {};
  }
}

function detectDevice(ua: string): string {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod|Opera Mini|IEMobile/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\/|Opera/i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  return "Annet";
}

function detectOS(ua: string): string {
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua) && !/Mobile/i.test(ua)) return "macOS";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Linux/i.test(ua)) return "Linux";
  return "Annet";
}

function getUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
    };
  } catch {
    return { utm_source: null, utm_medium: null, utm_campaign: null };
  }
}

export function applyConsent(consent: Consent | null) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: consent?.analytics ? "granted" : "denied",
    ad_storage: consent?.marketing ? "granted" : "denied",
    ad_user_data: consent?.marketing ? "granted" : "denied",
    ad_personalization: consent?.marketing ? "granted" : "denied",
  });
}

export function initAnalytics() {
  const c = getConsent();
  if (c) applyConsent(c);
}

export async function trackPageView(path: string, durationMs?: number) {
  const consent = getConsent();
  if (!consent?.analytics) return;

  // GA4
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.origin + path,
    });
  }

  // Own DB
  const ua = navigator.userAgent;
  const geo = await getGeo();
  const utm = getUtm();
  await supabase.from("page_views").insert({
    path,
    referrer: document.referrer || null,
    country: geo.country || null,
    city: geo.city || null,
    country_code: geo.country_code || null,
    user_agent: ua,
    session_id: getSessionId(),
    duration_ms: durationMs ?? null,
    device_type: detectDevice(ua),
    browser: detectBrowser(ua),
    os: detectOS(ua),
    screen_size: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const consent = getConsent();
  if (!consent?.analytics) return;
  if (window.gtag) window.gtag("event", name, params || {});
  void supabase.from("events").insert({
    name,
    session_id: getSessionId(),
    path: typeof window !== "undefined" ? window.location.pathname : null,
    scroll_depth: typeof params?.scroll_depth === "number" ? (params.scroll_depth as number) : null,
    duration_ms: typeof params?.duration_ms === "number" ? (params.duration_ms as number) : null,
    meta: (params ?? null) as never,
  });
}

let pageTracking: { path: string; startedAt: number; maxScroll: number; cleanup: () => void } | null = null;

function computeScrollPct(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const viewport = window.innerHeight || doc.clientHeight;
  const full = Math.max(doc.scrollHeight, doc.offsetHeight) - viewport;
  if (full <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((scrollTop / full) * 100)));
}

export function endPageTracking() {
  if (!pageTracking) return;
  const { path, startedAt, maxScroll, cleanup } = pageTracking;
  pageTracking = null;
  cleanup();
  const duration_ms = Date.now() - startedAt;
  const consent = getConsent();
  if (!consent?.analytics) return;
  void supabase.from("events").insert({
    name: "page_engagement",
    session_id: getSessionId(),
    path,
    scroll_depth: maxScroll,
    duration_ms,
    meta: null,
  });
}

export function startPageTracking(path: string) {
  endPageTracking();
  const state = { path, startedAt: Date.now(), maxScroll: computeScrollPct(), cleanup: () => {} };
  const onScroll = () => {
    const pct = computeScrollPct();
    if (pct > state.maxScroll) state.maxScroll = pct;
  };
  const onVisibility = () => {
    if (document.visibilityState === "hidden") endPageTracking();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("beforeunload", endPageTracking);
  state.cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("beforeunload", endPageTracking);
  };
  pageTracking = state;
}

export function initCtaTracking() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __ctaInit?: boolean };
  if (w.__ctaInit) return;
  w.__ctaInit = true;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-cta]") as HTMLElement | null;
      if (!el) return;
      const label = el.getAttribute("data-cta") || el.textContent?.trim().slice(0, 80) || "cta";
      trackEvent("cta_click", {
        label,
        path: window.location.pathname,
        href: (el as HTMLAnchorElement).href || null,
      });
    },
    { capture: true },
  );
}

