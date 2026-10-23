import { createFileRoute } from "@tanstack/react-router";
import { pageHead, breadcrumbLd, ldScript } from "@/lib/seo";
import { SECURITY } from "@/content/security";
import SecurityPage from "@/pages/SecurityPage";

const c = SECURITY.en;

export const Route = createFileRoute("/en/security")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/en/security", title: c.title, description: c.description }),
    scripts: [ldScript(breadcrumbLd([{ name: "AviSafe", path: "/en" }, { name: "Security", path: "/en/security" }]))],
  }),
  component: () => <SecurityPage lang="en" />,
});
