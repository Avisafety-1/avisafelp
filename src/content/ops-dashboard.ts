/**
 * Copy for the AviOps operations dashboard page, one object per language.
 * The page layout lives in src/pages/OpsDashboard.tsx.
 * Names, positions and video in the screenshots are demo data; the video
 * panel shows a still photo in place of a live feed.
 */
import kommandosentral from "@/assets/ops-kommandosentral.webp";
import oversiktNorge from "@/assets/ops-oversikt-norge.webp";
import melding from "@/assets/ops-melding.webp";
import flighthub2 from "@/assets/ops-flighthub2.webp";
import videokilder from "@/assets/ops-videokilder.webp";

export type OpsLang = "nb" | "en";

export const OPS_PATHS: Record<OpsLang, string> = {
  nb: "/aviops",
  en: "/en/aviops",
};

export type OpsFeatureId =
  | "video"
  | "map"
  | "fh2"
  | "comms"
  | "tasks"
  | "log"
  | "weather"
  | "share"
  | "layout";

type Image = { src: string; alt: string; width: number; height: number };

const IMG = {
  kommandosentral: { src: kommandosentral, width: 1500, height: 1101 },
  oversiktNorge: { src: oversiktNorge, width: 1500, height: 1076 },
  melding: { src: melding, width: 636, height: 976 },
  flighthub2: { src: flighthub2, width: 556, height: 444 },
  videokilder: { src: videokilder, width: 838, height: 562 },
};

export type OpsContent = {
  meta: { title: string; description: string };
  home: { name: string; path: string };
  navLabel: string;
  hero: {
    tag: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: Image;
  };
  features: {
    h2: string;
    items: { id: OpsFeatureId; title: string; points: string[] }[];
  };
  showcase: {
    h2: string;
    items: (Image & { caption: string; wide?: boolean })[];
  };
  closing: { h2: string; body: string; requirement: string; cta: string };
};

