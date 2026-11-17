import { LOCALE_ROUTE_PATHS } from "./locale-route-paths";
export const LANGUAGES = ["no", "en", "nl", "de", "da", "sv", "fi"] as const;
export type Locale = (typeof LANGUAGES)[number];
export const LANGUAGE_NAMES: Record<Locale, string> = { no: "Norsk", en: "English", nl: "Nederlands", de: "Deutsch", da: "Dansk", sv: "Svenska", fi: "Suomi" };
export const LANGUAGE_FLAGS: Record<Locale, string> = { no: "🇳🇴", en: "🇬🇧", nl: "🇳🇱", de: "🇩🇪", da: "🇩🇰", sv: "🇸🇪", fi: "🇫🇮" };
export const LANGUAGE_PAIRS = [
  { nb: "/", en: "/en" }, { nb: "/om-oss", en: "/en/about" },
  { nb: "/partnere", en: "/en/partners" }, { nb: "/compliance", en: "/en/compliance" },
  { nb: "/aviops", en: "/en/aviops" }, { nb: "/sikkerhet", en: "/en/security" },
];
export function localeForPath(path: string): Locale {
  const segment = path.split("/")[1];
  return LANGUAGES.find((l) => l !== "no" && l === segment) ?? "no";
}
export function basePath(path: string): string {
  const lang = localeForPath(path);
  return lang === "no" ? path : path.slice(lang.length + 1) || "/";
}
export function pathForLocale(path: string, target: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/__") || path.startsWith("/api/")) return path;
  const source = localeForPath(path);
  const clean = source === "en" ? path : basePath(path);
  const pair = LANGUAGE_PAIRS.find((p) => p.nb === clean || p.en === clean || p.en.slice(3) === basePath(path));
  if (target === "no") return pair?.nb ?? (source === "en" ? basePath(path) : clean);
  const slug = pair ? pair.en.slice(3) || "/" : basePath(path);
  return `/${target}${slug === "/" ? "" : slug}`;
}
export function localeForCountry(country: string | null | undefined): Locale {
  const groups: Record<string, Locale> = { NO: "no", NL: "nl", BE: "nl", DE: "de", AT: "de", CH: "de", DK: "da", SE: "sv", FI: "fi" };
  return country ? groups[country.toUpperCase()] ?? "en" : "en";
}
export function hasLocalePath(path: string): boolean {
  return LOCALE_ROUTE_PATHS.some((route) => route === path || (route.includes('$') && new RegExp('^' + route.replace(/\$[^/]+/g, '[^/]+') + '$').test(path)));
}
export function initialLocale(path: string, country: string | null | undefined, preference?: string | null): Locale {
  const explicit = localeForPath(path);
  if (explicit !== "no") return explicit;
  return LANGUAGES.find((l) => l === preference) ?? localeForCountry(country);
}