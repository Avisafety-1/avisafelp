## Problem

`react-pdf@10.4.1` bunder `pdfjs-dist@5.4.296`, men jeg installerte `pdfjs-dist@5.7.284`. Worker-versjon (5.7.284) matcher ikke API-versjon (5.4.296), så PDF-en feiler med:
> The API version "5.4.296" does not match the Worker version "5.7.284".

## Løsning

Last worker fra `pdfjs-dist`-versjonen som faktisk er bundlet med `react-pdf`. I stedet for å pinne versjoner manuelt, bruk react-pdf's egen pdfjs-instans for å bygge worker-URL via CDN basert på `pdfjs.version`.

### Endring i `src/components/PdfViewer.tsx`

Bytt ut:
```ts
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
```

med:
```ts
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
```

Dette garanterer at worker-versjonen alltid matcher API-versjonen react-pdf bruker, uavhengig av hva som ligger i `node_modules`.

### Rydding

Fjern `pdfjs-dist` fra `package.json` siden det ikke lenger brukes direkte (react-pdf har sin egen).
