## Problem

På /artikler vises PDF-artikler i en `<iframe src={pdf_url}>`. Dette fungerer på desktop, men på mobil (iOS Safari og de fleste Android-nettlesere) rendres ikke PDF-er inne i iframes — brukeren ser et tomt felt eller blir tvunget til å trykke "Åpne PDF i ny fane", som da åpner rå Supabase Storage-URL.

Samme problem gjelder også /artikler/:slug (Artikkel.tsx) som bruker samme iframe-mønster.

## Løsning

Bytt ut iframe med en JavaScript-basert PDF-renderer (PDF.js via `react-pdf`) som rendrer hver side som canvas/SVG. Dette fungerer overalt — desktop og mobil — og brukeren ser PDF-en automatisk uten å klikke noe.

### Steg

1. **Installer avhengighet**
   - `react-pdf` (wrapper rundt pdfjs-dist)
   - Sett opp PDF.js worker via Vite (`import` av worker fra `pdfjs-dist/build/pdf.worker.min.mjs?url`)

2. **Lag ny komponent `src/components/PdfViewer.tsx`**
   - Tar `url: string` som prop
   - Bruker `<Document>` + `<Page>` fra react-pdf
   - Rendrer alle sider stablet vertikalt
   - Responsiv bredde: bruker container-bredde via `ResizeObserver` slik at sidene skaleres til mobilskjerm
   - Loading- og feiltilstand på norsk
   - Beholder en "Åpne PDF i ny fane / Last ned"-knapp under som fallback

3. **Bytt iframe i `src/pages/Artikler.tsx`**
   - Erstatt `<iframe ...>`-blokken (innenfor `selected.article_type === 'pdf'`) med `<PdfViewer url={selected.pdf_url} />`

4. **Bytt iframe i `src/pages/Artikkel.tsx`**
   - Samme erstatning innenfor `article.article_type === 'pdf'`-grenen

### Tekniske detaljer

- `react-pdf` versjon 9.x kompatibel med Vite + React 18
- Worker-oppsett:
  ```ts
  import { pdfjs } from "react-pdf";
  import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  ```
- CSS imports som trengs:
  ```ts
  import "react-pdf/dist/Page/AnnotationLayer.css";
  import "react-pdf/dist/Page/TextLayer.css";
  ```
- Sidebredde: mål container med `useRef` + `ResizeObserver`, send som `width`-prop til `<Page>`
- CORS: Supabase Storage public URL-er sender korrekte CORS-headere, så PDF.js kan hente dem direkte

### Hva som ikke endres

- Database, opplastingsflyt i `ArticleEditor.tsx`, RLS-policyer eller URL-strukturen
- Rik-tekst-artikler (de fungerer allerede)
