/**
 * The integrations shown in the front-page carousel and on /integrasjoner.
 * One list so the card text and the page section never drift apart.
 */
import djiMap from "@/assets/dji-map.png";
import djiFlighthub2 from "@/assets/dji-flighthub2.jpg";
import safeskyLogo from "@/assets/safesky-logo.png";
import arduLogo from "@/assets/ardu-logo.png";
import eccairs2Logo from "@/assets/eccairs2-logo.jpeg";
import dronetagMini from "@/assets/dronetag-mini.jpeg";
import logfilesDashboard from "@/assets/logfiles-dashboard.png.asset.json";

export type IntegrationId =
  | "dji"
  | "flighthub2"
  | "safesky"
  | "ardupilot"
  | "dronetag"
  | "eccairs"
  | "loggfiler";

export type Integration = {
  id: IntegrationId;
  title: string;
  /** One line on the front-page card. */
  card: string;
  image: string;
  /** Logos are shown whole on a dark background instead of cropped. */
  contain?: boolean;
  heading: string;
  body: string;
  points: string[];
  url?: string;
};

export const INTEGRATIONS_PATH = "/integrasjoner";

export const INTEGRATIONS_PAGE = {
  meta: {
    title:
      "Integrasjoner – DJI, SafeSky, ECCAIRS 2, Dronetag og ArduPilot | AviSafe",
    description:
      "AviSafe integrerer med DJI og FlightHub 2, SafeSky, ArduPilot, Dronetag og ECCAIRS 2, og importerer loggfiler automatisk – så data flyter mellom planlegging, flyging og rapportering.",
  },
  tag: "SMS · Integrasjoner",
  h1: "Integrasjoner",
  lead: "AviSafe kobler sammen verktøyene droneoperatører allerede bruker, slik at data flyter mellom planlegging, flyging og rapportering.",
  carousel: {
    heading: "Integrasjoner",
    lead: "AviSafe kobler sammen verktøyene du allerede bruker – fra drone og luftrom til rapportering.",
    all: "Se alle integrasjoner",
    readMore: "Les mer",
    prev: "Forrige integrasjon",
    next: "Neste integrasjon",
  },
  visit: "Til",
  cta: {
    h2: "Mangler du en integrasjon?",
    body: "Fortell oss hvilke verktøy dere bruker, så ser vi på hvordan AviSafe kan kobles til dem.",
    button: "Ta kontakt",
  },
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "dji",
    title: "DJI",
    card: "Kart, dashboard og flydata integrert",
    image: djiMap,
    heading: "Full støtte for DJI",
    body: "AviSafe integrerer med DJI-kontrollere og DJI Cloud API. Flylogger importeres automatisk, og posisjon og telemetri vises live mens dronen flyr.",
    points: [
      "Opplasting av flylogger fra over 40 DJI-modeller, med støtte for DJI RC PRO/PLUS",
      "Live posisjon og telemetri fra DJI Pilot 2 og DJI FlightHub 2 (Sync) via DJI Cloud API",
      "Avansert analyse: app-varsler, kontrollinput, batteri, vind, hastighet og mer",
    ],
    url: "https://www.dji.com",
  },
  {
    id: "flighthub2",
    title: "FlightHub 2",
    card: "Eksporter ruter og SORA-buffere direkte",
    image: djiFlighthub2,
    heading: "Fra AviSafe til DJI FlightHub 2",
    body: "Ruter som planlegges i AviSafe kan eksporteres direkte til DJI FlightHub 2 – sammen med SORA-bufferne som er beregnet for oppdraget.",
    points: [
      "Eksport av ruter planlagt i AviSafe",
      "SORA-buffere følger med ruten",
      "Live posisjon fra FlightHub 2 (Sync) tilbake i AviSafe-kartet",
    ],
    url: "https://www.dji.com/flighthub-2",
  },
  {
    id: "safesky",
    title: "SafeSky",
    card: "Luftromsbevissthet i sanntid",
    image: safeskyLogo,
    contain: true,
    heading: "Live publisering og situasjonsbilde",
    body: "AviSafe er integrert med SafeSky for live posisjonsdeling og økt situasjonsforståelse under operasjoner. Resultatet er enklere samhandling, færre misforståelser og tryggere operasjoner.",
    points: [
      "Live lufttrafikk fra SafeSky vises i AviSafe-kartet",
      "Dronens posisjon deles i SafeSky når en flytur startes i AviSafe",
      "Dokumentasjon og sporbarhet samlet i én plattform",
    ],
    url: "https://www.safesky.app",
  },
  {
    id: "ardupilot",
    title: "ArduPilot",
    card: "Åpen autopilotplattform",
    image: arduLogo,
    contain: true,
    heading: "Støtte for ArduPilot",
    body: "AviSafe støtter flylogger fra ArduPilot, slik at du kan analysere og dokumentere operasjoner på samme måte som med andre loggkilder.",
    points: [
      "Import av loggfiler fra ArduPilot-baserte droner",
      "Samme analyse og dokumentasjon som for andre loggkilder",
    ],
    url: "https://ardupilot.org",
  },
  {
    id: "dronetag",
    title: "Dronetag",
    card: "Remote ID – synlig for alle, hvor som helst",
    image: dronetagMini,
    heading: "Dronetag Remote ID",
    body: "AviSafe er offisiell forhandler av Dronetag i Norge. Sammen med SafeSky er Dronetag en naturlig integrasjon for å bedre flysikkerheten for alle luftromsaktører.",
    points: [
      "Integrasjon med Dronetag Remote ID-enheter",
      "Analyse av historiske data",
    ],
    url: "https://www.dronetag.com",
  },
  {
    id: "eccairs",
    title: "ECCAIRS 2",
    card: "Automatisk hendelsesrapportering til myndigheter",
    image: eccairs2Logo,
    contain: true,
    heading: "ECCAIRS 2 – rapportering gjort enkelt",
    body: "AviSafe er integrert med ECCAIRS 2, EUs offisielle system for hendelsesrapportering i luftfarten. Hendelser registreres strukturert i AviSafe og sendes direkte til ECCAIRS 2.",
    points: [
      "Innsending via E2 API",
      "Korrekt taksonomi og obligatoriske felter på plass",
      "Mindre manuelt arbeid og færre feil",
    ],
    url: "https://www.aviationreporting.eu",
  },
  {
    id: "loggfiler",
    title: "Loggfiler",
    card: "Automatisk import og behandling av loggfiler",
    image: logfilesDashboard.url,
    heading: "Loggfiler uten manuelt arbeid",
    body: "Flylogger importeres og behandles automatisk, slik at flydata og analyse er samlet i AviSafe.",
    points: [
      "Logger fra DJI og ArduPilot",
      "Analyse av app-varsler, kontrollinput, batteri, vind og hastighet",
    ],
  },
];
