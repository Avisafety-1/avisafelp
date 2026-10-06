import { createFileRoute } from "@tanstack/react-router";
import Logg from "@/pages/Logg";

export const Route = createFileRoute("/logg")({
  staticData: { sitemap: true },
  component: Logg,
});
