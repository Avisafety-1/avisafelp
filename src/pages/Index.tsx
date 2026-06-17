import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Security from "@/components/Security";
import Team from "@/components/Team";
import SectionReveal from "@/components/SectionReveal";

const Index = () => {
  const { i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll-to coming from cross-route nav
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // Clean up state so re-renders don't scroll again
        navigate(location.pathname, { replace: true, state: {} });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

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
      <section id="hero-section" className="relative w-full">
        <Hero />
      </section>

      {/* Product — full-width band */}
      <SectionReveal
        id="product-section"
        className="relative w-full bg-[hsl(210,30%,98%)] py-20 md:py-28"
      >
        <ProductShowcase />
      </SectionReveal>


      {/* Security — full-width light band, no boxed card */}
      <SectionReveal id="security-section" className="relative w-full bg-[hsl(210,30%,96%)] py-24 md:py-32 scroll-mt-24">
        <Security />
      </SectionReveal>

      {/* Team — full-width subtle band */}
      <SectionReveal id="team-section" className="relative w-full bg-[hsl(210,30%,92%)] py-24 md:py-32 scroll-mt-24">
        <Team />
      </SectionReveal>
    </div>
  );
};

export default Index;
