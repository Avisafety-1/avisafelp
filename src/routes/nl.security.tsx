import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { securityHead } from "@/lib/security-head";
import SecurityPage from "@/pages/SecurityPage";

export const Route = createFileRoute("/nl/security")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => securityHead("en"))(), "nl", "/nl/security"),
  component: () => <SecurityPage lang="en" />,
});
