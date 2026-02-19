
## Ny offentlig side: /sora

### Hva og hvorfor

En ny side på ruten `/sora` som presenterer de 7 fasene i AviSafe sin SORA-prosess for besøkende/kunder — uten å avsløre tekniske implementasjonsdetaljer for konkurrenter. I stedet for bullet points med konkrete datakilder og parameter-navn, brukes et overordnet narrativ per fase som forklarer *hva som skjer* og *hvilken verdi det gir*.

Designet er identisk med `/sora-prosess` (samme mørke fargepalett, flytdiagram med `FlowConnector`, `PhaseCard`-stil), men innholdet er skrevet i et markedsføringsvennlig, forklarende språk.

---

### Innholdsstruktur

**Hero-seksjon** — Samme oppsett som `/sora-prosess`: logo, badge, heading og stats-bar.

**Flytdiagram — 7 faser (uten bullet points)**

Hver fase presenteres som et kort med én sammenhengende forklaringstekst i stedet for en liste:

| Fase | Tittel | Hva som forklares (ikke avslørende) |
|---|---|---|
| 1 | Oppdragsgrunnlag | AviSafe samler automatisk alle relevante data om oppdraget — lokasjon, mannskap, utstyr og tidspunkt |
| 2 | Miljø og luftrom | Systemet henter oppdatert informasjon om vær og luftromsforhold fra offentlige datakilder |
| 3 | Selskapets rammer | Operatørens egne sikkerhetskrav og begrensninger legges til grunn — og kan aldri overstyres |
| 4 | Pilotens vurdering | Piloten beskriver de operative forholdene og parameterne for det konkrete oppdraget |
| 5 | Første AI-analyse | En kunstig intelligens gjennomgår alle innsamlede data og identifiserer risikoområder |
| 6 | Tiltak og mitigeringer | Piloten responderer på analysen med konkrete sikkerhetstiltak for hvert risikoområde |
| 7 | SORA-beregning | AI gjennomfører en fullstendig SORA-beregning etter EASA-metodikken med alle mitigeringer lagt til grunn |

**Output-seksjon** — Viser GRC, ARC, SAIL og GO/NO GO på samme måte som `/sora-prosess` (eksempeldata).

**"Hvorfor AviSafe SORA?" seksjon** — Tre kolonner: Automatisert, Sporbar, Regulatorisk klar — men med prosa-tekst i stedet for bullet points.

**Footer** — Samme som `/sora-prosess`.

---

### Tekniske detaljer

**Filer som opprettes/endres:**

1. **`src/pages/Sora.tsx`** — Ny fil. Bygget på samme mønster som `SoraProcess.tsx` men med:
   - Prosa-tekst per fase i stedet for `items[]`-lister
   - En ny `ProsePhaseCard`-komponent som viser én forklarende tekst-paragraf
   - Samme `C`-fargepalett og `FlowConnector`
   - Ingen konkrete datakildenavn, parameter-navn, eller tekniske detaljer

2. **`src/App.tsx`** — Legger til `import Sora` og ruten `<Route path="/sora" element={<Sora />} />`.

---

### Ingen konflikter

Siden er selvinneholdt med egne inline-stiler, identisk isolert fra resten av prosjektets design som `/sora-prosess`. Eksisterende sider påvirkes ikke.
