import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import heroDrone from "@/assets/hero-drone.jpg.asset.json";
import heroDroneMobile from "@/assets/hero-drone-mobile.jpg.asset.json";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroVideoWebm from "@/assets/hero-video.webm.asset.json";
import trustedLogo1 from "@/assets/trusted-logo-1.png";
import norconsultLogoWhite from "@/assets/norconsult-logo-white.png";
import dronenordLogoWhite from "@/assets/dronenord-logo-white.png.asset.json";
import tensioLogo from "@/assets/tensio-logo.png";
import breiliDriftLogo from "@/assets/breili-drift-logo.png";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import AppPreviewPhone from "@/components/AppPreviewPhone";

const Hero = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="relative flex flex-col overflow-hidden bg-transparent">
      <h1 className="sr-only">{t("hero.h1")}</h1>

      <ScrollExpandMedia
        mediaSrc={heroVideo.url}
        webmSrc={heroVideoWebm.url}
        bgImageSrc={heroDrone.url}
        mobileBgImageSrc={heroDroneMobile.url}
        titleTop={t("hero.expandLine1")}
        titleBottom={t("hero.expandLine2")}
      >
        {/* Trusted By Banner */}
        <div className="w-full animate-fade-in">
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
              <img src={dronenordLogoWhite.url} alt="Dronenord" className="h-11 w-auto" />
              <img src={breiliDriftLogo} alt="Breili Drift" className="h-9 w-auto" />
            </div>
            <div className="sm:hidden flex animate-marquee w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 pr-8 shrink-0">
                  <img src={trustedLogo1} alt="UAS Voss" className="h-7 w-auto" />
                  <img src={tensioLogo} alt="Tensio" className="h-7 w-auto" />
                  <img src={norconsultLogoWhite} alt="Norconsult" className="h-5 w-auto" />
                  <img src={dronenordLogoWhite.url} alt="Dronenord" className="h-7 w-auto" />
                  <img src={breiliDriftLogo} alt="Breili Drift" className="h-7 w-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Subline + Phone side-by-side on desktop */}
          <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
              <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 md:h-full md:justify-center max-w-xs sm:max-w-2xl md:max-w-xl lg:max-w-2xl px-2 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {t("hero.sublineHeadline")}
                </h2>
                <div className={`${expanded ? "block" : "hidden md:block"}`}>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-medium">
                    {t("hero.sublineBody")}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-medium mt-4">
                    {t("hero.sublineExtra")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="md:hidden mx-auto mt-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={expanded ? "Skjul tekst" : "Vis mer tekst"}
                >
                  <ChevronDown
                    size={28}
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <AppPreviewPhone />
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
};

export default Hero;
