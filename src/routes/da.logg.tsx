import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Logg from "@/pages/Logg";

export const Route = createFileRoute("/da/logg")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => pageHead({ path: '/logg', title: 'Logg | AviSafe', description: 'Intern logg over søk og hendelser i AviSafe.' }))(), "da", "/da/logg"),
  component: Logg,
});
