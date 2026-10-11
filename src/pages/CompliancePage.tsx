import {
  Activity,
  ArrowDown,
  ClipboardCheck,
  FileText,
  Mail,
  Plane,
  ShieldAlert,
  Users,
  BellRing,
  Gauge,
  ListChecks,
  Clock,
  LayoutGrid,
  History,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionReveal from "@/components/SectionReveal";
import ComplianceSpectrum from "@/components/compliance/ComplianceSpectrum";
import { bandColor } from "@/components/compliance/spectrum-colors";
import {
  ActionPanelMock,
  AuditTaskMock,
  InboxMock,
  InspectionPackageMock,
} from "@/components/compliance/ComplianceMockups";
import {
  COMPLIANCE,
  type ComplianceAreaId,
  type ComplianceLang,
} from "@/content/compliance";
import { DEMO_MAILTO } from "@/content/en/landing-pages";
import { scrollToSection } from "@/lib/scroll-to-section";

// Same icons as the tabs in the AviSafe app.
const AREA_ICONS: Record<ComplianceAreaId, LucideIcon> = {
  operations: Activity,
  fleet: Plane,
  personnel: Users,
  documents: FileText,
  incidents: ShieldAlert,
  audit: ClipboardCheck,
};

const STEP_ICONS = [Gauge, ListChecks, BellRing];
const BENEFIT_ICONS = [Clock, LayoutGrid, History];

const DARK = "bg-[hsl(210,45%,8%)] text-white";
const LIGHT = "bg-[hsl(210,30%,96%)]";
const H2 = "text-3xl font-bold tracking-tight md:text-4xl";

function DemoButton({ label }: { label: string }) {
  return (
    <a
      href={DEMO_MAILTO}
      className="inline-flex items-center gap-2 rounded-full bg-[#123b87] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e2f6b] md:text-lg"
    >
      <Mail className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}

export default function CompliancePage({ lang }: { lang: ComplianceLang }) {
  const c = COMPLIANCE[lang];
  const n = c.areas.length;
  const colors = c.areas.map((_, i) => bandColor(i, n));
  const spectrumItems = c.areas.map((a) => ({
    id: a.id,
    label: a.label,
    icon: AREA_ICONS[a.id],
    examples: a.examples,
  }));

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className={`${DARK} relative pb-16 pt-28 md:pb-24 md:pt-36`}>
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold tracking-wide text-sky-300">
              {c.hero.tag}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {c.hero.h1}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
              {c.hero.lead}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <DemoButton label={c.hero.ctaPrimary} />
              <button
                type="button"
                onClick={() => scrollToSection("slik-fungerer-det")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {c.hero.ctaSecondary}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <ComplianceSpectrum
            items={spectrumItems}
            sourceLabel={c.spectrum.source}
            prismLabel={c.spectrum.prism}
            ariaLabel={c.spectrum.ariaLabel}
          />
        </div>
      </section>

      {/* What is measured */}
      <section
        className={`${LIGHT} py-16 md:py-24`}
        aria-labelledby="hva-maales"
      >
        <div className="container mx-auto px-4">
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="hva-maales"
              className={`${H2} text-[hsl(var(--text-dark-blue))]`}
            >
              {c.measure.h2}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.measure.lead}
            </p>
          </SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.areas.map((a, i) => {
              const Icon = AREA_ICONS[a.id];
              return (
                <SectionReveal key={a.id} delay={i * 60}>
                  <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--card-shadow)]">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          background: `color-mix(in srgb, ${colors[i]} 16%, transparent)`,
                          color: colors[i],
                        }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">
                        <span className="mr-2 font-mono text-sm text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {a.label}
                      </h3>
                    </div>
                    <p className="mb-3 text-foreground">{a.summary}</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {a.examples.map((ex) => (
                        <li key={ex} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: colors[i] }}
                            aria-hidden="true"
                          />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="slik-fungerer-det"
        className="scroll-mt-24 bg-background py-16 md:py-24"
        aria-labelledby="slik-h2"
      >
        <div className="container mx-auto grid items-start gap-12 px-4 lg:grid-cols-2">
          <SectionReveal className="space-y-8">
            <div>
              <h2
                id="slik-h2"
                className={`${H2} text-[hsl(var(--text-dark-blue))]`}
              >
                {c.how.h2}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{c.how.lead}</p>
            </div>
            <ol className="space-y-6">
              {c.how.steps.map((s, i) => {
                const Icon = STEP_ICONS[i] ?? Gauge;
                return (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123b87] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {i + 1}. {s.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </SectionReveal>
          <SectionReveal delay={150}>
            <ActionPanelMock panel={c.how.panel} />
          </SectionReveal>
        </div>
      </section>

      {/* Inbox */}
      <section
        className={`${DARK} py-16 md:py-24`}
        aria-labelledby="innboks-h2"
      >
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal className="space-y-5">
            <h2 id="innboks-h2" className={H2}>
              {c.inbox.h2}
            </h2>
            <p className="text-lg leading-relaxed text-white/75">
              {c.inbox.body}
            </p>
            <ul className="space-y-2">
              {c.inbox.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-white/90">
                  <Check
                    className="h-4 w-4 text-emerald-400"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </SectionReveal>
          <SectionReveal delay={150}>
            <InboxMock mock={c.inbox.mock} />
          </SectionReveal>
        </div>
      </section>

      {/* Internal audit */}
      <section
        className={`${LIGHT} py-16 md:py-24`}
        aria-labelledby="revisjon-h2"
      >
        <div className="container mx-auto px-4">
          <SectionReveal className="mx-auto mb-12 max-w-3xl text-center">
            <h2
              id="revisjon-h2"
              className={`${H2} text-[hsl(var(--text-dark-blue))]`}
            >
              {c.audit.h2}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.audit.body}</p>
          </SectionReveal>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <SectionReveal>
              <ol className="relative space-y-6 border-l-2 border-[#123b87]/20 pl-8">
                {c.audit.steps.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full bg-[#123b87] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.body}</p>
                  </li>
                ))}
              </ol>
            </SectionReveal>
            <SectionReveal delay={150}>
              <AuditTaskMock mock={c.audit.mock} />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Inspection package */}
      <section className={`${DARK} py-16 md:py-24`} aria-labelledby="tilsyn-h2">
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
          <SectionReveal className="space-y-5">
            <h2 id="tilsyn-h2" className={H2}>
              {c.inspection.h2}
            </h2>
            <p className="text-lg leading-relaxed text-white/75">
              {c.inspection.body}
            </p>
            <div
              className="flex h-2 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              {colors.map((col) => (
                <span
                  key={col}
                  className="flex-1"
                  style={{ background: col }}
                />
              ))}
            </div>
          </SectionReveal>
          <SectionReveal delay={150}>
            <InspectionPackageMock content={c.inspection} colors={colors} />
          </SectionReveal>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="gevinster-h2"
      >
        <div className="container mx-auto px-4">
          <SectionReveal className="mb-10 text-center">
            <h2
              id="gevinster-h2"
              className={`${H2} text-[hsl(var(--text-dark-blue))]`}
            >
              {c.benefits.h2}
            </h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {c.benefits.items.map((b, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Clock;
              return (
                <SectionReveal key={b.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <Icon
                      className="mb-3 h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{b.body}</p>
                  </div>
                </SectionReveal>
              );
            })}
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

      {/* CTA */}
      <section className={`${DARK} py-16 text-center md:py-24`}>
        <div className="container mx-auto max-w-2xl space-y-5 px-4">
          <p className="text-sm font-semibold tracking-wide text-sky-300">
            {c.hero.tag}
          </p>
          <h2 className={H2}>{c.cta.h2}</h2>
          <p className="text-lg text-white/75">{c.cta.body}</p>
          <DemoButton label={c.cta.button} />
        </div>
      </section>
    </main>
  );
}
