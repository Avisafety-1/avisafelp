import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Info,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionReveal from "@/components/SectionReveal";
import { SORA_PAGE as c, type Actor, type Tone } from "@/content/sora";
import { DEMO_MAILTO } from "@/content/en/landing-pages";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const DARK = "bg-[hsl(210,45%,8%)] text-white";
const LIGHT = "bg-[hsl(210,30%,96%)]";
const WHITE = "bg-background";
const H2 = "text-3xl font-bold tracking-tight md:text-4xl";
const H2_DARK_BLUE = `${H2} text-[hsl(var(--text-dark-blue))]`;
const CARD = "rounded-2xl border border-border bg-card";

const TONE: Record<
  Tone,
  { chip: string; card: string; title: string; icon: typeof CheckCircle2 }
> = {
  go: {
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "border-emerald-200 bg-emerald-50",
    title: "text-emerald-800",
    icon: CheckCircle2,
  },
  caution: {
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    card: "border-amber-200 bg-amber-50",
    title: "text-amber-800",
    icon: AlertTriangle,
  },
  nogo: {
    chip: "bg-red-50 text-red-700 border-red-200",
    card: "border-red-200 bg-red-50",
    title: "text-red-800",
    icon: AlertTriangle,
  },
  info: {
    chip: "bg-sky-50 text-sky-700 border-sky-200",
    card: "border-sky-200 bg-sky-50",
    title: "text-sky-800",
    icon: Info,
  },
};

const ACTOR: Record<Actor, string> = {
  pilot: "bg-slate-100 text-slate-700",
  system: "bg-[#123b87]/10 text-[#123b87]",
  ai: "bg-amber-100 text-amber-800",
};

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

function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        TONE[tone].chip,
      )}
    >
      {children}
    </span>
  );
}

