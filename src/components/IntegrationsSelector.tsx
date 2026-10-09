import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plane, Radio, Cpu, FileWarning, Map, Wifi, FileText } from "lucide-react";
import djiMap from "@/assets/dji-map.png";
import djiFlighthub2 from "@/assets/dji-flighthub2.jpg";
import safeskyLogo from "@/assets/safesky-logo.png";
import arduLogo from "@/assets/ardu-logo.png";
import eccairs2Logo from "@/assets/eccairs2-logo.jpeg";
import dronetagMini from "@/assets/dronetag-mini.jpeg";
import logfilesDashboard from "@/assets/logfiles-dashboard.png.asset.json";
import { useIsMobile } from "@/hooks/use-mobile";

type Option = {
  title: string;
  description: string;
  image: string;
  icon: React.JSX.Element;
  contain?: boolean;
};

const IntegrationsSelector = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState<number[]>([]);
  const isMobile = useIsMobile();
  const options: Option[] = [
    {
      title: "DJI",
      description: t("product.integrationsSelector.dji"),
      image: djiMap,
      icon: <Plane size={22} className="text-white" />,
    },
    {
      title: "FlightHub 2",
      description: t("product.integrationsSelector.flightHub"),
      image: djiFlighthub2,
      icon: <Map size={22} className="text-white" />,
    },
    {
      title: "SafeSky",
      description: t("product.integrationsSelector.safeSky"),
      image: safeskyLogo,
      icon: <Radio size={22} className="text-white" />,
      contain: true,
    },
    {
      title: "ArduPilot",
      description: t("product.integrationsSelector.arduPilot"),
      image: arduLogo,
      icon: <Cpu size={22} className="text-white" />,
      contain: true,
    },
    {
      title: "Dronetag",
      description: t("product.integrationsSelector.dronetag"),
      image: dronetagMini,
      icon: <Wifi size={22} className="text-white" />,
    },
    {
      title: "ECCAIRS 2",
      description: t("product.integrationsSelector.eccairs"),
      image: eccairs2Logo,
      icon: <FileWarning size={22} className="text-white" />,
      contain: true,
    },
    {
      title: t("product.integrationsSelector.logFilesTitle"),
      description: t("product.integrationsSelector.logFiles"),
      image: logfilesDashboard.url,
      icon: <FileText size={22} className="text-white" />,
    },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      timers.push(setTimeout(() => setAnimated(prev => [...prev, i]), 150 * i));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Mobil-konstanter (vw-baserte). Korthøyde ≈ 70vw, peek ≈ halvparten av korthøyden.
  const CARD_H = "70vw";
  const PEEK = "35vw"; // ca. halv korthøyde
  const N = options.length;
  // Total container-høyde: korthøyde + (n-1) * peek
  const containerHeightMobile = `calc(${CARD_H} + ${N - 1} * ${PEEK})`;

  return (
    <section className="container mx-auto px-4 mt-12 md:mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("product.integrationsSelector.heading")}</h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3">
            {t("product.integrationsSelector.instruction")}
          </p>
        </div>

        {isMobile ? (
          // ── MOBIL: vertikal stack med peek ───────────────────────────────
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: containerHeightMobile }}
          >
            {options.map((option, index) => {
              const isActive = activeIndex === index;

              // translateY offset
              let translate: string;
              if (index <= activeIndex) {
                translate = `calc(${index} * ${PEEK})`;
              } else {
                // start rett under aktivt kort + peek for hvert kort etter
                translate = `calc(${activeIndex} * ${PEEK} + ${CARD_H} - ${PEEK} + ${index - activeIndex} * ${PEEK})`;
              }

              // z-index: kort over aktivt får lav z, aktivt høyest, kort under aktivt avtagende
              const z = isActive ? 100 : index < activeIndex ? index + 1 : N - index + 1;

              return (
                <div
                  key={option.title}
                  onClick={() => setActiveIndex(index)}
                  className="absolute left-0 right-0 cursor-pointer overflow-hidden rounded-2xl transition-transform duration-700 ease-in-out"
                  style={{
                    top: 0,
                    height: CARD_H,
                    transform: `translateY(${translate})`,
                    backgroundColor: "#0f1729",
                    backgroundImage: `url('${option.image}')`,
                    backgroundSize: option.contain ? "60% auto" : "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: animated.includes(index) ? 1 : 0,
                    boxShadow: isActive
                      ? "0 20px 60px rgba(0,0,0,0.55)"
                      : "0 -8px 24px rgba(0,0,0,0.35)",
                    zIndex: z,
                    transitionProperty: "transform, box-shadow, opacity",
                  }}
                >
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: "55%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                    }}
                  />

                  {/* Top peek gradient – gjør topp-stripen lesbar når kortet peeker */}
                  <div
                    className="absolute inset-x-0 top-0 pointer-events-none"
                    style={{
                      height: "40%",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 500ms ease",
                    }}
                  />

                  {/* Peek-label (synlig når ikke aktiv) – tittel oppe til venstre */}
                  <div
                    className="absolute top-3 left-3 right-3 flex items-center gap-2 pointer-events-none"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 400ms ease",
                    }}
                  >
                    <div className="min-w-[32px] h-[32px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 shrink-0">
                      {option.icon}
                    </div>
                    <div className="text-white font-semibold text-sm truncate">{option.title}</div>
                  </div>

                  {/* Full label nederst når aktiv */}
                  <div className="absolute left-0 right-0 bottom-4 flex items-center px-4 gap-3 pointer-events-none">
                    <div className="min-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 shrink-0">
                      {option.icon}
                    </div>
                    <div className="text-white">
                      <div
                        className="font-bold text-lg transition-all duration-500"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(20px)",
                        }}
                      >
                        {option.title}
                      </div>
                      <div
                        className="text-sm text-gray-200 transition-all duration-500"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(20px)",
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // ── DESKTOP: uendret horisontal accordion ─────────────────────────
          <div className="flex w-full h-[340px] md:h-[440px] items-stretch overflow-hidden rounded-2xl">
            {options.map((option, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={option.title}
                  onClick={() => setActiveIndex(index)}
                  className="relative overflow-hidden cursor-pointer transition-[grow,box-shadow] duration-700 ease-in-out"
                  style={{
                    flex: isActive ? "7 1 0%" : "1 1 0%",
                    minWidth: 56,
                    borderRight: index < options.length - 1 ? "2px solid hsl(var(--background))" : undefined,
                    backgroundColor: "#0f1729",
                    backgroundImage: `url('${option.image}')`,
                    backgroundSize: option.contain ? (isActive ? "60% auto" : "120% auto") : (isActive ? "auto 100%" : "auto 120%"),
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: animated.includes(index) ? 1 : 0,
                    transform: animated.includes(index) ? "translateX(0)" : "translateX(-40px)",
                    transitionProperty: "grow, box-shadow, background-size, opacity, transform",
                    boxShadow: isActive
                      ? "0 20px 60px rgba(0,0,0,0.45)"
                      : "0 10px 30px rgba(0,0,0,0.25)",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-700"
                    style={{
                      height: "55%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  />
                  <div className="absolute left-0 right-0 bottom-4 md:bottom-5 flex items-center px-3 md:px-4 gap-3 pointer-events-none">
                    <div className="min-w-[40px] h-[40px] md:min-w-[44px] md:h-[44px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 shrink-0">
                      {option.icon}
                    </div>
                    <div className="text-white whitespace-nowrap overflow-hidden">
                      <div
                        className="font-bold text-base md:text-lg transition-all duration-500 ease-in-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(20px)",
                        }}
                      >
                        {option.title}
                      </div>
                      <div
                        className="text-xs md:text-sm text-gray-200 transition-all duration-500 ease-in-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(20px)",
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default IntegrationsSelector;
