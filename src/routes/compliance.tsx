import { createFileRoute } from "@tanstack/react-router";
import { complianceHead } from "@/lib/compliance-head";
import CompliancePage from "@/pages/CompliancePage";

export const Route = createFileRoute("/compliance")({
  staticData: { sitemap: true },
  head: () => complianceHead("nb"),
  component: () => <CompliancePage lang="nb" />,
});
