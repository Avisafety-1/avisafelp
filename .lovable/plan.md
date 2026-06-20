Ferdigstill tracking- og statistikkløsningen ved å sette inn GA4-ID og kjøre databasemigrasjoner.

1. Legg til `VITE_GA_MEASUREMENT_ID=G-Y2627FR6GY` i `.env`
2. Kjør migrasjon som oppretter:
   - `app_role`-enum (`admin`, `user`)
   - `user_roles`-tabell (hvem som har admin-tilgang)
   - `has_role()`-funksjon for sikker rollesjekk
   - `page_views`-tabell for egen sporing av sidevisninger, geo, referrer, tid på side
   - RLS-policyer: anonyme brukere kan legge inn visninger, kun admin kan lese
3. Kjør migrasjon som fjerner den for vide UPDATE-policyen på `page_views`

Frontend-koden (cookie-banner, tracking, /statistikk, /personvern) er allerede på plass.