import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroDrone from "@/assets/hero-drone.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 md:pt-40">
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-primary text-sm shadow-lg">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">AviSafe</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight drop-shadow-sm">
            Et sikkerhetsstyringssystem<br />bygget for fremtiden
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary/90 max-w-2xl mx-auto leading-relaxed font-medium">
            AviSafe gir luftfartsprofesjonelle omfattende verktøy for sikkerhetsstyring for tryggere og mer effektiv drift
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center pt-4">
            <Button 
              variant="hero" 
              size="xl"
              className="bg-primary text-white hover:bg-primary/90 hover:shadow-2xl group shadow-xl"
            >
              Kontakt oss i dag
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
