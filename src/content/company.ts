/** About and Partners content in both languages. Team texts mirror the team section. */
export const LINKEDIN_URL = "https://www.linkedin.com/company/avisafe-as/";
export const SAFESKY_ARTICLE_URL = "https://www.safesky.app/post/aviation-grade-safety-for-a-maturing-drone-industry";

export const ABOUT = {
  nb: {
    path: "/om-oss",
    metaTitle: "Om AviSafe – norsk plattform for droneoperatører",
    metaDescription:
      "AviSafe AS er et norsk selskap grunnlagt i 2025 av Gard Haug-Hansen og Rikard Bjørklund. Vi lager plattformen for sikkerhetsstyring og drift for droneoperatører.",
    h1: "Om AviSafe",
    lead:
      "AviSafe AS er et norsk selskap, grunnlagt i 2025, som lager en nettbasert plattform for sikkerhetsstyring, risikovurdering og drift for droneoperatører.",
    teamHeading: "Grunnleggerne",
    contactHeading: "Kontakt",
    people: [
      {
        name: "Gard Haug-Hansen",
        jobTitle: "CEO og medgründer",
        role: "CEO og medgründer – produktutvikling",
        cv: [
          "13 års erfaring som pilot",
          "Erfaring med planlegging, ledelse og supervisjon av større luftoperasjoner",
          "Bachelor i luftmakt og ledelse fra Luftkrigskolen",
          "2 års erfaring som Safety Manager (EASA)",
          "Aircraft Accident Investigation (AAI) og Human Factors in Accident Investigation (HFAI) fra Southern California Safety Institute (SCSI)",
          "Kurs i sikkerhetsstyring og kvalitetsledelse i regi av Det Norske Veritas",
        ],
      },
      {
        name: "Rikard Bjørklund",
        jobTitle: "Medgründer, salg og markedsføring",
        role: "Medgründer, salg og markedsføring",
        cv: [
          "Bakgrunn fra shipping og maritim redningstjeneste",
          "2 års erfaring som Quality Assurance",
          "Bachelor i Nautikk",
          "Sikkerhetsleder Redbull Cliff Dive Oslo",
          "Human Factors in Aircraft Investigation fra Southern California Safety Institute",
          "Godkjent revisjonsleder - ISO 9001",
        ],
      },
    ],
  },
  en: {
    path: "/en/about",
    metaTitle: "About AviSafe – Norwegian platform for drone operators",
    metaDescription:
      "AviSafe AS is a Norwegian company founded in 2025 by Gard Haug-Hansen and Rikard Bjørklund, building a safety and operations platform for drone operators.",
    h1: "About AviSafe",
    lead:
      "AviSafe AS is a Norwegian company, founded in 2025, that builds a web platform for safety management, risk assessment and operations for drone operators.",
    teamHeading: "Founders",
    contactHeading: "Contact",
    people: [
      {
        name: "Gard Haug-Hansen",
        jobTitle: "CEO and Co-founder",
        role: "CEO and Co-founder – Product Development",
        cv: [
          "13 years of experience as a pilot",
          "Experience with planning, management and supervision of major air operations",
          "Bachelor's degree in Air Power and Leadership from the Royal Norwegian Air Force Academy",
          "2 years of experience as Safety Manager (EASA)",
          "Aircraft Accident Investigation (AAI) and Human Factors in Accident Investigation (HFAI), Southern California Safety Institute (SCSI)",
          "Courses in safety management and quality leadership through DNV",
        ],
      },
      {
        name: "Rikard Bjørklund",
        jobTitle: "Co-founder, Sales and Marketing",
        role: "Co-founder, Sales and Marketing",
        cv: [
          "Background from shipping and maritime rescue services",
          "2 years of experience in Quality Assurance",
          "Bachelor's degree in Nautical Science",
          "Safety Lead for Red Bull Cliff Diving Oslo",
          "Human Factors in Aircraft Investigation, Southern California Safety Institute",
          "Certified Lead Auditor – ISO 9001",
        ],
      },
    ],
  },
} as const;

export const PARTNERS = {
  nb: {
    path: "/partnere",
    metaTitle: "Partnere og integrasjoner | AviSafe",
    metaDescription: "AviSafe integrerer med SafeSky, DJI, Atlas UAS, ECCAIRS 2, Dronetag og ArduPilot.",
    h1: "Partnere og integrasjoner",
    lead: "AviSafe kobler sammen verktøyene droneoperatører allerede bruker, slik at data flyter mellom planlegging, flyging og rapportering.",
    pressHeading: "Omtale",
    pressLink: "SafeSky: «Aviation-grade safety for a maturing drone industry»",
    items: [
      { name: "SafeSky", url: "https://www.safesky.app", text: "Live lufttrafikk fra SafeSky vises i AviSafe-kartet, og dronens posisjon deles ved flystart." },
      { name: "DJI", url: "https://www.dji.com", text: "Live posisjon rett fra DJI Pilot 2 på kontrolleren (uten FlightHub 2-abonnement) eller fra organisasjonens droner via DJI FlightHub 2 (FlightHub Sync). Posisjonen kan deles med SafeSky eller holdes internt. Ruter og SORA-buffere eksporteres til FlightHub 2." },
      { name: "Atlas UAS", url: "https://atlasuas.com", text: "Live video og live posisjon fra dronen i AviSafe, med AI-sporing i videostrømmen som matches automatisk mot AIS." },
      { name: "ECCAIRS 2", url: "https://www.aviationreporting.eu", text: "Hendelsesrapporter sendes direkte til ECCAIRS 2 via E2 API." },
      { name: "Dronetag", url: "https://www.dronetag.com", text: "Integrasjon med Dronetag Remote ID-enheter." },
      { name: "ArduPilot", url: "https://ardupilot.org", text: "Integrasjon med ArduPilot-baserte droner og import av loggfiler." },
    ],
  },
  en: {
    path: "/en/partners",
    metaTitle: "Partners and Integrations | AviSafe",
    metaDescription: "AviSafe integrates with SafeSky, DJI, Atlas UAS, ECCAIRS 2, Dronetag and ArduPilot.",
    h1: "Partners and integrations",
    lead: "AviSafe connects the tools drone operators already use, so data flows between planning, flying and reporting.",
    pressHeading: "Coverage",
    pressLink: "SafeSky: “Aviation-grade safety for a maturing drone industry”",
    items: [
      { name: "SafeSky", url: "https://www.safesky.app", text: "Live air traffic from SafeSky is shown in the AviSafe map, and the drone's position is shared at take-off." },
      { name: "DJI", url: "https://www.dji.com", text: "Live position straight from DJI Pilot 2 on the controller (no FlightHub 2 subscription needed) or from the organisation's drones via DJI FlightHub 2 (FlightHub Sync). The position can be shared with SafeSky or kept internal. Routes and SORA buffers are exported to FlightHub 2." },
      { name: "Atlas UAS", url: "https://atlasuas.com", text: "Live video and live position from the drone in AviSafe, with AI tracking in the video stream matched automatically against AIS." },
      { name: "ECCAIRS 2", url: "https://www.aviationreporting.eu", text: "Occurrence reports are submitted directly to ECCAIRS 2 via the E2 API." },
      { name: "Dronetag", url: "https://www.dronetag.com", text: "Integration with Dronetag Remote ID devices." },
      { name: "ArduPilot", url: "https://ardupilot.org", text: "Integration with ArduPilot-based drones and import of their log files." },
    ],
  },
} as const;
