import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import ButikkCheckout from "@/pages/ButikkCheckout";

export const Route = createFileRoute("/en/butikk/checkout")({
  staticData: { sitemap: false },
  head: (args) => localizedHead((() => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }))(), "en", "/en/butikk/checkout"),
  component: ButikkCheckout,
});
