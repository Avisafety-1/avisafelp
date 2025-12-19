import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dronetagLogo from "@/assets/dronetag-logo.png";
import safeskyLogo from "@/assets/safesky-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Video - width fits screen, height auto */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Video Overlay for better text readability - adjusted for mobile */}
      <div className="absolute inset-0 bg-background/40 md:bg-background/30 z-[5]" />

      {/* Partner Logos - Top Left - responsive sizing and positioning */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30 flex items-center gap-2 md:gap-4">
        <img src={dronetagLogo} alt="Dronetag" className="h-5 sm:h-6 md:h-8 w-auto" />
        <img src={safeskyLogo} alt="SafeSky" className="h-6 sm:h-8 md:h-10 w-auto rounded-lg" />
      </div>

      {/* Content - responsive layout */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60svh] md:min-h-[70svh]">
          {/* Headline - responsive typography */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--text-dark-blue))] leading-tight drop-shadow-sm break-words">
              Sikkerhetsstyring
              <br />
              bygget for fremtiden
            </h1>
          </div>

          {/* Subheadline and Button - responsive spacing */}
          <div className="space-y-6 md:space-y-8">
            {/* CTA Button - responsive sizing */}
            <div className="flex items-center justify-center">
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

            {/* Subheadline - responsive typography */}
            <p className="text-base sm:text-xl md:text-2xl text-[hsl(var(--text-dark-blue))]/90 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2">
              AviSafe bidrar til tryggere og mer effektiv drift ved å gi luftfartsaktører omfattende verktøy for
              sikkerhetsstyring
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient - responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
