import { createFileRoute } from "@tanstack/react-router";
import Personvern from "@/pages/Personvern";

export const Route = createFileRoute("/personvern")({
  staticData: { sitemap: true },
  component: Personvern,
});
