import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Link } from "react-router-dom";
import { Plane, ClipboardList, BarChart3, Cloud, Route, ChevronLeft, ChevronRight, FileText, AlertTriangle, CheckSquare, Navigation, Brain, ArrowRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import appRuteplanlegging from "@/assets/app-ruteplanlegging.jpg";
import appRisikovurdering from "@/assets/app-risikovurdering.jpeg";
import appDashboard from "@/assets/app-dashboard.jpg";
import appStatistikk from "@/assets/app-statistikk.jpg";
import appDokumenter from "@/assets/app-dokumenter.jpg";
import appHendelse from "@/assets/app-hendelse.jpg";
import appFlyforhold from "@/assets/app-flyforhold.jpg";
import appSjekkliste from "@/assets/app-sjekkliste.jpg";
import appStartflytur from "@/assets/app-startflytur.jpg";
import dronetagMini from "@/assets/dronetag-mini.jpeg";
import eccairs2Logo from "@/assets/eccairs2-logo.jpeg";
import dronetagLogo from "@/assets/dronetag-logo.png";
import safeskyLogo from "@/assets/safesky-logo.png";
import djiLogo from "@/assets/dji-logo.png";
import djiMap from "@/assets/dji-map.png";
import djiDashboard from "@/assets/dji-dashboard.png";
import djiAnalyse1 from "@/assets/dji-analyse-1.jpeg";
import djiAnalyse2 from "@/assets/dji-analyse-2.jpeg";
import djiAnalyse3 from "@/assets/dji-analyse-3.jpeg";
import djiAnalyse4 from "@/assets/dji-analyse-4.jpeg";
import djiAnalyse5 from "@/assets/dji-analyse-5.jpeg";
import djiAnalyse6 from "@/assets/dji-analyse-6.jpeg";
import djiAnalyse7 from "@/assets/dji-analyse-7.jpeg";
import djiAnalyse8 from "@/assets/dji-analyse-8.jpeg";
import djiAnalyse9 from "@/assets/dji-analyse-9.jpeg";
import djiAnalyse10 from "@/assets/dji-analyse-10.jpeg";

const djiAnalyseImages = [
  djiAnalyse1, djiAnalyse2, djiAnalyse3, djiAnalyse4, djiAnalyse5,
  djiAnalyse6, djiAnalyse7, djiAnalyse8, djiAnalyse9, djiAnalyse10
];

const features = [{
  id: "dashboard",
  icon: Plane,
  title: "Dashboard",
  description: "Oversikt over pågående flytur, ressursstatus og nyheter samlet på ett sted.",
  image: appDashboard,
  video: "/dashboard-demo.mp4"
}, {
  id: "risikovurdering",
  icon: Brain,
  title: "Risikovurderinger med AI",
  description: "Gjennomfør risikovurderinger med kunstig intelligens som hjelper deg å identifisere farer.",
  image: appRisikovurdering,
  video: "/ai-risk-demo.mov"
}, {
  id: "dronetag",
  icon: Navigation,
  title: "Dronetag-integrasjon",
  description: "Dronetag Remote ID – direkte integrert i AviSafe. Analyser historisk data",
  image: appStartflytur,
  video: "/dronetag-demo.mp4"
}, {
  id: "startflytur-video",
  icon: Navigation,
  title: "Start flytur",
  description: "Start flytur med SafeSky-integrasjon for live posisjonsdeling.",
  image: appStartflytur,
  video: "/startflytur-demo.mp4"
}, {
  id: "ruteplanlegging",
  icon: Route,
  title: "Oppdragsplanlegging",
  description: "Planlegg flyruter visuelt på kartet med automatisk beregning av distanse og luftromssjekk.",
  image: appRuteplanlegging,
  video: "/oppdrag-demo.mp4"
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
}];
const PhoneMockup = ({
  feature
}: {
  feature: typeof features[0];
}) => {
  const Icon = feature.icon;
  const { ref: inViewRef, isInView } = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current && feature.video) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView, feature.video]);

  return <div ref={inViewRef} className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col items-center gap-4">
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
          
          {/* Screenshot or Video */}
          {feature.video ? (
            <video
              ref={videoRef}
              src={isInView ? feature.video : undefined}
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover object-top rounded-[2rem]"
              poster={feature.image}
            />
          ) : (
            <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top" loading="lazy" />
          )}
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-primary/10 rounded-[3rem] blur-xl -z-10" />
      </div>
    </div>;
};

