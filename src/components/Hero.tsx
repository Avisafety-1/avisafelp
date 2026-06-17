import { useTranslation } from "react-i18next";
import droneLandscape from "@/assets/drone-landscape.png";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroVideoWebm from "@/assets/hero-video.webm.asset.json";
import trustedLogo1 from "@/assets/trusted-logo-1.png";
import norconsultLogoWhite from "@/assets/norconsult-logo-white.png";
import dnLogoWhite from "@/assets/dn-logo-white.png";
import tensioLogo from "@/assets/tensio-logo.png";
import breiliDriftLogo from "@/assets/breili-drift-logo.png";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import AppPreviewPhone from "@/components/AppPreviewPhone";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col overflow-hidden bg-transparent">
      <h1 className="sr-only">{t("hero.h1")}</h1>

      <ScrollExpandMedia
        mediaSrc={heroVideo.url}
        webmSrc={heroVideoWebm.url}
        bgImageSrc={droneLandscape}
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

          {/* Subline */}
          <div className="container mx-auto px-4 sm:px-6 text-center py-8 md:py-12">
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2">
              {t("hero.subline")}
            </p>
            <AppPreviewPhone />
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
};

export default Hero;
