import { createFileRoute } from "@tanstack/react-router";
import { pageHead, breadcrumbLd, ldScript } from "@/lib/seo";
import { SECURITY } from "@/content/security";
import SecurityPage from "@/pages/SecurityPage";

const c = SECURITY.nb;

export const Route = createFileRoute("/sikkerhet")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/sikkerhet", title: c.title, description: c.description }),
    scripts: [ldScript(breadcrumbLd([{ name: "AviSafe", path: "/" }, { name: "Sikkerhet", path: "/sikkerhet" }]))],
  }),
  component: () => <SecurityPage lang="nb" />,
});
