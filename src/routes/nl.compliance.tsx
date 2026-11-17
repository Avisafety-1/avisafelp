import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { complianceHead } from "@/lib/compliance-head";
import CompliancePage from "@/pages/CompliancePage";

export const Route = createFileRoute("/nl/compliance")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => complianceHead("en"))(), "nl", "/nl/compliance"),
  component: () => <CompliancePage lang="en" />,
});
