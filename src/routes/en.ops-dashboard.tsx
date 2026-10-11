import { createFileRoute } from "@tanstack/react-router";
import { opsDashboardHead } from "@/lib/ops-dashboard-head";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/en/ops-dashboard")({
  staticData: { sitemap: true },
  head: () => opsDashboardHead("en"),
  component: () => <OpsDashboard lang="en" />,
});
