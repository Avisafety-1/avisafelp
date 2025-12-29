import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { CartDrawer } from "./CartDrawer";
import { toast } from "sonner";

const ImageCarousel = ({ images, title }: { images: Array<{ node: { url: string; altText: string | null } }>; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length <= 1) {
    const image = images[0]?.node;
    return image ? (
      <img
        src={image.url}
        alt={image.altText || title}
        className="w-full h-full object-contain"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/carousel">
      <img
        src={images[currentIndex].node.url}
        alt={images[currentIndex].node.altText || title}
        className="w-full h-full object-contain"
      />
      
      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ShopifyProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(10);
        // Sort products: Dronetag mini first
        const sorted = [...data].sort((a, b) => {
          if (a.node.title.toLowerCase().includes('dronetag')) return -1;
          if (b.node.title.toLowerCase().includes('dronetag')) return 1;
          return 0;
        });
        setProducts(sorted);
      } catch (err) {
        setError("Kunne ikke laste produkter");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success("Lagt til i handlekurven", {
      description: product.node.title,
      position: "top-center"
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Produkter</h2>
          <p className="text-muted-foreground">Ingen produkter funnet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with cart */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Våre produkter
            </h2>
            <p className="text-muted-foreground">
              Profesjonelle løsninger for droneoperatører
            </p>
          </div>
          <CartDrawer />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const images = product.node.images.edges;
            const price = product.node.priceRange.minVariantPrice;

            return (
              <Link key={product.node.id} to={`/product/${product.node.handle}`}>
                <Card 
                  className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md cursor-pointer h-full"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <ImageCarousel images={images} title={product.node.title} />
                  </div>
                  
                  <CardContent className="p-3">
                    <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                      {product.node.title}
                    </h3>
                    
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-primary">
                        {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
                      </span>
                      
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        size="sm"
                        className="gap-1 text-xs px-2"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Kjøp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopifyProducts;
