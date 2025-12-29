import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import ShopifyProducts from "@/components/ShopifyProducts";
import Security from "@/components/Security";
import Team from "@/components/Team";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-bg">
      <Hero />
      <ProductShowcase />
      <ShopifyProducts />
      <Security />
      <Team />
    </div>
  );
};

export default Index;
