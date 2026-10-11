import { Link } from "@/lib/router-compat";
import { ArrowRight, Mail } from "lucide-react";
import { DEMO_MAILTO, LANDING_PAGES, type LandingPage } from "@/content/en/landing-pages";

export const EN_RELATED_LINKS = [
  ...LANDING_PAGES.map((p) => ({ to: p.path, label: p.navLabel })),
  { to: "/en/compliance", label: "Compliance" },
  { to: "/en/about", label: "About AviSafe" },
  { to: "/en/partners", label: "Partners and integrations" },
];

export function DemoCta() {
  return (
    <section className="rounded-2xl bg-[hsl(210,45%,10%)] px-6 py-12 text-center md:px-12">
      <h2 className="text-3xl font-bold text-white md:text-4xl">See AviSafe in practice</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg text-white/75">
        Book a demo and we will walk you through the platform with your own operations in mind.
      </p>
      <a
        href={DEMO_MAILTO}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#123b87] px-7 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#0e2f6b]"
      >
        <Mail className="h-5 w-5" /> Book a demo
      </a>
    </section>
  );
}

export function RelatedLinks({ current }: { current?: string }) {
  return (
    <nav aria-label="More from AviSafe" className="border-t border-border pt-10">
      <h2 className="mb-5 text-xl font-semibold text-foreground">More from AviSafe</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EN_RELATED_LINKS.filter((l) => l.to !== current).map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-foreground transition-colors hover:border-primary"
            >
              {l.label}
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Shared layout for the English landing pages; content comes from data files. */
export default function LandingTemplate({ page }: { page: LandingPage }) {
  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-20 pt-28 md:pt-36">
      <main className="container mx-auto max-w-5xl space-y-16 px-4">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
          <span className="text-foreground">{page.navLabel}</span>
        </nav>

        <header className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-[hsl(var(--text-dark-blue))] md:text-6xl">{page.h1}</h1>
          <p className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">{page.lead}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
          <a
            href={DEMO_MAILTO}
            className="inline-flex items-center gap-2 rounded-full bg-[#123b87] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0e2f6b]"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        <section aria-labelledby="who">
          <h2 id="who" className="mb-6 text-3xl font-bold text-foreground">Who it's for</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.whoFor.map((w) => (
              <li key={w} className="rounded-xl border border-border bg-card px-5 py-4 text-foreground">{w}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="features">
          <h2 id="features" className="mb-6 text-3xl font-bold text-foreground">Key features</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {page.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="regulatory">
          <h2 id="regulatory" className="mb-6 text-3xl font-bold text-foreground">Regulatory basis</h2>
          <dl className="space-y-4">
            {page.regulatory.map((r) => (
              <div key={r.name} className="rounded-xl border border-border bg-card px-5 py-4">
                <dt className="font-semibold text-foreground">{r.name}</dt>
                <dd className="mt-1 text-muted-foreground">{r.text}</dd>
              </div>
            ))}
          </dl>
          {page.note && (
            <p className="mt-6 rounded-xl border-l-4 border-primary bg-card px-5 py-4 text-foreground">{page.note}</p>
          )}
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="mb-6 text-3xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="space-y-3">
            {page.faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card px-5 py-4" open>
                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">{f.q}</summary>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <DemoCta />
        <RelatedLinks current={page.path} />
      </main>
    </div>
  );
}
