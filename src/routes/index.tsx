import { createFileRoute } from "@tanstack/react-router";
import { pageHead, SOFTWARE_APP_LD, ldScript } from "@/lib/seo";
import Index from "@/pages/Index";

const FOUNDERS_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Gard Haug-Hansen", jobTitle: "CEO og medgründer", worksFor: { "@type": "Organization", name: "AviSafe", url: "https://avisafe.no" } },
    { "@type": "Person", name: "Rikard Bjørklund", jobTitle: "Medgründer, salg og markedsføring", worksFor: { "@type": "Organization", name: "AviSafe", url: "https://avisafe.no" } },
  ],
};

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => {
    const base = pageHead({ path: "/", title: 'AviSafe – Operasjonssystem og sikkerhetsstyring for droneoperatører', description: 'AviSafe er en norsk plattform for droneoperatører: flåtestyring, sikkerhetsstyring (SMS), hendelsesrapportering, SORA-risikovurdering og live luftromsbilde.' });
    return {
      ...base,
      scripts: [
        ldScript(FOUNDERS_LD),
        ldScript(SOFTWARE_APP_LD),
      ],
    };
  },
  component: Index,
});
