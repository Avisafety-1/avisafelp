import { icons, ShieldCheck, Mail } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { SECURITY, SECURITY_EMAIL, type SecLang } from "@/content/security";

export default function SecurityPage({ lang }: { lang: SecLang }) {
  const c = SECURITY[lang];
  return (
    <main className="min-h-screen bg-background pt-28 pb-24 px-4">
      <SectionReveal className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-14 text-background shadow-2xl md:px-12 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative">
            <ShieldCheck className="mb-6 h-12 w-12 text-primary-foreground/90" />
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{c.h1}</h1>
            <p className="mt-6 max-w-2xl text-lg opacity-80 md:text-xl">{c.lead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {c.badges.map((b) => (
                <span key={b} className="rounded-full border border-background/20 bg-background/10 px-4 py-2 text-sm font-medium backdrop-blur">{b}</span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {c.sections.map((s) => (
        <SectionReveal key={s.id} className="mx-auto mt-20 max-w-6xl">
          <section id={s.id} aria-labelledby={`${s.id}-h`}>
            <p className="text-sm font-semibold tracking-widest text-primary">{s.eyebrow}</p>
            <h2 id={`${s.id}-h`} className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{s.title}</h2>
            <div className={s.timeline ? "mt-8 space-y-4 border-l-2 border-border pl-6" : `mt-8 grid gap-4 md:grid-cols-2 ${s.items.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {s.items.map((it) => {
                const Icon = icons[it.icon as keyof typeof icons] ?? ShieldCheck;
                return (
                  <article key={it.title} className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur">
                    <Icon className="mb-4 h-7 w-7 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{it.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{it.body}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </SectionReveal>
      ))}

      <SectionReveal className="mx-auto mt-20 max-w-6xl">
        <section id="disclosure" className="rounded-3xl border border-border bg-card/70 p-8 backdrop-blur md:p-12">
          <p className="text-sm font-semibold tracking-widest text-primary">06</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{c.disclosure.title}</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{c.disclosure.body}</p>
          <p className="mt-2 text-muted-foreground">{SECURITY_EMAIL} · {c.disclosure.pgp}</p>
          <a href={`mailto:${SECURITY_EMAIL}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
            <Mail className="h-5 w-5" /> {c.disclosure.cta}
          </a>
        </section>
      </SectionReveal>
    </main>
  );
}
