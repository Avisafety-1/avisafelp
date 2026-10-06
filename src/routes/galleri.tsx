import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Galleri from "@/pages/Galleri";

export const Route = createFileRoute("/galleri")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/galleri', title: 'Galleri – bilder og video | AviSafe', description: 'Bilder og videoer fra AviSafe og droneoperasjoner i Norge.' }),
  component: Galleri,
});
