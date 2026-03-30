

# Plan: Legg til ArduPilot-integrasjonsseksjon

## Oversikt
Legg til en ny integrasjonsseksjon for ArduPilot rett under DJI-seksjonen i ProductShowcase, med samme visuell stil som de andre integrasjonene. Bruk den opplastede ArduPilot-logoen.

## Steg

### 1. Kopier ArduPilot-logo til prosjektet
- Kopier `user-uploads://ardu_logo_dark.png` til `src/assets/ardu-logo.png`

### 2. Oppdater ProductShowcase.tsx
- Importer den nye logoen
- Legg til en ny integrasjonsboks rett etter DJI-seksjonen (etter `DjiAnalyseCarousel`-avslutningen) og før SafeSky
- Samme struktur som de andre: logo sentrert, overskrift "ArduPilot", beskrivelsestekst
- Tekst: "AviSafe støtter nå opplasting av flylogger fra ArduPilot, slik at du enkelt kan analysere og dokumentere operasjoner på samme måte som med andre loggkilder."

### Tekniske detaljer
- Bruker samme `bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl` styling
- Ingen nye avhengigheter

