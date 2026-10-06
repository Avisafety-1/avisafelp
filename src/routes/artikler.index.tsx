import { createFileRoute } from "@tanstack/react-router";
import Artikler from "@/pages/Artikler";

export const Route = createFileRoute("/artikler/")({
  staticData: { sitemap: true },
  component: Artikler,
});
