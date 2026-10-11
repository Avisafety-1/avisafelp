import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Hourglass,
  Inbox,
  Info,
  Package,
  Send,
  ShieldAlert,
} from "lucide-react";
import type { ComplianceContent } from "@/content/compliance";
import { cn } from "@/lib/utils";

/*
 * Stylised, interactive recreations of AviSafe app screens for the Compliance
 * page. Demo data only; they are illustrations, not the real app.
 */

const frame =
  "rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-xl shadow-slate-900/10";

const severityStyles = {
  critical: {
    chip: "border-red-200 bg-red-50 text-red-600",
    icon: AlertCircle,
    iconClass: "text-red-500",
  },
  warning: {
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    icon: AlertTriangle,
    iconClass: "text-amber-500",
  },
  info: {
    chip: "border-sky-200 bg-sky-50 text-sky-700",
    icon: Info,
    iconClass: "text-sky-500",
  },
};

const kpiTone = {
  critical: { text: "text-red-500", icon: AlertCircle },
  warning: { text: "text-amber-600", icon: AlertTriangle },
  neutral: { text: "text-amber-800", icon: ShieldAlert },
  ok: { text: "text-emerald-500", icon: Hourglass },
};

/** "Requires action now" panel from the Compliance overview. */
export function ActionPanelMock({
  panel,
}: {
  panel: ComplianceContent["how"]["panel"];
}) {
  const [reminded, setReminded] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setReminded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {panel.kpis.map((k) => {
          const tone = kpiTone[k.tone];
          const Icon = tone.icon;
          return (
            <div key={k.label} className={cn(frame, "p-3 shadow-md")}>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <Icon
                  className={cn("h-3.5 w-3.5", tone.text)}
                  aria-hidden="true"
                />
                {k.label}
              </p>
              <p className={cn("mt-1 text-2xl font-bold", tone.text)}>
                {k.value}
              </p>
            </div>
          );
        })}
      </div>
      <div className={cn(frame, "p-4 sm:p-5")}>
        <p className="mb-3 flex items-center justify-between font-semibold text-slate-900">
          {panel.heading}
          <span className="text-xs font-normal text-slate-400">
            {panel.rows.length}
          </span>
        </p>
        <ul className="divide-y divide-slate-100">
          {panel.rows.map((r, i) => {
            const s = severityStyles[r.severity];
            const Icon = s.icon;
            const done = reminded.has(i);
            return (
              <li
                key={r.item}
                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <span
                  className={cn(
                    "inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium",
                    s.chip,
                  )}
                >
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {r.severityLabel}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{r.item}</p>
                  <p className="text-xs text-slate-500">
                    {r.detail} · {r.department} · {r.responsible}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={done}
                  className={cn(
                    "inline-flex w-fit items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                    done
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {done ? panel.sent : panel.sendReminder}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Inbox with a reminder whose quick actions close the case. Plays one answer by itself when scrolled into view. */
export function InboxMock({
  mock,
}: {
  mock: ComplianceContent["inbox"]["mock"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [pressed, setPressed] = useState<number | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  // Demo: "Was flown" gets pressed a moment after the mock becomes visible.
  useEffect(() => {
    if (!inView || reduce || touched) return;
    const press = window.setTimeout(() => setPressed(1), 1600);
    const answer = window.setTimeout(() => setAnswered(1), 2100);
    return () => {
      window.clearTimeout(press);
      window.clearTimeout(answer);
    };
  }, [inView, reduce, touched]);

  const choose = (i: number) => {
    setTouched(true);
    setPressed(i);
    setAnswered(i);
  };
  const reset = () => {
    setTouched(true);
    setPressed(null);
    setAnswered(null);
  };
  const done = answered !== null;

  return (
    <div
      ref={ref}
      className={cn(frame, "grid overflow-hidden md:grid-cols-[1fr_1.1fr]")}
    >
      <div className="border-b border-slate-100 bg-slate-50 p-4 md:border-b-0 md:border-r">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 font-semibold text-slate-900">
            <Inbox className="h-4 w-4" aria-hidden="true" />
            {mock.inboxTitle}
          </p>
          <div className="flex rounded-lg bg-white p-0.5 text-[11px] text-slate-500 shadow-sm">
            {mock.filters.map((f, i) => (
              <span
                key={f}
                className={cn(
                  "rounded-md px-2 py-1",
                  i === 0 && "bg-slate-100 font-medium text-slate-900",
                )}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <ul className="space-y-1">
          {mock.list.map((m, i) => {
            const s = severityStyles[m.severity];
            const Icon = s.icon;
            const selected = i === 0;
            return (
              <li
                key={m.title}
                className={cn(
                  "flex gap-2 rounded-lg px-2 py-2",
                  selected && "bg-white shadow-sm ring-1 ring-slate-200",
                )}
              >
                <Icon
                  className={cn("mt-0.5 h-4 w-4 shrink-0", s.iconClass)}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium leading-snug text-slate-900">
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{m.meta}</p>
                </div>
                {selected && done && (
                  <span className="flex h-fit items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {mock.done}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
            {mock.badge}
          </span>
          {done && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              <Check className="h-3 w-3" aria-hidden="true" />
              {mock.done}
            </span>
          )}
        </div>
        <p className="font-semibold leading-snug text-slate-900">
          {mock.title}
        </p>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
          <p className="flex gap-2 text-sm text-slate-800">
            <Bell
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            {mock.question}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex flex-wrap items-center gap-3 text-sm"
                aria-live="polite"
              >
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {mock.doneNote(mock.actions[answered ?? 0] ?? "")}
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-slate-500 underline-offset-2 hover:underline"
                >
                  {mock.reset}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                exit={{ opacity: 0 }}
                className="mt-3 flex flex-wrap gap-2"
              >
                {mock.actions.map((a, i) => (
                  <motion.button
                    key={a}
                    type="button"
                    onClick={() => choose(i)}
                    animate={pressed === i ? { scale: 0.94 } : { scale: 1 }}
                    className={cn(
                      "rounded-lg border bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50",
                      pressed === i
                        ? "border-[#123b87] ring-2 ring-[#123b87]/30"
                        : "border-slate-200",
                    )}
                  >
                    {a}
                  </motion.button>
                ))}
                <span className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-slate-700">
                  {mock.open}{" "}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
          <p className="mb-1.5 text-[11px] text-slate-500">{mock.sender}</p>
          {mock.message.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="text-right text-[11px] text-slate-400">{mock.seenBy}</p>
      </div>
    </div>
  );
}

/** Internal audit finding as a task, with root cause and action plan. */
export function AuditTaskMock({
  mock,
}: {
  mock: ComplianceContent["audit"]["mock"];
}) {
  const [done, setDone] = useState(false);
  return (
    <div className={cn(frame, "space-y-4 p-4 sm:p-6")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-semibold text-slate-900">
            <ClipboardCheck
              className="h-4 w-4 text-[#123b87]"
              aria-hidden="true"
            />
            {mock.title}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">{mock.saved}</p>
        </div>
      </div>
      <div className="space-y-0.5 text-xs text-slate-600">
        <p className="text-sm font-semibold text-slate-900">{mock.audit}</p>
        <p>{mock.unit}</p>
        <p>{mock.item}</p>
        <p>{mock.reference}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] font-medium">
        <span className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-700">
          {mock.level}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5",
            done
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-700",
          )}
        >
          {done ? mock.done : mock.status}
        </span>
        <span className="px-1 py-0.5 text-slate-500">{mock.deadline}</span>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold text-slate-900">
          {mock.rootCauseLabel}
        </p>
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          {mock.rootCause}
        </p>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold text-slate-900">
          {mock.planLabel}
        </p>
        <div className="space-y-2 rounded-lg border border-slate-200 p-3">
          <p className="rounded-md border border-[#123b87]/40 px-3 py-2 text-xs text-slate-800">
            {mock.action}
          </p>
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
            <span className="truncate rounded-md border border-slate-200 px-2 py-1.5">
              {mock.responsible}
            </span>
            <span className="rounded-md border border-slate-200 px-2 py-1.5 text-center">
              {mock.due}
            </span>
            <span className="rounded-md border border-slate-200 px-2 py-1.5">
              {done ? mock.done : mock.actionStatus}
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setDone((d) => !d)}
              aria-pressed={done}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                done
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {done ? mock.done : mock.markDone}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inspection package whose contents tick off one by one. */
export function InspectionPackageMock({
  content,
  colors,
}: {
  content: ComplianceContent["inspection"];
  colors: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const show = inView || reduce;
  const total = content.items.length;
  const lastDelay = 0.4 + total * 0.25;

  return (
    <div ref={ref} className={cn(frame, "p-5 sm:p-6")}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123b87] text-white">
          <Package className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold text-slate-900">{content.packageTitle}</p>
          <p className="text-xs text-slate-500">AviSafe Demo AS</p>
        </div>
      </div>
      <ul className="space-y-2">
        {content.items.map((item, i) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-800"
          >
            <span
              className="h-6 w-1 shrink-0 rounded-full"
              style={{ background: colors[i % colors.length] }}
              aria-hidden="true"
            />
            <span className="flex-1">{item}</span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      delay: 0.4 + i * 0.25,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }
              }
              className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Check className="h-3 w-3" aria-hidden="true" />
            </motion.span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-lg bg-[#123b87] px-4 py-2 text-sm font-semibold text-white">
          <Package className="h-4 w-4" aria-hidden="true" />
          {content.button}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={
            reduce ? { duration: 0 } : { delay: lastDelay, duration: 0.4 }
          }
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {content.ready}
        </motion.span>
      </div>
    </div>
  );
}
