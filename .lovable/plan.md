
## Mål
På mobil vises integrasjonskortene i `IntegrationsSelector` i dag som smale vertikale striper som klemmes sammen — vanskelige å se og trykke på. Vi gir mobil en helt egen layout uten å endre desktop-oppførselen.

## Ny mobil-oppførsel
- Kortene stables som et "kort-stack": hvert kort er like bredt som skjermen (container-bredde) og vises i full størrelse (samme aspektforhold som det aktive kortet).
- Kun den øverste delen av hvert kort er synlig som standard — ca. halvparten av kortets høyde stikker opp over kortet under (peek-høyde ≈ 50 % av korthøyden).
- Når man trykker på et kort:
  - Det valgte kortet løftes opp slik at hele kortet vises i full bredde og full høyde.
  - Kortene som ligger *under* det aktive forskyves nedover slik at de fremdeles peeker frem nederst på skjermen (man kan trykke på dem for å velge dem i stedet).
  - Kortene *over* det aktive beholder sin peek-posisjon på toppen, så man kan trykke seg tilbake oppover.
- Bilde vises i full størrelse (cover), label/ikon nederst som i dag.
- Smooth `transition` på `transform` (samme varighet som dagens 700 ms).

## Layout-skisse (mobil)
```text
┌───────────────────────┐  ← kort 1 (peek topp)
├───────────────────────┤  ← kort 2 (peek topp)
│                       │
│   AKTIVT KORT         │  full høyde, full bredde
│   (kort 3)            │
│                       │
├───────────────────────┤  ← kort 4 (peek bunn)
├───────────────────────┤  ← kort 5 (peek bunn)
└───────────────────────┘
```

## Tekniske detaljer
- Endring kun i `src/components/IntegrationsSelector.tsx`.
- Bruk eksisterende `useIsMobile()` hook (`src/hooks/use-mobile.tsx`) til å bytte mellom dagens horisontale "accordion" (desktop, uendret) og ny stack-layout (mobil).
- Mobil-implementasjon:
  - Container: `relative` med fast høyde = `cardHeight + (n-1) * peekHeight`. Korthøyde ≈ `70vw` (gir kvadratisk-ish kort i mobilbredde), peek ≈ `cardHeight / 2`.
  - Hvert kort: `absolute inset-x-0`, `height: cardHeight`, `transform: translateY(offset)`.
  - Offset-formel:
    - `i < activeIndex` → `i * peek` (stables på toppen)
    - `i === activeIndex` → `activeIndex * peek`
    - `i > activeIndex` → `activeIndex * peek + cardHeight - peek + (i - activeIndex - 1) * peek + peek` (dvs. starter rett under aktivt kort og peeker nedover)
  - `zIndex` = `i` for naturlig stabling (øvre kort over, nedre under aktivt — justeres slik at aktivt kort alltid er øverst i z).
  - Beholder rounded corners + shadow per kort så stacken ser tydelig ut.
- Label/ikon: alltid synlig på aktivt kort; på inaktive vises kun ikon (label fades inn ved aktivering, som i dag).
- Desktop (md+): ingen endring — eksisterende flex-layout brukes uendret.

## Akseptansekriterier
- På mobil (<768 px) ser man en stack med alle 7 kortene; aktivt kort fyller bredden og full korthøyde.
- Trykk på et peekende kort animerer det opp/ned til full visning og forskyver de andre.
- Desktop ser identisk ut med dagens versjon.
