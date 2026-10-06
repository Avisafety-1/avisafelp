import { createFileRoute } from "@tanstack/react-router";
import SoraProcess from "@/pages/SoraProcess";

export const Route = createFileRoute("/sora-prosess")({
  staticData: { sitemap: true },
  component: SoraProcess,
});
