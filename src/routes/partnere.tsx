import { createFileRoute } from "@tanstack/react-router";
import { partnersHead } from "@/lib/company-head";
import PartnersPage from "@/pages/PartnersPage";

export const Route = createFileRoute("/partnere")({
  staticData: { sitemap: true },
  head: () => partnersHead("nb"),
  component: () => <PartnersPage lang="nb" />,
});
