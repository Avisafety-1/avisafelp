import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { pageHead, SITE_URL, breadcrumbLd, excerpt, ldScript } from "@/lib/seo";
import Artikkel from "@/pages/Artikkel";

type ArticleMeta = {
  title: string;
  slug: string;
  content: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  // Optional fields: used automatically if they are added to the articles table later.
  excerpt?: string | null;
  author_name?: string | null;
};

export const Route = createFileRoute("/artikler/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    return { article: (data as ArticleMeta | null) ?? null };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Artikkel | AviSafe" }, { name: "robots", content: "noindex" }] };
    const title = a.title.trim().replace(/\.+$/, "");
    const description = a.excerpt?.trim() ? excerpt(a.excerpt, 160) : excerpt(a.content) || title;
    const path = `/artikler/${params.slug}`;
    const url = `${SITE_URL}${path}`;
    const image = a.cover_image_url || `${SITE_URL}/og-image.png`;
    const base = pageHead({ path, title: `${title} | AviSafe`, description, type: "article", image });
    return {
      ...base,
      meta: [
        ...base.meta,
        { property: "article:published_time", content: a.created_at },
        { property: "article:modified_time", content: a.updated_at || a.created_at },
      ],
      scripts: [
        ldScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished: a.created_at,
          dateModified: a.updated_at || a.created_at,
          author: a.author_name
            ? { "@type": "Person", name: a.author_name }
            : { "@type": "Organization", name: "AviSafe", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: "AviSafe",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
          image: [image],
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        }),
        ldScript(
          breadcrumbLd([
            { name: "Forside", path: "/" },
            { name: "Artikler", path: "/artikler" },
            { name: title, path },
          ]),
        ),
      ],
    };
  },
  component: Artikkel,
});
