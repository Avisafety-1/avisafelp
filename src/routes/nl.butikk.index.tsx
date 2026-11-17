import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Butikk from "@/pages/Butikk";

export const Route = createFileRoute("/nl/butikk/")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => pageHead({ path: '/butikk', title: 'Butikk – Remote ID og utstyr for droneoperatører | AviSafe', description: 'Kjøp Dronetag Mini Remote ID-sender og AviSafe-merch med levering i Norge.', type: "website" }))(), "nl", "/nl/butikk"),
  component: Butikk,
});
