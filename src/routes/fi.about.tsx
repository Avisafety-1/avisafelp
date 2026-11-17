import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { aboutHead } from "@/lib/company-head";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/fi/about")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => aboutHead("en"))(), "fi", "/fi/about"),
  component: () => <AboutPage lang="en" />,
});
