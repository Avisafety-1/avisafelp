import {
  ArrowDown,
  Building2,
  Database,
  Eraser,
  FileLock2,
  FileText,
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Radar,
  ShieldCheck,
  Siren,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { VerticalTimeline } from "@/components/ui/vertical-timeline";
import SectionReveal from "@/components/SectionReveal";
import {
  SECURITY,
  SECURITY_EMAIL,
  dpaMailto,
  type SecIcon,
  type SecLang,
} from "@/content/security";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const ICONS: Record<SecIcon, LucideIcon> = {
  lock: Lock,
  building: Building2,
  fingerprint: Fingerprint,
  key: KeyRound,
  file: FileLock2,
  shieldCheck: ShieldCheck,
  database: Database,
  radar: Radar,
  globe: Globe,
  fileText: FileText,
  eraser: Eraser,
  siren: Siren,
  timer: Timer,
};

// Bento placement for the five protection cards; the tall middle card is the
// one about separated customer data.
const BENTO_AREAS = [
  "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  "md:[grid-area:2/1/3/13] xl:[grid-area:1/5/3/9]",
  "md:[grid-area:3/1/4/7] xl:[grid-area:1/9/2/13]",
  "md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]",
];

const DARK = "bg-[hsl(210,45%,8%)] text-white";
const LIGHT = "bg-[hsl(210,30%,96%)]";
const H2 = "text-3xl font-bold tracking-tight md:text-4xl";
const EYEBROW = "text-sm font-semibold uppercase tracking-[0.18em]";

function SectionHeading({
  id,
  eyebrow,
  h2,
  lead,
  dark,
}: {
  id: string;
  eyebrow: string;
  h2: string;
  lead: string;
  dark?: boolean;
}) {
  return (
    <SectionReveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className={cn(EYEBROW, dark ? "text-sky-300" : "text-[#123b87]")}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          H2,
          "mt-3",
          dark ? "text-white" : "text-[hsl(var(--text-dark-blue))]",
        )}
      >
        {h2}
      </h2>
      <p
        className={cn(
          "mt-4 text-lg",
          dark ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {lead}
      </p>
    </SectionReveal>
  );
}

function TechLine({
  text,
  dark,
}: {
  text?: string | undefined;
  dark?: boolean;
}) {
  if (!text) return null;
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-wide",
        dark ? "text-sky-300/80" : "text-[#123b87]/80",
      )}
    >
      {text}
    </p>
  );
}

function LightCard({
  icon,
  title,
  body,
  tech,
}: {
  icon: SecIcon;
  title: string;
  body: string;
  tech?: string | undefined;
}) {
  const Icon = ICONS[icon];
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--card-shadow)]">
      <span className="grid size-11 place-items-center rounded-xl bg-[#123b87]/10 text-[#123b87]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="flex-1 leading-relaxed text-muted-foreground">{body}</p>
      <TechLine text={tech} />
    </article>
  );
}

