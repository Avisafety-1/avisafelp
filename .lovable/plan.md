# Plan: Flerspråklig nettside (NO/EN) med auto-deteksjon

## Mål
- Hele nettsiden tilgjengelig på norsk og engelsk
- Automatisk språkvalg basert på besøkerens lokasjon (Norge → norsk, alle andre → engelsk)
- Manuell språkvelger i header (overstyrer auto-valg, lagres i `localStorage`)
- Struktur klar for flere språk senere (f.eks. `sv`, `de`, `fr`)

## Teknisk stack
- **`i18next` + `react-i18next`** — bransjestandard, støtter lazy-loading, interpolering, pluralisering
- **`i18next-browser-languagedetector`** — sjekker `localStorage` → cookie → navigator
- **Lokasjonsdeteksjon**: gratis IP-API (`https://ipapi.co/json/`) kalles én gang ved første besøk hvis ingen lagret preferanse finnes. Resultatet caches i `localStorage`.

## Filstruktur
```text
src/
  i18n/
    index.ts              # i18next-init, språkdeteksjon, IP-fallback
    locales/
      no/
        common.json       # nav, knapper, footer
        hero.json
        team.json
        security.json
        product.json
        sora.json
        articles.json
      en/
        (samme filer, oversatt)
  components/
    LanguageSwitcher.tsx  # NO 🇳🇴 / EN 🇬🇧 dropdown øverst til høyre
```

## Implementasjonssteg

1. **Installer pakker**: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
2. **Sett opp `src/i18n/index.ts`**:
   - Last alle JSON-namespaces
   - Deteksjonsrekkefølge: `localStorage` → IP-lookup → engelsk fallback
   - IP-lookup-funksjon: hvis `country_code === "NO"` → `no`, ellers `en`
3. **Importer `i18n/index.ts` i `src/main.tsx`** før `App`.
4. **Lag `LanguageSwitcher`-komponent** — plasseres i `Hero.tsx` ved siden av sosiale ikoner (samme posisjon på alle sider via en liten wrapper, eller direkte i hver side-header). Endrer språk + lagrer valg.
5. **Trekk ut all hardkodet tekst** fra følgende komponenter/sider og erstatt med `t("namespace.key")`:
   - `Hero.tsx`, `Team.tsx`, `Security.tsx`, `ProductShowcase.tsx`, `Footer.tsx`, `CTA.tsx`, `AiSearch.tsx` (placeholder + UI-tekst, ikke selve AI-svaret)
   - Sider: `Index.tsx` (Helmet title/description), `Sora.tsx`, `SoraProcess.tsx`, `Logg.tsx`, `Artikler.tsx`, `Artikkel.tsx`, `Product.tsx`, `NotFound.tsx`
6. **Oversett til engelsk** — jeg skriver alle EN-strenger basert på dagens norske tekst, i samme tone (profesjonell, kort).
7. **SEO**: `<html lang>` oppdateres dynamisk via `react-helmet-async` basert på aktivt språk. Hver side får oversatt `<title>` og `<meta description>`.
8. **AI-søk (`avisafe-ai`)**: edge-funksjonens system-prompt utvides slik at AI-en svarer på samme språk som spørsmålet (instruks: "Svar alltid på samme språk som brukerens spørsmål"). Ingen endring i pris-regelen.

## Avklaringer / antakelser
- **Artikler (innhold fra database/Shopify)**: oversettes IKKE automatisk — kun UI-rammen rundt. La meg vite hvis artikkel-innholdet også må flerspråkliggjøres (krever schema-endring).
- **Domene**: samme `avisafe.no` for begge språk (ingen `/en/`-prefix i URL). Si fra hvis du heller vil ha `/en/`-ruter for SEO.
- **Språkvelger-plassering**: foreslår øverst til høyre i hero, like ved sosiale ikoner. OK?

Si fra hvis du vil justere noe før jeg bygger.
