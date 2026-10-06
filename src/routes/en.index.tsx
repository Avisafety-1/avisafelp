import { createFileRoute } from "@tanstack/react-router";
import { pageHead, ldScript, SOFTWARE_APP_LD } from "@/lib/seo";
import Index from "@/pages/Index";
import { EN_HOME_LEAD } from "@/pages/en/EnHome";

export const Route = createFileRoute("/en/")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/en", title: "AviSafe – Safety and operations platform for drone operators", description: EN_HOME_LEAD }),
    scripts: [ldScript({ ...SOFTWARE_APP_LD, description: EN_HOME_LEAD })],
  }),
  component: Index,
});
