import { createFileRoute } from "@tanstack/react-router";
import { SMS_PAGE } from "@/content/en/landing-pages";
import { landingHead } from "@/lib/landing-head";
import LandingTemplate from "@/pages/en/LandingTemplate";

export const Route = createFileRoute("/en/drone-safety-management-system")({
  staticData: { sitemap: true },
  head: () => landingHead(SMS_PAGE),
  component: () => <LandingTemplate page={SMS_PAGE} />,
});
