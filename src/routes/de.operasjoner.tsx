import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Operations from "@/pages/Operations";

export const Route = createFileRoute("/de/operasjoner")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => pageHead({ path: '/operasjoner', title: 'Droneoperasjoner og operativ støtte | AviSafe', description: 'AviSafe tilbyr hjelp til planlegging og gjennomføring av droneoperasjoner for virksomheter i Norge.' }))(), "de", "/de/operasjoner"),
  component: Operations,
});
