

# Plan: Logg AI-søk med beskyttet visningsside

## Oversikt
Lagre alle spørsmål folk stiller i AI-søket til en database-tabell, og opprett en beskyttet `/logg`-side med enkel innlogging der du kan se alle spørsmål.

## Steg

### 1. Opprett database-tabell `ai_search_logs`
- Kolonner: `id`, `query` (teksten brukeren søkte på), `created_at`
- Ingen RLS-restriksjon på INSERT (alle besøkende kan trigge logging)
- SELECT kun for innloggede brukere (admin)

### 2. Oppdater edge function `avisafe-ai`
- Når en melding mottas, logg brukerens siste melding til `ai_search_logs`-tabellen via Supabase service role client
- Skjer asynkront slik at det ikke forsinker AI-svaret

### 3. Opprett `/logg`-side med innlogging
- Enkel e-post/passord-innlogging øverst på siden
- Når innlogget: vis tabell med alle søk sortert nyest først (query + tidspunkt)
- Legg til rute i App.tsx

### 4. Oppdater AiSearch-komponenten
- Ingen endring nødvendig — loggingen skjer i edge function

## Tekniske detaljer
- Tabell: `ai_search_logs (id uuid PK, query text, created_at timestamptz default now())`
- RLS: `INSERT` for alle (anon), `SELECT` kun for `authenticated`
- Edge function bruker `SUPABASE_SERVICE_ROLE_KEY` (allerede tilgjengelig) for insert
- Auth: Supabase standard e-post/passord. Du oppretter bruker manuelt via backend.

