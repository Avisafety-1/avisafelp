import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dronetagLogo from "@/assets/dronetag-logo.png";
import safeskyLogo from "@/assets/safesky-logo.png";
import droneLandscape from "@/assets/drone-landscape.png";

const Hero = () => {
  return (
    <section className="relative flex flex-col overflow-hidden bg-background">
      {/* Partner Logos - Top Left - responsive sizing and positioning */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30 flex items-center gap-2 md:gap-4">
        <img src={dronetagLogo} alt="Dronetag" className="h-5 sm:h-6 md:h-8 w-auto" />
        <img src={safeskyLogo} alt="SafeSky" className="h-6 sm:h-8 md:h-10 w-auto rounded-lg" />
      </div>

      {/* Video Section with fade-out bottom */}
      <div className="relative w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay for better text readability */}
        <div 
          className="absolute inset-0 bg-background/30"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}
        />
      </div>

      {/* Drone Landscape Image with fade-in top and fade-out to white at bottom */}
      <div className="relative w-full -mt-12 sm:-mt-20 md:-mt-32 lg:-mt-48">
        <img 
          src={droneLandscape} 
          alt="Drone flying over mountains" 
          className="w-full h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)'
          }}
        />
        
        {/* Content overlay on the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 text-center animate-fade-in">
            <div className="max-w-4xl mx-auto">
              {/* Headline */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg break-words">
                  Sikkerhetsstyring
                  <br />
                  bygget for fremtiden
                </h1>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-center mb-6 md:mb-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="bg-primary text-white hover:bg-primary/90 hover:shadow-2xl group shadow-xl text-sm sm:text-base px-6 sm:px-10 h-12 sm:h-14"
                  asChild
                >
                  <a href="mailto:kontakt@avisafe.no">
                    Kontakt oss i dag
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2 drop-shadow-md">
                AviSafe bidrar til tryggere og mer effektiv drift ved å gi luftfartsaktører omfattende verktøy for
                sikkerhetsstyring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
