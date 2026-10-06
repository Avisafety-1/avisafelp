# Plan: Gjøre avisafe.no lesbar og siterbar for AI-assistenter og søkemotorer

## Status i dag (funn)
- Siden er en React SPA. AI-crawlere (GPTBot, ClaudeBot, PerplexityBot) ser i dag bare `index.html`: én tittel, én beskrivelse, Organization- og WebSite-JSON-LD, og en tom `<div id="root">`. All tekst, alle overskrifter og all sidespesifikk metadata (Helmet) mangler for dem.
- `public/llms.txt` er feil: den beskriver AviSafe som en sikkerhetsløsning for «aviser og mediehus». Denne må skrives om først, fordi AI-er kan sitere den feil.
- `sitemap.xml` er en fast fil som lages for hånd, og den mangler /butikk, /operasjoner, /personvern, /galleri og de fleste artiklene.
- `robots.txt` tillater alle, men nevner ikke AI-crawlerne ved navn.
- Det finnes ingen hreflang, ingen egne engelske adresser og ingen BreadcrumbList eller SoftwareApplication.

## Hva som er mulig med Lovable-hosting (punkt 1)
Lovable-hosting leverer statiske filer fra build-mappen. Det finnes to veier:

**Alternativ A – Migrere til TanStack Start (anbefalt).** Dette er Lovables offisielle mal med server-rendering (SSR). Hver rute leveres som ferdig HTML med tekst, metadata og JSON-LD, også dynamiske artikler fra databasen. Lovable støtter dette fullt ut. Du starter migreringen selv: skriv «/» i chatten og velg «Migrate to TanStack Start». [Les mer](https://lovable.dev/blog/building-apps-using-tanstack-start)

**Alternativ B – Forhåndsrendering ved build (vite-react-ssg eller et eget prerender-skript).** Dette lager én ferdig `rute/index.html` per kjent rute. Risikoer:
- Lovable-hosting garanterer ikke at `/sora` leverer `/sora/index.html` i stedet for SPA-reservesiden. Dette må testes på publisert side før vi kan stole på det.
- Artikler fra databasen kommer bare med hvis vi henter dem ved build. Nye artikler blir da usynlige til neste publisering.
- Mye omskriving: Router, Helmet, i18n-deteksjon (IP-oppslag, localStorage) og videoer/animasjoner må tåle rendering uten nettleser.

**Anbefaling:** A. Hvis du ikke vil migrere, gjør jeg B som et eksperiment. Jeg verifiserer med `curl` mot publisert side og viser deg utdraget av HTML-kilden per rute. Er resultatet ikke bra nok, går vi over til A.

Uansett alternativ verifiserer jeg slik: `curl -A "GPTBot" https://avisafe.no/<rute>` for hver rute. Utdraget skal vise H1, brødtekst, `<title>`, canonical, hreflang og JSON-LD.

## Fase 1 – Rendering og crawler-tilgang
1. Rendering etter alternativet du velger (A eller B).
2. `public/robots.txt`: egne blokker med `Allow: /` for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot og Googlebot. Eksisterende blokker beholdes, `Sitemap: https://avisafe.no/sitemap.xml` likeså. /statistikk og /butikk/checkout blokkeres med `Disallow`.
3. Sitemap som oppdateres automatisk: `scripts/generate-sitemap.ts` kjøres før build. Det tar med alle offentlige ruter, de nye engelske sidene og alle publiserte artikler fra databasen, med hreflang-alternativer. Jeg tar bare med `lastmod` når artikkelen har en ekte dato. Den faste `sitemap.xml` erstattes (du har bedt om dette selv).
4. `public/llms.txt` skrives helt om, på engelsk: hva AviSafe er (operasjonssystem og SMS for droneoperatører), med én setning per viktig side. Valgfritt: `llms-full.txt` med utfyllende tekst.

Filer: `public/robots.txt`, `public/llms.txt`, `scripts/generate-sitemap.ts`, `package.json`, `public/sitemap.xml` (blir generert), samt rendering-oppsettet (`vite.config.ts`, `src/main.tsx`, `src/App.tsx` eller rutefiler ved migrering).

## Fase 2 – Metadata og strukturerte data
1. Felles SEO-komponent (`src/components/Seo.tsx`) per rute: unik title, description, canonical, og:*, twitter:* og hreflang `nb` / `en` / `x-default` (x-default peker på engelsk).
2. Språk i adressen: norsk på dagens adresser, engelsk under `/en/...`. Dagens automatiske språkbytte via IP gjelder bare visningen. Crawlere får alltid det språket adressen tilsier. Uten dette kan ikke hreflang fungere.
3. JSON-LD:
   - Organization (sitevid): navn, url, logo, grunnleggere (Person), kontakt, adresse Norge, `sameAs` med [FYLL INN]-lenker.
   - SoftwareApplication (forside og landingssider): applicationCategory BusinessApplication, operatingSystem Web, tilbud/pris bare hvis du oppgir det.
   - FAQPage: bare på sider som faktisk viser FAQ-en synlig. Google viser ikke lenger FAQ-resultater for de fleste nettsteder, men AI-er og Bing leser det fortsatt.
   - BreadcrumbList: alle undersider.
   - Article: artikler (finnes allerede, utvides).
4. Semantisk HTML og tilgjengelighet: `header`, `main`, `section`, `article` og `footer` ryddes. Alt-tekst på alle bilder og logoer, én H1 per side, riktig overskriftshierarki, lenketekster og kontrast. Lighthouse kjøres for SEO og Accessibility før og etter.
5. Ny About-side (`/om-oss` + `/en/about`): grunnleggere og bakgrunn (luftfart, flysikkerhet, EASA Safety Manager), Norge, kontakt@avisafe.no.
6. Seksjon/side for partnere og integrasjoner (`/en/partners`, samt norsk): SafeSky, DJI, ECCAIRS, med lenker til eksterne omtaler.

Filer: `index.html`, `src/components/Seo.tsx` (ny), alle filer i `src/pages/*`, `Hero.tsx`, `Team.tsx`, `Security.tsx`, `ProductShowcase.tsx`, `Footer.tsx`, `src/i18n/*`, nye `About`- og `Partners`-sider.

## Fase 3 – Engelske landingssider
Fem sider med felles mal (`src/pages/en/LandingTemplate.tsx`) og innhold i egne datafiler:
- `/en/drone-safety-management-system` – SMS (EASA, UAS.LUC.030)
- `/en/sora-risk-assessment` – SORA 2.5
- `/en/occurrence-reporting` – rapportering og ECCAIRS-eksport (forordning (EU) 376/2014)
- `/en/drone-fleet-management` – flåte, piloter, vedlikehold, DJI
- `/en/live-airspace-awareness` – SafeSky-trafikk og NOTAM

Hver side får:
- H1 og en første setning som kan siteres direkte.
- Seksjonene «Who it's for», «Key features», «Regulatory basis» og «FAQ» (6–8 spørsmål).
- Interne lenker mellom sidene og CTA-en «Book a demo» (mailto:kontakt@avisafe.no, eller et skjema hvis du ønsker det).
- Breadcrumb, FAQPage, SoftwareApplication og hreflang.

Sidene lenkes fra menyen, bunnteksten, sitemap og llms.txt.

## Konflikter med tidligere regler (trenger ditt ja)
- **«Kun norsk»:** Prosjektets regel sier at plattformen skal være strengt norsk. Engelske sider bryter med dette. Jeg oppdaterer regelen til «norsk og engelsk, engelsk prioritert for Europa» når du godkjenner.
- **SORA-hemmeligheter:** Regelen sier at tekniske detaljer om SORA ikke skal vises på offentlige sider. SORA-siden beskriver derfor bare hva verktøyet gjør og hvilket regelverk det bygger på, aldri hvordan beregningene gjøres.
- **Sikkerhetsseksjonen:** Den forblir ren tekst, uten ikoner eller punktlister.

## Fakta jeg mangler ([FYLL INN])
1. Navn, roller og korte biografier for grunnleggerne (inkludert hvem som er EASA Safety Manager), og LinkedIn-lenker.
2. LinkedIn for selskapet og andre sosiale profiler (`sameAs`).
3. Organisasjonsnummer, adresse eller by i Norge.
4. Om AviSafe støtter SORA 2.5 fullt ut, og hvilke deler.
5. Om ECCAIRS-eksporten er levert i dag (format: E5X?).
6. Hvilke DJI-integrasjoner som finnes (FlightHub 2, loggimport?).
7. Lenker til eksterne omtaler fra SafeSky, DJI eller ECCAIRS-partnere.
8. Pris eller prismodell (valgfritt, ellers utelates).
9. Ønsket demoløsning: e-post, kalenderlenke eller skjema.
10. Navngitte kunder du har lov til å vise (logoene i «Trusted by» brukes bare hvis det er godkjent som referanse).

Ingen kundenavn, tall, sertifiseringer eller sitater blir funnet på.

## Risikoer
- Ved alternativ B er det usikkert om hostingen leverer forhåndsrendrede undersider. Dette må testes på publisert side.
- Migrering (A) berører hele appen. Animasjoner, video-autoplay, handlevogn og innlogging på /statistikk må testes på nytt.
- hreflang og `/en`-adresser endrer hvordan språk velges. Dagens IP-baserte bytte begrenses til forsiden.
- Endringene synes på avisafe.no først etter publisering. Crawlere henter sidene på nytt i sitt eget tempo.

## Justeringer godkjent av bruker (gjelder over alt over)
- Steg 0 er gjort: llms.txt skrevet om på engelsk. Feil beskrivelse fantes kun der.
- Rendering: alternativ A. Brukeren starter migreringen selv. Etterpå får brukeren en testliste (handlevogn/checkout, /statistikk-innlogging, video-autoplay, animasjoner). SEO-arbeidet starter først etter bekreftelse.
- Språk: ingen IP-basert bytte eller omdirigering noe sted, heller ikke på forsiden. Et diskré banner («Switch to English» / «Bytt til norsk») vises basert på nettleserspråket. hreflang settes bare når en ekte motpart finnes; sider som bare finnes på engelsk får `en` + `x-default`.
- Fase 4 (ikke bygg ennå): norske landingssider /sikkerhetsstyring-droner, /sora-risikovurdering, /hendelsesrapportering, /droneflate, /luftromsbilde.
- Regelverk: occurrence-reporting = (EU) 376/2014 + art. 19 i (EU) 2019/947. SMS-siden er for operatører i spesifikk kategori og LUC-innehavere. Formuleringer som «built to support» og «designed around», aldri «compliance» eller godkjenning.
- Fakta: grunnleggere, segmenter, ECCAIRS E2 API, DJI Cloud API og SafeSky som oppgitt. Resten forblir [FYLL INN].
- noindex på /statistikk og /butikk/checkout.
- Verifisering etter hver fase: `curl -A GPTBot` mot forsiden, én landingsside og én artikkel.
