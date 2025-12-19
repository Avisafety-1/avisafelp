import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dronetagLogo from "@/assets/dronetag-logo.png";
import safeskyLogo from "@/assets/safesky-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 md:pt-40">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Video Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30 z-5" />

      {/* Partner Logos - Top Left */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-4">
        <img src={dronetagLogo} alt="Dronetag" className="h-6 md:h-8 w-auto" />
        <img src={safeskyLogo} alt="SafeSky" className="h-8 md:h-10 w-auto rounded-lg" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center animate-fade-in -mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Headline - moved up 70px */}
          <div className="-mt-[70px]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--text-dark-blue))] leading-tight drop-shadow-sm break-words px-4">
              Sikkerhetsstyring
              <br />
              bygget for fremtiden
            </h1>
          </div>

          {/* Subheadline and Button - moved down 200px */}
          <div className="space-y-8 mt-[200px]">
            {/* CTA Button */}
            <div className="flex items-center justify-center">
              <Button
                variant="hero"
                size="xl"
                className="bg-primary text-white hover:bg-primary/90 hover:shadow-2xl group shadow-xl"
                asChild
              >
                <a href="mailto:kontakt@avisafe.no">
                  Kontakt oss i dag
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-[hsl(var(--text-dark-blue))]/90 max-w-2xl mx-auto leading-relaxed font-medium">
              AviSafe bidrar til tryggere og mer effektiv drift ved å gi luftfartsaktører omfattende verktøy for
              sikkerhetsstyring
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