/** Plain data table that scrolls inside its card on narrow screens. */
function Table({
  head,
  rows,
  firstBold = true,
}: {
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  firstBold?: boolean;
}) {
  return (
    <div className={cn(CARD, "overflow-x-auto")}>
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-muted/60">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-3 align-top",
                    j === 0 && firstBold
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Stylised result card from the risk assessment in the app (demo data). */
function ResultMock() {
  const r = c.result;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl shadow-black/20 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {r.title}
          </p>
          <p className="mt-1 font-semibold text-slate-900">{r.mission}</p>
          <p className="text-xs text-slate-500">{r.missionMeta}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-500">{r.recommendationLabel}</p>
          <p className="text-2xl font-bold text-emerald-600">
            {r.recommendation}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {r.numbers.map((n) => (
          <div
            key={n.label}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {n.label}
            </p>
            <p className="text-lg font-bold text-[#123b87]">{n.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-right text-[11px] text-slate-400">
        {r.systemNote}
      </p>

      <ul className="mt-3 space-y-1.5">
        {r.categories.map((cat) => (
          <li
            key={cat.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-slate-700">{cat.label}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                <span
                  className={cn(
                    "block h-full rounded-full",
                    cat.tone === "go" ? "bg-emerald-500" : "bg-amber-500",
                  )}
                  style={{
                    width: `${Number(cat.score.replace(",", ".")) * 10}%`,
                  }}
                />
              </span>
              <span className="w-8 text-right font-medium tabular-nums text-slate-900">
                {cat.score}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-500">{r.scoreLabel}</span>
        <span className="font-bold text-slate-900">{r.score} / 10</span>
      </div>

      <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-sky-900">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {r.profileTitle}
        </p>
        <p className="mt-1 text-xs text-sky-900/80">{r.profileBody}</p>
      </div>
    </div>
  );
}

function NumberedSteps({
  title,
  steps,
  offset,
}: {
  title: string;
  steps: readonly { title: string; body: string }[];
  offset: number;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-sky-300">
        {title}
      </h3>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-[hsl(210,45%,8%)]">
              {offset + i + 1}
            </span>
            <p className="font-semibold">{s.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Sora() {
  const p = c.profiles;
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className={`${DARK} pb-16 pt-28 md:pb-24 md:pt-36`}>
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
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
            <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {c.hero.stats.map((st) => (
                <div key={st.label}>
                  <dt className="sr-only">{st.label}</dt>
                  <dd className="text-2xl font-bold text-white">{st.value}</dd>
                  <dd className="text-sm text-white/60">{st.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ResultMock />
        </div>
      </section>

      {/* In short */}
      <section className={`${LIGHT} py-16 md:py-20`} aria-labelledby="kort-h2">
        <div className="container mx-auto px-4">
          <h2 id="kort-h2" className={`${H2_DARK_BLUE} mb-8`}>
            {c.facts.h2}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.facts.items.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 60}>
                <div className={cn(CARD, "h-full p-6")}>
                  <h3 className="text-lg font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{f.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section
        id="slik-fungerer-det"
        className={`${WHITE} scroll-mt-24 py-16 md:py-24`}
        aria-labelledby="flyt-h2"
      >
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal>
            <h2 id="flyt-h2" className={H2_DARK_BLUE}>
              {c.flow.h2}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.flow.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
              {(Object.keys(c.flow.actors) as Actor[]).map((a) => (
                <span
                  key={a}
                  className={cn("rounded-full px-2.5 py-1", ACTOR[a])}
                >
                  {c.flow.actors[a]}
                </span>
              ))}
            </div>
          </SectionReveal>
          <ol className="relative space-y-6 border-l-2 border-border pl-8">
            {c.flow.steps.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 60}>
                <li className="relative">
                  <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full bg-[#123b87] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        ACTOR[s.actor],
                      )}
                    >
                      {c.flow.actors[s.actor]}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{s.body}</p>
                </li>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* System vs AI */}
      <section className={`${LIGHT} py-16 md:py-24`} aria-labelledby="split-h2">
        <div className="container mx-auto px-4">
          <h2 id="split-h2" className={`${H2_DARK_BLUE} mb-8 max-w-3xl`}>
            {c.split.h2}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                key: "system",
                data: c.split.system,
                actor: "system" as Actor,
                note: undefined,
              },
              {
                key: "ai",
                data: c.split.ai,
                actor: "ai" as Actor,
                note: c.split.ai.note,
              },
            ].map(({ key, data, actor, note }) => (
              <div key={key} className={cn(CARD, "p-6")}>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                      ACTOR[actor],
                    )}
                  >
                    {c.flow.actors[actor]}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {data.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{data.sub}</p>
                <ul className="mt-4 space-y-2">
                  {data.items.map((it) => (
                    <li key={it} className="flex gap-2 text-foreground">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#123b87]"
                        aria-hidden="true"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                {note && (
                  <p className="mt-4 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                    {note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SORA profiles */}
      <section
        id="sora-profiler"
        className={`${DARK} scroll-mt-24 py-16 md:py-24`}
        aria-labelledby="profil-h2"
      >
        <div className="container mx-auto space-y-12 px-4">
          <SectionReveal className="max-w-3xl">
            <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              {p.tag}
            </span>
            <h2 id="profil-h2" className={`${H2} mt-4`}>
              {p.h2}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              {p.lead}
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-1.5 text-sm">
              {p.chain.map((step, i) => (
                <li key={step} className="flex items-center gap-1.5">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-medium">
                    {step}
                  </span>
                  {i < p.chain.length - 1 && (
                    <ChevronRight
                      className="h-4 w-4 text-white/40"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </SectionReveal>

          <NumberedSteps
            title={p.setup.title}
            steps={p.setup.steps}
            offset={0}
          />
          <NumberedSteps
            title={p.use.title}
            steps={p.use.steps}
            offset={p.setup.steps.length}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {p.outcomes.map((o) => {
              const t = TONE[o.tone];
              const Icon = t.icon;
              return (
                <div
                  key={o.title}
                  className={cn(
                    "rounded-2xl border p-5 text-slate-800",
                    t.card,
                  )}
                >
                  <p
                    className={cn(
                      "flex items-center gap-2 font-semibold",
                      t.title,
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {o.title}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                    {o.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 text-slate-800">
              <p className="mb-3 font-semibold text-slate-900">
                {p.example.title}
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th
                      scope="col"
                      className="py-2 pr-4 font-medium text-slate-500"
                    >
                      {p.example.head[0]}
                    </th>
                    <th
                      scope="col"
                      className="py-2 text-right font-semibold text-slate-900"
                    >
                      {p.example.head[1]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {p.example.rows.map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2 pr-4 text-slate-600">{k}</td>
                      <td className="py-2 text-right font-semibold tabular-nums text-slate-900">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 font-semibold">{p.notes.title}</p>
              <ul className="space-y-2 text-sm text-white/80">
                {p.notes.items.map((n) => (
                  <li key={n} className="flex gap-2">
                    <Info
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-300"
                      aria-hidden="true"
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring */}
      <section
        className={`${WHITE} py-16 md:py-24`}
        aria-labelledby="resultat-h2"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="resultat-h2" className={H2_DARK_BLUE}>
            {c.scoring.h2}
          </h2>
          <p className="mb-8 mt-4 text-lg text-muted-foreground">
            {c.scoring.lead}
          </p>
          <Table
            head={c.scoring.head}
            rows={c.scoring.rows.map((r) => [
              r.range,
              <Chip key={r.range} tone={r.tone}>
                {r.label}
              </Chip>,
              r.body,
            ])}
          />
          <p className="mt-4 text-muted-foreground">{c.scoring.categories}</p>
        </div>
      </section>

      {/* Hard stops */}
      <section
        className={`${LIGHT} py-16 md:py-24`}
        aria-labelledby="hardstop-h2"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="hardstop-h2" className={H2_DARK_BLUE}>
            {c.hardStops.h2}
          </h2>
          <p className="mb-8 mt-4 text-lg text-muted-foreground">
            {c.hardStops.lead}
          </p>
          <Table head={c.hardStops.head} rows={c.hardStops.rows} />
          <p className="mt-4 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            {c.hardStops.note}
          </p>
        </div>
      </section>

      {/* Automatic approval */}
      <section
        className={`${WHITE} py-16 md:py-24`}
        aria-labelledby="godkjenning-h2"
      >
        <div className="container mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 id="godkjenning-h2" className={H2_DARK_BLUE}>
              {c.approval.h2}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.approval.lead}
            </p>
            <p className="mt-4 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              {c.approval.note}
            </p>
          </div>
          <div className={cn(CARD, "p-6")}>
            <p className="font-semibold text-foreground">
              {c.approval.allOkTitle}
            </p>
            <ul className="mt-4 space-y-3">
              {c.approval.allOk.map((it) => (
                <li key={it} className="flex gap-2 text-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section className={`${LIGHT} py-16 md:py-24`} aria-labelledby="data-h2">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 id="data-h2" className={`${H2_DARK_BLUE} mb-8`}>
            {c.sources.h2}
          </h2>
          <Table head={c.sources.head} rows={c.sources.rows} />
        </div>
      </section>

      {/* Method */}
      <section
        className={`${WHITE} py-16 md:py-24`}
        aria-labelledby="metode-h2"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="metode-h2" className={H2_DARK_BLUE}>
            {c.method.h2}
          </h2>
          <p className="mb-8 mt-4 text-lg text-muted-foreground">
            {c.method.lead}
          </p>
          <Accordion type="multiple" className={cn(CARD, "px-6")}>
            <AccordionItem value="specific">
              <AccordionTrigger className="text-left text-base font-semibold">
                {c.method.specificTitle}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {c.method.specific.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="grc">
              <AccordionTrigger className="text-left text-base font-semibold">
                {c.method.grc.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">{c.method.grc.body}</p>
                <Table head={c.method.grc.head} rows={c.method.grc.rows} />
                <Table
                  head={c.method.grc.mitigationHead}
                  rows={c.method.grc.mitigations}
                />
                <p className="text-muted-foreground">{c.method.grc.footnote}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sail">
              <AccordionTrigger className="text-left text-base font-semibold">
                {c.method.sail.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">{c.method.sail.body}</p>
                <Table head={c.method.sail.head} rows={c.method.sail.rows} />
                <p className="text-muted-foreground">{c.method.sail.alos}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="containment">
              <AccordionTrigger className="text-left text-base font-semibold">
                {c.method.containment.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {c.method.containment.body}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="revision" className="border-b-0">
              <AccordionTrigger className="text-left text-base font-semibold">
                {c.method.revision.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {c.method.revision.body}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Limits */}
      <section
        className={`${LIGHT} py-16 md:py-20`}
        aria-labelledby="ansvar-h2"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="ansvar-h2" className={`${H2_DARK_BLUE} mb-6`}>
            {c.limits.h2}
          </h2>
          <ul className="space-y-3">
            {c.limits.items.map((it) => (
              <li key={it} className="flex gap-2 text-foreground">
                <Info
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#123b87]"
                  aria-hidden="true"
                />
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            {c.limits.sources}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={`${DARK} py-16 text-center md:py-24`}>
        <div className="container mx-auto max-w-2xl space-y-5 px-4">
          <h2 className={H2}>{c.cta.h2}</h2>
          <p className="text-lg text-white/75">{c.cta.body}</p>
          <DemoButton label={c.cta.button} />
          <p>
            <Link
              to="/compliance"
              className="inline-flex items-center gap-1 text-sky-300 hover:underline"
            >
              {c.cta.related}{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
