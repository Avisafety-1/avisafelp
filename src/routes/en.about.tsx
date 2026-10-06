import { createFileRoute } from "@tanstack/react-router";
import { aboutHead } from "@/lib/company-head";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/en/about")({
  staticData: { sitemap: true },
  head: () => aboutHead("en"),
  component: () => <AboutPage lang="en" />,
});
