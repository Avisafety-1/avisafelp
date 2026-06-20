## Mål

Implementere Consent Mode v2 slik Google anbefaler i dokumentasjonen du limte inn: Google-taggen lastes på alle sider rett etter `<head>`, med `consent default` satt til `denied` for alle parametere *før* taggen lastes. Samtykkebanneret oppdaterer deretter status via `gtag('consent','update', ...)`.

Dagens kode laster GA først *etter* at brukeren har akseptert. Det betyr at vi mister "consent mode pings" (anonyme signaler Google bruker for modellering) og bryter Googles anbefalte rekkefølge.

## Endringer

### 1. `index.html`
Legg til rett etter `<head>` (før alt annet script):

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Default: alt nektet inntil bruker velger i banneret
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y2627FR6GY"></script>
<script>
  gtag('js', new Date());
  gtag('config', 'G-Y2627FR6GY', { anonymize_ip: true });
</script>
```

### 2. `src/lib/analytics.ts`
- Fjerne `loadGA()` (taggen lastes nå i `index.html`).
- `applyConsent()` kaller bare `gtag('consent','update', ...)` med `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`.
- `initAnalytics()` kjører `applyConsent` ved oppstart hvis bruker allerede har samtykket — slik at update sendes "well before page unloads" (jf. common issues).
- `trackPageView()` til egen DB beholdes som i dag (gated på `analytics`-consent).

### 3. Ingen endringer i `CookieBanner.tsx`
Banneret kaller allerede `setConsent → applyConsent`, som etter endringen sender riktig `update`-kall.

## Hvorfor

- Følger Googles offisielle rekkefølge (default → load tag → update).
- Aktiverer consent mode-modellering selv når brukeren nekter analytics.
- `wait_for_update: 500` gir React-banneret tid til å oppdatere før første event.
- `ads_data_redaction` + `url_passthrough` er anbefalt for advanced consent mode.
