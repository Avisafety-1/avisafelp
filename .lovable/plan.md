## Mål
Gi `hauggard@gmail.com` admin-rolle slik at brukeren får tilgang til `/statistikk`.

## Status
- Brukeren finnes allerede i auth (logget inn 17:20 i dag, user_id `4721cdd2-14ce-4caa-8c6f-280857fc3187`), så passordet `Samen36a` er allerede aktivt.
- `/statistikk` sjekker `user_roles` for `role = 'admin'`.
- Tabellen `public.user_roles` er tom.

## Endring
Legg til én rad i `public.user_roles`:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('4721cdd2-14ce-4caa-8c6f-280857fc3187', 'admin');
```

Ingen kodeendringer – /statistikk gir automatisk tilgang etter at rollen er satt.