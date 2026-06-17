import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/use-in-view";
import { Plane, ClipboardList, BarChart3, Cloud, Route, ChevronLeft, ChevronRight, FileText, AlertTriangle, CheckSquare, Navigation, Brain, Sparkles } from "lucide-react";
import AiSearch from "@/components/AiSearch";
import IntegrationsSelector from "@/components/IntegrationsSelector";
import SoraRiskLoader from "@/components/SoraRiskLoader";
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



type Feature = {
  id: string;
  tKey: string;
  icon: typeof Plane;
  image: string;
  video?: string;
};

const featuresBase: Feature[] = [
  { id: "dashboard", tKey: "dashboard", icon: Plane, image: appDashboard, video: "/dashboard-demo.mp4" },
  { id: "risikovurdering", tKey: "risikovurdering", icon: Brain, image: appRisikovurdering, video: "/ai-risk-demo.mov" },
  { id: "dronetag", tKey: "dronetag", icon: Navigation, image: appStartflytur, video: "/dronetag-demo.mp4" },
  { id: "startflytur-video", tKey: "startflyturVideo", icon: Navigation, image: appStartflytur, video: "/startflytur-demo.mp4" },
  { id: "ruteplanlegging", tKey: "ruteplanlegging", icon: Route, image: appRuteplanlegging, video: "/oppdrag-demo.mp4" },
  { id: "flyforhold", tKey: "flyforhold", icon: Cloud, image: appFlyforhold },
  { id: "statistikk", tKey: "statistikk", icon: BarChart3, image: appStatistikk },
  { id: "dokumenter", tKey: "dokumenter", icon: FileText, image: appDokumenter },
  { id: "hendelser", tKey: "hendelser", icon: AlertTriangle, image: appHendelse },
];
const PhoneMockup = ({
  feature
}: {
  feature: Feature;
}) => {
  const { t } = useTranslation();
  const Icon = feature.icon;
  const title = t(`product.features.${feature.tKey}.title`);
  const description = t(`product.features.${feature.tKey}.description`);
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
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <p className="text-xs text-[hsl(var(--text-dark-blue))] leading-relaxed line-clamp-3">
          {description}
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
            <img src={feature.image} alt={`AviSafe ${title} – ${description}`} className="w-full h-full object-cover object-top" loading="lazy" />
          )}
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-primary/10 rounded-[3rem] blur-xl -z-10" />
      </div>
    </div>;
};


const LazyDemoVideo = () => {
  const { t } = useTranslation();
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
          {t("product.browserNoVideo")}
        </video>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const { t } = useTranslation();
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
      {/* AI Search */}
      <AiSearch />

      <div>
        <SoraRiskLoader />
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Navigation Buttons - Desktop */}
        <div className="hidden md:block">
          <Button variant="outline" size="icon" aria-label={t("product.scrollLeft")} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg" onClick={() => {
          handleInteraction();
          scroll("left");
        }}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label={t("product.scrollRight")} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg" onClick={() => {
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
          {featuresBase.map(feature => <div key={feature.id} className="snap-center">
              <PhoneMockup feature={feature} />
            </div>)}
        </div>
      </div>

      {/* Demo Video Section */}
      <LazyDemoVideo />

      {/* New interactive integrations selector */}
      <IntegrationsSelector />
    </section>;
};
export default ProductShowcase;