import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Logg from "@/pages/Logg";

export const Route = createFileRoute("/logg")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/logg', title: 'Logg | AviSafe', description: 'Intern logg over søk og hendelser i AviSafe.' }),
  component: Logg,
});
