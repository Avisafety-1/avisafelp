import { LANGUAGES, LANGUAGE_PAIRS, localeForPath, pathForLocale, hasLocalePath, type Locale } from "./locales";
export { LANGUAGE_PAIRS };
export type PageLang = "nb" | Exclude<Locale, "no">;
export const isEnglishPath = (path: string) => localeForPath(path) !== "no";
export function langForPath(path: string): PageLang { const lang = localeForPath(path); return lang === "no" ? "nb" : lang; }
export function counterpartOf(path: string): string | null { return pathForLocale(path, localeForPath(path) === "no" ? "en" : "no"); }
export function switchTargetFor(path: string): string { return counterpartOf(path) ?? "/en"; }
export function alternatesFor(path: string) {
  const entries = LANGUAGES.map((lang) => ({ hreflang: lang === "no" ? "nb" : lang, path: pathForLocale(path, lang) })).filter((a) => hasLocalePath(a.path));
  return [...entries, { hreflang: "x-default", path: entries.find((a) => a.hreflang === 'en')?.path ?? path }];
}