export default function SecurityPage({ lang }: { lang: SecLang }) {
  const c = SECURITY[lang];
  const disclosureId = lang === "nb" ? "sarbarhet" : "vulnerability";

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section
        className={`${DARK} relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl"
        />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold tracking-wide text-sky-300">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {c.hero.tag}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {c.hero.h1}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              {c.hero.lead}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={dpaMailto(lang)}
                className="inline-flex items-center gap-2 rounded-full bg-[#123b87] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e2f6b] md:text-lg"
              >
                <FileText className="size-5" aria-hidden="true" />
                {c.hero.ctaPrimary}
              </a>
              <button
                type="button"
                onClick={() => scrollToSection(disclosureId)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {c.hero.ctaSecondary}
                <ArrowDown className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4">
            {c.hero.facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur"
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {f.value}
                </dd>
                <dd className="mt-1 text-sm leading-snug text-white/65">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Protection: bento with glowing borders */}
      <section
        className={`${DARK} border-t border-white/5 py-16 md:py-24`}
        aria-labelledby="beskyttelse-h2"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            id="beskyttelse-h2"
            eyebrow={c.protect.eyebrow}
            h2={c.protect.h2}
            lead={c.protect.lead}
            dark
          />
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2">
            {c.protect.items.map((it, i) => {
              const Icon = ICONS[it.icon];
              const featured = i === 2;
              return (
                <li
                  key={it.title}
                  className={cn("min-h-[15rem] list-none", BENTO_AREAS[i])}
                >
                  <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div
                      className={cn(
                        "relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6",
                        featured
                          ? "bg-gradient-to-b from-[#123b87]/40 to-[hsl(210,45%,10%)]"
                          : "bg-[hsl(210,40%,11%)]",
                      )}
                    >
                      <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-sky-300">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3
                        className={cn(
                          "font-semibold tracking-tight text-white",
                          featured ? "text-2xl md:text-3xl" : "text-xl",
                        )}
                      >
                        {it.title}
                      </h3>
                      <p
                        className={cn(
                          "flex-1 leading-relaxed text-white/70",
                          featured && "md:text-lg",
                        )}
                      >
                        {it.body}
                      </p>
                      <TechLine text={it.tech} dark />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Audits */}
      <section
        className={`${LIGHT} py-16 md:py-24`}
        aria-labelledby="testet-h2"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            id="testet-h2"
            eyebrow={c.audits.eyebrow}
            h2={c.audits.h2}
            lead={c.audits.lead}
          />
          <SectionReveal className="mx-auto max-w-3xl">
            <VerticalTimeline
              items={c.audits.items.map((a) => ({
                marker: a.marker,
                icon: ICONS[a.icon],
                title: a.title,
                body: a.body,
              }))}
            />
          </SectionReveal>
        </div>
      </section>

      {/* Privacy and incident response */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="personvern-h2"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            id="personvern-h2"
            eyebrow={c.privacy.eyebrow}
            h2={c.privacy.h2}
            lead={c.privacy.lead}
          />
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {c.privacy.items.map((it, i) => (
              <SectionReveal key={it.title} delay={i * 60}>
                <LightCard {...it} />
              </SectionReveal>
            ))}
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionReveal>
              <p className={cn(EYEBROW, "text-[#123b87]")}>
                {c.incident.eyebrow}
              </p>
              <h2 className={cn(H2, "mt-3 text-[hsl(var(--text-dark-blue))]")}>
                {c.incident.h2}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {c.incident.lead}
              </p>
            </SectionReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {c.incident.items.map((it, i) => (
                <SectionReveal key={it.title} delay={i * 60}>
                  <LightCard {...it} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${LIGHT} py-16 md:py-24`} aria-labelledby="faq-h2">
        <div className="container mx-auto max-w-3xl px-4">
          <h2
            id="faq-h2"
            className={`${H2} mb-8 text-center text-[hsl(var(--text-dark-blue))]`}
          >
            {c.faq.h2}
          </h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-card px-6"
          >
            {c.faq.items.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className={
                  i === c.faq.items.length - 1 ? "border-b-0" : undefined
                }
              >
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section
        id={disclosureId}
        className={`${DARK} scroll-mt-20 py-16 md:py-24`}
        aria-labelledby="sarbarhet-h2"
      >
        <SectionReveal className="container mx-auto max-w-3xl space-y-5 px-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sky-300">
            <ShieldCheck className="size-7" aria-hidden="true" />
          </span>
          <h2 id="sarbarhet-h2" className={H2}>
            {c.disclosure.h2}
          </h2>
          <p className="text-lg leading-relaxed text-white/75">
            {c.disclosure.body}
          </p>
          <p className="text-sm text-white/60">
            {SECURITY_EMAIL} · {c.disclosure.pgp}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${SECURITY_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#123b87] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e2f6b] md:text-lg"
            >
              <Mail className="size-5" aria-hidden="true" />
              {c.disclosure.cta}
            </a>
            <a
              href={dpaMailto(lang)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <FileText className="size-4" aria-hidden="true" />
              {c.disclosure.dpa}
            </a>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
