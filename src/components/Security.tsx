const Security = () => {
  return (
    <section className="py-12 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bygget med fokus på sikkerhet
          </h2>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sikkerhet er en integrert del av hvordan vi utvikler og drifter tjenesten. 
            Vi følger etablerte beste praksiser og styringsprinsipper hentet fra ISO 27001, 
            inkludert systematisk risikovurdering, kontinuerlig forbedring, tilgangsstyring, 
            utviklingsmetoder og prosedyrer for håndtering av data. Målet er å sikre en trygg, 
            robust og pålitelig tjeneste som oppfyller moderne krav til informasjonssikkerhet, 
            selv i en tidlig vekstfase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Security;
