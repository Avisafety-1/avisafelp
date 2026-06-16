import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, ArrowDown, Mail, BookOpen } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import droneLandscape from "@/assets/drone-landscape.png";
import avisafeLogoBlack from "@/assets/avisafe-logo-black.png";
import trustedLogo1 from "@/assets/trusted-logo-1.png";
import norconsultLogoWhite from "@/assets/norconsult-logo-white.png";
import dnLogoWhite from "@/assets/dn-logo-white.png";
import tensioLogo from "@/assets/tensio-logo.png";
import breiliDriftLogo from "@/assets/breili-drift-logo.png";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Hero = () => {
  const { t } = useTranslation();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  return <section className="relative flex flex-col overflow-hidden bg-transparent pt-16 md:pt-20">


      {/* Drone Landscape Image at top with AviSafe Logo Overlay */}
      <div className="relative w-full">
        <img src={droneLandscape} alt="Drone flying over mountains" width={1920} height={1080} fetchPriority="high" decoding="async" className="w-full h-auto" style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
        }} />
        
        {/* AviSafe Logo at bottom of image */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10">
          <img 
            src={avisafeLogoBlack} 
            alt="AviSafe" 
            className="w-[200px] sm:w-[280px] md:w-[360px] lg:w-[440px] h-auto animate-fade-in"
            style={{
              animationDelay: '0.3s',
              animationFillMode: 'both'
            }}
          />
        </div>
        
        {/* Trusted By Banner */}
        <div className="absolute -bottom-20 sm:-bottom-24 md:-bottom-28 left-1/2 -translate-x-1/2 z-10 animate-fade-in w-full">
          <div className="flex items-center justify-center mb-1">
            <span className="text-xs sm:text-sm text-foreground/70 font-semibold tracking-widest uppercase">{t("hero.trustedBy")}</span>
          </div>
          <div className="w-screen relative left-1/2 -translate-x-1/2 bg-black/90 py-2 sm:py-2.5 mb-4 overflow-hidden">
            {/* Static layout on tablet/desktop */}
            <div className="hidden sm:flex items-center justify-center gap-8 flex-wrap">
              <img src={trustedLogo1} alt="UAS Voss" className="h-9 w-auto" />
              <img src={tensioLogo} alt="Tensio" className="h-9 w-auto" />
              <img src={norconsultLogoWhite} alt="Norconsult" className="h-7 w-auto" />
              <img src={dnLogoWhite} alt="DN" className="h-9 w-auto" />
              <img src={breiliDriftLogo} alt="Breili Drift" className="h-9 w-auto" />
            </div>
            {/* Auto-scrolling marquee on mobile */}
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

      {/* CTA buttons - flow below image so banner keeps original position */}
      <div className="container mx-auto px-4 sm:px-6 pt-[80px] sm:pt-[110px] md:pt-[130px] animate-fade-in">
        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          <Button variant="hero" size="xl" className="w-full sm:w-auto bg-[hsl(var(--text-dark-blue))] text-white hover:bg-[hsl(var(--text-dark-blue))]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-4 sm:px-10 h-12 sm:h-14" asChild>
            <a href="mailto:kontakt@avisafe.no" className="shadow-none opacity-100 rounded-md bg-[#123b87]">
              {t("common.contact")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button variant="hero" size="xl" className="w-full sm:w-auto bg-[#123b87] text-white hover:bg-[#123b87]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-4 sm:px-10 h-12 sm:h-14" onClick={() => {
            document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            {t("common.whoWeAre")}
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button variant="hero" size="xl" className="w-full sm:w-auto bg-[#123b87] text-white hover:bg-[#123b87]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-4 sm:px-10 h-12 sm:h-14" asChild>
            <Link to="/artikler" className="shadow-none opacity-100 rounded-md bg-[#123b87]">
              {t("common.articles")}
            </Link>
          </Button>
          <Button variant="hero" size="xl" className="w-full sm:w-auto bg-[#123b87] text-white hover:bg-[#123b87]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-4 sm:px-10 h-12 sm:h-14" onClick={() => setNewsletterOpen(true)}>
            {t("common.newsletter")}
          </Button>
        </div>
      </div>

      {/* Content section below the image */}
      <div className="container mx-auto px-4 sm:px-6 text-center pt-8 pb-8 md:pt-12 md:pb-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="sr-only">{t("hero.h1")}</h1>
          {/* Subheadline */}
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2">
            {t("hero.subline")}
          </p>
        </div>
      </div>

      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{t("hero.newsletterTitle")}</DialogTitle>
          </DialogHeader>
          <iframe
            src="https://app.avisafe.no/nyhetsbrev"
            title="AviSafe nyhetsbrev"
            className="w-full h-[420px] border-0"
          />
        </DialogContent>
      </Dialog>
    </section>;
};
export default Hero;