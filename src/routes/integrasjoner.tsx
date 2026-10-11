import { createFileRoute } from "@tanstack/react-router";
import { pageHead, SOFTWARE_APP_LD, breadcrumbLd, ldScript } from "@/lib/seo";
import { INTEGRATIONS_PAGE, INTEGRATIONS_PATH } from "@/content/integrations";
import Integrations from "@/pages/Integrations";

export const Route = createFileRoute("/integrasjoner")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({
      path: INTEGRATIONS_PATH,
      title: INTEGRATIONS_PAGE.meta.title,
      description: INTEGRATIONS_PAGE.meta.description,
    }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(
        breadcrumbLd([
          { name: "Forside", path: "/" },
          { name: INTEGRATIONS_PAGE.h1, path: INTEGRATIONS_PATH },
        ]),
      ),
    ],
  }),
  component: Integrations,
});
