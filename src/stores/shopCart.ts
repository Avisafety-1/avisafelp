import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShopProduct } from "@/data/shopProducts";

export type ShopCartItem = {
  product: ShopProduct;
  quantity: number;
};

type ShopCartState = {
  items: ShopCartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: ShopProduct, quantity?: number) => void;
  updateQty: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useShopCart = create<ShopCartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      setOpen: (isOpen) => set({ isOpen }),
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      updateQty: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i,
                ),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "avisafe-shop-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectTotalItems = (state: { items: ShopCartItem[] }) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectTotalNok = (state: { items: ShopCartItem[] }) =>
  state.items.reduce((sum, i) => sum + i.quantity * i.product.priceNok, 0);

export const formatNok = (value: number) =>
  new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
