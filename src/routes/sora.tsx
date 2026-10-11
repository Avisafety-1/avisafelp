import { createFileRoute } from "@tanstack/react-router";
import { pageHead, SOFTWARE_APP_LD, breadcrumbLd, ldScript } from "@/lib/seo";
import { SORA_PAGE } from "@/content/sora";
import Sora from "@/pages/Sora";

export const Route = createFileRoute("/sora")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({
      path: SORA_PAGE.path,
      title: SORA_PAGE.meta.title,
      description: SORA_PAGE.meta.description,
    }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(
        breadcrumbLd([
          { name: "Forside", path: "/" },
          { name: "SORA", path: "/sora" },
        ]),
      ),
    ],
  }),
  component: Sora,
});
