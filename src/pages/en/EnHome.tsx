import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";
import { LANDING_PAGES } from "@/content/en/landing-pages";
import { DemoCta } from "@/pages/en/LandingTemplate";

export const EN_HOME_LEAD =
  "AviSafe is a Norwegian web platform that helps drone operators in the EASA specific category manage safety, risk assessments, occurrence reporting, their fleet and the live airspace picture in one system.";

export default function EnHome() {
  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-20 pt-28 md:pt-36">
      <main className="container mx-auto max-w-5xl space-y-16 px-4">
        <header className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-[hsl(var(--text-dark-blue))] md:text-6xl">
            The operations platform for professional drone operators
          </h1>
          <p className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">{EN_HOME_LEAD}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            AviSafe is built to support operators in the specific category and LUC holders. It connects people,
            drones, data and procedures so safety work follows the operations that are actually flown.
          </p>
        </header>

        <section aria-labelledby="platform">
          <h2 id="platform" className="mb-6 text-3xl font-bold text-foreground">The platform</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {LANDING_PAGES.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="mb-2 flex items-center justify-between text-xl font-semibold text-foreground">
                  {p.navLabel}
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="leading-relaxed text-muted-foreground">{p.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="company" className="grid gap-5 md:grid-cols-2">
          <Link to="/en/about" className="rounded-2xl border border-border bg-card p-6 hover:border-primary">
            <h2 id="company" className="mb-2 text-xl font-semibold text-foreground">About AviSafe</h2>
            <p className="text-muted-foreground">Norwegian company founded in 2025 by Gard Haug-Hansen and Rikard Bjørklund.</p>
          </Link>
          <Link to="/en/partners" className="rounded-2xl border border-border bg-card p-6 hover:border-primary">
            <h2 className="mb-2 text-xl font-semibold text-foreground">Partners and integrations</h2>
            <p className="text-muted-foreground">SafeSky, DJI, ECCAIRS 2, Dronetag and ArduPilot.</p>
          </Link>
        </section>

        <DemoCta />
      </main>
    </div>
  );
}
