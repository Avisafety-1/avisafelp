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

export const SHOP_PRODUCTS: ShopProduct[] = [DRONETAG_MINI, AVISAFE_PATCH];

export const productBySlug = (slug: string) => SHOP_PRODUCTS.find((p) => p.slug === slug);
