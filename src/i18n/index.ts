import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import no from "./locales/no";
import en from "./locales/en";
import nl from "./locales/nl";
import de from "./locales/de";
import da from "./locales/da";
import sv from "./locales/sv";
import fi from "./locales/fi";
import pl from "./locales/pl";
import { LANGUAGES, localeForPath } from "@/lib/locales";
export const SUPPORTED_LANGUAGES = LANGUAGES;
export type { Locale as SupportedLanguage } from "@/lib/locales";
export const languageForPath = localeForPath;
const resources = { no: { translation: no }, en: { translation: en }, nl: { translation: nl }, de: { translation: de }, da: { translation: da }, sv: { translation: sv }, fi: { translation: fi }, pl: { translation: pl } };
const instances = Object.fromEntries(LANGUAGES.map((lng) => {
  const instance = i18n.createInstance();
  void instance.use(initReactI18next).init({ resources, lng, fallbackLng: "en", supportedLngs: [...LANGUAGES], interpolation: { escapeValue: false }, initAsync: false });
  return [lng, instance];
}));
export const i18nEn = instances['en'];
export function i18nForPath(pathname: string) { return instances[localeForPath(pathname)] ?? i18n; }
export default instances['no'];