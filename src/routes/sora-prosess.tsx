import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import SoraProcess from "@/pages/SoraProcess";

export const Route = createFileRoute("/sora-prosess")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: '/sora-prosess', title: 'SORA-prosessen fase for fase | AviSafe', description: 'Interaktiv oversikt over hvordan AviSafe strukturerer SORA-vurderingen, fra oppdragsgrunnlag til anbefaling.' }),
  component: SoraProcess,
});
