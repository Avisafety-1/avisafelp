import { useState } from "react";
import { Link, useNavigate } from "@/lib/router-compat";
import { Helmet } from "@/lib/page-head";
import { ArrowLeft, Loader2, Lock, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useShopCart,
  selectTotalNok,
  formatNok,
} from "@/stores/shopCart";
import { createStripeCheckout } from "@/lib/stripeCheckout.functions";

const ButikkCheckout = () => {
  const navigate = useNavigate();
  const items = useShopCart((s) => s.items);
  const updateQty = useShopCart((s) => s.updateQty);
  const removeItem = useShopCart((s) => s.removeItem);
  const total = selectTotalNok({ items });
  const vat = Math.round((total / 1.25) * 0.25);
  const [paying, setPaying] = useState(false);

  const pay = async () => {
    setPaying(true);
    try {
      const res = await createStripeCheckout({
        data: { items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })) },
      });
      if ("error" in res && res.error) {
        toast.error(res.error);
        setPaying(false);
        return;
      }
      if ("url" in res && res.url) window.location.href = res.url;
    } catch (e) {
      console.error(e);
      toast.error("Kunne ikke starte betalingen", { description: "Prøv igjen om litt." });
      setPaying(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kassen | AviSafe Butikk</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/butikk"
            className="inline-flex items-center gap-2 text-sm text-[hsl(210,45%,30%)] hover:text-[#123b87]"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til butikken
          </Link>

          <h1 className="mt-6 text-3xl md:text-4xl font-bold text-[hsl(210,45%,12%)]">
            Kassen
          </h1>

          {items.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white border border-black/5 p-10 text-center">
              <p className="text-[hsl(210,45%,30%)]">
                Handlevognen din er tom.
              </p>
              <Button
                onClick={() => navigate("/butikk")}
                className="mt-6 bg-[#123b87] hover:bg-[#0e2f6b] text-white"
              >
                Gå til butikken
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-8 rounded-2xl bg-white border border-black/5 overflow-hidden">
                <ul className="divide-y divide-black/5">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="p-5 flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 rounded-lg object-cover bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[hsl(210,45%,12%)]">
                          {product.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatNok(product.priceNok)} pr. stk
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => updateQty(product.id, quantity - 1)}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-accent"
                            aria-label="Reduser"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQty(product.id, quantity + 1)}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-accent"
                            aria-label="Øk"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="ml-auto text-muted-foreground hover:text-destructive p-2"
                            aria-label="Fjern"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[hsl(210,45%,12%)]">
                          {formatNok(product.priceNok * quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-2xl bg-white border border-black/5 p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delsum (eks. mva)</span>
                  <span>{formatNok(total - vat)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mva (25 %)</span>
                  <span>{formatNok(vat)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frakt</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t border-black/5 pt-3 flex justify-between text-base font-semibold">
                  <span>Totalt</span>
                  <span>{formatNok(total)}</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[hsl(210,45%,12%)] text-white p-6">
                <Button
                  disabled={paying}
                  onClick={pay}
                  className="w-full h-14 bg-white text-[#123b87] hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed text-base font-semibold"
                >
                  {paying ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5 mr-2" />
                  )}
                  Gå til sikker betaling
                </Button>
                <p className="mt-3 text-xs text-white/70 text-center">
                  Sikker betaling med kort via Stripe. Levering i Norge. Spørsmål? Kontakt{" "}
                  <a href="mailto:kontakt@avisafe.no" className="underline">
                    kontakt@avisafe.no
                  </a>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ButikkCheckout;
