import { createFileRoute } from "@tanstack/react-router";
import { pageHead, SOFTWARE_APP_LD, breadcrumbLd, ldScript } from "@/lib/seo";
import { OPS_PAGE } from "@/content/ops-dashboard";
import OpsDashboard from "@/pages/OpsDashboard";

export const Route = createFileRoute("/operasjonsdashbord")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({
      path: OPS_PAGE.path,
      title: OPS_PAGE.meta.title,
      description: OPS_PAGE.meta.description,
    }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(
        breadcrumbLd([
          { name: "Forside", path: "/" },
          { name: OPS_PAGE.navLabel, path: OPS_PAGE.path },
        ]),
      ),
    ],
  }),
  component: OpsDashboard,
});
