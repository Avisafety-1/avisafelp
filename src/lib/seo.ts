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
