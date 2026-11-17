import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { securityHead } from "@/lib/security-head";
import SecurityPage from "@/pages/SecurityPage";

export const Route = createFileRoute("/sv/security")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => securityHead("en"))(), "sv", "/sv/security"),
  component: () => <SecurityPage lang="en" />,
});
