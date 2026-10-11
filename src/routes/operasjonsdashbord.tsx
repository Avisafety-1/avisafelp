import { createFileRoute } from "@tanstack/react-router";
import { opsDashboardHead } from "@/lib/ops-dashboard-head";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/operasjonsdashbord")({
  staticData: { sitemap: true },
  head: () => opsDashboardHead("nb"),
  component: () => <OpsDashboard lang="nb" />,
});
