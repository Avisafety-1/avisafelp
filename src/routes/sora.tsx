import { createFileRoute } from "@tanstack/react-router";
import Sora from "@/pages/Sora";

export const Route = createFileRoute("/sora")({
  staticData: { sitemap: true },
  component: Sora,
});
