## Endringer

### 1. Hero — fjern CTA-rad
I `src/components/Hero.tsx`: fjern blokken med de 4 knappene (Kontakt oss, Hvem er vi, Artikler, Nyhetsbrev) samt tilhørende newsletter-Dialog og `newsletterOpen`-state. Resten av hero (logoer, subline) beholdes.

### 2. Ny header-navigasjon i `SiteHeader.tsx`
Erstatt dagens NAV-liste med:

- **SMS** — dropdown (hover på desktop, expand i hamburger) med:
  - Overview → scroll til `#product-section`
  - Integrations → scroll til ny `#integrations-section`
  - Security → scroll til ny `#security-section`
- **Operations** → `/operations` (ny side)
- **Articles / Media** → dropdown med:
  - Articles → `/artikler`
  - Gallery → `/galleri`
- **Newsletter** → åpner samme nyhetsbrev-Dialog (flyttes fra Hero til header)
- **Contact** → `mailto:kontakt@avisafe.no` (erstatter dagens separate Kontakt-knapp; den fjernes så den ikke dobles)

Desktop: bruker `DropdownMenu` fra shadcn med samme farge-/scroll-state-logikk som dagens lenker (hvit tekst over hero, mørk tekst når scrollet). Mobil (Sheet): collapsible/Accordion-seksjon for SMS og Articles/Media; resten som lenker.

Sosial-ikoner, språkvelger og logo beholdes uendret.

### 3. Section-IDer i `src/pages/Index.tsx`
- Legg til `id="security-section"` på Security-SectionReveal.
- Legg til `id="integrations-section"`. Integrasjoner ligger i ProductShowcase; enkleste løsning: wrap eller marker en sub-seksjon. Plan: legg `<div id="integrations-section" />`-anker rett før integrasjonsdelen inne i `ProductShowcase.tsx` (over DJI/SafeSky/ECCAIRS-blokken). Hvis den ikke kan isoleres rent, plasseres ankeret like over ProductShowcase-`SectionReveal`-en og påkalles fra menyen — bekreftes ved implementering.

### 4. Ny side `src/pages/Operations.tsx`
Enkel side med Helmet (norsk/engelsk tittel), H1 og kort prosa:

> "AviSafe søker om operatørtillatelse og ønsker å hjelpe selskaper i gang med sine operasjoner. Ta kontakt med oss for å høre hvor vi er i prosessen."

Plus Kontakt-knapp (mailto). Registrer rute `/operations` i `src/App.tsx`.

### 5. i18n — `src/i18n/locales/no.ts` og `en.ts`
Legg til:
```
nav.sms, nav.smsOverview, nav.smsIntegrations, nav.smsSecurity,
nav.operations, nav.articlesMedia, nav.articles, nav.gallery,
nav.newsletter, nav.contact
operations.pageTitle, operations.h1, operations.body, operations.cta
```
Norsk: "SMS", "Oversikt", "Integrasjoner", "Sikkerhet", "Operasjoner", "Artikler/Media", "Nyhetsbrev", "Kontakt".
Engelsk: "SMS", "Overview", "Integrations", "Security", "Operations", "Articles & Media", "Newsletter", "Contact".

Dagens `nav.product`, `nav.sora`, `nav.articles`, `nav.gallery`, `nav.team` beholdes i fil men brukes ikke lenger av header.

### Åpne spørsmål (kan avklares under bygg)
- "SMS" tolkes som **Safety Management System** (produktet). Bekreft hvis det betyr noe annet.
- SORA/Team-lenkene i dagens header fjernes — si fra hvis de skal beholdes ved siden av de nye.
