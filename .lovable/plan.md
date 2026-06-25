
## Mål

Legge til en enkel nettbutikk på `/butikk` med ett produkt — Dronetag Mini — til **4 899 kr inkl. mva**. Siden skal fungere som en produktside (hero, bilder, features, specs, FAQ) med tydelig «Legg i handlevogn» / «Kjøp nå». Handlevogn og checkout-skjelett bygges nå; Stripe kobles på i neste runde.

Bevisst valg: Vi bruker **ikke** den eksisterende Shopify-integrasjonen for dette produktet. Vi lager en frittstående, lokal butikk (egen produktkatalog + Zustand-cart) som er lett å koble til Stripe senere uten Shopify-omveien.

## Sider og navigasjon

- Ny rute `/butikk` (Butikk-side, Dronetag Mini).
- Ny rute `/butikk/checkout` (handlevognoppsummering + deaktivert «Betal med Stripe»-knapp).
- Ny meny-knapp **«Butikk»** i `SiteHeader`:
  - Desktop: egen knapp ved siden av «Operasjoner».
  - Mobil: egen oppføring i Sheet-menyen.
- Liten handlevogn-ikon (lucide `ShoppingCart`) i header-høyrekluster, viser antall i badge. Åpner en `Sheet`-drawer (CartDrawer) på alle sider.

## Butikk-side `/butikk`

Layout, AviSafe-stil (samme bakgrunn, glassmorphism, animasjoner som ellers på sitet):

1. **Hero**
   - Stort produktbilde (Dronetag Mini hero) til venstre, tekst til høyre.
   - H1: «Dronetag Mini — Remote ID som bare funker».
   - Underoverskrift om Network + Direct Remote ID, 32 g, 14 t batteritid.
   - Pris: **4 899 kr** (inkl. mva).
   - Primær-CTA: «Legg i handlevogn» (legger til + åpner drawer).
   - Sekundær-CTA: «Kjøp nå» (legger til + navigerer til `/butikk/checkout`).
   - Liten info-linje: «Fri frakt i Norge · 2 års garanti · Sendes innen 1–3 dager». (Tekst kan justeres senere.)

2. **Bildegalleri** — 4–5 produktbilder fra dronetag.com som thumbnails + stor visning (samme mønster som `Product.tsx`).

3. **Feature-grid (6 kort)** — Dual Remote ID, 14 t batteri, 32 g, Multi-GNSS, Integrerte antenner, Flight-phase detection. Ikoner fra lucide.

4. **«Hvordan det funker»** — 4 steg: Fest Mini → Slå på → Ta av → Fly & overvåk.

5. **Spesifikasjoner** — Accordion/tabell: vekt, mål, batteri, GNSS, RID-protokoller (EU/EASA, FAA, CAA, CAAS), tilkobling (LTE-M/NB-IoT, BLE), sensorer.

6. **Abonnement/nettverk** — Kort tekstblokk: «Nettverks-RID krever abonnement (fra ca. €15/mnd, første 2 mnd gratis)». Lenke til Dronetag.

7. **FAQ** — Accordion med 4–6 spørsmål (Hva er Remote ID? Trenger jeg dette i Norge? Fungerer det med min drone? Levering? Garanti? Returrett?).

8. **Bunn-CTA** — Stor «Legg i handlevogn / 4 899 kr»-knapp.

SEO: `<Helmet>` med title «Dronetag Mini – Kjøp Remote ID-sender | AviSafe», meta description, canonical `https://avisafe.no/butikk`, OG-tags, og JSON-LD `Product` med pris i NOK.

## Handlevogn (Zustand-store)

Ny `src/stores/shopCart.ts` — helt separat fra eksisterende `cartStore.ts` (som er Shopify-spesifikk), slik at vi ikke roter til den eksisterende butikken på forsiden.

```ts
type ShopProduct = { id: string; slug: string; title: string; priceNok: number; image: string };
type ShopCartItem = { product: ShopProduct; quantity: number };

useShopCart: {
  items, addItem, updateQty, removeItem, clear,
  totalItems, totalNok,
}
```

Persistert i `localStorage` via `zustand/middleware/persist` (nøkkel `avisafe-shop-cart`).

Produktkatalog hardkodes i `src/data/shopProducts.ts` med Dronetag Mini (én post).

## CartDrawer-komponent

Ny `src/components/ShopCartDrawer.tsx` (gjenbruker `Sheet`, mønstret etter eksisterende `CartDrawer.tsx`):
- Liste over items med bilde, tittel, pris, +/- antall, fjern.
- Totalsum (NOK).
- Knapp «Gå til kassen» → `/butikk/checkout`.
- Trigger-knapp eksporteres separat så `SiteHeader` kan legge inn ikon + badge.

## Checkout-side `/butikk/checkout`

- Oppsummering av handlekurv (samme data).
- Totalsum + «Inkl. mva (25 %)» linje.
- Deaktivert primærknapp: **«Betal med Stripe (kommer snart)»** med liten tooltip/tekst: «Betalingsløsning aktiveres snart».
- Sekundærknapp: «Tilbake til butikken».
- Ingen skjema for adresse/navn nå (i tråd med valget ditt).

## Tekniske detaljer

- Filer som opprettes:
  - `src/pages/Butikk.tsx`
  - `src/pages/ButikkCheckout.tsx`
  - `src/components/ShopCartDrawer.tsx`
  - `src/components/ShopCartButton.tsx` (ikon + badge til header)
  - `src/stores/shopCart.ts`
  - `src/data/shopProducts.ts`
- Filer som endres:
  - `src/App.tsx` — to nye `<Route>`-er, skjul header også for `/butikk/checkout`? Nei — vis header (med handlevogn-ikon) på `/butikk` og `/butikk/checkout`.
  - `src/components/SiteHeader.tsx` — ny «Butikk»-knapp (desktop + mobil) + montering av `ShopCartButton`.
  - `src/i18n/locales/no.ts` (og `en.ts` for konsistens) — `nav.shop = "Butikk"` o.l.
- Produktbilder: lastes ned fra dronetag.com og lastes opp via `lovable-assets` til CDN, så vi har stabile URLer og ikke hotlinker.
- Ingen Shopify-kall, ingen Stripe-kall i denne runden. Stripe-integrasjonen og ordrelagring (Lovable Cloud) gjøres i neste iterasjon.

## Avgrenset (gjør IKKE nå)

- Ingen Stripe-integrasjon, ingen edge function, ingen ordrelagring i databasen.
- Ingen ekte fraktberegning eller adresseskjema.
- Ingen flere produkter eller varianter — kun Dronetag Mini.
- Ingen endring av eksisterende Shopify-flyt på forsiden.
