/**
 * Language counterparts. Only pages that really exist in both languages are
 * listed as pairs; everything else is single-language.
 */
export const LANGUAGE_PAIRS: { nb: string; en: string }[] = [
  { nb: "/", en: "/en" },
  { nb: "/om-oss", en: "/en/about" },
  { nb: "/partnere", en: "/en/partners" },
  { nb: "/compliance", en: "/en/compliance" },
  { nb: "/operasjonsdashbord", en: "/en/ops-dashboard" },
];

export type PageLang = "nb" | "en";

export const isEnglishPath = (path: string) => path === "/en" || path.startsWith("/en/");

export function langForPath(path: string): PageLang {
  return isEnglishPath(path) ? "en" : "nb";
}

/** The page in the other language, if one exists. */
export function counterpartOf(path: string): string | null {
  const pair = LANGUAGE_PAIRS.find((p) => p.nb === path || p.en === path);
  if (!pair) return null;
  return pair.nb === path ? pair.en : pair.nb;
}

/** Language switch target: the counterpart page, else the other language's home page. */
export function switchTargetFor(path: string): string {
  return counterpartOf(path) ?? (isEnglishPath(path) ? "/" : "/en");
}

/** hreflang alternates for a path. x-default points to the English version when one exists. */
export function alternatesFor(path: string): { hreflang: string; path: string }[] {
  const lang = langForPath(path);
  const other = counterpartOf(path);
  const own = { hreflang: lang, path };
  if (!other) return [own, { hreflang: "x-default", path }];
  const otherEntry = { hreflang: lang === "nb" ? "en" : "nb", path: other };
  const enPath = lang === "en" ? path : other;
  return [own, otherEntry, { hreflang: "x-default", path: enPath }];
}
