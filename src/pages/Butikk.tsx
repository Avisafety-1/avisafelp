import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";
import { SHOP_PRODUCTS } from "@/data/shopProducts";
import { formatNok } from "@/stores/shopCart";
import { useShopStock } from "@/hooks/use-shop-stock";

const Butikk = () => {
  const stock = useShopStock();

  return (
    <main className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <p className="text-xs uppercase tracking-widest text-[#123b87] font-semibold">AviSafe Butikk</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[hsl(210,45%,12%)]">Utstyr for droneoperatører</h1>
        <p className="mt-3 max-w-2xl text-[hsl(210,45%,30%)]">
          Remote ID, merch og utstyr vi selv bruker. Fri frakt i Norge, sendes innen 1–3 virkedager.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOP_PRODUCTS.map((p) => {
            const qty = stock?.[p.id];
            const soldOut = qty !== undefined && qty <= 0;
            return (
              <Link
                key={p.id}
                to={`/butikk/${p.slug}`}
                className="group flex flex-col rounded-3xl bg-white border border-black/5 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      p.imageFit === "contain" ? "object-contain p-10" : "object-cover"
                    }`}
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 border-t border-black/5">
                  <p className="text-xs uppercase tracking-widest text-[#123b87] font-semibold">{p.kicker}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[hsl(210,45%,12%)]">{p.title}</h2>
                  <p className="mt-2 text-sm text-[hsl(210,45%,30%)] leading-relaxed line-clamp-2">{p.shortDescription}</p>
                  <div className="mt-auto pt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold text-[hsl(210,45%,12%)]">{formatNok(p.priceNok)}</p>
                      <p className="text-xs text-muted-foreground">inkl. 25 % mva</p>
                      {qty !== undefined && (
                        <p className={`mt-1 text-xs font-medium ${soldOut ? "text-destructive" : "text-emerald-700"}`}>
                          {soldOut ? "Utsolgt" : `${qty} stk på lager`}
                        </p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#123b87]">
                      Se produkt
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Butikk;
