import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Product from "@/pages/Product";

export const Route = createFileRoute("/product/$handle")({
  staticData: { sitemap: false },
  head: ({ params }) => pageHead({ path: `/product/${params.handle}`, title: 'Produkt | AviSafe', description: 'Produkt fra AviSafe-butikken.' }),
  component: Product,
});
