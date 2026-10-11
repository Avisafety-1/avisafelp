import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import {
  INTEGRATIONS,
  INTEGRATIONS_PAGE,
  INTEGRATIONS_PATH,
} from "@/content/integrations";
import { INTEGRATION_ICONS } from "@/components/integration-icons";
import { cn } from "@/lib/utils";

/**
 * Full-width integration cards, after shadcnblocks "Gallery 6" on 21st.dev:
 * the row starts at the container edge and runs off the right side of the
 * screen, and every card shows its title and text below the image.
 * Native horizontal scrolling with snap, so touch swipes, trackpads and
 * shift+wheel all work; the arrows just scroll the same element.
 */
const IntegrationsCarousel = () => {
  const c = INTEGRATIONS_PAGE.carousel;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [inset, setInset] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Line the first card up with the heading: measure the container's content edge.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const left =
        el.getBoundingClientRect().left +
        parseFloat(getComputedStyle(el).paddingLeft);
      setInset(Math.round(left));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40";

  return (
    <section className="py-16 md:py-24">
      <div ref={containerRef} className="container mx-auto px-4">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--text-dark-blue))] md:text-4xl">
              {c.heading}
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              {c.lead}
            </p>
            <Link
              to={INTEGRATIONS_PATH}
              className="group mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              {c.all}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              className={arrow}
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label={c.prev}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={arrow}
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label={c.next}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* The row bleeds off the right edge of the screen. */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={
          inset === null
            ? undefined
            : {
                paddingLeft: inset,
                paddingRight: inset,
                scrollPaddingLeft: inset,
              }
        }
      >
        {INTEGRATIONS.map((it) => {
          const Icon = INTEGRATION_ICONS[it.id];
          return (
            <div
              key={it.id}
              className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[360px]"
            >
              <Link
                to={`${INTEGRATIONS_PATH}#${it.id}`}
                className="group flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[hsl(210,45%,10%)]">
                  <img
                    src={it.image}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className={cn(
                      "h-full w-full transition-transform duration-500 group-hover:scale-105",
                      it.contain ? "object-contain p-10" : "object-cover",
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col pt-4">
                  <p className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {it.title}
                  </p>
                  <p className="mt-1 text-muted-foreground">{it.card}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {c.readMore}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IntegrationsCarousel;
