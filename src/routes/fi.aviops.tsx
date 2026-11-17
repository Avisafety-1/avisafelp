import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { opsDashboardHead } from "@/lib/ops-dashboard-head";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/fi/aviops")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => opsDashboardHead("en"))(), "fi", "/fi/aviops"),
  component: () => <OpsDashboard lang="en" />,
});
