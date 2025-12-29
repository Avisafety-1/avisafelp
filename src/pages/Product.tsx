import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";
import { toast } from "sonner";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(50);
        const found = products.find(p => p.node.handle === handle);
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    const variant = product.node.variants.edges[selectedVariantIndex]?.node;
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
      description: `${product.node.title} - ${variant.title}`,
      position: "top-center"
    });
  };

  const hasMultipleVariants = product && product.node.variants.edges.length > 1;
  const selectedVariant = product?.node.variants.edges[selectedVariantIndex]?.node;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Produkt ikke funnet</p>
        <Link to="/#shop">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake til produkter
          </Button>
        </Link>
      </div>
    );
  }

  const images = product.node.images.edges;
  const price = product.node.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/#shop">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbake
            </Button>
          </Link>
          <CartDrawer />
        </div>
      </header>

      {/* Product content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-muted rounded-lg">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex].node.url}
                    alt={images[currentImageIndex].node.altText || product.node.title}
                    className="w-full h-full object-contain"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${product.node.title} bilde ${index + 1}`}
                      className="w-full h-full object-contain bg-muted"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.node.title}
              </h1>
              <p className="text-3xl font-bold text-primary">
                {selectedVariant?.price.currencyCode || price.currencyCode} {parseFloat(selectedVariant?.price.amount || price.amount).toFixed(2)}
              </p>
            </div>

            {product.node.description && (
              <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.node.description}
                </p>
              </div>
            )}

            {/* Variant selector */}
            {hasMultipleVariants && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Velg plan
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.node.variants.edges.map((variant, index) => (
                    <button
                      key={variant.node.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                        selectedVariantIndex === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {variant.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={handleAddToCart} size="lg" className="w-full gap-2">
              <ShoppingCart className="w-5 h-5" />
              Legg til i handlekurv
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
