import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useShopCart } from "@/stores/shopCart";

const Takk = () => {
  const clear = useShopCart((s) => s.clear);
  useEffect(() => clear(), [clear]);
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-xl mx-auto px-4 text-center">
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-foreground">Takk for bestillingen!</h1>
        <p className="mt-4 text-muted-foreground">
          Betalingen er mottatt. Du får kvittering på e-post, og vi sender varen så snart som mulig.
          Spørsmål? Kontakt oss på{" "}
          <a href="mailto:kontakt@avisafe.no" className="underline">kontakt@avisafe.no</a>.
        </p>
        <Link to="/butikk" className="mt-8 inline-block underline text-primary">
          Tilbake til butikken
        </Link>
      </div>
    </main>
  );
};

export const Route = createFileRoute("/butikk/takk")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Takk for bestillingen | AviSafe Butikk" },
      { name: "description", content: "Bekreftelse på bestilling i AviSafe-butikken." },
      { property: "og:title", content: "Takk for bestillingen | AviSafe" },
      { property: "og:description", content: "Bekreftelse på bestilling i AviSafe-butikken." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Takk,
});
