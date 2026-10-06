import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = "https://avisafe.no";

const SHOPIFY_STOREFRONT_URL = "https://2qa2r5-0f.myshopify.com/api/2025-07/graphql.json";
// Public Storefront API token (already used in the browser bundle).
const SHOPIFY_STOREFRONT_TOKEN = "ad8e753ac2d07ef1901cd70e212d8644";

type ShopifyPage = {
  data?: {
    products?: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      edges: Array<{ node: { handle: string } }>;
    };
  };
  errors?: unknown[];
};

async function fetchAllProductHandles(): Promise<string[]> {
  const handles: string[] = [];
  let after: string | null = null;
  for (;;) {
    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `query SitemapProducts($after: String) {
          products(first: 250, after: $after, sortKey: ID) {
            pageInfo { hasNextPage endCursor }
            edges { node { handle } }
          }
        }`,
        variables: { after },
      }),
    });
    if (!res.ok) throw new Error(`Shopify request failed [${res.status}]: ${await res.text()}`);
    const json = (await res.json()) as ShopifyPage;
    if (json.errors && json.errors.length > 0) {
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
    }
    const products = json.data?.products;
    if (!products) throw new Error("Shopify response missing products");
    for (const edge of products.edges) handles.push(edge.node.handle);
    if (!products.pageInfo.hasNextPage || !products.pageInfo.endCursor) break;
    after = products.pageInfo.endCursor;
  }
  return handles;
}

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // Published articles
        const articleRouteId = "/artikler/$slug";
        if (isSitemapRouteIncluded(router.routesById[articleRouteId])) {
          const { createClient } = await import("@supabase/supabase-js");
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
          const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
            auth: { persistSession: false, autoRefreshToken: false },
            global: {
              fetch: (input, init) => {
                const headers = new Headers(init?.headers);
                // Opaque sb_ keys are not JWTs; send apikey without the default bearer.
                if (key.startsWith("sb_") && headers.get("Authorization") === "Bearer " + key)
                  headers.delete("Authorization");
                headers.set("apikey", key);
                return fetch(input, { ...init, headers });
              },
            },
          });
          const pageSize = 1000;
          for (let offset = 0; ; ) {
            const { data, error } = await supabase
              .from("articles")
              .select("id, slug")
              .eq("published", true)
              .order("id")
              .range(offset, offset + pageSize - 1);
            if (error) throw error;
            if (data.length === 0) break;
            for (const row of data) {
              const location = router.buildLocation({
                to: "/artikler/$slug",
                params: { slug: row.slug },
                search: () => ({}),
                hash: "",
              });
              const path = sitemapPathForLocation(router, location, articleRouteId);
              if (path) entries.push({ path });
            }
            offset += data.length;
          }
        }

        // Shop products
        const productRouteId = "/product/$handle";
        if (isSitemapRouteIncluded(router.routesById[productRouteId])) {
          for (const handle of await fetchAllProductHandles()) {
            const location = router.buildLocation({
              to: "/product/$handle",
              params: { handle },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, productRouteId);
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
