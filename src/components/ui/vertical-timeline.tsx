// Adapted from "Vertical How It Works Timeline" (ln-dev7) on 21st.dev:
// a dashed rail with a marker per entry and a card beside it.
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  marker: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

export function VerticalTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "relative ml-6 flex flex-col gap-6 border-l border-dashed border-border pl-8 sm:ml-12 sm:pl-12",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[3.15rem] top-3 grid min-h-9 min-w-[2.3rem] place-items-center rounded-full border border-border bg-card px-2 font-mono text-[0.68rem] font-semibold uppercase leading-tight tracking-wide text-[#123b87] shadow-sm shadow-black/5 sm:-left-[4.4rem] sm:min-w-[2.9rem]">
            {item.marker}
          </span>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--card-shadow)] sm:p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#123b87]/10 text-[#123b87]">
              <item.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
