import { createFileRoute } from "@tanstack/react-router";
import Product from "@/pages/Product";

export const Route = createFileRoute("/product/$handle")({
  staticData: { sitemap: false },
  component: Product,
});
