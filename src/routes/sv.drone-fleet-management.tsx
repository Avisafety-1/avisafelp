import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { FLEET_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/sv/drone-fleet-management")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(FLEET_PAGE))(), "sv", "/sv/drone-fleet-management"),
  component: () => <LandingTemplate page={FLEET_PAGE} />,
});
