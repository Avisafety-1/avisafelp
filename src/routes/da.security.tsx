import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { securityHead } from "@/lib/security-head";
import SecurityPage from "@/pages/SecurityPage";

export const Route = createFileRoute("/da/security")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => securityHead("en"))(), "da", "/da/security"),
  component: () => <SecurityPage lang="en" />,
});
