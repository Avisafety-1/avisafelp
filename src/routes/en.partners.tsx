import { createFileRoute } from "@tanstack/react-router";
import { partnersHead } from "@/lib/company-head";
import PartnersPage from "@/pages/PartnersPage";

export const Route = createFileRoute("/en/partners")({
  staticData: { sitemap: true },
  head: () => partnersHead("en"),
  component: () => <PartnersPage lang="en" />,
});
