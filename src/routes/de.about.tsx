import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { aboutHead } from "@/lib/company-head";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/de/about")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => aboutHead("en"))(), "de", "/de/about"),
  component: () => <AboutPage lang="en" />,
});
