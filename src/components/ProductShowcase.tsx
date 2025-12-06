import { useRef } from "react";
import { 
  Plane, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  MapPin, 
  Cloud, 
  Route,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

import appDroner from "@/assets/app-droner.jpeg";
import appDroneDetaljer from "@/assets/app-drone-detaljer.jpeg";
import appLoggbok from "@/assets/app-loggbok.jpeg";
import appKalender from "@/assets/app-kalender.jpeg";
import appStatistikk from "@/assets/app-statistikk.jpeg";
import appOppdrag from "@/assets/app-oppdrag.jpeg";
import appFlyforhold from "@/assets/app-flyforhold.jpeg";
import appRuteplanlegging from "@/assets/app-ruteplanlegging.jpeg";

const features = [
  {
    id: "droner",
    icon: Plane,
    title: "Droneadministrasjon",
    description: "Oversikt over alle droner og utstyr",
    image: appDroner,
  },
  {
    id: "detaljer",
    icon: ClipboardList,
    title: "Detaljert oversikt",
    description: "Spesifikasjoner og inspeksjoner",
    image: appDroneDetaljer,
  },
  {
    id: "loggbok",
    icon: ClipboardList,
    title: "Digital loggbok",
    description: "Automatisk loggføring og PDF-eksport",
    image: appLoggbok,
  },
  {
    id: "kalender",
    icon: Calendar,
    title: "Månedsoversikt",
    description: "Fargekodett kalender for aktiviteter",
    image: appKalender,
  },
  {
    id: "statistikk",
    icon: BarChart3,
    title: "Statistikk",
    description: "Innsikt i oppdrag og flyvetimer",
    image: appStatistikk,
  },
  {
    id: "oppdrag",
    icon: MapPin,
    title: "Oppdragsstyring",
    description: "Planlegg med SORA-vurderinger",
    image: appOppdrag,
  },
  {
    id: "flyforhold",
    icon: Cloud,
    title: "Værdata",
    description: "Sanntids data fra MET Norway",
    image: appFlyforhold,
  },
  {
    id: "ruteplanlegging",
    icon: Route,
    title: "Ruteplanlegging",
    description: "Visuell planlegging på kart",
    image: appRuteplanlegging,
  },
];

const PhoneMockup = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;
  
  return (
    <div className="flex-shrink-0 w-[260px] md:w-[300px] flex flex-col items-center gap-4">
      {/* Phone Frame */}
      <div className="relative w-[220px] md:w-[260px] h-[440px] md:h-[520px] bg-[hsl(var(--text-dark-blue))] rounded-[2.5rem] p-1.5 shadow-xl">
        {/* Screen */}
        <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[hsl(var(--text-dark-blue))] rounded-b-xl z-10" />
          
          {/* Screenshot */}
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-primary/10 rounded-[3rem] blur-xl -z-10" />
      </div>
      
      {/* Feature Label */}
      <div className="text-center px-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{feature.title}</span>
        </div>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-dark-blue))] mb-4">
            Alt du trenger for sikker droneoperasjon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            AviSafe gir deg komplett oversikt og kontroll
          </p>
          <p className="text-sm text-muted-foreground">
            Swipe for å se alle funksjoner →
          </p>
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Phone Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-6 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Left Spacer */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-180px)]" />
          
          {features.map((feature) => (
            <div key={feature.id} className="snap-center">
              <PhoneMockup feature={feature} />
            </div>
          ))}
          
          {/* Right Spacer */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-180px)]" />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
