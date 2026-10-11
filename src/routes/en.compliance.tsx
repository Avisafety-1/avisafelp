import { createFileRoute } from "@tanstack/react-router";
import { complianceHead } from "@/lib/compliance-head";
import CompliancePage from "@/pages/CompliancePage";

export const Route = createFileRoute("/en/compliance")({
  staticData: { sitemap: true },
  head: () => complianceHead("en"),
  component: () => <CompliancePage lang="en" />,
});
