import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import droneLandscape from "@/assets/drone-landscape.png";

const Hero = () => {
  return (
    <section className="relative flex flex-col overflow-hidden bg-background">
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
        
        {/* Headline overlay on the image */}
        <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-24 lg:pb-32">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-center drop-shadow-lg break-words px-4">
            Sikkerhetsstyring
            <br />
            bygget for fremtiden
          </h1>
        </div>
      </div>

      {/* Content section below the image */}
      <div className="container mx-auto px-4 sm:px-6 text-center py-8 md:py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Subheadline */}
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed font-medium px-2 mb-8 md:mb-10">
            AviSafe bidrar til tryggere og mer effektiv drift ved å gi luftfartsaktører omfattende verktøy for
            sikkerhetsstyring
          </p>

          {/* CTA Button */}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
