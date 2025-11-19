import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroDrone from "@/assets/hero-drone.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-24 md:pt-32 lg:pt-40">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/80 z-10" />
        <img 
          src={heroDrone} 
          alt="Drone flying over misty mountains" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Badge and Headline */}
          <div className="space-y-4 md:space-y-8 -mt-[30px] md:-mt-[70px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[hsl(var(--text-dark-blue))]/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[hsl(var(--text-dark-blue))] text-xs md:text-sm shadow-lg">
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-semibold">AviSafe</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--text-dark-blue))] leading-tight drop-shadow-sm px-4">
              Sikkerhetsstyringssystem<br />bygget for fremtiden
            </h1>
          </div>

          {/* Subheadline and Button */}
          <div className="space-y-6 md:space-y-8 mt-[80px] md:mt-[150px]">
            {/* CTA Button */}
            <div className="flex items-center justify-center px-4">
              <Button 
                variant="hero" 
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 hover:shadow-2xl group shadow-xl w-full sm:w-auto md:h-14 md:px-10 md:text-base"
                asChild
              >
                <a href="mailto:rikardvb@gmail.com">
                  Kontakt oss i dag
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-2xl text-[hsl(var(--text-dark-blue))]/90 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              AviSafe gir luftfartsaktører omfattende verktøy for sikkerhetsstyring for tryggere og mer effektiv drift
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
