import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Personvern from "@/pages/Personvern";

export const Route = createFileRoute("/personvern")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/personvern', title: 'Personvern | AviSafe', description: 'Personvernerklæring for avisafe.no: hvilke data vi samler inn og hvordan de brukes.' }),
  component: Personvern,
});
