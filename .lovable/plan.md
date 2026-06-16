# Scroll-Expand Video Hero

Replace the current static hero (drone landscape image + centered AviSafe logo) with an interactive scroll-expand media component, adapted from the 21st.dev pattern you pasted but rewritten for our Vite + React stack (no Next.js `Image`, no `'use client'`).

## What it looks like

1. On load: background = current `drone-landscape.png`, with a small centered video card (the attached `Snapchat-320838701.mp4`) on top.
2. Two text lines sit centered behind/around the video:
   - **Line 1 (top):** `Aviation-grade Safety`
   - **Line 2 (bottom):** `Operational Intelligence for Professional Drone Operations`
3. As the user scrolls (wheel / touch), the video expands toward fullscreen, the background fades out, and the two text lines slide apart horizontally (line 1 left, line 2 right).
4. When the video reaches full size, page scroll is released and the rest of the site (Trusted-by banner, subline, ProductShowcase, …) becomes scrollable as normal.
5. Scrolling back to the very top reverses the animation.

i18n: both text lines added to `hero.expandLine1` / `hero.expandLine2` in `no.ts` and `en.ts` (Norwegian copy mirrors English wording per your existing pattern — confirm if you want a different NO translation).

## Files

**New**
- `src/components/ui/scroll-expand-media.tsx` — port of the pasted component, adapted:
  - Remove `'use client'` and `next/image`; use plain `<img>` and our `framer-motion` (already in deps — will add if missing).
  - Support a second title line (`titleTop`, `titleBottom`) so both texts split apart on scroll instead of splitting one title by first word.
  - Accept `mediaSrc` / `bgImageSrc` as imported asset URLs.
- `src/assets/hero-video.mp4.asset.json` — Lovable asset pointer to the uploaded `Snapchat-320838701.mp4` (kept off-repo via CDN).

**Edited**
- `src/components/Hero.tsx` — replace the drone-landscape + logo block with `<ScrollExpandMedia …>`. Keep the Trusted-by banner and subline below it (they appear after the expand completes, as part of normal page flow).
- `src/i18n/locales/no.ts`, `src/i18n/locales/en.ts` — add `hero.expandLine1`, `hero.expandLine2`.

**Untouched**
- Header behavior, ProductShowcase, Security, etc. The scroll-hijack only runs while the hero is in view and not yet fully expanded; once expanded, normal scroll resumes and `SiteHeader` keeps its existing dark→white transition.

## Technical notes

- Component hijacks `wheel` / `touch` events only until `mediaFullyExpanded` is true; then it releases and the page scrolls normally. `scrollProgress` drives video width/height and the `translateX` of both text lines.
- Mobile: smaller expansion deltas (matches the pasted component's `isMobile` branch).
- AviSafe black logo currently overlaid on the hero image is removed in this layout (the two text lines replace it). If you want the logo to remain visible during/after the expand, tell me where to place it and I'll fold that in.

## Open question

The Norwegian site is fully `nb`. Do you want the two lines kept in English on both languages (as a tagline), or translated to Norwegian for `no.ts`? Default in this plan: keep English on both.