export const OPS_DASHBOARD: Record<OpsLang, OpsContent> = {
  nb: {
    meta: {
      title: "AviOps – operasjonsdashbord for droneoperasjoner",
      description:
        "AviOps samler live video, kart med luftrom og trafikk, vær, oppgaver og SMS med svar fra pilotene i ett skjermbilde for operasjonslederen.",
    },
    home: { name: "Forside", path: "/" },
    navLabel: "AviOps",
    hero: {
      tag: "Operasjonsdashbord",
      h1: "AviOps – full oversikt over droneoperasjonen i sanntid",
      lead: "AviOps samler alt operasjonslederen trenger i ett skjermbilde: live video, dronenes posisjon, vær, oppgaver og kommunikasjon med pilotene. Det viser bare det som er aktivt akkurat nå.",
      ctaPrimary: "Be om demo",
      ctaSecondary: "Se funksjonene",
      image: {
        ...IMG.kommandosentral,
        alt: "AviOps kommandosentral med operasjonsvelger, visningsvalg, aktive enheter, kart over Norge med luftromssoner og flytrafikk, live video, oppgaver, hendelseslogg og vær fra MET med varsler",
      },
    },
    features: {
      h2: "Alt operasjonslederen trenger, i ett skjermbilde",
      items: [
        {
          id: "video",
          title: "Live video fra alle kilder",
          points: [
            "Direktevideo fra droner og alt som sender RTMP eller RTMPS: bodycam, helikopter, en annen operatørs drone, OBS, Larix eller en IP-kamerakoder.",
            "Legg til en ny videokilde på sekunder. Du får en ferdig adresse og strømnøkkel, og kan slå kilden av og på eller lage ny nøkkel.",
            "Flere strømmer fra samme kilde, for eksempel vanlig kamera og IR.",
            "Vis alle aktive strømmer samtidig, så mange du har.",
          ],
        },
        {
          id: "map",
          title: "Sanntidskart",
          points: [
            "Dronenes posisjon, høyde, fart og batteri, med spor bak hver drone.",
            "Luftromssoner og flytrafikk fra SafeSky som kartlag.",
            "Tegn søkeområder, linjer og punkter direkte i kartet. Arealet regnes ut automatisk.",
            "Koordinater i både grader og UTM, klare til å leses opp på samband.",
          ],
        },
        {
          id: "fh2",
          title: "Send til DJI FlightHub 2",
          points: [
            "Send søkeområder, linjer og punkter fra kartet til et valgt prosjekt i DJI FlightHub 2.",
            "De dukker opp som annotasjoner hos pilotene, så alle jobber ut fra samme kart.",
            "Velg hvilke kartobjekter som skal sendes.",
          ],
        },
        {
          id: "comms",
          title: "SMS og meldinger med svar",
          points: [
            "Send meldinger til piloter og innsatspersonell på SMS, e-post og i AviSafe-innboksen, også til folk uten AviSafe-bruker.",
            "Hurtigmeldinger som «Land nå», «Returner», «Hold posisjon», «Endre høyde» og «Ring meg».",
            "Be om svar: mottakeren svarer 1, 2 eller 3 (MOTTATT, WILCO eller CANTCO) på SMS, og svaret dukker opp i dashbordet med en gang.",
            "SMS-historikk per kontakt, merking som haster, og SMS og svaralternativer på norsk eller engelsk.",
          ],
        },
        {
          id: "tasks",
          title: "Oppgaver",
          points: [
            "Lag oppgaver og tildel dem til personer og team.",
            "Lag en oppgave rett fra et søkeområde eller punkt i kartet.",
            "Start, fullfør eller avbryt oppgaver, og se hva som er gjort.",
          ],
        },
        {
          id: "log",
          title: "Hendelseslogg og rapport",
          points: [
            "Flygninger, video, meldinger, SMS-svar, oppgaver og kartobjekter logges automatisk med tidsstempel.",
            "Skriv egne notater rett i loggen.",
            "Lag en PDF-rapport over operasjonen for perioden du velger, for eksempel de siste 24 timene.",
          ],
        },
        {
          id: "weather",
          title: "Vær fra MET som følger kartet",
          points: [
            "Vind, vindkast, temperatur, nedbør og luftfuktighet der du ser i kartet. Været oppdateres automatisk når du flytter kartet.",
            "Timesprognose for vind og vindkast med flyvurdering.",
            "Varsler om lav temperatur som tapper batteriet, og fare for kondens.",
          ],
        },
        {
          id: "share",
          title: "Deling med tilgangsstyring",
          points: [
            "Del hele dashbordet, eller velg selv: video, kart og posisjoner, aktive enheter, vær, hendelseslogg og pilotnavn.",
            "Mottakeren får lenke og 6-sifret tilgangskode på e-post eller SMS, og trenger ingen innlogging.",
            "Du velger hvor lenge delingen varer, og kan stoppe den når som helst. Alle visninger logges.",
            "Delingen er skrivebeskyttet. Meldinger til piloter vises aldri.",
            "Inviter hvem som helst til å følge dashbordet, også folk uten AviSafe-bruker.",
          ],
        },
        {
          id: "layout",
          title: "Maler etter oppdraget",
          points: [
            "Bytt mellom kommandosentral, videofokus, kartfokus og videovegg med ett klikk.",
            "Flytt paneler og endre størrelsen på dem.",
            "Lagre egne oppsett som maler, for eksempel «Leteaksjon», og del dem med kollegaer.",
          ],
        },
      ],
    },
    showcase: {
      h2: "Slik ser det ut",
      items: [
        {
          ...IMG.oversiktNorge,
          wide: true,
          alt: "AviOps med kart over Norge med luftromssoner, startpunkter for to team, oppgave, hendelseslogg, live video og vær med varsel om lav temperatur",
          caption:
            "Hele operasjonen i ett bilde: luftromssoner, startpunkter, oppgaver, hendelseslogg, live video og vær med varsler.",
        },
        {
          ...IMG.melding,
          alt: "Meldingsvindu med SMS-historikk og WILCO-svar, hurtigmeldinger, valg for e-post, SMS, haster og be om svar, og SMS-språk",
          caption:
            "Send melding med ett klikk og be om svar. WILCO-svaret kommer rett inn i dashbordet.",
        },
        {
          ...IMG.flighthub2,
          alt: "Dialog for å sende søkeområder og punkter fra kartet til et prosjekt i DJI FlightHub 2",
          caption:
            "Send søkeområder og punkter til DJI FlightHub 2 som annotasjoner.",
        },
        {
          ...IMG.videokilder,
          alt: "Dialog for videokilder over RTMP og RTMPS med to aktive kilder, av/på-bryter og ny nøkkel",
          caption:
            "Legg til videokilder over RTMP eller RTMPS, for eksempel bodycam, helikopter eller OBS.",
        },
      ],
    },
    closing: {
      h2: "Laget for operasjoner med mange ressurser",
      body: "Laget for nødetater, leteaksjoner, inspeksjon og andre operasjoner der flere ressurser må koordineres samtidig.",
      requirement: "Krever AviSafe med administratortilgang.",
      cta: "Be om demo",
    },
  },
  en: {
    meta: {
      title: "AviOps – drone operations dashboard",
      description:
        "AviOps brings live video, a map with airspace and traffic, weather, tasks and SMS replies from pilots together on one screen for the operations lead.",
    },
    home: { name: "Home", path: "/en" },
    navLabel: "AviOps",
    hero: {
      tag: "Operations dashboard",
      h1: "AviOps – the full picture of your drone operation in real time",
      lead: "AviOps gives the operations lead everything they need on one screen: live video, drone positions, weather, tasks and communication with the pilots. It only shows what is active right now.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "See the features",
      image: {
        ...IMG.kommandosentral,
        alt: "AviOps command centre with an operation selector, view options, active assets, a map of Norway with airspace zones and air traffic, live video, tasks, an event log and MET Norway weather with warnings",
      },
    },
    features: {
      h2: "Everything the operations lead needs, on one screen",
      items: [
        {
          id: "video",
          title: "Live video from every source",
          points: [
            "Live video from drones and anything that streams over RTMP or RTMPS: body cams, helicopters, another operator's drone, OBS, Larix or an IP camera encoder.",
            "Add a new video source in seconds. You get a ready-made URL and stream key, and can switch the source on and off or generate a new key.",
            "Several streams from one source, for example the normal camera and IR.",
            "Show every active stream at once, however many you have.",
          ],
        },
        {
          id: "map",
          title: "Real-time map",
          points: [
            "Drone position, altitude, speed and battery, with a track behind each drone.",
            "Airspace zones and SafeSky air traffic as map layers.",
            "Draw search areas, lines and points directly on the map. The area is calculated automatically.",
            "Coordinates in both degrees and UTM, ready to read out over the radio.",
          ],
        },
        {
          id: "fh2",
          title: "Send to DJI FlightHub 2",
          points: [
            "Send search areas, lines and points from the map to a chosen DJI FlightHub 2 project.",
            "They show up as annotations for the pilots, so everyone works from the same map.",
            "Choose which map objects to send.",
          ],
        },
        {
          id: "comms",
          title: "SMS and messages with replies",
          points: [
            "Message pilots and field personnel by SMS, e-mail and the AviSafe inbox, including people without an AviSafe account.",
            "Quick messages such as “Land now”, “Return”, “Hold position”, “Change altitude” and “Call me”.",
            "Request a reply: the recipient answers 1, 2 or 3 (RECEIVED, WILCO or CANTCO) by SMS, and the reply shows up in the dashboard straight away.",
            "SMS history per contact, urgent flag, and SMS and reply options in English or Norwegian.",
          ],
        },
        {
          id: "tasks",
          title: "Tasks",
          points: [
            "Create tasks and assign them to people and teams.",
            "Create a task straight from a search area or point on the map.",
            "Start, complete or cancel tasks, and see what has been done.",
          ],
        },
        {
          id: "log",
          title: "Event log and report",
          points: [
            "Flights, video, messages, SMS replies, tasks and map objects are logged automatically with a timestamp.",
            "Write your own notes straight into the log.",
            "Create a PDF report of the operation for the period you choose, for example the last 24 hours.",
          ],
        },
        {
          id: "weather",
          title: "MET Norway weather that follows the map",
          points: [
            "Wind, gusts, temperature, precipitation and humidity wherever you look on the map. The weather updates automatically as you move the map.",
            "Hourly wind and gust forecast with a flight assessment.",
            "Warnings for low temperatures that drain batteries, and for risk of condensation.",
          ],
        },
        {
          id: "share",
          title: "Sharing with access control",
          points: [
            "Share the whole dashboard, or pick what to share: video, map and positions, active assets, weather, event log and pilot names.",
            "The recipient gets a link and a 6-digit access code by e-mail or SMS, and does not need to log in.",
            "You choose how long the share lasts and can stop it at any time. Every view is logged.",
            "Shares are read-only. Messages to pilots are never shown.",
            "Invite anyone to follow the dashboard, including people without an AviSafe account.",
          ],
        },
        {
          id: "layout",
          title: "Templates for every mission",
          points: [
            "Switch between command centre, video focus, map focus and video wall with one click.",
            "Move and resize panels.",
            "Save your own layouts as templates, for example “Search and rescue”, and share them with colleagues.",
          ],
        },
      ],
    },
    showcase: {
      h2: "What it looks like",
      items: [
        {
          ...IMG.oversiktNorge,
          wide: true,
          alt: "AviOps with a map of Norway showing airspace zones, take-off points for two teams, a task, the event log, live video and weather with a low-temperature warning",
          caption:
            "The whole operation in one view: airspace zones, take-off points, tasks, event log, live video and weather with warnings.",
        },
        {
          ...IMG.melding,
          alt: "Message dialog with SMS history and a WILCO reply, quick messages, options for e-mail, SMS, urgent and request reply, and SMS language",
          caption:
            "Send a message with one click and request a reply. The WILCO reply comes straight into the dashboard.",
        },
        {
          ...IMG.flighthub2,
          alt: "Dialog for sending search areas and points from the map to a DJI FlightHub 2 project",
          caption:
            "Send search areas and points to DJI FlightHub 2 as annotations.",
        },
        {
          ...IMG.videokilder,
          alt: "Video sources dialog for RTMP and RTMPS with two active sources, an on/off switch and a new key button",
          caption:
            "Add video sources over RTMP or RTMPS, such as body cams, helicopters or OBS.",
        },
      ],
    },
    closing: {
      h2: "Built for operations with many resources",
      body: "Built for emergency services, search and rescue, inspection and other operations where several resources have to be coordinated at once.",
      requirement: "Requires AviSafe with administrator access.",
      cta: "Request a demo",
    },
  },
};
