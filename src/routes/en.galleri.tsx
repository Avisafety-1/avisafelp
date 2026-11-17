import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Galleri from "@/pages/Galleri";

export const Route = createFileRoute("/en/galleri")({
  staticData: { sitemap: true },
  head: (args) => localizedHead((() => pageHead({ path: '/galleri', title: 'Galleri – bilder og video | AviSafe', description: 'Bilder og videoer fra AviSafe og droneoperasjoner i Norge.' }))(), "en", "/en/galleri"),
  component: Galleri,
});
