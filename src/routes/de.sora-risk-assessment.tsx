import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { SORA_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/de/sora-risk-assessment")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(SORA_PAGE))(), "de", "/de/sora-risk-assessment"),
  component: () => <LandingTemplate page={SORA_PAGE} />,
});
