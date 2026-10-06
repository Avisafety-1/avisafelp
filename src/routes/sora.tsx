import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Sora from "@/pages/Sora";

export const Route = createFileRoute("/sora")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/sora', title: 'SORA-risikovurdering for droneoperasjoner | AviSafe', description: 'AviSafe gir støtte for risikovurdering etter SORA 2.5 (JARUS/EASA) i spesifikk kategori og strukturerer dokumentasjonen for operatøren.' }),
  component: Sora,
});
