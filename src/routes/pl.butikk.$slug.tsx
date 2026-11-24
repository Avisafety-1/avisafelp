import { localizedHead } from "@/lib/localized-head";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { productBySlug } from "@/data/shopProducts";
import ButikkProdukt from "@/pages/ButikkProdukt";
import ButikkAbonnement from "@/pages/ButikkAbonnement";

export const Route = createFileRoute("/pl/butikk/$slug")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: (args) => localizedHead((({ loaderData }: typeof args) => {
    const p = loaderData ? productBySlug(loaderData.slug) : undefined;
    if (!p) return {};
    return pageHead({
      path: `/butikk/${p.slug}`,
      title: `${p.title} – Kjøp hos AviSafe`,
      description: p.shortDescription,
      type: "product",
      ...(p.hidden ? { noindex: true } : {}),
    });
  })(args), "pl", "/pl/butikk/$slug"),
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useLoaderData();
  const product = productBySlug(slug);
  if (!product) return null;
  if (product.subscription) return <ButikkAbonnement />;
  return <ButikkProdukt key={product.id} product={product} />;
}
