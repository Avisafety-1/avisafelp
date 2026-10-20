import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Live stock per product id; null until loaded. */
export function useShopStock() {
  const [stock, setStock] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    supabase
      .from("shop_stock")
      .select("product_id, quantity")
      .then(({ data }) => {
        if (data) setStock(Object.fromEntries(data.map((r) => [r.product_id, r.quantity])));
      });
  }, []);
  return stock;
}
