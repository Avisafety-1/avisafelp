import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { SMS_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/de/drone-safety-management-system")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(SMS_PAGE))(), "de", "/de/drone-safety-management-system"),
  component: () => <LandingTemplate page={SMS_PAGE} />,
});
