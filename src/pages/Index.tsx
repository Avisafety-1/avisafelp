import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Security from "@/components/Security";
import Team from "@/components/Team";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-bg">
      <Helmet>
        <title>AviSafe – Operasjonssystem for droneoperatører</title>
        <meta name="description" content="AviSafe er operasjonssystemet for norske droneoperatører: planlegg flyoperasjoner, loggfør data og hold deg compliant." />
        <link rel="canonical" href="https://avisafe.no/" />
      </Helmet>
      <Hero />
      <ProductShowcase />
      <Security />
      <Team />
    </div>
  );
};

export default Index;
