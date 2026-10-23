import subAsset from "@/assets/shop/abonnement.png.asset.json";
import patchAsset from "@/assets/shop/patch.jpg.asset.json";
import heroAsset from "@/assets/shop/hero.webp.asset.json";
import p1 from "@/assets/shop/p1.jpg.asset.json";
import p2 from "@/assets/shop/p2.jpg.asset.json";
import p3 from "@/assets/shop/p3.jpg.asset.json";
import p4 from "@/assets/shop/p4.jpg.asset.json";
import p5 from "@/assets/shop/p5.jpg.asset.json";

export type ShopProduct = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  priceNok: number; // inkl. mva
  image: string;
  gallery: string[];
  highlights: string[];
  brand: string;
  imageFit: "cover" | "contain";
  /** Subscriptions are sold per user per month and have their own product page. */
  subscription?: boolean;
  /** Hidden from the shop overview (reachable by direct link only). */
  hidden?: boolean;
};

export const DRONETAG_MINI: ShopProduct = {
  id: "dronetag-mini",
  slug: "dronetag-mini",
  title: "Dronetag Mini",
  kicker: "Remote ID · Dronetag",
  tagline: "Remote ID som bare funker.",
  shortDescription:
    "Kompakt Remote ID-sender med Network + Direct RID, 14 timers batteritid og kun 32 gram.",
  longDescription:
    "Mini sender posisjon og identifikasjon sikkert gjennom Dronetag-appen, og åpner for avanserte oppdrag som BVLOS, flåtekoordinering og integrasjon med bemannet luftfart.",
  priceNok: 4899,
  image: p2.url,
  gallery: [p2.url, heroAsset.url, p1.url, p3.url, p4.url, p5.url],
  highlights: [
    "Fri frakt i Norge",
    "Sendes innen 1–3 virkedager",
    "2 års garanti",
    "Compliant med EU, FAA, CAA og CAAS Remote ID",
  ],
  brand: "Dronetag",
  imageFit: "cover",
};

export const AVISAFE_PATCH: ShopProduct = {
  id: "avisafe-patch",
  slug: "avisafe-patch",
  title: "AviSafe Patch",
  kicker: "Merch · AviSafe",
  tagline: "Operations and Safety Management System.",
  shortDescription: "AviSafe-merke i PVC med borrelås (velcro) på baksiden.",
  longDescription:
    "Perfekt for flight-jakken, vesten eller dronebagen. Slitesterk PVC som tåler vær og vind.",
  priceNok: 100,
  image: patchAsset.url,
  gallery: [patchAsset.url],
  highlights: ["Fri frakt i Norge", "Sendes innen 1–3 virkedager", "PVC med velcro på baksiden"],
  brand: "AviSafe",
  imageFit: "contain",
};

export const AVISAFE_ABONNEMENT: ShopProduct = {
  id: "avisafe-abonnement",
  slug: "avisafe-abonnement",
  title: "AviSafe abonnement",
  kicker: "Programvare · AviSafe",
  tagline: "Operativ sikkerhetsstyring for droneoperatører.",
  shortDescription:
    "AviSafe-plattformen for operativ sikkerhetsstyring. Pris per bruker per måned.",
  longDescription:
    "Velg antall brukere. Antall abonnement du kjøper tilsvarer antall brukere.",
  priceNok: 399,
  image: subAsset.url,
  gallery: [subAsset.url],
  highlights: [],
  brand: "AviSafe",
  imageFit: "contain",
  subscription: true,
};

export type SubscriptionPlan = {
  id: "team" | "business" | "enterprise";
  name: string;
  users: string;
  minQty: number;
  maxQty: number;
  priceNok: number | null; // per bruker per måned inkl. mva; null = ta kontakt
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: "team", name: "1–5 brukere", users: "1–5 brukere", minQty: 1, maxQty: 5, priceNok: 399 },
  { id: "business", name: "6–15 brukere", users: "6–15 brukere", minQty: 6, maxQty: 15, priceNok: null },
  { id: "enterprise", name: "Enterprise", users: "16+ brukere", minQty: 16, maxQty: 16, priceNok: null },
];

export const SUBSCRIPTION_FEATURES = [
  "AviSafe-plattform for operativ sikkerhetsstyring",
  "SafeSky-publisering",
  "DJI-integrasjoner og logganalyse",
  "Ubegrenset antall droner og utstyr",
  "AI-risikovurdering",
];

export const SUBSCRIPTION_ADDONS = ["AviOPS med live videooverføring", "Compliance-modul"];

export const TESTVARE: ShopProduct = {
  id: "testvare",
  slug: "testvare",
  title: "Testvare",
  kicker: "Intern test",
  tagline: "Kun for å teste kasse og betaling.",
  shortDescription: "Intern testvare for å teste kassen og betalingen. Sendes ikke.",
  longDescription: "Denne varen brukes bare til å teste kjøpsflyten.",
  priceNok: 3,
  image: patchAsset.url,
  gallery: [patchAsset.url],
  highlights: ["Kun for testing"],
  brand: "AviSafe",
  imageFit: "contain",
  hidden: true,
};

export const SHOP_PRODUCTS: ShopProduct[] = [AVISAFE_ABONNEMENT, DRONETAG_MINI, AVISAFE_PATCH, TESTVARE];

export const productBySlug = (slug: string) => SHOP_PRODUCTS.find((p) => p.slug === slug);
