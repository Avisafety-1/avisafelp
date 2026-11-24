import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { opsDashboardHead } from "@/lib/ops-dashboard-head";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/pl/aviops")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => opsDashboardHead("en"))(), "pl", "/pl/aviops"),
  component: () => <OpsDashboard lang="en" />,
});
