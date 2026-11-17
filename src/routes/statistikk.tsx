import { createFileRoute } from "@tanstack/react-router";
import Statistikk from "@/pages/Statistikk";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/statistikk")({
  staticData: { sitemap: false },
  head: () => pageHead({ path: '/statistikk', title: 'Besøksstatistikk | AviSafe', description: 'Administrasjon av besøksstatistikk for AviSafe.', noindex: true }),
  component: Statistikk,
});
