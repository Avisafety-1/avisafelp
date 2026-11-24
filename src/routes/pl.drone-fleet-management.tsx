import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { FLEET_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/pl/drone-fleet-management")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(FLEET_PAGE))(), "pl", "/pl/drone-fleet-management"),
  component: () => <LandingTemplate page={FLEET_PAGE} />,
});
