import { createFileRoute } from "@tanstack/react-router";
import { OCCURRENCE_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/en/occurrence-reporting")({
  staticData: { sitemap: true },
  head: () => landingHead(OCCURRENCE_PAGE),
  component: () => <LandingTemplate page={OCCURRENCE_PAGE} />,
});
