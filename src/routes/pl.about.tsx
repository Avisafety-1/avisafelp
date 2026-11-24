import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { aboutHead } from "@/lib/company-head";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/pl/about")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => aboutHead("en"))(), "pl", "/pl/about"),
  component: () => <AboutPage lang="en" />,
});
