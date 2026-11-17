import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { partnersHead } from "@/lib/company-head";
import PartnersPage from "@/pages/PartnersPage";

export const Route = createFileRoute("/da/partners")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => partnersHead("en"))(), "da", "/da/partners"),
  component: () => <PartnersPage lang="en" />,
});
