import { createFileRoute } from "@tanstack/react-router";
import ButikkCheckout from "@/pages/ButikkCheckout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/butikk/checkout")({
  staticData: { sitemap: false },
  head: () => pageHead({ path: '/butikk/checkout', title: 'Kassen | AviSafe Butikk', description: 'Kontroller bestillingen og gå til sikker betaling hos AviSafe.', noindex: true }),
  component: ButikkCheckout,
});
