import { createFileRoute } from "@tanstack/react-router";
import { aboutHead } from "@/lib/company-head";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/om-oss")({
  staticData: { sitemap: true },
  head: () => aboutHead("nb"),
  component: () => <AboutPage lang="nb" />,
});
