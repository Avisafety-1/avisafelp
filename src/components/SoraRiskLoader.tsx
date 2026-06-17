import { ProgressiveFluxLoader, type ProgressiveFluxPhase } from "@/components/ui/progressive-flux-loader";

const PHASES: ProgressiveFluxPhase[] = [
  { at: 0, label: "Henter værdata…" },
  { at: 8, label: "Sjekker NOTAM…" },
  { at: 18, label: "Analyserer luftrom…" },
  { at: 28, label: "Leser loggbøker…" },
  { at: 38, label: "Beregner befolkningstetthet…" },
  { at: 48, label: "Kontrollerer dronevedlikehold…" },
  { at: 58, label: "Vurderer batteristatus…" },
  { at: 68, label: "Sjekker pilotkompetanse…" },
  { at: 76, label: "Evaluerer terreng…" },
  { at: 84, label: "Identifiserer risikofaktorer…" },
  { at: 92, label: "Genererer SORA-rapport…" },
  { at: 100, label: "Risikovurdering klar" },
];

const SoraRiskLoader = () => {
  return (
    <section className="relative z-30 py-16 md:py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl border px-6 sm:px-10 py-12 md:py-16"
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
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "hsl(195 90% 70%)" }}
            >
              AviSafe SORA-motor
            </p>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: "hsl(210 20% 96%)" }}
            >
              Slik bygges risikovurderingen
            </h3>
            <p
              className="mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: "hsl(210 30% 75%)" }}
            >
              AviSafe vurderer over 17 datakilder for å bygge en komplett
              risikovurdering for alle dine oppdrag. Prosessen tar 30 sekunder og
              gir deg mulighet til å kommentere på identifiserte risikofaktorer.
              Kjør ny vurdering med mitigeringer og AviSafe genererer en
              SORA-rapport for oppdraget.
            </p>
          </div>

          <ProgressiveFluxLoader
            phases={PHASES}
            duration={18}
            loop
            className="max-w-2xl"
            textClassName="text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default SoraRiskLoader;
