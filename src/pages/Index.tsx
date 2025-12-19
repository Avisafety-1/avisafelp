import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Team from "@/components/Team";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-bg">
      <Hero />
      <ProductShowcase />
      <Team />
    </div>
  );
};

export default Index;
