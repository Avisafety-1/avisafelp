import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  Cloud, 
  Route 
} from "lucide-react";

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
    description: "Hold oversikt over alle droner og utstyr med status, flyvetimer og vedlikeholdsintervaller.",
    image: appDroner,
  },
  {
    id: "detaljer",
    icon: ClipboardList,
    title: "Detaljert oversikt",
    description: "Se all informasjon om hver drone inkludert spesifikasjoner, inspeksjoner og tilknyttet utstyr.",
    image: appDroneDetaljer,
  },
  {
    id: "loggbok",
    icon: ClipboardList,
    title: "Digital loggbok",
    description: "Automatisk loggføring av alle aktiviteter med mulighet for eksport til PDF.",
    image: appLoggbok,
  },
  {
    id: "kalender",
    icon: Calendar,
    title: "Månedsoversikt",
    description: "Visualiser alle oppdrag, hendelser, vedlikehold og dokumenter i en fargekodett kalender.",
    image: appKalender,
  },
  {
    id: "statistikk",
    icon: BarChart3,
    title: "Statistikk",
    description: "Få innsikt i totale oppdrag, flyvetimer, hendelsesfrekvens og aktive ressurser.",
    image: appStatistikk,
  },
  {
    id: "oppdrag",
    icon: MapPin,
    title: "Oppdragsstyring",
    description: "Planlegg og følg opp kommende oppdrag med SORA-vurderinger og risikonivå.",
    image: appOppdrag,
  },
  {
    id: "flyforhold",
    icon: Cloud,
    title: "Værdata og flyforhold",
    description: "Sanntids værdata fra MET Norway med advarsler om luftromsbegrensninger.",
    image: appFlyforhold,
  },
  {
    id: "ruteplanlegging",
    icon: Route,
    title: "Ruteplanlegging",
    description: "Planlegg flyruter visuelt på kartet med automatisk beregning av distanse og luftromssjekk.",
    image: appRuteplanlegging,
  },
];

const ProductShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-dark-blue))] mb-4">
            Alt du trenger for sikker droneoperasjon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AviSafe gir deg komplett oversikt og kontroll over alle aspekter av droneflyging
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Tabs */}
          <div className="space-y-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature.id === feature.id;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-4 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "bg-background hover:bg-muted border border-border"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-primary/10"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${isActive ? "text-primary-foreground" : "text-[hsl(var(--text-dark-blue))]"}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[660px] bg-[hsl(var(--text-dark-blue))] rounded-[3rem] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[hsl(var(--text-dark-blue))] rounded-b-2xl z-10" />
                  
                  {/* Screenshot */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFeature.id}
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      className="w-full h-full object-cover object-top"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
