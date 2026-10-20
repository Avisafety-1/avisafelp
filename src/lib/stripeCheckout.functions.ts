import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

// Server-side price map: the browser only sends product ids and quantities.
const STRIPE_PRICES: Record<string, string> = {
  "dronetag-mini": "price_1USWWzRrLM8xOFbkICmMi5Df",
};
const MAX_QTY = 9;

type Input = { items: { id: string; quantity: number }[] };

export const createStripeCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    if (!data || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Handlevognen er tom");
    }
    const items = data.items.map((i) => {
      const quantity = Math.floor(Number(i.quantity));
      if (!STRIPE_PRICES[i.id]) throw new Error("Ukjent produkt");
      if (!(quantity >= 1 && quantity <= MAX_QTY)) throw new Error("Ugyldig antall");
      return { id: i.id, quantity };
    });
    return { items };
  })
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("Betaling er ikke konfigurert");
    const origin = getRequestHeader("origin") || "https://avisafe.no";

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", `${origin}/butikk/takk?session_id={CHECKOUT_SESSION_ID}`);
    body.set("cancel_url", `${origin}/butikk/checkout`);
    body.set("locale", "nb");
    body.set("shipping_address_collection[allowed_countries][0]", "NO");
    body.set("phone_number_collection[enabled]", "true");
    data.items.forEach((item, i) => {
      body.set(`line_items[${i}][price]`, STRIPE_PRICES[item.id] as string);
      body.set(`line_items[${i}][quantity]`, String(item.quantity));
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const json = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      console.error("Stripe checkout error", json.error?.message);
      throw new Error("Kunne ikke starte betaling");
    }
    return { url: json.url };
  });
