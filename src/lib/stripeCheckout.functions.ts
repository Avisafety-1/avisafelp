import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

// Server-side price map: the browser only sends product ids and quantities.
const STRIPE_PRICES: Record<string, string> = {
  "dronetag-mini": "price_1USWWzRrLM8xOFbkICmMi5Df",
  "avisafe-patch": "price_1USWbURrLM8xOFbkBWyJjDwD",
};
const PRODUCT_BY_PRICE: Record<string, string> = Object.fromEntries(
  Object.entries(STRIPE_PRICES).map(([id, price]) => [price, id]),
);

type Input = { items: { id: string; quantity: number }[] };

async function stripe(path: string, key: string, init?: RequestInit) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok) {
    console.error("Stripe error", json?.["error"]?.message);
    throw new Error("Stripe-feil");
  }
  return json;
}

export const createStripeCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    if (!data || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Handlevognen er tom");
    }
    const items = data.items.map((i) => {
      const quantity = Math.floor(Number(i.quantity));
      if (!STRIPE_PRICES[i.id]) throw new Error("Ukjent produkt");
      if (!(quantity >= 1 && quantity <= 100)) throw new Error("Ugyldig antall");
      return { id: i.id, quantity };
    });
    return { items };
  })
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("Betaling er ikke konfigurert");

    // Stock check
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: stock } = await supabaseAdmin.from("shop_stock").select("product_id, quantity");
    for (const item of data.items) {
      const left = stock?.find((s) => s.product_id === item.id)?.quantity ?? 0;
      if (item.quantity > left) {
        return { error: left === 0 ? "Et av produktene er utsolgt." : `Bare ${left} stk igjen av et av produktene.` };
      }
    }

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

    const session = await stripe("checkout/sessions", key, { method: "POST", body });
    return { url: session["url"] as string };
  });

// Called from the thank-you page: verifies payment with Stripe and decrements stock once per session.
export const confirmStripeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!data?.sessionId || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(data.sessionId)) {
      throw new Error("Ugyldig ordre");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("Betaling er ikke konfigurert");
    const session = await stripe(
      `checkout/sessions/${data.sessionId}?expand[]=line_items`,
      key,
    );
    if (session["payment_status"] !== "paid") return { paid: false };

    const items = ((session["line_items"]?.data ?? []) as any[])
      .map((li) => ({ id: PRODUCT_BY_PRICE[li.price?.id], quantity: li.quantity as number }))
      .filter((i) => i.id);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("apply_shop_order", {
      _session_id: data.sessionId,
      _items: items,
      _amount: session["amount_total"] ?? null,
      _email: session["customer_details"]?.email ?? null,
    });
    if (error) console.error("apply_shop_order", error.message);
    return { paid: true };
  });

// Subscriptions: price per user per month; quantity = number of users, bounded per tier.
const SUBSCRIPTION_TIERS: Record<string, { price: string; min: number; max: number }> = {
  team: { price: "price_1USWwkRrLM8xOFbkdDEX41KN", min: 1, max: 5 },
  business: { price: "price_1USWwwRrLM8xOFbk2nhRxDb7", min: 6, max: 15 },
};

export const createSubscriptionCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { tier: string; quantity: number }) => {
    const tier = SUBSCRIPTION_TIERS[data?.tier];
    const quantity = Math.floor(Number(data?.quantity));
    if (!tier) throw new Error("Ukjent abonnement");
    if (!(quantity >= tier.min && quantity <= tier.max)) throw new Error("Ugyldig antall brukere");
    return { tier: data.tier, quantity };
  })
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) throw new Error("Betaling er ikke konfigurert");
    const tier = SUBSCRIPTION_TIERS[data.tier]!;
    const origin = getRequestHeader("origin") || "https://avisafe.no";
    const body = new URLSearchParams();
    body.set("mode", "subscription");
    body.set("success_url", `${origin}/butikk/takk?abonnement=1`);
    body.set("cancel_url", `${origin}/butikk/avisafe-abonnement`);
    body.set("locale", "nb");
    body.set("billing_address_collection", "required");
    body.set("phone_number_collection[enabled]", "true");
    body.set("line_items[0][price]", tier.price);
    body.set("line_items[0][quantity]", String(data.quantity));
    const session = await stripe("checkout/sessions", key, { method: "POST", body });
    return { url: session["url"] as string };
  });
