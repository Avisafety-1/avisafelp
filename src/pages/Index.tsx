import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Security from "@/components/Security";
import Team from "@/components/Team";

const Index = () => {
  const { i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");
  return (
    <div className="min-h-screen bg-hero-bg">
      <Helmet>
        <html lang={isNo ? "nb" : "en"} />
        <title>
          {isNo
            ? "AviSafe – Operasjonssystem for droneoperatører"
            : "AviSafe – Operations platform for drone operators"}
        </title>
        <meta
          name="description"
          content={
            isNo
              ? "AviSafe er operasjonssystemet for norske droneoperatører: planlegg flyoperasjoner, loggfør data og hold deg compliant."
              : "AviSafe is the operations platform for professional drone operators: plan flights, log data and stay compliant."
          }
        />
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
