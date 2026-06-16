## Mål
Gi forsiden et mer profesjonelt, helhetlig uttrykk inspirert av senseloop.com — bred header øverst, fullbredde-seksjoner uten "boks-følelse", og myke animerte overganger når man scroller mellom seksjoner.

## 1. Ny bred header (SiteHeader)
Ny komponent `src/components/SiteHeader.tsx` brukt globalt via `App.tsx`:
- Full bredde, fixed øverst, gjennomsiktig over hero — får mørk/blur-bakgrunn når man scroller (samme følelse som Senseloop sin mørke header).
- Venstre: AviSafe-logo (klikkbar til "/").
- Midten/høyre: meny — Produkt, SORA, Artikler, Galleri, Team, Kontakt (scroll til seksjon på forsiden, ellers naviger).
- Helt til høyre: `LanguageSwitcher` + sosiale ikoner + tydelig CTA-knapp "Ta kontakt" (bg `#123b87`).
- Mobil: hamburger som åpner shadcn `Sheet` med samme lenker.
- Sosiale ikoner og språkvelger flyttes ut av `Hero` siden de nå bor i headeren.

## 2. Full-bredde seksjoner
Alle seksjoner på forsiden gjøres til `min-h-screen`/`min-h-[90vh]` fullbredde-bånd uten kort-rammer. Vi beholder innholdet, men endrer innpakningen:

- **Hero**: dronebilde brukes som fullbredde bakgrunn (ikke maskert kort); logo + subline + CTA-rad sentrert oppå. "Trusted by"-båndet flyttes til en egen tynn full-bredde stripe rett under hero.
- **ProductShowcase**: full-bredde seksjon med mørk bakgrunn (kontrast mot hero), eksisterende karusell/innhold sentrert i `container`.
- **Security**: fjerner `bg-card/50` "boksen" rundt teksten — kun prose sentrert i full-bredde seksjon med subtil bakgrunnsforskjell (memory: ingen ikoner/bullets her).
- **Team**: beholder kort for medlemmer (de er meningsfulle kort, ikke seksjons-bokser), men seksjonen selv blir full-bredde med ny bakgrunnstone og større luft.

Bakgrunnsvekslingen mellom seksjoner gir den "bånd"-følelsen Senseloop har, uten harde kanter.

## 3. Animerte overganger mellom seksjoner
Ny hook `useInView` finnes allerede (`src/hooks/use-in-view.ts`) — gjenbrukes.
Ny wrapper `src/components/SectionReveal.tsx`:
- IntersectionObserver-basert.
- Fade + slide-up (opacity 0→1, translateY 32px→0, 700ms cubic-bezier) når seksjon kommer i view.
- Subtil parallaks på bakgrunn (translateY basert på scroll) for hero og ProductShowcase.
- Respekterer `prefers-reduced-motion`.
Pakker hver forsidesseksjon i `<SectionReveal>`.

## 4. Footer-justering
Mindre justering: footer blir også full-bredde og matcher header-tonen, slik at siden henger sammen visuelt.

## 5. i18n
Legger til norske/engelske nøkler for headerens menyelementer (`nav.product`, `nav.sora`, `nav.articles`, `nav.gallery`, `nav.team`, `nav.contact`) i `src/i18n/locales/no.ts` og `en.ts`.

## Tekniske detaljer
- Ingen nye pakker — bruker eksisterende Tailwind-animasjoner (`animate-fade-in`), `IntersectionObserver` og shadcn `Sheet`.
- Farger: header bruker `--text-dark-blue` (#123b87-familien) med `backdrop-blur` når scrollet; bakgrunnsbånd alternerer mellom `bg-hero-bg`, `bg-[hsl(210,45%,12%)]` (mørk) og `bg-background`.
- Ingen endringer i forretningslogikk, AI-søk, Shopify, SORA eller backend.
- Språk forblir norsk som primær (memory).

## Filer som endres / opprettes
- Ny: `src/components/SiteHeader.tsx`
- Ny: `src/components/SectionReveal.tsx`
- Endres: `src/App.tsx` (mount SiteHeader globalt)
- Endres: `src/pages/Index.tsx` (wrap seksjoner i SectionReveal, full-bredde layout)
- Endres: `src/components/Hero.tsx` (fjern språkvelger/sosiale ikoner, full-bredde hero)
- Endres: `src/components/Security.tsx` (fjern kort-boks)
- Endres: `src/components/ProductShowcase.tsx` (full-bredde seksjons-wrapping)
- Endres: `src/components/Team.tsx` (full-bredde wrapping, beholder medlems-kort)
- Endres: `src/i18n/locales/no.ts`, `src/i18n/locales/en.ts`

## Spørsmål før jeg bygger
1. **Header-stil over hero**: Skal headeren være helt gjennomsiktig over hero-bildet (Senseloop-stil), eller alltid ha en lett mørk/blur-bakgrunn?
2. **CTA-knapp i header**: Skal "Ta kontakt"-knappen i headeren være oransje/aksent (som Senseloop) eller beholde AviSafe-blå `#123b87`?
3. **Galleri i menyen**: Skal `/galleri` ligge i hovedmenyen, eller skjules den til senere?
