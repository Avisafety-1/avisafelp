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
  shortDescription: string;
  priceNok: number; // inkl. mva
  image: string;
  gallery: string[];
};

export const DRONETAG_MINI: ShopProduct = {
  id: "dronetag-mini",
  slug: "dronetag-mini",
  title: "Dronetag Mini",
  shortDescription:
    "Kompakt Remote ID-sender med Network + Direct RID, 14 timers batteritid og kun 32 gram.",
  priceNok: 4899,
  image: p2.url,
  gallery: [p2.url, heroAsset.url, p1.url, p3.url, p4.url, p5.url],
};

export const SHOP_PRODUCTS: ShopProduct[] = [DRONETAG_MINI];

export const AVISAFE_PATCH: ShopProduct = {
  id: "avisafe-patch",
  slug: "avisafe-patch",
  title: "AviSafe Patch",
  shortDescription: "AviSafe-merke i PVC med borrelås (velcro) på baksiden.",
  priceNok: 100,
  image: patchAsset.url,
  gallery: [patchAsset.url],
};

SHOP_PRODUCTS.push(AVISAFE_PATCH);
