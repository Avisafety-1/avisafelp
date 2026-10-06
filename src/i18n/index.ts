import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import no from "./locales/no";
import en from "./locales/en";

const STORAGE_KEY = "avisafe-lang";
const COUNTRY_CACHE_KEY = "avisafe-country";

export const SUPPORTED_LANGUAGES = ["no", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Server and first client render always use the same language so SSR HTML
// hydrates without mismatches; the visitor's stored/detected language is
// applied after mount via applyClientLanguage().
void i18n.use(initReactI18next).init({
  resources: {
    no: { translation: no },
    en: { translation: en },
  },
  lng: "no",
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  nonExplicitSupportedLngs: true,
  interpolation: { escapeValue: false },
});

// Update <html lang> on language change
const updateHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "no" ? "nb" : "en";
  }
};
i18n.on("languageChanged", updateHtmlLang);

function isSupported(value: string | null): value is SupportedLanguage {
  return value === "no" || value === "en";
}

// Applies the stored language choice, or (if none) IP-based detection:
// Norway -> no, else en. Runs only in the browser after hydration.
// React hydrates Suspense boundaries (e.g. lazily loaded route components)
// after the root commits, so wait until the browser is idle before changing
// the global language — otherwise those boundaries hydrate with a different
// language than the server rendered.
function afterHydrationSettles(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => resolve(), { timeout: 2000 });
      } else {
        setTimeout(resolve, 200);
      }
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

export async function applyClientLanguage() {
  if (typeof window === "undefined") return;
  await afterHydrationSettles();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) {
      if (i18n.language !== stored) await i18n.changeLanguage(stored);
      return;
    }
    let country = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (!country) {
      const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { country_code?: string; country?: string };
        country = (data?.country_code || data?.country || "").toString().toUpperCase();
        if (country) localStorage.setItem(COUNTRY_CACHE_KEY, country);
      }
    }
    const target: SupportedLanguage = country === "NO" ? "no" : "en";
    if (i18n.language !== target) await i18n.changeLanguage(target);
    localStorage.setItem(STORAGE_KEY, target);
  } catch {
    if (!localStorage.getItem(STORAGE_KEY)) {
      await i18n.changeLanguage("en");
      localStorage.setItem(STORAGE_KEY, "en");
    }
  }
}

export default i18n;
