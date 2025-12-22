import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import droneLandscape from "@/assets/drone-landscape.png";
import avisafeLogoBlack from "@/assets/avisafe-logo-black.png";

const Hero = () => {
  return <section className="relative flex flex-col overflow-hidden bg-transparent">
      {/* Drone Landscape Image at top with AviSafe Logo Overlay */}
      <div className="relative w-full">
        <img src={droneLandscape} alt="Drone flying over mountains" className="w-full h-auto" style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
        }} />
        
        {/* AviSafe Logo at bottom of image */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10 w-[85%] max-w-5xl px-4">
          <img 
            src={avisafeLogoBlack} 
            alt="AviSafe" 
            className="w-full h-auto animate-fade-in"
            style={{
              animationDelay: '0.3s',
              animationFillMode: 'both'
            }}
          />
        </div>
        
        {/* CTA Buttons - Positioned at bottom of image */}
        <div className="absolute -bottom-6 sm:-bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <div className="flex flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="bg-[hsl(var(--text-dark-blue))] text-white hover:bg-[hsl(var(--text-dark-blue))]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-6 sm:px-10 h-12 sm:h-14" asChild>
              <a href="mailto:kontakt@avisafe.no" className="shadow-none opacity-100 rounded-md bg-[#123b87]">
                Kontakt oss i dag
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="hero" size="xl" className="bg-[#123b87] text-white hover:bg-[#123b87]/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-6 sm:px-10 h-12 sm:h-14" onClick={() => {
            document.getElementById('team-section')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}>
              Hvem er vi?
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content section below the image */}
      <div className="container mx-auto px-4 sm:px-6 text-center pt-16 pb-8 md:pt-20 md:pb-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Subheadline */}
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2">
            AviSafe bidrar til tryggere og mer effektiv drift ved å gi luftfartsaktører omfattende verktøy for
            sikkerhetsstyring
          </p>
        </div>
      </div>
    </section>;
};
export default Hero;