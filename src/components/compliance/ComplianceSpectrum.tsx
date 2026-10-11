import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { bandColor } from "./spectrum-colors";

export type SpectrumItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  examples: string[];
};

type Pt = { x: number; y: number };

// Drawing space; the figure scales with its width.
const W = 1000;
const H = 700;
const APEX: Pt = { x: 360, y: 190 };
const BL: Pt = { x: 250, y: 500 };
const BR: Pt = { x: 470, y: 500 };
const BEAM_START: Pt = { x: -20, y: 402 };
const ROW_X = 640;
const ROW_CENTER = 350;
const ROW_SPAN = 480;

const along = (a: Pt, b: Pt, t: number): Pt => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const IMPACT = along(APEX, BL, 0.55);
const EXIT = along(APEX, BR, 0.58);
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function rowY(i: number, n: number) {
  const step = n > 1 ? Math.min(96, ROW_SPAN / (n - 1)) : 0;
  return ROW_CENTER + (i - (n - 1) / 2) * step;
}

function bandPath(i: number, n: number) {
  const y = rowY(i, n);
  const sx = EXIT.x + 2;
  const sy = EXIT.y + (i - (n - 1) / 2) * 4;
  return `M ${sx} ${sy} C ${sx + 90} ${sy + (y - sy) * 0.15} ${ROW_X - 110} ${y} ${ROW_X} ${y} L ${ROW_X + 12} ${y}`;
}

// Timeline in seconds, loosely following 21st.dev's "Prism Spectrum List".
const T = {
  beam: 0.1,
  beamDur: 0.8,
  impact: 0.85,
  band0: 1.1,
  bandStep: 0.12,
  bandDur: 0.9,
  label: 0.6,
  prism: 2.6,
  settled: 3.6,
};
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const PULSE_CSS = `
@keyframes cs-pulse-beam { 0% { stroke-dashoffset: 12; opacity: 1 } 20% { stroke-dashoffset: -88; opacity: 1 } 20.01%, 100% { opacity: 0 } }
@keyframes cs-pulse-band { 0%, 20% { stroke-dashoffset: 12; opacity: 0 } 20.01% { opacity: 1 } 45% { stroke-dashoffset: -88; opacity: 1 } 45.01%, 100% { opacity: 0 } }
@keyframes cs-blink { 0%, 100% { opacity: .45 } 50% { opacity: 1 } }
`;

interface ComplianceSpectrumProps {
  items: SpectrumItem[];
  sourceLabel: string;
  prismLabel: string;
  ariaLabel: string;
  className?: string;
}

/**
 * A beam ("your organisation") enters the Compliance prism and splits into one
 * coloured band per monitored area. SVG + framer-motion; labels are real DOM text.
 */
