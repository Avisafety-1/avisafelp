import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Artikler from "@/pages/Artikler";

export const Route = createFileRoute("/artikler/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/artikler', title: 'Artikler om droneoperasjoner og sikkerhet | AviSafe', description: 'Artikler og innsikt om droneoperasjoner, sikkerhetsstyring og regelverk fra AviSafe.' }),
  component: Artikler,
});
