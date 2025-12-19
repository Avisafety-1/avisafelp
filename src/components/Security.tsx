import { Shield, Lock, CheckCircle, RefreshCw } from "lucide-react";

const Security = () => {
  const features = [
    { icon: Shield, label: "ISO 27001 prinsipper" },
    { icon: Lock, label: "Tilgangsstyring" },
    { icon: CheckCircle, label: "Risikovurdering" },
    { icon: RefreshCw, label: "Kontinuerlig forbedring" },
  ];

  return (
    <section className="py-24 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">IT-Sikkerhet</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bygget med sikkerhet i fokus
          </h2>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Sikkerhet er en integrert del av hvordan vi utvikler og drifter tjenesten. 
            Vi følger etablerte beste praksiser og styringsprinsipper hentet fra ISO 27001, 
            inkludert systematisk risikovurdering, kontinuerlig forbedring, tilgangsstyring, 
            utviklingsmetoder og prosedyrer for håndtering av data. Målet er å sikre en trygg, 
            robust og pålitelig tjeneste som oppfyller moderne krav til informasjonssikkerhet, 
            selv i en tidlig vekstfase.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border/30"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground text-center">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
