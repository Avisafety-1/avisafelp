

## Analyse: Treg lasting av avisafe.no

### Hovedårsaker til treg lasting

Siden laster mange tunge ressurser samtidig ved oppstart:

1. **6 videoer som autoplay-er samtidig** – I telefon-karusellen har 5 av 9 features videoer (`dashboard-demo.mp4`, `ai-risk-demo.mov`, `dronetag-demo.mp4`, `startflytur-demo.mp4`, `oppdrag-demo.mp4`) som alle starter nedlasting umiddelbart. I tillegg er det `avisafe-demo.mp4` som også autoplay-er lenger ned. Det er 6 videoer som alle begynner å laste parallelt.

2. **Mange store bilder importert direkte** – Over 15 bilder importeres via ES-moduler (ikke lazy-loaded): `drone-landscape.png`, `dji-map.png`, `dji-dashboard.png`, `dronetag-mini.jpeg`, flere app-screenshots, team-bilder osv. Alle lastes ved oppstart.

3. **Ingen lazy loading på videoer** – Videoene i karusellen er ikke synlige på skjermen, men laster likevel fordi de har `autoPlay`.

4. **Hero-video er en stor PNG** – `drone-landscape.png` er sannsynligvis en stor fil som lastes umiddelbart.

### Plan for optimalisering

**Steg 1: Lazy-load videoer i karusellen**
- Bruk `IntersectionObserver` i `PhoneMockup` slik at videoer kun laster når de er synlige (eller nær synlige) i viewport.
- Vis `poster`-bildet inntil videoen er i view.

**Steg 2: Lazy-load demo-videoen**
- `avisafe-demo.mp4` lenger ned på siden bør også kun laste når den er i viewport.

**Steg 3: Legg til `loading="lazy"` på flere bilder**
- Bildene i integrasjonsseksjonen (DJI, Dronetag, ECCAIRS2) har allerede `loading="lazy"`, men `drone-landscape.png` i hero og team-bildene mangler det. Team-bildene bør ha lazy loading.

**Steg 4: Optimaliser video-preload**
- Legg til `preload="none"` på alle videoer som ikke er synlige ved oppstart, slik at nettleseren ikke begynner å laste dem i det hele tatt før de trengs.

### Tekniske detaljer

- Oppretter en `useInView`-hook eller bruker `IntersectionObserver` direkte i `PhoneMockup` for å kontrollere når videokilden settes.
- Endrer `<video>` til å ha `preload="none"` og kun sette `src` når elementet er nær viewport.
- Demo-videoen (`avisafe-demo.mp4`) wrrappes med samme logikk.
- Disse endringene gjøres i `ProductShowcase.tsx` og `Hero.tsx`.

