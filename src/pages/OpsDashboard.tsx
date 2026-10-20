import {
  ArrowDown,
  CloudSun,
  FileText,
  LayoutDashboard,
  ListChecks,
  Mail,
  Map as MapIcon,
  MessageSquare,
  Send,
  Share2,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import {
  OPS_DASHBOARD,
  type OpsFeatureId,
  type OpsLang,
} from "@/content/ops-dashboard";
import { DEMO_MAILTO } from "@/content/en/landing-pages";
import { scrollToSection } from "@/lib/scroll-to-section";

const FEATURE_ICONS: Record<OpsFeatureId, LucideIcon> = {
  video: Video,
  map: MapIcon,
  fh2: Send,
  comms: MessageSquare,
  tasks: ListChecks,
  log: FileText,
  weather: CloudSun,
  share: Share2,
  layout: LayoutDashboard,
};

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

/** Product screenshot in a dark frame that matches the Ops UI. */
function Screenshot({
  src,
  alt,
  width,
  height,
  eager,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1620] shadow-2xl shadow-black/40">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

export default function OpsDashboard({ lang }: { lang: OpsLang }) {
  const c = OPS_DASHBOARD[lang];
  const featuresId = lang === "nb" ? "funksjoner" : "features";

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className={`${DARK} pb-16 pt-28 md:pb-24 md:pt-36`}>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold tracking-wide text-sky-300">
              {c.hero.tag}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {c.hero.h1}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              {c.hero.lead}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <DemoButton label={c.hero.ctaPrimary} />
              <button
                type="button"
                onClick={() => scrollToSection(featuresId)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {c.hero.ctaSecondary}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-6xl md:mt-16">
            <Screenshot
              src={c.hero.image.src}
              alt={c.hero.image.alt}
              width={c.hero.image.width}
              height={c.hero.image.height}
              eager
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id={featuresId}
        className={`${LIGHT} scroll-mt-20 py-16 md:py-24`}
        aria-labelledby="funksjoner-h2"
      >
        <div className="container mx-auto px-4">
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="funksjoner-h2"
              className={`${H2} text-[hsl(var(--text-dark-blue))]`}
            >
              {c.features.h2}
            </h2>
          </SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.items.map((f, i) => {
              const Icon = FEATURE_ICONS[f.id];
              return (
                <SectionReveal key={f.id} delay={i * 60}>
                  <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--card-shadow)]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#123b87]/10 text-[#123b87]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {f.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#123b87]/60"
                            aria-hidden="true"
                          />
                          <span>{p}</span>
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

      {/* Screenshots */}
      <section
        className={`${DARK} py-16 md:py-24`}
        aria-labelledby="skjermbilder-h2"
      >
        <div className="container mx-auto px-4">
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2 id="skjermbilder-h2" className={H2}>
              {c.showcase.h2}
            </h2>
          </SectionReveal>
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-3">
            {c.showcase.items.map((s) => (
              <SectionReveal
                key={s.alt}
                className={s.wide ? "lg:col-span-3" : undefined}
              >
                <figure className="space-y-4">
                  <Screenshot
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                  />
                  <figcaption className="text-base leading-relaxed text-white/75">
                    {s.caption}
                  </figcaption>
                </figure>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section
        className={`${LIGHT} py-16 text-center md:py-24`}
        aria-labelledby="avslutning-h2"
      >
        <SectionReveal className="container mx-auto max-w-2xl space-y-5 px-4">
          <h2
            id="avslutning-h2"
            className={`${H2} text-[hsl(var(--text-dark-blue))]`}
          >
            {c.closing.h2}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {c.closing.body}
          </p>
          <p className="text-sm font-medium text-foreground">
            {c.closing.requirement}
          </p>
          <div className="pt-2">
            <DemoButton label={c.closing.cta} />
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
