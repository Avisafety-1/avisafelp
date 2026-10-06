/**
 * Scrolls to a section below the fixed header and corrects the position once
 * reveal animations and lazy content have settled (they shift the layout).
 */
export function scrollToSection(id: string) {
  const headerOffset = () => (document.querySelector("header")?.getBoundingClientRect().height ?? 80) + 8;
  const target = () => {
    const el = document.getElementById(id);
    if (!el) return null;
    return id === "hero-section" ? 0 : el.getBoundingClientRect().top + window.scrollY - headerOffset();
  };
  const go = (behavior: ScrollBehavior) => {
    const y = target();
    if (y !== null) window.scrollTo({ top: Math.max(0, y), behavior });
  };
  go("smooth");
  [700, 1400, 2200, 3000].forEach((ms) =>
    window.setTimeout(() => {
      const y = target();
      if (y !== null && Math.abs(window.scrollY - Math.max(0, y)) > 4) go("smooth");
    }, ms),
  );
}
