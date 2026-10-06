import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import no from "./locales/no";
import en from "./locales/en";


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

/** Language is always derived from the URL: /en and /en/* are English, everything else Norwegian. */
export function languageForPath(pathname: string): SupportedLanguage {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "no";
}

/** Syncs i18n to the current URL after hydration. Never uses IP lookup or stored choices. */
export async function syncLanguageToPath(pathname: string) {
  if (typeof window === "undefined") return;
  const target = languageForPath(pathname);
  if (i18n.language === target) return;
  await afterHydrationSettles();
  await i18n.changeLanguage(target);
}

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

export default i18n;
