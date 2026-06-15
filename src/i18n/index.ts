import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import no from "./locales/no";
import en from "./locales/en";

const STORAGE_KEY = "avisafe-lang";
const COUNTRY_CACHE_KEY = "avisafe-country";

export const SUPPORTED_LANGUAGES = ["no", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      no: { translation: no },
      en: { translation: en },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: STORAGE_KEY,
      caches: ["localStorage"],
    },
  });

// Update <html lang> on language change
const updateHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng === "no" ? "nb" : "en";
  }
};
updateHtmlLang(i18n.language);
i18n.on("languageChanged", updateHtmlLang);

// If no explicit user choice, perform IP-based detection (Norway -> no, else en)
async function autoDetectByIp() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return; // user (or previous detection) already set it
    const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
    let country = cached;
    if (!country) {
      const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        country = (data?.country_code || data?.country || "").toString().toUpperCase();
        if (country) localStorage.setItem(COUNTRY_CACHE_KEY, country);
      }
    }
    const target: SupportedLanguage = country === "NO" ? "no" : "en";
    if (i18n.language !== target) {
      await i18n.changeLanguage(target);
    }
    // Persist so we don't re-detect on every load
    localStorage.setItem(STORAGE_KEY, target);
  } catch {
    // Fallback to English if detection fails
    if (!localStorage.getItem(STORAGE_KEY)) {
      await i18n.changeLanguage("en");
      localStorage.setItem(STORAGE_KEY, "en");
    }
  }
}

if (typeof window !== "undefined") {
  void autoDetectByIp();
}

export default i18n;
