import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { AIRSPACE_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/da/live-airspace-awareness")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(AIRSPACE_PAGE))(), "da", "/da/live-airspace-awareness"),
  component: () => <LandingTemplate page={AIRSPACE_PAGE} />,
});
