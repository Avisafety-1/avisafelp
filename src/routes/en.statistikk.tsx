import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import Statistikk from "@/pages/Statistikk";

export const Route = createFileRoute("/en/statistikk")({
  staticData: { sitemap: false },
  head: (args) => localizedHead((() => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }))(), "en", "/en/statistikk"),
  component: Statistikk,
});
