import { createFileRoute } from "@tanstack/react-router";
import { FLEET_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/en/drone-fleet-management")({
  staticData: { sitemap: true },
  head: () => landingHead(FLEET_PAGE),
  component: () => <LandingTemplate page={FLEET_PAGE} />,
});
