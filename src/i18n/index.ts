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
  initAsync: false,
});


/** Language is always derived from the URL: /en and /en/* are English, everything else Norwegian. */
export function languageForPath(pathname: string): SupportedLanguage {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "no";
}

/** Separate English instance so server and client render the URL's language without mutating shared state. */
export const i18nEn = i18n.createInstance();
void i18nEn.use(initReactI18next).init({
  resources: {
    no: { translation: no },
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  interpolation: { escapeValue: false },
  initAsync: false,
});

export function i18nForPath(pathname: string) {
  return languageForPath(pathname) === "en" ? i18nEn : i18n;
}

export default i18n;
