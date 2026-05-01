
# Artikler-side med rich text og PDF-støtte

## Oversikt
Opprette en /artikler-side der admin-brukere kan publisere fagartikler med enten rik tekst (med bilder) eller opplastet PDF. Besøkende kan lese uten innlogging. Et ekspanderbart sidepanel gir tilgang til historiske artikler og lenke tilbake til avisafe.no.

## Database (migrasjoner)

1. **Opprett `articles`-tabell** med kolonner:
   - `id` (uuid, PK)
   - `title` (text)
   - `slug` (text, unique)
   - `content` (text, nullable – for rich text-artikler)
   - `pdf_url` (text, nullable – for PDF-artikler)
   - `cover_image_url` (text, nullable)
   - `article_type` (text: 'richtext' eller 'pdf')
   - `published` (boolean, default false)
   - `author_id` (uuid, referanse til auth.users)
   - `created_at`, `updated_at` (timestamptz)

2. **Opprett storage bucket** `article-assets` (public) for bilder og PDF-filer, med RLS-policies for opplasting (kun autentiserte) og lesing (alle).

3. **RLS-policies på `articles`**:
   - SELECT: alle (public lesing)
   - INSERT/UPDATE/DELETE: kun autentiserte brukere (author_id = auth.uid())

## Frontend

1. **Ny side `src/pages/Artikler.tsx`** – listevisning av publiserte artikler med tittel, dato, og forhåndsvisning av coverbilde.

2. **Ny side `src/pages/Artikkel.tsx`** – viser enkeltartikkel: rich text-innhold eller innebygd PDF-viewer.

3. **Admin-modus**: Når innlogget, vis "Ny artikkel"-knapp og redigeringsknapper. Artikkeleditor med:
   - Tittel-felt
   - Valg mellom "Rik tekst" og "PDF-opplasting"
   - Enkel rich text-editor (textarea med markdown eller TipTap)
   - Bildeopplasting til storage
   - PDF-opplasting til storage
   - Publiser-knapp

4. **Sidepanel (`ArticleSidebar.tsx`)**: Ekspanderbart panel med:
   - Liste over historiske artikler (sortert etter dato)
   - Lenke tilbake til avisafe.no
   - Kollapserbart design som ikke tar plass når lukket

5. **Ruter i App.tsx**: Legg til `/artikler` og `/artikler/:slug`.

## Tekniske detaljer

- Bruker eksisterende auth fra Logg-siden for admin-innlogging
- TipTap som rich text-editor (lett og fleksibelt)
- PDF vises med `<iframe>` eller `<object>` embed
- Bilder og PDF-er lastes opp til Lovable Cloud storage
- Sidepanelet bruker Shadcn Sheet eller sidebar-komponent
