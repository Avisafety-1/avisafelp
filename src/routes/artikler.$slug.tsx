import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { pageHead, SITE_URL } from "@/lib/seo";
import Artikkel from "@/pages/Artikkel";

type ArticleMeta = { title: string; slug: string; content: string | null; cover_image_url: string | null; created_at: string };

export const Route = createFileRoute("/artikler/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("articles")
      .select("title, slug, content, cover_image_url, created_at")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    return { article: (data as ArticleMeta | null) ?? null };
  },
  head: ({ params, loaderData }) => {
    const found = loaderData?.article;
    const a = found ? { ...found, title: found.title.trim().replace(/\.$/, "") } : null;
    if (!a) return { meta: [{ title: "Artikkel | AviSafe" }, { name: "robots", content: "noindex" }] };
    const plain = (a.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const raw = plain.length >= 50 ? plain : `Les ${a.title} på AviSafe – innsikt for droneoperatører.`;
    const description = raw.length > 157 ? `${raw.slice(0, 157).trimEnd()}…` : raw;
    const path = `/artikler/${params.slug}`;
    const base = pageHead({ path, title: `${a.title} | AviSafe`, description, type: "article", image: a.cover_image_url });
    return {
      ...base,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description,
          datePublished: a.created_at,
          dateModified: a.created_at,
          ...(a.cover_image_url ? { image: a.cover_image_url } : {}),
          mainEntityOfPage: `${SITE_URL}${path}`,
          author: { "@type": "Organization", name: "AviSafe" },
          publisher: { "@type": "Organization", name: "AviSafe", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
        }),
      }],
    };
  },
  component: Artikkel,
});
