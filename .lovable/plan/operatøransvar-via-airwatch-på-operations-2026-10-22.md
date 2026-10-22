# Operatøransvar via AirWatch på /operations

Ny seksjon på operasjonssiden (både /operasjoner og /operations, norsk og engelsk), under dagens innledning.

## Innhold
- Overskrift: «Operatøransvar via AirWatch» / «Operator responsibility through AirWatch»
- Kort tekst: Gjennom samarbeidet med AirWatch AS, som har en Light UAS Operator Certificate (LUC, NO.LUC.008), kan dere fly under AirWatch sitt operatøransvar og få operativ oppfølging. Det frigjør kapasitet, så dere kan konsentrere dere om flygingen.
- Nøkkelord som små kort (prosa-titler, ingen punktlister med ikoner):
  - Operativ støtte
  - Hjelp med operasjonsmanual
  - Hjelp med søknad til Luftfartstilsynet
  - Dialog med Luftfartstilsynet
  - Ekspertkompetanse på droneregelverket
  - Mer tid til flygingen
- AirWatch-logoen (den runde badgen som allerede er i prosjektet) og lenke til airwatch.no.
- Knapp «Ta kontakt» (e-post til kontakt@avisafe.no).
- Ordbruk: «i samarbeid med» / «under AirWatch sin LUC» — vi sier aldri at AviSafe selv har godkjenningen.

## Technical details
- Ny tekst under nøkkelen `operations.airwatch.*` i src/i18n/locales/no.ts og en.ts.
- Seksjon legges til i src/pages/Operations.tsx; bruker eksisterende fargetokens og airwatch-badge.png.asset.json.
- Sidens beskrivelse oppdateres til å nevne operatøransvar/LUC.
