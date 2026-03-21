

## Legg til DJI flyanalyse-seksjon med bildekarusell

### Hva

Under den eksisterende DJI-seksjonen (etter de to DJI-bildene) legges det til:
- Underoverskrift: **"Avansert analyse fra loggfiler"**
- Beskrivelse: "Analyser data i detalj – app warnings, kontrollinput, batteri, vind, hastighet og mer."
- En horisontal bildekarusell med de 10 opplastede flyanalyse-skjermbildene + opplastingsdialog-bildet

### Endringer

**Kopier 10 bilder til `src/assets/`:**
- `IMG_1065.jpeg` til `IMG_1074.jpeg` → `src/assets/dji-analyse-1.jpeg` til `src/assets/dji-analyse-10.jpeg`

**Endre `src/components/ProductShowcase.tsx`:**

Etter linje 338 (etter de eksisterende DJI-bildene, men fortsatt inni DJI-kortet), legg til:

1. En ny `<div>` med `text-center mt-10 mb-6`:
   - `<h4>` med tekst "Avansert analyse fra loggfiler"
   - `<p>` med beskrivelsestekst
2. En horisontal scroll-karusell (samme mønster som telefonkarusellen) med alle 10 bildene
   - Hvert bilde vises med `rounded-xl shadow-lg`, ca 300-400px bredt
   - `overflow-x-auto` med skjult scrollbar, `snap-x snap-mandatory`
   - `loading="lazy"` på alle bilder

### Teknisk mønster

Gjenbruker det horisontale scroll-mønsteret som allerede finnes i telefonkarusellen, men uten auto-scroll. Enkel swipe/drag på mobil, scroll på desktop.

