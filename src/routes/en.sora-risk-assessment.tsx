import { createFileRoute } from "@tanstack/react-router";
import { SORA_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/en/sora-risk-assessment")({
  staticData: { sitemap: true },
  head: () => landingHead(SORA_PAGE),
  component: () => <LandingTemplate page={SORA_PAGE} />,
});
