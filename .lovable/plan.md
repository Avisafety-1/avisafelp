
# Statistikk med Google Analytics 4

## Hva som bygges

1. **GA4-integrasjon** på hele siden, lastet KUN etter samtykke (Consent Mode v2).
2. **Cookie-/samtykkebanner** på norsk/engelsk med Godta / Avslå / Innstillinger.
3. **/statistikk-side** bak innlogging, tilgjengelig for brukere med admin-rolle. Viser nøkkeltall + embeddet GA4-rapport.
4. **Admin-rollesystem** (user_roles-tabell) slik at flere kan få tilgang senere.

## Forutsetninger fra deg

- **GA4 Measurement ID** (format `G-XXXXXXXXXX`). Opprettes gratis på analytics.google.com → Admin → Ny eiendom → Web → Datastrøm. Lim inn ID-en når jeg spør.
- **Embeddet rapport (valgfritt nå):** GA4 har ingen offisiell embed, så /statistikk vil vise:
  - Egne nøkkeltall fra databasen (sidevisninger, geo, referrer — se punkt 5).
  - En knapp "Åpne full rapport i Google Analytics" som lenker direkte til GA4-dashbordet.
  - Hvis du vil ha grafer direkte på siden senere, kan vi bygge det med GA4 Data API (krever service account — egen runde).
- **Admin-bruker:** Du sier hvilken e-post som skal være første admin. Lager innlogging hvis det ikke finnes.

## Hva trackes (alt du valgte)

- Sidevisninger per URL + tid på side / sesjonsvarighet (GA4 native).
- Geolokasjon land/by (GA4 native via IP).
- Referrer/kilde + enhet/nettleser/OS (GA4 native).
- CTA-klikk via custom events: SMS-knapp, Kontakt-knapp, integrasjoner, navigasjon i header.

## Samtykkebanner (GDPR)

- Vises første gang, valg lagres i `localStorage`.
- "Godta alle" → GA4 lastes inn, Consent Mode settes til granted.
- "Avslå" → Ingen GA4-lasting, ingen cookies.
- "Innstillinger" → toggles for Analytics / Marketing (sistnevnte av som default).
- Lenke til personvern (ny enkel /personvern-side med standard tekst — bekreft hvis du har egen).

## /statistikk-side

- Skjult fra header (kun direkte URL).
- Krever innlogging (Lovable Cloud auth, e-post + passord + Google).
- Sjekker `has_role(uid, 'admin')` — ikke-admin får "Ingen tilgang".
- Innhold:
  - Topp: 4 nøkkeltallkort (totale visninger siste 30 dager, unike besøkende, snitt tid på side, topp land) — fra egen `page_views`-tabell.
  - Liste over topp 20 sider med antall visninger.
  - Liste over topp 10 land.
  - Kart-/listevisning over geo (enkel liste først).
  - Knapp "Åpne i Google Analytics" → lenker til GA4.

## Teknisk

- **Tabeller (migration):**
  - `app_role` enum (`admin`, `user`)
  - `user_roles (id, user_id, role)` + RLS + `has_role()` security definer
  - `page_views (id, path, referrer, country, city, user_agent, session_id, duration_ms, created_at)` — egen lett tracking parallelt med GA4 for å kunne vise tall på /statistikk uten Data API. Anonym insert tillatt, kun admin kan lese.
- **Frontend:**
  - `src/lib/analytics.ts` — laster GA4 conditionally, ekspoerer `trackEvent()` + `trackPageView()`.
  - `src/components/CookieBanner.tsx` — banner + innstillinger-modal, i18n.
  - `src/hooks/usePageTracking.ts` — sender pageview ved route change (GA4 + egen tabell).
  - CTA-events legges på eksisterende knapper (SMS, Kontakt, header-nav, integrasjoner).
  - `src/pages/Statistikk.tsx` + rute i `App.tsx`.
  - `src/pages/Personvern.tsx` (enkel).
- **Geo:** Lookup via gratis `ipapi.co` (allerede brukt i i18n) ved første pageview per sesjon, caches i sessionStorage.
- **i18n:** Alle nye strenger legges i `no.ts` + `en.ts`.

## Rekkefølge

1. Migration (roller + page_views).
2. Cookie-banner + GA4-loader + sporing.
3. CTA-event-hooks i eksisterende komponenter.
4. /statistikk + /personvern + admin-tilgang.
5. Du gir GA4 Measurement ID + e-post for første admin → jeg setter inn.

Sier du go, så bygger jeg i den rekkefølgen.
