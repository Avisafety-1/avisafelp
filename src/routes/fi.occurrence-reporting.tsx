import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { OCCURRENCE_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/fi/occurrence-reporting")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(OCCURRENCE_PAGE))(), "fi", "/fi/occurrence-reporting"),
  component: () => <LandingTemplate page={OCCURRENCE_PAGE} />,
});
