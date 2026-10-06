import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProgressiveFluxLoader, type ProgressiveFluxPhase } from "@/components/ui/progressive-flux-loader";

const SoraRiskLoader = () => {
  const { t } = useTranslation();

  const PHASES: ProgressiveFluxPhase[] = [
    { at: 0, label: t("soraLoader.phases.weather") },
    { at: 8, label: t("soraLoader.phases.notam") },
    { at: 18, label: t("soraLoader.phases.airspace") },
    { at: 28, label: t("soraLoader.phases.logs") },
    { at: 38, label: t("soraLoader.phases.population") },
    { at: 48, label: t("soraLoader.phases.maintenance") },
    { at: 58, label: t("soraLoader.phases.battery") },
    { at: 68, label: t("soraLoader.phases.pilot") },
    { at: 76, label: t("soraLoader.phases.terrain") },
    { at: 84, label: t("soraLoader.phases.risk") },
    { at: 92, label: t("soraLoader.phases.report") },
    { at: 100, label: t("soraLoader.phases.done") },
  ];

  return (
    <section className="relative z-30 py-16 md:py-24 bg-transparent">
      <div className="md:px-4 lg:px-8">
        <div
          className="relative overflow-hidden md:rounded-2xl md:border md:px-6 lg:px-10 py-12 md:py-16 px-4"
          style={{
            background: "hsl(210 30% 8%)",
            borderColor: "hsl(210 50% 25%)",
            boxShadow:
              "0 0 40px hsl(210 80% 28% / 0.25), 0 20px 60px hsl(210 30% 6% / 0.6)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, hsl(210 80% 50% / 0.8), transparent)",
            }}
          />

          <div className="text-center mb-10">
            <p
              className="text-base sm:text-xl font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "hsl(195 90% 70%)" }}
            >
              {t("soraLoader.eyebrow")}
            </p>
            <h3
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
              style={{ color: "hsl(210 20% 96%)" }}
            >
              {t("soraLoader.heading")}
            </h3>
            <p
              className="mt-4 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "hsl(210 30% 75%)" }}
            >
              {t("soraLoader.body")}
            </p>
          </div>

          <ProgressiveFluxLoader
            phases={PHASES}
            duration={18}
            loop
            className="max-w-3xl"
            textClassName="text-white"
          />

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/sora"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl border transition-all duration-200 text-base md:text-xl hover:scale-[1.03]"
              style={{
                background: "hsl(210 80% 28%)",
                borderColor: "hsl(210 80% 50% / 0.4)",
                color: "hsl(210 20% 96%)",
                boxShadow: "0 0 20px hsl(210 80% 28% / 0.5)",
              }}
            >
              {t("soraLoader.cta")}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoraRiskLoader;
