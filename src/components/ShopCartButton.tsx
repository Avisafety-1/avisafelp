import { ShoppingCart } from "lucide-react";
import { useShopCart, selectTotalItems } from "@/stores/shopCart";

const ShopCartButton = ({ scrolled }: { scrolled: boolean }) => {
  const items = useShopCart((s) => s.items);
  const setOpen = useShopCart((s) => s.setOpen);
  const count = selectTotalItems({ items });

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Åpne handlevogn"
      className={`relative p-2 rounded-md transition-colors duration-500 ${
        scrolled
          ? "text-[hsl(210,45%,12%)] hover:bg-black/10"
          : "text-white hover:bg-white/10"
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#123b87] text-white text-[10px] font-semibold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default ShopCartButton;
