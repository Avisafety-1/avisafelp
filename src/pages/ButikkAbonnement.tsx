import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Pricing, type PricingPlan } from "@/components/ui/pricing";
import {
  AVISAFE_ABONNEMENT,
  SUBSCRIPTION_ADDONS,
  SUBSCRIPTION_FEATURES,
  SUBSCRIPTION_PLANS,
} from "@/data/shopProducts";
import { formatNok } from "@/stores/shopCart";
import { createSubscriptionCheckout } from "@/lib/stripeCheckout.functions";

const ButikkAbonnement = () => {
  const [qty, setQty] = useState<Record<string, number>>({ team: 1, business: 6 });
  const [loading, setLoading] = useState<string | null>(null);

  const checkout = async (tier: "team" | "business") => {
    setLoading(tier);
    try {
      const res = await createSubscriptionCheckout({ data: { tier, quantity: qty[tier]! } });
      window.location.href = res.url;
    } catch {
      toast.error("Kunne ikke starte betalingen. Prøv igjen, eller kontakt kontakt@avisafe.no.");
      setLoading(null);
    }
  };

  const plans: PricingPlan[] = SUBSCRIPTION_PLANS.map((p) => {
    if (p.priceNok === null) {
      return {
        id: p.id,
        name: p.name,
        priceLabel: "Ta kontakt",
        subtitle: p.users,
        features: [...SUBSCRIPTION_FEATURES, ...SUBSCRIPTION_ADDONS],
        description: "Vi setter opp et tilbud tilpasset organisasjonen deres.",
        buttonText: "Be om demo / tilbud",
        onSelect: () => {
          window.location.href = "mailto:kontakt@avisafe.no?subject=AviSafe%20Enterprise%20(16%2B%20brukere)";
        },
      };
    }
    const tier = p.id as "team" | "business";
    const n = qty[tier]!;
    return {
      id: p.id,
      name: p.name,
      priceLabel: formatNok(p.priceNok),
      period: "/ bruker / mnd",
      subtitle: "inkl. 25 % mva · faktureres månedlig",
      features: SUBSCRIPTION_FEATURES,
      description: "Antall abonnement tilsvarer antall brukere.",
      buttonText: "Kjøp abonnement",
      qty: { value: n, min: p.minQty, max: p.maxQty, onChange: (v) => setQty((q) => ({ ...q, [tier]: v })) },
      totalLabel: `${formatNok(p.priceNok * n)} / mnd`,
      onSelect: () => checkout(tier),
      loading: loading === tier,
    };
  });

  return (
    <main className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <Link to="/butikk" className="inline-flex items-center gap-1 text-sm font-medium text-[#123b87] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Alle produkter
        </Link>
        <Pricing
          plans={plans}
          title={AVISAFE_ABONNEMENT.title}
          description={"Operativ sikkerhetsstyring for droneoperatører.\nVelg antall brukere – prisen er per bruker per måned."}
        />
        <p className="text-center text-sm text-muted-foreground">
          Egne produkter i Enterprise: AviOPS med live videooverføring og Compliance-modul.
        </p>
      </div>
    </main>
  );
};

export default ButikkAbonnement;
