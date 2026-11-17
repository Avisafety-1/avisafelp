import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import Statistikk from "@/pages/Statistikk";

export const Route = createFileRoute("/da/statistikk")({
  staticData: { sitemap: false },
  head: (args) => localizedHead((() => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }))(), "da", "/da/statistikk"),
  component: Statistikk,
});
