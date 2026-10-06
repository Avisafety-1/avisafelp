import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Butikk from "@/pages/Butikk";

export const Route = createFileRoute("/butikk/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/butikk', title: 'Dronetag Mini – Kjøp Remote ID-sender | AviSafe', description: 'Kjøp Dronetag Mini Remote ID-sender hos AviSafe, med levering i Norge.', type: "product" }),
  component: Butikk,
});
