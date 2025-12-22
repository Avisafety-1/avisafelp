import { useRef, useEffect, useState } from "react";
import { Plane, ClipboardList, BarChart3, Cloud, Route, ChevronLeft, ChevronRight, FileText, AlertTriangle, CheckSquare, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import appRuteplanlegging from "@/assets/app-ruteplanlegging.jpg";
import appDashboard from "@/assets/app-dashboard.jpg";
import appStatistikk from "@/assets/app-statistikk.jpg";
import appDokumenter from "@/assets/app-dokumenter.jpg";
import appHendelse from "@/assets/app-hendelse.jpg";
import appFlyforhold from "@/assets/app-flyforhold.jpg";
import appSjekkliste from "@/assets/app-sjekkliste.jpg";
import appStartflytur from "@/assets/app-startflytur.jpg";
import dronetagMini from "@/assets/dronetag-mini.jpeg";

const features = [{
  id: "ruteplanlegging",
  icon: Route,
  title: "Ruteplanlegging",
  description: "Planlegg flyruter visuelt på kartet med automatisk beregning av distanse og luftromssjekk.",
  image: appRuteplanlegging
}, {
  id: "dashboard",
  icon: Plane,
  title: "Dashboard",
  description: "Oversikt over pågående flytur, ressursstatus og nyheter samlet på ett sted.",
  image: appDashboard
}, {
  id: "flyforhold",
  icon: Cloud,
  title: "Værdata og flyforhold",
  description: "Sanntids værdata med advarsler om luftromsbegrensninger og prognoser.",
  image: appFlyforhold
}, {
  id: "statistikk",
  icon: BarChart3,
  title: "Statistikk",
  description: "Få innsikt i totale oppdrag, flyvetimer, hendelsesfrekvens og aktive ressurser.",
  image: appStatistikk
}, {
  id: "dokumenter",
  icon: FileText,
  title: "Dokumenthåndtering",
  description: "Søk og organiser regelverk, prosedyrer, sjekklister og rapporter.",
  image: appDokumenter
}, {
  id: "hendelser",
  icon: AlertTriangle,
  title: "Hendelsesrapportering",
  description: "Rapporter og følg opp hendelser med detaljert logging og kommentarer.",
  image: appHendelse
}, {
  id: "sjekkliste",
  icon: CheckSquare,
  title: "Sjekklister",
  description: "Digitale sjekklister for før takeoff og andre operasjonelle prosedyrer.",
  image: appSjekkliste
}, {
  id: "startflytur",
  icon: Navigation,
  title: "Start flytur",
  description: "Start flytur med SafeSky-integrasjon for live posisjonsdeling.",
  image: appStartflytur
}];
const PhoneMockup = ({
  feature
}: {
  feature: typeof features[0];
}) => {
  const Icon = feature.icon;
  return <div className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col items-center gap-4">
      {/* Feature Info - Above Phone */}
      <div className="text-center px-2 min-h-28 flex flex-col justify-end mb-4">
        <div className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--text-dark-blue))]/10 text-[hsl(var(--text-dark-blue))] px-4 py-2 rounded-full mb-3">
          <Icon className="w-5 h-5" />
          <span className="font-semibold text-sm">{feature.title}</span>
        </div>
        <p className="text-xs text-[hsl(var(--text-dark-blue))] leading-relaxed line-clamp-3">
          {feature.description}
        </p>
      </div>

      {/* Phone Frame */}
      <div className="relative w-[220px] md:w-[260px] h-[440px] md:h-[520px] bg-[hsl(var(--text-dark-blue))] rounded-[2.5rem] p-1.5 shadow-xl">
        {/* Screen */}
        <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[hsl(var(--text-dark-blue))] rounded-b-xl z-10" />
          
          {/* Screenshot */}
          <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-primary/10 rounded-[3rem] blur-xl -z-10" />
      </div>
    </div>;
};
const ProductShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || isHovering) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollSpeed = 0.5; // pixels per frame
    let animationId: number;
    const autoScroll = () => {
      if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If we've reached the end, reset to start
        if (container.scrollLeft >= maxScroll - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    animationId = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAutoScrolling, isHovering]);
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };
  return <section className="relative z-30 pt-0 pb-0 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          
          
        </div>

      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:block">
          <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg" onClick={() => {
          handleInteraction();
          scroll("left");
        }}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg" onClick={() => {
          handleInteraction();
          scroll("right");
        }}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Phone Gallery */}
        <div ref={scrollContainerRef} className="flex gap-6 md:gap-8 overflow-x-auto pb-6 px-6 md:px-12 snap-x snap-mandatory" style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onTouchStart={handleInteraction} onWheel={handleInteraction}>
          {/* Left Spacer */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-180px)]" />
          
          {features.map(feature => <div key={feature.id} className="snap-center">
              <PhoneMockup feature={feature} />
            </div>)}
          
          {/* Right Spacer */}
          <div className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-180px)]" />
        </div>
      </div>

      {/* Demo Video Section */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
          <video 
            src="/avisafe-demo.mp4" 
            controls 
            className="w-full h-auto"
            poster=""
          >
            Din nettleser støtter ikke videoavspilling.
          </video>
        </div>
      </div>

      {/* Dronetag Mini Section */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            AviSafe, offisiell forhandler av Dronetag i Norge. I vår plattform er Dronetag og SafeSky en naturlig integrasjon.
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img src={dronetagMini} alt="Dronetag Mini - Make the drone visible to anyone, anywhere, anytime" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>;
};
export default ProductShowcase;