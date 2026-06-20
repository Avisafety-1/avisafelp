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

type Geo = { country?: string; city?: string };

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
    };
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return {};
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
  const geo = await getGeo();
  await supabase.from("page_views").insert({
    path,
    referrer: document.referrer || null,
    country: geo.country || null,
    city: geo.city || null,
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
    duration_ms: durationMs ?? null,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const consent = getConsent();
  if (!consent?.analytics) return;
  if (window.gtag) window.gtag("event", name, params || {});
}
