import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/use-in-view";
import { Link } from "react-router-dom";
import { Plane, ClipboardList, BarChart3, Cloud, Route, ChevronLeft, ChevronRight, FileText, AlertTriangle, CheckSquare, Navigation, Brain, ArrowRight, Sparkles, X } from "lucide-react";
import AiSearch from "@/components/AiSearch";
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
import arduLogo from "@/assets/ardu-logo.png";
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
import djiFlighthub2 from "@/assets/dji-flighthub2.jpg";

const djiAnalyseImages = [
  djiAnalyse1, djiAnalyse2, djiAnalyse3, djiAnalyse4, djiAnalyse5,
  djiAnalyse6, djiAnalyse7, djiAnalyse8, djiAnalyse9, djiAnalyse10
];

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

const DjiAnalyseCarousel = () => {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowRight") setLightboxIndex(i => i !== null ? (i + 1) % djiAnalyseImages.length : null);
    if (e.key === "ArrowLeft") setLightboxIndex(i => i !== null ? (i - 1 + djiAnalyseImages.length) % djiAnalyseImages.length : null);
  }, [lightboxIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <div
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {djiAnalyseImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${t("product.dji.analyseAlt")} ${i + 1}`}
            className="flex-shrink-0 w-auto h-[200px] md:h-[260px] rounded-xl shadow-lg snap-center cursor-pointer hover:opacity-90 transition-opacity"
            loading="lazy"
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {/* Lightbox - fixed but compact around image */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex items-center gap-2 mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-8 right-0 text-white/90 hover:text-white z-10"
              aria-label={t("product.dji.lightboxClose")}
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="flex-shrink-0 text-black hover:text-black/70"
              aria-label={t("product.dji.lightboxPrev")}
              onClick={() => setLightboxIndex((lightboxIndex - 1 + djiAnalyseImages.length) % djiAnalyseImages.length)}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <img
              src={djiAnalyseImages[lightboxIndex]}
              alt={`${t("product.dji.analyseAlt")} ${lightboxIndex + 1}`}
              className="max-w-[85vw] md:max-w-[70vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              className="flex-shrink-0 text-black hover:text-black/70"
              aria-label={t("product.dji.lightboxNext")}
              onClick={() => setLightboxIndex((lightboxIndex + 1) % djiAnalyseImages.length)}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}
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
        {/* SORA Banner */}
        <div className="mb-10">
          <Link to="/sora" className="block group">
            <div
              className="relative w-full overflow-hidden shadow-2xl border"
              style={{
                background: "hsl(210 30% 6%)",
                borderColor: "hsl(210 50% 25%)",
                boxShadow: "0 0 40px hsl(210 80% 28% / 0.35), 0 20px 60px hsl(210 30% 6% / 0.8)"
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(210 80% 50% / 0.8), transparent)" }} />

              <div className="relative px-6 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20 text-center">
                {/* Heading */}
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 md:mb-6 leading-tight tracking-tight"
                  style={{ color: "hsl(210 20% 96%)" }}
                >
                  {t("product.soraBannerLine1")}
                </h2>

                {/* Body */}
                <p
                  className="text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed"
                  style={{ color: "hsl(210 30% 75%)" }}
                >
                  {t("product.soraBannerLine2")}
                </p>

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
                  {t("common.seeHowItWorks")}
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

      {/* Integrations Section */}
      <div id="integrations-section" className="container mx-auto px-4 mt-12 md:mt-16 scroll-mt-24">

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("common.integrations")}</h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* DJI */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img src={djiLogo} alt="DJI logo" className="h-14 md:h-16 w-auto" loading="lazy" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t("product.dji.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("product.dji.body")}
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
                  {t("product.dji.advancedTitle")}
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("product.dji.advancedBody")}
                </p>
              </div>

              <DjiAnalyseCarousel />

              {/* FlightHub 2 export */}
              <div className="mt-10 max-w-2xl mx-auto">
                <img
                  src={djiFlighthub2}
                  alt="AviSafe eksport av rutefiler og SORA buffersoner til DJI FlightHub 2"
                  className="w-full h-auto rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ArduPilot */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-xl">
              <div className="flex items-center justify-center">
                <img src={arduLogo} alt="ArduPilot logo" className="w-64 md:w-96 h-auto" loading="lazy" />
              </div>
              <p className="text-base text-muted-foreground leading-relaxed text-center">
                  {t("product.ardu.body")}
                </p>
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
                  {t("product.safesky.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("product.safesky.body")}
                </p>
              </div>
            </div>

            {/* Dronetag */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img src={dronetagLogo} alt="Dronetag logo" className="h-14 md:h-16 w-auto" loading="lazy" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("product.dronetag.title")}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("product.dronetag.body")}
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
                  {t("product.eccairs.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("product.eccairs.body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductShowcase;