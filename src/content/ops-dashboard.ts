/**
 * Copy for the AviSafe Ops dashboard page, one object per language.
 * The page layout lives in src/pages/OpsDashboard.tsx.
 * Names, phone numbers and positions in the screenshots are demo data.
 */
import kommandosentral from "@/assets/ops-kommandosentral.webp";
import melding from "@/assets/ops-melding.webp";
import oppgaverKart from "@/assets/ops-oppgaver-kart.webp";

export type OpsLang = "nb" | "en";

export const OPS_PATHS: Record<OpsLang, string> = {
  nb: "/operasjonsdashbord",
  en: "/en/ops-dashboard",
};

export type OpsFeatureId =
  "video" | "map" | "comms" | "tasks" | "weather" | "share" | "layout";

type Image = { src: string; alt: string };

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
  showcase: { h2: string; items: (Image & { caption: string })[] };
  closing: { h2: string; body: string; requirement: string; cta: string };
};

export const OPS_DASHBOARD: Record<OpsLang, OpsContent> = {
  nb: {
    meta: {
      title: "Operasjonsdashbord for droneoperasjoner – AviSafe Ops",
      description:
        "AviSafe Ops samler live video, dronenes posisjon, vær, oppgaver og meldinger til pilotene i ett skjermbilde for operasjonslederen.",
    },
    home: { name: "Forside", path: "/" },
    navLabel: "Operasjonsdashbord",
    hero: {
      tag: "Operasjonsdashbord",
      h1: "AviSafe Ops – full oversikt over droneoperasjonen i sanntid",
      lead: "Ops-dashbordet samler alt operasjonslederen trenger i ett skjermbilde: live video, dronenes posisjon, vær, oppgaver og kommunikasjon med pilotene. Det viser bare det som er aktivt akkurat nå.",
      ctaPrimary: "Be om demo",
      ctaSecondary: "Se funksjonene",
      image: {
        src: kommandosentral,
        alt: "AviSafe Ops kommandosentral med aktive droner, kart med søkesektor, videopaneler, hendelseslogg og vær fra MET",
      },
    },
    features: {
      h2: "Alt operasjonslederen trenger, i ett skjermbilde",
      items: [
        {
          id: "video",
          title: "Live video fra alle kilder",
          points: [
            "Direktevideo fra droner og andre kilder som sender RTMPS, for eksempel bodycam, kjøretøykamera eller bakkekamera.",
            "Velg mellom videovegg, videofokus eller kartfokus.",
            "Legg til nye videokilder på sekunder.",
          ],
        },
        {
          id: "map",
          title: "Sanntidskart",
          points: [
            "Dronenes posisjon, høyde, fart og batteri, med spor bak hver drone.",
            "Luftromsrestriksjoner og SafeSky-trafikk som kartlag.",
            "Tegn søkesektorer, linjer og punkter direkte i kartet, og send dem til DJI FlightHub 2.",
          ],
        },
        {
          id: "comms",
          title: "Kommunikasjon med pilotene",
          points: [
            "Send meldinger til piloter og innsatspersonell på e-post, SMS og i AviSafe-innboksen.",
            "Hurtigmeldinger som «Land nå», «Returner» og «Hold posisjon».",
            "Mottakeren kan svare MOTTATT, WILCO eller CANTCO på SMS. Svaret vises med en gang i dashbordet.",
            "Legg inn kontaktpersoner per drone eller videokilde, også for folk uten AviSafe-bruker.",
          ],
        },
        {
          id: "tasks",
          title: "Oppgaver og hendelseslogg",
          points: [
            "Gi oppgaver til team og droner, med prioritet og status.",
            "Flygninger, video, meldinger, svar og notater logges automatisk med tidsstempel.",
            "Lag en operasjonslogg som PDF med ett klikk.",
          ],
        },
        {
          id: "weather",
          title: "Vær fra MET",
          points: [
            "Gjeldende vind, vindkast, temperatur og nedbør.",
            "Timesprognose med flyvurdering.",
          ],
        },
        {
          id: "share",
          title: "Del med samarbeidspartnere",
          points: [
            "Del hele dashbordet, eller bare video, kart og posisjon, via en lenke og en kode.",
            "Du velger hvor lenge delingen varer. Mottakeren trenger ingen innlogging.",
            "Delingen er skrivebeskyttet, og du kan stoppe den når som helst.",
          ],
        },
        {
          id: "layout",
          title: "Tilpass etter oppdraget",
          points: [
            "Flytt paneler og endre størrelsen på dem.",
            "Lagre oppsettet som en mal, for eksempel «Leteaksjon», og del malen med kollegaer.",
          ],
        },
      ],
    },
    showcase: {
      h2: "Slik ser det ut",
      items: [
        {
          src: melding,
          alt: "Meldingsvindu i AviSafe Ops med hurtigmeldingene Land nå, Returner, Hold posisjon, Endre høyde og Ring meg, og valg for e-post og SMS",
          caption:
            "Send melding til en pilot eller innsatsleder med ett klikk. Hurtigmeldinger, SMS og e-post, også til kontakter uten AviSafe-bruker.",
        },
        {
          src: oppgaverKart,
          alt: "AviSafe Ops med oppgaveliste, søkesektor og søkelinje i kartet og to droner med posisjon og høyde",
          caption:
            "Oppgaver knyttet til droner og team, med søkesektorer og søkelinjer tegnet rett i kartet.",
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
      title: "Drone operations dashboard – AviSafe Ops",
      description:
        "AviSafe Ops brings live video, drone positions, weather, tasks and messages to pilots together on one screen for the operations lead.",
    },
    home: { name: "Home", path: "/en" },
    navLabel: "Ops dashboard",
    hero: {
      tag: "Operations dashboard",
      h1: "AviSafe Ops – the full picture of your drone operation in real time",
      lead: "The Ops dashboard gives the operations lead everything they need on one screen: live video, drone positions, weather, tasks and communication with the pilots. It only shows what is active right now.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "See the features",
      image: {
        src: kommandosentral,
        alt: "AviSafe Ops command centre with active drones, a map with a search sector, video panels, an event log and MET Norway weather",
      },
    },
    features: {
      h2: "Everything the operations lead needs, on one screen",
      items: [
        {
          id: "video",
          title: "Live video from every source",
          points: [
            "Live video from drones and any other source that streams over RTMPS, such as body cams, vehicle cameras or ground cameras.",
            "Switch between video wall, video focus and map focus.",
            "Add new video sources in seconds.",
          ],
        },
        {
          id: "map",
          title: "Real-time map",
          points: [
            "Drone position, altitude, speed and battery, with a track behind each drone.",
            "Airspace restrictions and SafeSky traffic as map layers.",
            "Draw search sectors, lines and points directly on the map and send them to DJI FlightHub 2.",
          ],
        },
        {
          id: "comms",
          title: "Communication with pilots",
          points: [
            "Send messages to pilots and field personnel by e-mail, SMS and the AviSafe inbox.",
            "Quick messages such as “Land now”, “Return” and “Hold position”.",
            "Recipients can reply MOTTATT (received), WILCO or CANTCO by SMS. The reply shows up in the dashboard straight away.",
            "Add contact people per drone or video source, including people without an AviSafe account.",
          ],
        },
        {
          id: "tasks",
          title: "Tasks and event log",
          points: [
            "Assign tasks to teams and drones, with priority and status.",
            "Flights, video, messages, replies and notes are logged automatically with a timestamp.",
            "Create an operations log as a PDF with one click.",
          ],
        },
        {
          id: "weather",
          title: "Weather from MET Norway",
          points: [
            "Current wind, gusts, temperature and precipitation.",
            "Hourly forecast with a flight assessment.",
          ],
        },
        {
          id: "share",
          title: "Share with partner agencies",
          points: [
            "Share the whole dashboard, or just video, map and position, with a link and a code.",
            "You choose how long the share lasts. The recipient does not need to log in.",
            "Shares are read-only, and you can stop them at any time.",
          ],
        },
        {
          id: "layout",
          title: "Adapt it to the mission",
          points: [
            "Move and resize panels.",
            "Save the layout as a template, for example “Search and rescue”, and share it with colleagues.",
          ],
        },
      ],
    },
    showcase: {
      h2: "What it looks like",
      items: [
        {
          src: melding,
          alt: "Message dialog in AviSafe Ops with the quick messages Land now, Return, Hold position, Change altitude and Call me, and options for e-mail and SMS",
          caption:
            "Message a pilot or incident commander with one click. Quick messages, SMS and e-mail, including contacts without an AviSafe account.",
        },
        {
          src: oppgaverKart,
          alt: "AviSafe Ops with a task list, a search sector and search line on the map, and two drones with position and altitude",
          caption:
            "Tasks linked to drones and teams, with search sectors and search lines drawn straight on the map.",
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
