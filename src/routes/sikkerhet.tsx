import { createFileRoute } from "@tanstack/react-router";
import { securityHead } from "@/lib/security-head";
import SecurityPage from "@/pages/SecurityPage";

export const Route = createFileRoute("/sikkerhet")({
  staticData: { sitemap: true },
  head: () => securityHead("nb"),
  component: () => <SecurityPage lang="nb" />,
});
