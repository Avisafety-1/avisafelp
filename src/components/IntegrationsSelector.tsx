import { useState, useEffect } from "react";
import { Plane, Radio, Cpu, FileWarning, Map, Wifi } from "lucide-react";
import djiMap from "@/assets/dji-map.png";
import djiFlighthub2 from "@/assets/dji-flighthub2.jpg";
import safeskyLogo from "@/assets/safesky-logo.png";
import arduLogo from "@/assets/ardu-logo.png";
import eccairs2Logo from "@/assets/eccairs2-logo.jpeg";
import dronetagMini from "@/assets/dronetag-mini.jpeg";

type Option = {
  title: string;
  description: string;
  image: string;
  icon: JSX.Element;
  contain?: boolean;
};

const options: Option[] = [
  {
    title: "DJI",
    description: "Kart, dashboard og flight-data integrert",
    image: djiMap,
    icon: <Plane size={22} className="text-white" />,
  },
  {
    title: "FlightHub 2",
    description: "Eksporter ruter og SORA-buffere direkte",
    image: djiFlighthub2,
    icon: <Map size={22} className="text-white" />,
  },
  {
    title: "SafeSky",
    description: "Sanntids luftromsbevissthet",
    image: safeskyLogo,
    icon: <Radio size={22} className="text-white" />,
    contain: true,
  },
  {
    title: "ArduPilot",
    description: "Åpen autopilot-plattform",
    image: arduLogo,
    icon: <Cpu size={22} className="text-white" />,
    contain: true,
  },
  {
    title: "Dronetag",
    description: "Remote ID – synlig for alle, hvor som helst",
    image: dronetagMini,
    icon: <Wifi size={22} className="text-white" />,
  },
  {
    title: "ECCAIRS 2",
    description: "Automatisk hendelsesrapportering til myndigheter",
    image: eccairs2Logo,
    icon: <FileWarning size={22} className="text-white" />,
    contain: true,
  },
];

const IntegrationsSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      timers.push(setTimeout(() => setAnimated(prev => [...prev, i]), 150 * i));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="container mx-auto px-4 mt-12 md:mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Integrasjoner</h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3">
            Trykk på et kort for å utforske våre integrasjoner
          </p>
        </div>

        <div className="flex w-full h-[340px] md:h-[440px] items-stretch overflow-hidden rounded-2xl">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={option.title}
                onClick={() => setActiveIndex(index)}
                className="relative overflow-hidden cursor-pointer transition-[flex-grow,box-shadow] duration-700 ease-in-out"
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
                  transitionProperty: "flex-grow, box-shadow, background-size, opacity, transform",
                  boxShadow: isActive
                    ? "0 20px 60px rgba(0,0,0,0.45)"
                    : "0 10px 30px rgba(0,0,0,0.25)",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-700"
                  style={{
                    height: "55%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                    opacity: isActive ? 1 : 0.6,
                  }}
                />

                {/* Label */}
                <div className="absolute left-0 right-0 bottom-4 md:bottom-5 flex items-center px-3 md:px-4 gap-3 pointer-events-none">
                  <div className="min-w-[40px] h-[40px] md:min-w-[44px] md:h-[44px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex-shrink-0">
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
      </div>
    </section>
  );
};

export default IntegrationsSelector;
