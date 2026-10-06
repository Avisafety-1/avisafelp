import { createFileRoute } from "@tanstack/react-router";
import ButikkCheckout from "@/pages/ButikkCheckout";

export const Route = createFileRoute("/butikk/checkout")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: ButikkCheckout,
});
