

## Legg til DJI-bilder over drone-landskapet

### Endringer

**Kopiér bilder til prosjektet:**
- `user-uploads://Screenshot_2026-02-26_180745.png` → `src/assets/dji-map.png`
- `user-uploads://Screenshot_2026-02-26_180820.png` → `src/assets/dji-dashboard.png`

**Endre `src/components/Hero.tsx`:**

Legg til en ny seksjon *over* drone-landskapsbildet med:

- To bilder side ved side (på desktop), stablet eller overlappende på mobil
- Tekst: **"Full støtte for DJI RC PRO/PLUS"** sentrert under/over bildene
- Hvert bilde får en kraftig radial gradient-mask som fader ut kantene i alle retninger, slik at de smelter inn i den hvite bakgrunnen
- Subtil skygge og avrundede hjørner for mykere uttrykk
- Bildene vinkles/overlapper litt for en dynamisk komposisjon

```text
┌──────────────────────────────────────────┐
│    [DJI kart-bilde]   [DJI dash-bilde]   │  ← fade på alle kanter
│       "Full støtte for DJI RC PRO/PLUS"   │
├──────────────────────────────────────────┤
│         [drone-landscape.png]             │  ← eksisterende
│              [AviSafe logo]               │
│           [CTA-knapper]                   │
└──────────────────────────────────────────┘
```

- Mask: `radial-gradient(ellipse 80% 70% at center, black 40%, transparent 100%)` på hvert bilde
- Teksten er `text-[#123b87]` med `font-bold`, plassert mellom bildene og dronen
- Responsivt: på mobil vises bildene mindre og stablet vertikalt

