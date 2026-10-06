import { createFileRoute } from "@tanstack/react-router";
import { AIRSPACE_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/en/live-airspace-awareness")({
  staticData: { sitemap: true },
  head: () => landingHead(AIRSPACE_PAGE),
  component: () => <LandingTemplate page={AIRSPACE_PAGE} />,
});
