import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PricingPlan {
  id: string;
  name: string;
  priceLabel: string;
  period?: string;
  subtitle: string;
  features: string[];
  description: string;
  buttonText: string;
  /** Quantity selector shown when min < max */
  qty?: { value: number; min: number; max: number; onChange: (n: number) => void };
  totalLabel?: string;
  onSelect: () => void;
  loading?: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title: string;
  description: string;
}

/** Adapted from 21st.dev "Pricing" block: three animated cards, center card raised. */
export function Pricing({ plans, title, description }: PricingProps) {
  return (
    <div className="py-12">
      <div className="text-center space-y-4 mb-14">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">{title}</h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: index === 1 ? -12 : 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.15 * index }}
            className={cn(
              "rounded-2xl p-6 bg-card text-center flex flex-col relative shadow-sm",
              index === 1 ? "border-2 border-primary z-10" : "border border-border md:mt-5",
            )}
          >
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">{plan.name}</p>
            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-foreground tabular-nums">{plan.priceLabel}</span>
              {plan.period && <span className="text-sm font-semibold text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">{plan.subtitle}</p>

            <ul className="mt-6 gap-2 flex flex-col flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-left text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <hr className="w-full my-5 border-border" />

            {plan.qty && plan.qty.min < plan.qty.max && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Antall brukere</p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button" variant="outline" size="icon" aria-label="Færre brukere"
                    disabled={plan.qty.value <= plan.qty.min}
                    onClick={() => plan.qty!.onChange(plan.qty!.value - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-xl font-bold tabular-nums">{plan.qty.value}</span>
                  <Button
                    type="button" variant="outline" size="icon" aria-label="Flere brukere"
                    disabled={plan.qty.value >= plan.qty.max}
                    onClick={() => plan.qty!.onChange(plan.qty!.value + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {plan.totalLabel && <p className="mt-2 text-sm font-medium text-foreground">{plan.totalLabel}</p>}
              </div>
            )}

            <Button
              onClick={plan.onSelect}
              disabled={plan.loading}
              variant={index === 1 ? "default" : "outline"}
              className="w-full text-base font-semibold h-11 transition-all hover:ring-2 hover:ring-primary hover:ring-offset-1"
            >
              {plan.loading ? "Sender deg til betaling…" : plan.buttonText}
            </Button>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">{plan.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
