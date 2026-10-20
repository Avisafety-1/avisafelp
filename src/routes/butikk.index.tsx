import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Butikk from "@/pages/Butikk";

export const Route = createFileRoute("/butikk/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/butikk', title: 'Butikk – Remote ID og utstyr for droneoperatører | AviSafe', description: 'Kjøp Dronetag Mini Remote ID-sender og AviSafe-merch med levering i Norge.', type: "product" }),
  component: Butikk,
});
