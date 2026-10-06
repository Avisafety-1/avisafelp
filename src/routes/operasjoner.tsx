import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Operations from "@/pages/Operations";

export const Route = createFileRoute("/operasjoner")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/operasjoner', title: 'Droneoperasjoner og operativ støtte | AviSafe', description: 'AviSafe tilbyr hjelp til planlegging og gjennomføring av droneoperasjoner for virksomheter i Norge.' }),
  component: Operations,
});
