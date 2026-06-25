import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useShopCart,
  selectTotalNok,
  formatNok,
} from "@/stores/shopCart";

const ShopCartDrawer = () => {
  const navigate = useNavigate();
  const items = useShopCart((s) => s.items);
  const isOpen = useShopCart((s) => s.isOpen);
  const setOpen = useShopCart((s) => s.setOpen);
  const updateQty = useShopCart((s) => s.updateQty);
  const removeItem = useShopCart((s) => s.removeItem);
  const total = selectTotalNok({ items });

  const goToCheckout = () => {
    setOpen(false);
    navigate("/butikk/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Handlevogn
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6 -mx-6 px-6">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              Handlevognen din er tom.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-md object-cover bg-muted shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNok(product.priceNok)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-accent"
                        aria-label="Reduser"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-accent"
                        aria-label="Øk"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="ml-auto w-7 h-7 rounded-md text-muted-foreground hover:text-destructive flex items-center justify-center"
                        aria-label="Fjern"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Totalt (inkl. mva)</span>
              <span className="font-semibold">{formatNok(total)}</span>
            </div>
            <Button
              onClick={goToCheckout}
              className="w-full bg-[#123b87] hover:bg-[#0e2f6b] text-white"
            >
              Gå til kassen
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShopCartDrawer;
