import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Product from "@/pages/Product";

export const Route = createFileRoute("/de/product/$handle")({
  staticData: { sitemap: false },
  head: (args) => localizedHead((({ params }: typeof args) => pageHead({ path: `/product/${params.handle}`, title: 'Produkt | AviSafe', description: 'Produkt fra AviSafe-butikken.' }))(args), "de", "/de/product/$handle"),
  component: Product,
});
