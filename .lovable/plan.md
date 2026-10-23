# Ny sikkerhetsside: /sikkerhet og /en/security

## Hva som bygges
En offentlig side som dokumenterer IT-sikkerhet, databeskyttelse og revisjoner, med de sju seksjonene du listet opp. Innholdet brukes nøyaktig som du skrev det.

1. Hero: tittel, ingress og fem merker (AES-256, TLS 1.3, 100 % RLS, EU/EØS-datasenter, 0 kritiske sårbarheter).
2. Kryptering og dataarkitektur: fire kort.
3. Tenant-isolasjon og tilgangskontroll: tre kort.
4. Revisjoner og penetrasjonstesting: tidslinje (mai 2026, oktober 2026, kontinuerlig).
5. Beredskapsplan: tre kort.
6. Geografi, hosting og GDPR: tre kort.
7. Ansvarlig offentliggjøring: boks med knapp til security@avisafe.no.

Utseende: glasskort (`bg-card/60 backdrop-blur border-border`), Lucide-ikoner, `SectionReveal` på hver seksjon, og bare fargene fra temaet.

## Lenker
- Bunnteksten: «Sikkerhet» legges inn mellom Compliance og Personvern på norsk. På engelsk kommer «Security».
- Sikkerhetsdelen på forsiden får én lenke i teksten: «Les mer om sikkerhet i AviSafe →». Det blir ingen ikoner eller punktlister der, fordi den delen skal være ren tekst.

## Engelsk versjon
`/en/security` får full engelsk oversettelse og blir koblet sammen med den norske siden for søkemotorene. Begge sidene kommer med i sitemap.

## Ting du bør vite
- **PGP-nøkkel:** du har ikke gitt meg noen nøkkel. Jeg skriver derfor bare e-postadressen og «PGP-nøkkel på forespørsel». Jeg dikter ikke opp en nøkkel.
- **security@avisafe.no** må finnes som ekte postkasse.
- **Ordlyd om sertifiseringer:** ISO 27001, SOC 2 og ISO 27018 omtales som sertifiseringene til datasenteret og leverandøren, ikke til AviSafe. Sånn unngår vi å påstå at AviSafe selv er godkjent.
- **Mørkt design:** resten av nettstedet har lys bakgrunn. Siden får glasskort med mørk hero-flate som passer resten av nettstedet, men ikke et eget mørkt tema for hele siden.

## Teknisk
- Nye filer: `src/content/security.ts` (tekst på nb/en), `src/pages/SecurityPage.tsx` (`lang`-prop), `src/routes/sikkerhet.tsx` og `src/routes/en.security.tsx`.
- Begge rutene: `staticData: { sitemap: true }`, `head()` med `pageHead` (nb-tittel «IT-sikkerhet og databeskyttelse | AviSafe»), samt `breadcrumbLd`.
- Språkparet legges til i `src/lib/alternates.ts`.
- Endres: `SiteFooter.tsx` og `Security.tsx` (lenke via `router-compat` Link, språkavhengig).
