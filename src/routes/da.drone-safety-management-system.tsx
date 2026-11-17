import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { SMS_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/da/drone-safety-management-system")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => landingHead(SMS_PAGE))(), "da", "/da/drone-safety-management-system"),
  component: () => <LandingTemplate page={SMS_PAGE} />,
});
