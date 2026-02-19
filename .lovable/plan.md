
## Legge til SORA-banner over mobilkortene

### Hva og hvor

En iøynefallende banner plasseres i `ProductShowcase.tsx` — i den tomme header-seksjonen som allerede finnes like over telefonkarusellen (linje 172–179). Dette er det naturlige stedet: synlig for alle, rett over mobilkortene, på forsiden.

### Design

Banneret bygges som en bred, mørkeblå (samme `#123b87` som eksisterende CTA-knapper) gradient-boks med:

- En liten badge/chip øverst: f.eks. `✦ Nyhet` eller `AI-drevet`
- Hovedtekst: **"Norges mest avanserte verktøy for SORA-risikovurderinger"**
- Undertext: kort forklaring, f.eks. "AviSafe beregner GRC, ARC og SAIL automatisk – med kunstig intelligens og full EASA-compliance."
- En tydelig CTA-knapp: `"Se hvordan det fungerer →"` som lenker til `/sora`
- Subtil glødeffekt/skygge og animert pil

Banneret er responsivt og ser bra ut på både mobil og desktop.

### Tekniske detaljer

**Én fil endres:**

**`src/components/ProductShowcase.tsx`**
- Legg til `import { Link } from "react-router-dom"` og `import { ArrowRight, Sparkles } from "lucide-react"` (Sparkles finnes i lucide-react v0.462)
- Erstatt den tomme `<div className="text-center mb-8">` (linje 173–177) med en `SoraBanner`-komponent:

```text
┌─────────────────────────────────────────────────────┐
│  [✦ AI-drevet SORA]                                 │
│                                                     │
│  Norges mest avanserte verktøy                      │
│  for SORA-risikovurderinger                         │
│                                                     │
│  AviSafe beregner GRC, ARC og SAIL automatisk –     │
│  med kunstig intelligens og full EASA-compliance.   │
│                                                     │
│            [ Se hvordan det fungerer → ]            │
└─────────────────────────────────────────────────────┘
```

- Bakgrunn: mørkeblå gradient (`from-[#0d2d6e] via-[#123b87] to-[#1a4fa8]`)
- Hvit tekst, avrundede hjørner (`rounded-2xl`), subtil glødskygge
- CTA-knappen er hvit med mørkeblå tekst (invertert)
- Maks bredde `max-w-4xl mx-auto` for å matche resten av siden
- `Link to="/sora"` fra react-router-dom brukes for intern navigasjon

### Ingen konflikter

Banneret legges kun inni den allerede tomme `<div>` i `ProductShowcase`. Ingen andre komponenter berøres.
