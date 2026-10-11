/**
 * Copy for the AviSafe Ops dashboard page (/operasjonsdashbord).
 * The page layout lives in src/pages/OpsDashboard.tsx.
 * Names, phone numbers and positions in the screenshots are demo data.
 */
import kommandosentral from "@/assets/ops-kommandosentral.webp";
import melding from "@/assets/ops-melding.webp";
import oppgaverKart from "@/assets/ops-oppgaver-kart.webp";

export type OpsFeatureId =
  "video" | "map" | "comms" | "tasks" | "weather" | "share" | "layout";

export const OPS_PAGE = {
  path: "/operasjonsdashbord",
  navLabel: "Operasjonsdashbord",
  meta: {
    title: "Operasjonsdashbord for droneoperasjoner – AviSafe Ops",
    description:
      "AviSafe Ops samler live video, dronenes posisjon, vær, oppgaver og meldinger til pilotene i ett skjermbilde for operasjonslederen.",
  },
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
    ] satisfies { id: OpsFeatureId; title: string; points: string[] }[],
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
};
