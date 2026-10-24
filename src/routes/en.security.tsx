import { createFileRoute } from "@tanstack/react-router";
import { securityHead } from "@/lib/security-head";
import SecurityPage from "@/pages/SecurityPage";

export const Route = createFileRoute("/en/security")({
  staticData: { sitemap: true },
  head: () => securityHead("en"),
  component: () => <SecurityPage lang="en" />,
});
