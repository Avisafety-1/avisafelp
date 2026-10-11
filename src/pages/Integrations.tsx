import { Check, ExternalLink, Mail } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { INTEGRATION_ICONS } from "@/components/integration-icons";
import { INTEGRATIONS, INTEGRATIONS_PAGE as c } from "@/content/integrations";
import { cn } from "@/lib/utils";

export default function Integrations() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="bg-[hsl(210,45%,8%)] pb-14 pt-28 text-white md:pb-20 md:pt-36">
        <div className="container mx-auto max-w-5xl space-y-6 px-4">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold tracking-wide text-sky-300">
            {c.tag}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {c.h1}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            {c.lead}
          </p>
          <nav aria-label={c.h1}>
            <ul className="flex flex-wrap gap-2">
              {INTEGRATIONS.map((it) => {
                const Icon = INTEGRATION_ICONS[it.id];
                return (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15"
                    >
                      <Icon
                        className="h-4 w-4 text-sky-300"
                        aria-hidden="true"
                      />
                      {it.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {INTEGRATIONS.map((it, i) => {
        const Icon = INTEGRATION_ICONS[it.id];
        const flip = i % 2 === 1;
        return (
          <section
            key={it.id}
            id={it.id}
            aria-labelledby={`${it.id}-h2`}
            className={cn(
              "scroll-mt-24 py-14 md:py-20",
              flip ? "bg-background" : "bg-[hsl(210,30%,96%)]",
            )}
          >
            <SectionReveal className="container mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
              <div
                className={cn(
                  "overflow-hidden rounded-2xl bg-[hsl(210,45%,10%)] shadow-lg",
                  flip && "md:order-2",
                )}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  loading="lazy"
                  className={cn(
                    "aspect-[4/3] w-full",
                    it.contain ? "object-contain p-12" : "object-cover",
                  )}
                />
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {it.title}
                </p>
                <h2
                  id={`${it.id}-h2`}
                  className="mt-2 text-2xl font-bold text-[hsl(var(--text-dark-blue))] md:text-3xl"
                >
                  {it.heading}
                </h2>
                <p className="mt-3 text-muted-foreground">{it.body}</p>
                <ul className="mt-4 space-y-2">
                  {it.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-foreground">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
                {it.url && (
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {c.visit} {new URL(it.url).hostname.replace(/^www\./, "")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </SectionReveal>
          </section>
        );
      })}

      <section className="bg-[hsl(210,45%,8%)] py-16 text-center text-white md:py-20">
        <div className="container mx-auto max-w-2xl space-y-5 px-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {c.cta.h2}
          </h2>
          <p className="text-lg text-white/75">{c.cta.body}</p>
          <a
            href="mailto:kontakt@avisafe.no?subject=Integrasjon%20med%20AviSafe"
            className="inline-flex items-center gap-2 rounded-full bg-[#123b87] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e2f6b] md:text-lg"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {c.cta.button}
          </a>
        </div>
      </section>
    </main>
  );
}
