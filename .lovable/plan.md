## Mål

Vise AviSafe-mobilappen som en interaktiv demo på landingssiden: et langt, sammensydd bilde av de 4 opplastede skjermbildene ligger inne i en realistisk telefon-ramme. Brukeren kan scrolle inne i rammen som om de brukte appen. Plasseres i området markert med rødt — mellom subline-teksten og "Norway's most advanced tool for SORA"-blokken.

## Hva som lages

1. **Sammensydd bilde** — De 4 opplastede skjermbildene stables vertikalt til ett langt PNG (`src/assets/app-preview-stitched.png`). Rekkefølge basert på naturlig brukerflyt:
   1. Screenshot_20260617_065139_Chrome.jpg (Home: Start/End flight, News, Resource status)
   2. Screenshot_20260617_065203_Chrome (Upcoming missions, Documents) — den røde annoteringen croppes vekk
   3. Screenshot_20260617_065243_Chrome.jpg (Documents fortsatt, Calendar, Incidents)
   4. Screenshot_20260617_065331_Chrome.jpg (Incidents detalj + graf)
   
   Statuslinjen (klokke/batteri) og Android-navigasjonsbaren croppes vekk på alle bilder slik at sømmene blir usynlige. Alle bildene normaliseres til samme bredde.

2. **Ny komponent** `src/components/AppPreviewPhone.tsx`:
   - En CSS-tegnet telefonramme (avrundede hjørner ~44px, mørk bezel, subtil notch/dynamisk øy på toppen, skygge).
   - Innvendig viewport med `overflow-y: auto` som inneholder det sammensydde bildet i full bredde.
   - Smooth scroll, skjult scrollbar (`scrollbar-width: none`), `-webkit-overflow-scrolling: touch`.
   - Touch/wheel-scroll fungerer uavhengig av sidescroll når musepekeren er over rammen.
   - Responsiv: ~280px bred på mobil, ~320–340px på desktop. Høyde ~600–640px (klassisk telefon-aspekt).

3. **Plassering i `src/components/Hero.tsx`**:
   - Inni `ScrollExpandMedia`-children, like under subline-`<p>` og før Trusted-by-banner allerede er ovenfor — ifølge merkingen skal rammen ligge mellom subline og neste seksjon. Plasseres derfor i en ny sentrert container rett etter subline-`<div>`, før children-blokken lukkes.
   - Sentrert med litt vertikal padding.

## Tekniske detaljer

- Bildesammensying gjøres med Python/PIL i sandboxen, output skrives direkte til `src/assets/app-preview-stitched.png` (importeres som vanlig ES6-bilde — ikke lovable-asset, slik at Vite kan optimalisere).
- Crop-strategi per bilde: fjern top ~80–120px (statuslinje) og bunn ~60–120px (nav-bar) der det er nødvendig. Bilde #1 (Lovable-skjermdumpen) brukes ikke i sammensying — det er bare referansebildet med rød ring.
- Telefonrammen bygges som ren JSX + Tailwind (ingen ekstra avhengigheter). Notch er en liten sort pille øverst.
- Ingen endring i `scroll-expand-media.tsx` — bare i `Hero.tsx`-children.
- Ingen i18n-tekst trengs (rammen er ren visuell demo).

## Filer

**Nye**
- `src/assets/app-preview-stitched.png` — generert ved bygging av planen
- `src/components/AppPreviewPhone.tsx`

**Endret**
- `src/components/Hero.tsx` — legger til `<AppPreviewPhone />` rett under subline-teksten

## Åpent spørsmål

Ingen — fortsetter med rekkefølgen ovenfor med mindre du vil ha annen.
