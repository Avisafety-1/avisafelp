
## Kopiere SORA-prosess-siden fra AviSafe v2

### Hva skal gjøres

Siden `SoraProcess.tsx` fra AviSafe v2 kopieres inn i dette prosjektet og gjøres tilgjengelig på ruten `/sora-prosess`.

### Hva inneholder siden

En fullstendig standalone-side (616 linjer) som visualiserer hele SORA-prosessen som et flytdiagram med 7 faser:

- Fase 1: AviSafe Oppdragsdata
- Fase 2: Eksterne Datakilder (Yr.no, OpenAIP, SSB, mm.)
- Fase 3: Selskapssettings & Hard Stops
- Fase 4: Pilot & Operatør Input
- Fase 5: AI Analyse – første vurdering
- Fase 6: Pilotens Mitigeringer
- Fase 7: AI Re-vurdering – SORA-modus
- Output: GRC, ARC, SAIL-nivå, GO/NO GO

Pluss en "Hvorfor AviSafe SORA?" seksjon med 3 kolonner og en footer.

### Tekniske detaljer

**Filer som opprettes/endres:**

1. **`src/pages/SoraProcess.tsx`** – Kopieres direkte fra AviSafe v2. Siden er selvinneholdt (ingen eksterne komponent-avhengigheter).

2. **`src/assets/avisafe-logo-text.png`** – Kopieres fra AviSafe v2. Siden bruker et logo-bilde med tekst som ikke finnes i dette prosjektet. Denne kopieres fra `public/avisafe-logo-text.png` i AviSafe v2.

3. **`src/App.tsx`** – Legger til ruten `/sora-prosess` som peker til den nye siden.

### Ingen konflikter

Siden bruker inline styles med et eget fargesystem (mørk bakgrunn), og er helt isolert fra resten av prosjektets design. Den vil ikke påvirke eksisterende sider.