const ComplianceSpectrum = ({
  items,
  sourceLabel,
  prismLabel,
  ariaLabel,
  className,
}: ComplianceSpectrumProps) => {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion() ?? false;
  const play = inView || reduce;
  const [settled, setSettled] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const n = items.length;

  useEffect(() => {
    if (!play || reduce) return;
    const id = window.setTimeout(() => setSettled(true), T.settled * 1000);
    return () => window.clearTimeout(id);
  }, [play, reduce]);

  const at = (delay: number, duration: number) =>
    reduce ? { duration: 0 } : { delay, duration, ease: EASE_OUT };
  const dim = (i: number) => (active === null || active === i ? 1 : 0.18);

  return (
    <figure
      ref={ref}
      className={cn("relative w-full select-none", className)}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <style>{PULSE_CSS}</style>
      <figcaption className="sr-only">{ariaLabel}</figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${uid}-halo`} cx="0.5" cy="0.5" r="0.5">
            <stop
              offset="0%"
              stopColor="hsl(205 100% 60%)"
              stopOpacity="0.22"
            />
            <stop offset="100%" stopColor="hsl(205 100% 60%)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="35%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`${uid}-inner`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop
              offset="100%"
              stopColor={bandColor(Math.floor(n / 2), n)}
              stopOpacity="0.35"
            />
          </linearGradient>
          <filter
            id={`${uid}-glow`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <circle
          cx={APEX.x}
          cy={ROW_CENTER}
          r={340}
          fill={`url(#${uid}-halo)`}
        />

        {/* Incoming beam */}
        <motion.path
          d={`M ${BEAM_START.x} ${BEAM_START.y} L ${IMPACT.x} ${IMPACT.y}`}
          stroke="#fff"
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.35}
          filter={`url(#${uid}-glow)`}
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : {}}
          transition={at(T.beam, T.beamDur)}
        />
        <motion.path
          d={`M ${BEAM_START.x} ${BEAM_START.y} L ${IMPACT.x} ${IMPACT.y}`}
          stroke={`url(#${uid}-beam)`}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : {}}
          transition={at(T.beam, T.beamDur)}
        />

        {/* Bands: soft glow layer under crisp strokes */}
        <g filter={`url(#${uid}-glow)`} opacity={0.6}>
          {items.map((it, i) => (
            <motion.path
              key={it.id}
              d={bandPath(i, n)}
              stroke={bandColor(i, n)}
              strokeWidth={18}
              fill="none"
              strokeLinecap="round"
              style={{ opacity: dim(i), transition: "opacity .3s" }}
              initial={{ pathLength: 0 }}
              animate={play ? { pathLength: 1 } : {}}
              transition={at(T.band0 + i * T.bandStep, T.bandDur)}
            />
          ))}
        </g>
        {items.map((it, i) => (
          <g key={it.id} style={{ opacity: dim(i), transition: "opacity .3s" }}>
            <motion.path
              d={bandPath(i, n)}
              stroke={bandColor(i, n)}
              strokeWidth={active === i ? 7 : 5}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={play ? { pathLength: 1 } : {}}
              transition={at(T.band0 + i * T.bandStep, T.bandDur)}
            />
            <motion.circle
              cx={ROW_X + 14}
              cy={rowY(i, n)}
              r={7}
              fill={bandColor(i, n)}
              initial={{ scale: 0 }}
              animate={play ? { scale: 1 } : {}}
              transition={at(T.band0 + i * T.bandStep + T.bandDur - 0.1, 0.3)}
              style={
                settled
                  ? {
                      animation: `cs-blink 2.4s ease-in-out ${i * 0.4}s infinite`,
                    }
                  : {}
              }
            />
          </g>
        ))}

        {/* Pulse travelling through the beam and out into the bands once everything has landed */}
        {settled && (
          <g pointerEvents="none">
            <path
              d={`M ${BEAM_START.x} ${BEAM_START.y} L ${IMPACT.x} ${IMPACT.y}`}
              pathLength={100}
              stroke="#fff"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray="12 88"
              fill="none"
              style={{
                animation: "cs-pulse-beam 4s linear infinite",
                opacity: 0,
              }}
            />
            {items.map((it, i) => (
              <path
                key={it.id}
                d={bandPath(i, n)}
                pathLength={100}
                stroke="#fff"
                strokeOpacity={0.85}
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="12 88"
                fill="none"
                style={{
                  animation: "cs-pulse-band 4s linear infinite",
                  opacity: 0,
                }}
              />
            ))}
          </g>
        )}

        {/* Light inside the prism */}
        <motion.polygon
          points={`${IMPACT.x},${IMPACT.y} ${along(APEX, BR, 0.52).x},${along(APEX, BR, 0.52).y} ${along(APEX, BR, 0.65).x},${along(APEX, BR, 0.65).y}`}
          fill={`url(#${uid}-inner)`}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : {}}
          transition={at(T.impact + 0.05, 0.3)}
        />

        {/* Prism */}
        <motion.polygon
          points={`${APEX.x},${APEX.y} ${BL.x},${BL.y} ${BR.x},${BR.y}`}
          fill={`url(#${uid}-glass)`}
          stroke="#fff"
          strokeOpacity={0.7}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ opacity: 0.35 }}
          animate={play ? { opacity: 1 } : {}}
          transition={at(T.prism, 0.8)}
        />
        <motion.circle
          cx={IMPACT.x}
          cy={IMPACT.y}
          r={34}
          fill="#fff"
          filter={`url(#${uid}-glow)`}
          initial={{ opacity: 0 }}
          animate={play && !reduce ? { opacity: [0, 0.9, 0] } : {}}
          transition={{ delay: T.impact, duration: 0.6 }}
        />
      </svg>

      {/* Source label above the beam */}
      <motion.span
        className="absolute whitespace-nowrap text-[9px] font-semibold text-white/70 sm:text-xs sm:uppercase sm:tracking-[0.12em]"
        style={{ left: "0.5%", top: pct(BEAM_START.y + 16, H) }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={at(0, 0.6)}
      >
        {sourceLabel}
      </motion.span>

      {/* Prism label */}
      <motion.span
        className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-white sm:text-sm md:text-base"
        style={{ left: pct(APEX.x, W), top: pct(BL.y + 22, H) }}
        initial={{ opacity: 0, y: 6 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={at(T.prism, 0.8)}
      >
        {prismLabel}
      </motion.span>

      {/* Band labels */}
      <ul className="absolute inset-0 m-0 list-none p-0">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.li
              key={it.id}
              className="absolute -translate-y-1/2"
              style={{ left: pct(ROW_X + 34, W), top: pct(rowY(i, n), H) }}
              initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
              animate={play ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      delay: T.band0 + i * T.bandStep + T.label,
                      type: "spring",
                      damping: 14,
                      stiffness: 160,
                      mass: 0.7,
                    }
              }
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-md px-1 py-0.5 text-left outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-white/60 sm:gap-2"
                    style={{ opacity: dim(i) === 1 ? 1 : 0.45 }}
                  >
                    <span className="font-mono text-[9px] text-white/50 sm:text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="hidden h-4 w-4 shrink-0 sm:block"
                      style={{ color: bandColor(i, n) }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-semibold text-white sm:text-sm md:text-base">
                      {it.label}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <ul className="list-disc space-y-1 pl-4 text-xs">
                    {it.examples.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </motion.li>
          );
        })}
      </ul>
    </figure>
  );
};

export default ComplianceSpectrum;
