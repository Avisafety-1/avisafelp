# Google Disk-integrasjon — Media-mappe

Bekreftet: tilkoblingen "Gard AviSafe Google Drive" er linket med `drive.readonly`-scope, og mappen `1fkX3wG0ojgV9cn2XdrsDxYmotHpL8V56` ("Media", eid av hauggard@gmail.com) er tilgjengelig via gateway. Mappen returnerer foreløpig tom fil-liste — så snart du legger inn filer der vil de dukke opp automatisk.

## Hva som bygges

### 1. Edge function `drive-media` (`supabase/functions/drive-media/`)
- Kaller Lovable connector gateway: `GET /google_drive/drive/v3/files?q='<FOLDER_ID>' in parents and trashed=false`
- Felter: `id, name, mimeType, size, modifiedTime, thumbnailLink, imageMediaMetadata, videoMediaMetadata`
- Returnerer normalisert JSON: `{ files: [{ id, name, mimeType, kind: "image"|"video"|"other", thumbnail, url, downloadUrl, width, height, modifiedTime }] }`
- `url` bygges som `https://drive.google.com/uc?export=view&id=<id>` (inline) og `downloadUrl` som `…&export=download`
- 5 min cache via `Cache-Control` header for å spare API-kall
- Public (verify_jwt = false) siden mediene skal vises på landingsiden
- Folder-ID konfigureres via miljøvariabel `DRIVE_MEDIA_FOLDER_ID` (satt til `1fkX3wG0ojgV9cn2XdrsDxYmotHpL8V56`)

### 2. React-hook `useDriveMedia` (`src/hooks/use-drive-media.ts`)
- Wrapper rundt edge function, returnerer `{ files, loading, error }`
- Bruker `fetch` mot `${SUPABASE_URL}/functions/v1/drive-media`
- Sortering: nyeste først

### 3. Visningskomponent `DriveMediaGrid` (`src/components/DriveMediaGrid.tsx`)
- Responsivt grid (1/2/3/4 kolonner)
- Bilder: `<img loading="lazy">` med thumbnail-fallback
- Video: `<video controls preload="metadata" poster={thumbnail}>`
- Lightbox-modal ved klikk (gjenbruker shadcn `Dialog`)
- Glassmorphism-styling i tråd med eksisterende design-tokens
- Skeleton-loader mens data hentes
- Tom-tilstand: "Ingen medier ennå" / engelsk variant via `t()`

### 4. i18n-nøkler
Legges til i `src/i18n/locales/no.ts` og `en.ts`:
- `media.loading`, `media.empty`, `media.error`, `media.open`, `media.download`

### 5. Plassering på siden
Foreløpig **ikke** plassert i landingsiden automatisk — komponenten er klar til bruk. Du sier hvor: ny seksjon på `/`, egen rute `/galleri`, eller annet sted. Default forslag: ny `/galleri`-rute.

## Tekniske detaljer

```text
Browser ──► supabase/functions/drive-media
              │
              ├─ Authorization: Bearer LOVABLE_API_KEY
              ├─ X-Connection-Api-Key: GOOGLE_DRIVE_API_KEY
              ▼
        connector-gateway.lovable.dev/google_drive
              ▼
           Google Drive API v3
```

CORS: standard `*` headers (samme som `avisafe-ai`).

## Spørsmål før implementering

1. **Hvor skal mediene vises?** Egen rute `/galleri`, ny seksjon på forsiden, eller bare som klar komponent du selv plugger inn?
2. Skal videoer **autoplay/loop muted** (som product-carousel), eller standard `controls`?