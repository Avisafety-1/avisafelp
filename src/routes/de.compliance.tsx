import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { complianceHead } from "@/lib/compliance-head";
import CompliancePage from "@/pages/CompliancePage";

export const Route = createFileRoute("/de/compliance")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => complianceHead("en"))(), "de", "/de/compliance"),
  component: () => <CompliancePage lang="en" />,
});
