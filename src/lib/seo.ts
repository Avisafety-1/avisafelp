export const SITE_URL = "https://avisafe.no";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type PageHeadInput = {
  path: string;
  title: string;
  description: string;
  type?: string;
  image?: string | null;
  noindex?: boolean;
};

/** Per-route head tags: self-referencing canonical/og:url, nb hreflang + x-default (Norwegian-only pages). */
export function pageHead({ path, title, description, type = "website", image, noindex }: PageHeadInput) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: noindex
      ? []
      : [
          { rel: "canonical", href: url },
          { rel: "alternate", hrefLang: "nb", href: url },
          { rel: "alternate", hrefLang: "x-default", href: url },
        ],
  };
}

export const SOFTWARE_APP_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AviSafe",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Norsk plattform for droneoperatører: flåtestyring, sikkerhetsstyring (SMS), hendelsesrapportering, støtte for SORA 2.5-risikovurdering og live luftromsbilde.",
  publisher: { "@type": "Organization", name: "AviSafe", url: SITE_URL },
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export const ldScript = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });

/** ~150 chars cut at a whole word, no double punctuation. */
export function excerpt(html: string | null | undefined, max = 150): string {
  const text = (html || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text.replace(/\.{2,}$/, ".");
  const cut = text.slice(0, max);
  const word = cut.slice(0, Math.max(cut.lastIndexOf(" "), 1)).replace(/[\s,.;:–-]+$/, "");
  return `${word}…`;
}
