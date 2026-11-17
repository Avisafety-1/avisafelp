import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { opsDashboardHead } from "@/lib/ops-dashboard-head";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/de/aviops")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => opsDashboardHead("en"))(), "de", "/de/aviops"),
  component: () => <OpsDashboard lang="en" />,
});
