import { createFileRoute } from "@tanstack/react-router";
import Statistikk from "@/pages/Statistikk";

export const Route = createFileRoute("/statistikk")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: Statistikk,
});
