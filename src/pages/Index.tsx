import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Security from "@/components/Security";
import Team from "@/components/Team";
import SectionReveal from "@/components/SectionReveal";

const Index = () => {
  const { i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");
  const location = useLocation();

  // Handle scroll-to coming from cross-route nav
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)]">
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

      {/* Hero — full-bleed, lives under the fixed header */}
      <section className="relative w-full">
        <Hero />
      </section>

      {/* Product — full-width dark band */}
      <SectionReveal
        id="product-section"
        className="relative w-full bg-[hsl(210,45%,10%)] text-white py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-[hsl(210,30%,96%)] to-transparent" />
        <ProductShowcase />
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-t from-[hsl(210,30%,96%)] to-transparent" />
      </SectionReveal>

      {/* Security — full-width light band, no boxed card */}
      <SectionReveal className="relative w-full bg-[hsl(210,30%,96%)] py-24 md:py-32">
        <Security />
      </SectionReveal>

      {/* Team — full-width subtle band */}
      <SectionReveal className="relative w-full bg-[hsl(210,30%,92%)] py-24 md:py-32">
        <Team />
      </SectionReveal>
    </div>
  );
};

export default Index;
