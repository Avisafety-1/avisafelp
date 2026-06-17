## Problem
Videoen i toppen (`ScrollExpandMedia`) starter ikke alltid automatisk. Nåværende oppsett har noen svakheter:

1. `autoPlay` står på elementet, men `play()` kalles på nytt i en `useEffect` etter mount — Safari/iOS er strenge og kan blokkere kall som ikke knyttes til en gjenkjent autoplay-flyt.
2. Det er ingen `muted` attributt satt programmatisk før play (React `muted` prop er ikke alltid pålitelig på første render i Safari).
3. `<source>` rekkefølgen: WebM først kan trigge Safari (som ikke spiller VP8/VP9 i alle versjoner) til å feile første source og ikke alltid falle tilbake rent. MP4/H.264 bør være først for bredest kompatibilitet.
4. Ingen retry når fanen blir synlig igjen (`visibilitychange`) eller når metadata er klar (`loadedmetadata` / `canplay`).
5. Ingen fallback hvis nettleseren blokkerer autoplay (f.eks. ved lav batteri-modus på iOS) — bør vise poster og forsøke ved første bruker-interaksjon.

## Endringer (kun `src/components/ui/scroll-expand-media.tsx`)

1. **Sett attributter via DOM før play** for å sikre at Safari ser dem:
   - `video.muted = true`, `video.defaultMuted = true`, `video.playsInline = true`, `video.setAttribute("playsinline","")`, `video.setAttribute("webkit-playsinline","")`, `video.setAttribute("muted","")`.
2. **Bytt rekkefølge på `<source>`**: MP4 (H.264) først, WebM som progressiv enhancement etterpå. Dette er best practice for bred nettleserstøtte (Safari/iOS spiller bare MP4/H.264 trygt).
3. **Robust play-strategi**:
   - Kall `play()` på `loadedmetadata` og `canplay` events (ikke bare ved mount).
   - Kall `play()` på nytt ved `visibilitychange` når fanen blir synlig.
   - Hvis `play()` rejects, registrer en engangs `pointerdown`/`touchstart`/`keydown`-lytter på `window` som retry'er play ved første brukerinteraksjon (best practice fallback for blokkert autoplay).
4. **Behold `preload="auto"`, `autoPlay`, `loop`, `muted`, `playsInline`** på JSX, men suppler med DOM-attributter for Safari.
5. **Sett `playbackRate` etter `loadedmetadata`** (ikke før), slik at det ikke forstyrrer initial play på enkelte nettlesere.
6. Rydd opp event-listeners i cleanup.

Ingen andre filer endres. Ingen nye avhengigheter.

## Verifisering
- TypeScript-kompilering.
- Manuell sjekk i preview (Chrome desktop) at videoen fortsatt autospiller.
