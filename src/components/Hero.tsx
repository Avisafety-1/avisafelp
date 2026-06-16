import { useTranslation } from "react-i18next";
import droneLandscape from "@/assets/drone-landscape.png";
import avisafeLogoBlack from "@/assets/avisafe-logo-black.png";
import trustedLogo1 from "@/assets/trusted-logo-1.png";
import norconsultLogoWhite from "@/assets/norconsult-logo-white.png";
import dnLogoWhite from "@/assets/dn-logo-white.png";
import tensioLogo from "@/assets/tensio-logo.png";
import breiliDriftLogo from "@/assets/breili-drift-logo.png";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col overflow-hidden bg-transparent pt-16 md:pt-20">
      {/* Drone Landscape Image at top with AviSafe Logo Overlay */}
      <div className="relative w-full">
        <img
          src={droneLandscape}
          alt="Drone flying over mountains"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          }}
        />

        {/* AviSafe Logo at bottom of image */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10">
          <img
            src={avisafeLogoBlack}
            alt="AviSafe"
            className="w-[200px] sm:w-[280px] md:w-[360px] lg:w-[440px] h-auto animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          />
        </div>

        {/* Trusted By Banner */}
        <div className="absolute -bottom-20 sm:-bottom-24 md:-bottom-28 left-1/2 -translate-x-1/2 z-10 animate-fade-in w-full">
          <div className="flex items-center justify-center mb-1">
            <span className="text-xs sm:text-sm text-foreground/70 font-semibold tracking-widest uppercase">
              {t("hero.trustedBy")}
            </span>
          </div>
          <div className="w-screen relative left-1/2 -translate-x-1/2 bg-black/90 py-2 sm:py-2.5 mb-4 overflow-hidden">
            <div className="hidden sm:flex items-center justify-center gap-8 flex-wrap">
              <img src={trustedLogo1} alt="UAS Voss" className="h-9 w-auto" />
              <img src={tensioLogo} alt="Tensio" className="h-9 w-auto" />
              <img src={norconsultLogoWhite} alt="Norconsult" className="h-7 w-auto" />
              <img src={dnLogoWhite} alt="DN" className="h-9 w-auto" />
              <img src={breiliDriftLogo} alt="Breili Drift" className="h-9 w-auto" />
            </div>
            <div className="sm:hidden flex animate-marquee w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 pr-8 shrink-0">
                  <img src={trustedLogo1} alt="UAS Voss" className="h-7 w-auto" />
                  <img src={tensioLogo} alt="Tensio" className="h-7 w-auto" />
                  <img src={norconsultLogoWhite} alt="Norconsult" className="h-5 w-auto" />
                  <img src={dnLogoWhite} alt="DN" className="h-7 w-auto" />
                  <img src={breiliDriftLogo} alt="Breili Drift" className="h-7 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subline */}
      <div className="container mx-auto px-4 sm:px-6 text-center pt-[110px] sm:pt-[140px] md:pt-[160px] pb-8 md:pb-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="sr-only">{t("hero.h1")}</h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2">
            {t("hero.subline")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
