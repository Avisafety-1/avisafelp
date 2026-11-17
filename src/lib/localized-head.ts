import { translateDisplay } from "@/i18n/display-translation";
import { alternatesFor } from "./alternates";
import { pathForLocale, type Locale } from "./locales";
import { SITE_URL } from "./seo";
type Head = { meta?: Array<Record<string, unknown>>; links?: Array<Record<string, unknown>>; scripts?: Array<Record<string, unknown>> };
export function localizedHead(head: Head, lang: Locale, fallbackPath: string): Head {
  let path = fallbackPath;
  const own = head.links?.find((l) => l['rel'] === 'canonical')?.['href'];
  if (typeof own === 'string') path = pathForLocale(new URL(own).pathname, lang);
  const title = head.meta?.find((m) => m['title'])?.['title'];
  const description = head.meta?.find((m) => m['name'] === 'description')?.['content'];
  const t = translateDisplay(typeof title === 'string' ? title : 'AviSafe', lang);
  const d = translateDisplay(typeof description === 'string' ? description : 'AviSafe – platform for drone operators.', lang);
  const meta = (head.meta ?? []).filter((m) => !m['title'] && !['description', 'twitter:title', 'twitter:description', 'twitter:card'].includes(String(m['name'])) && !['og:title','og:description','og:url','og:locale','og:type'].includes(String(m['property'])));
  const hidden = meta.some((m) => m['name'] === 'robots' && String(m['content']).includes('noindex'));
  const type = head.meta?.find((m) => m['property'] === 'og:type')?.['content'] ?? 'website';
  function localizeData(value: unknown, key = ''): unknown {
    if (typeof value === 'string') {
      if (['url','item','mainEntityOfPage','@id'].includes(key) && value.startsWith(SITE_URL) && !/\.[a-z0-9]+$/i.test(value)) return SITE_URL + pathForLocale(value.slice(SITE_URL.length) || '/', lang);
      return ['description','headline','name','text','jobTitle'].includes(key) ? translateDisplay(value, lang) : value;
    }
    if (Array.isArray(value)) return value.map((v) => localizeData(v, key));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,localizeData(v,k)]));
    return value;
  }
  return {
    meta: [...meta, { title: t }, { name: 'description', content: d }, { property: 'og:title', content: t }, { property: 'og:description', content: d }, { property: 'og:url', content: SITE_URL + path }, { property: 'og:locale', content: lang }, { property: 'og:type', content: type }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: t }, { name: 'twitter:description', content: d }],
    links: hidden ? [] : [...(head.links ?? []).filter((l) => !['canonical','alternate'].includes(String(l['rel']))), { rel: 'canonical', href: SITE_URL + path }, ...alternatesFor(path).map((a) => ({ rel: 'alternate', hrefLang: a.hreflang, href: SITE_URL + a.path }))],
    scripts: head.scripts?.map((s) => { if (s['type'] !== 'application/ld+json' || typeof s['children'] !== 'string') return s; try { return { ...s, children: JSON.stringify(localizeData(JSON.parse(s['children']))) }; } catch { return s; } }) ?? [],
  };
}