const LazyDemoVideo = () => {
  const { ref, isInView } = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <div ref={ref} className="container mx-auto px-4 mt-12 md:mt-16">
      <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
        <video
          ref={videoRef}
          src={isInView ? "/avisafe-demo.mp4" : undefined}
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-auto"
        >
          Din nettleser støtter ikke videoavspilling.
        </video>
      </div>
    </div>
  );
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
        {/* SORA Banner */}
        <div className="mb-10">
          <Link to="/sora" className="block group">
            <div
              className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                background: "hsl(210 30% 6%)",
                borderColor: "hsl(210 50% 25%)",
                boxShadow: "0 0 40px hsl(210 80% 28% / 0.35), 0 20px 60px hsl(210 30% 6% / 0.8)"
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(210 80% 50% / 0.8), transparent)" }} />

              <div className="relative px-8 py-10 md:py-12 text-center">
                {/* Heading */}
                <h2
                  className="text-2xl md:text-4xl font-bold mb-7 leading-tight"
                  style={{ color: "hsl(210 20% 96%)" }}
                >
                  Norges mest avanserte verktøy<br className="hidden md:block" /> for SORA-risikovurderinger
                </h2>

                {/* CTA Button */}
                <div
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl border transition-all duration-200 text-sm md:text-base group-hover:scale-[1.03]"
                  style={{
                    background: "hsl(210 80% 28%)",
                    borderColor: "hsl(210 80% 50% / 0.4)",
                    color: "hsl(210 20% 96%)",
                    boxShadow: "0 0 20px hsl(210 80% 28% / 0.5)"
                  }}
                >
                  Se hvordan det fungerer
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
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
          {features.map(feature => <div key={feature.id} className="snap-center">
              <PhoneMockup feature={feature} />
            </div>)}
        </div>
      </div>

      {/* Demo Video Section */}
      <LazyDemoVideo />

      {/* Integrations Section */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Integrasjoner</h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* DJI */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img src={djiLogo} alt="DJI logo" className="h-14 md:h-16 w-auto" loading="lazy" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Full støtte for DJI RC PRO/PLUS
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Støtter opplasting av DJI fly-logger fra over 40 dronemodeller. 
                  AviSafe integrerer sømløst med DJI-kontrollere for automatisk import av flydata, 
                  loggføring og dokumentasjon direkte i plattformen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="relative -rotate-1">
                  <img
                    src={djiMap}
                    alt="DJI RC PRO kartvisning"
                    className="w-full sm:w-[340px] md:w-[400px] h-auto rounded-2xl shadow-xl"
                    style={{
                      maskImage: 'radial-gradient(ellipse 85% 75% at center, black 50%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at center, black 50%, transparent 100%)'
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="relative rotate-1">
                  <img
                    src={djiDashboard}
                    alt="DJI RC PRO dashboard"
                    className="w-full sm:w-[340px] md:w-[400px] h-auto rounded-2xl shadow-xl"
                    style={{
                      maskImage: 'radial-gradient(ellipse 85% 75% at center, black 50%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at center, black 50%, transparent 100%)'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Avansert analyse */}
              <div className="text-center mt-10 mb-6">
                <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Avansert analyse fra loggfiler
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Analyser data i detalj – app warnings, kontrollinput, batteri, vind, hastighet og mer.
                </p>
              </div>

              <DjiAnalyseCarousel />
            </div>

            {/* SafeSky */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={safeskyLogo}
                  alt="SafeSky logo"
                  className="h-14 md:h-16 w-auto"
                  loading="lazy"
                />
              </div>

              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  SafeSky - live publisering og situasjonsbilde
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AviSafe er integrert med SafeSky for live posisjonsdeling og økt situasjonsforståelse under operasjoner.
                  Når en flytur startes i AviSafe kan relevant informasjon og posisjonsdata deles i SafeSky, slik at både
                  operatør og andre luftromsbrukere får bedre oversikt. Resultatet er enklere samhandling, færre misforståelser
                  og tryggere operasjoner – med dokumentasjon og sporbarhet samlet i én plattform.
                </p>
              </div>
            </div>

            {/* Dronetag */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img src={dronetagLogo} alt="Dronetag logo" className="h-14 md:h-16 w-auto" loading="lazy" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Dronetag</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AviSafe, offisiell forhandler av Dronetag i Norge. I vår plattform er Dronetag og SafeSky en naturlig
                  integrasjon for å bedre flysikkerheten til alle luftromsaktører.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={dronetagMini}
                  alt="Dronetag Mini - Make the drone visible to anyone, anywhere, anytime"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ECCAIRS2 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={eccairs2Logo}
                  alt="ECCAIRS2 logo"
                  className="h-14 md:h-16 w-auto"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  ECCAIRS2 – rapportering gjort enkelt
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AviSafe er integrert med ECCAIRS2, EUs offisielle system for hendelsesrapportering i luftfarten. Det betyr
                  at hendelser kan registreres strukturert i AviSafe og sendes direkte til ECCAIRS2 via API – med korrekt
                  taksonomi og obligatoriske felter på plass. Mindre manuelt arbeid, færre feil og trygg compliance mot EASA
                  og Luftfartstilsynet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductShowcase;