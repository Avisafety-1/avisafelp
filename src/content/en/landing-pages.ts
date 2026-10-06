export type LandingFeature = { title: string; text: string };
export type LandingFaq = { q: string; a: string };
export type LandingRegulation = { name: string; text: string };

export type LandingPage = {
  path: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One citable sentence: what AviSafe does, for whom. */
  lead: string;
  intro: string;
  whoFor: string[];
  features: LandingFeature[];
  regulatory: LandingRegulation[];
  note?: string;
  faq: LandingFaq[];
};

export const DEMO_MAILTO = "mailto:kontakt@avisafe.no?subject=AviSafe%20demo";

export const SMS_PAGE: LandingPage = {
  path: "/en/drone-safety-management-system",
  navLabel: "Safety management system",
  metaTitle: "Drone Safety Management System (SMS) | AviSafe",
  metaDescription:
    "A drone safety management system built around the four ICAO pillars, designed for operators in the EASA specific category and LUC holders.",
  h1: "Safety management system for drone operators",
  lead:
    "AviSafe is a Norwegian web platform that gives drone operators in the EASA specific category and LUC holders a safety management system built around the four ICAO pillars.",
  intro:
    "AviSafe brings safety policy, risk management, safety assurance and safety promotion into one system, connected to the drones, pilots and missions the organisation actually flies.",
  whoFor: [
    "Operators in the EASA specific category",
    "Holders of, or applicants for, a Light UAS Operator Certificate (LUC)",
    "Grid and energy companies operating drones for inspection",
    "Municipalities and schools running drone programmes",
    "Consultants who manage drone operations on behalf of clients",
  ],
  features: [
    {
      title: "Safety policy",
      text: "Document the organisation's safety policy, responsibilities and procedures in one place, available to everyone involved in operations.",
    },
    {
      title: "Safety risk management",
      text: "Identify hazards, assess risks and record mitigations, linked to missions, equipment and SORA-based assessments.",
    },
    {
      title: "Safety assurance",
      text: "Follow up occurrences, track actions to closure and use statistics to monitor how safety performance develops over time.",
    },
    {
      title: "Safety promotion",
      text: "Share lessons learned and keep crew informed so that safety knowledge reaches the people who fly.",
    },
    {
      title: "Document management",
      text: "Keep manuals, procedures and supporting documents structured, versioned and accessible to the right people.",
    },
    {
      title: "Occurrence follow-up and statistics",
      text: "Occurrences reported in AviSafe feed directly into follow-up and safety statistics for the organisation.",
    },
  ],
  regulatory: [
    { name: "Regulation (EU) 2019/947", text: "Rules and procedures for the operation of unmanned aircraft, including the specific category." },
    { name: "Regulation (EU) 2019/945", text: "Requirements for unmanned aircraft systems and third-country operators." },
    { name: "UAS.LUC.030", text: "Safety management system requirements for LUC holders. AviSafe is designed around these requirements." },
    { name: "ICAO Annex 19", text: "Safety Management – the framework behind the four SMS pillars." },
  ],
  faq: [
    {
      q: "Do I need a safety management system to fly drones in the specific category?",
      a: "A formal SMS is required for LUC holders under UAS.LUC.030. Other operators in the specific category are not always required to have one, but many use a structured SMS to manage risk and document their operations.",
    },
    {
      q: "What are the four pillars of an SMS?",
      a: "ICAO Annex 19 describes safety policy and objectives, safety risk management, safety assurance and safety promotion. AviSafe is built around these four pillars.",
    },
    {
      q: "Is AviSafe suitable for an organisation applying for a LUC?",
      a: "AviSafe is designed around the SMS requirements in UAS.LUC.030 and is built to support organisations working towards or holding a LUC. The authority decides on the LUC itself.",
    },
    {
      q: "Can a municipality or school use AviSafe for its drone programme?",
      a: "Yes. AviSafe is used by municipalities and schools in Norway to structure safety work around their drone operations.",
    },
    {
      q: "How does the SMS connect to daily drone operations?",
      a: "The SMS is linked to missions, drones, pilots, risk assessments and occurrence reports in the same platform, so safety work follows the operations that are actually flown.",
    },
    {
      q: "Does AviSafe make my organisation compliant?",
      a: "No software can do that on its own. AviSafe is built to support the operator's own safety work and documentation; the operator remains responsible for meeting regulatory requirements.",
    },
    {
      q: "Is AviSafe available in English?",
      a: "Yes. AviSafe is available in English and Norwegian.",
    },
  ],
};

export const SORA_PAGE: LandingPage = {
  path: "/en/sora-risk-assessment",
  navLabel: "SORA risk assessment",
  metaTitle: "SORA 2.5 Risk Assessment Support for Drone Operators | AviSafe",
  metaDescription:
    "Decision support for risk assessment under SORA 2.5 (JARUS/EASA) in the specific category, with a structured and traceable report.",
  h1: "Decision support for SORA 2.5 risk assessment",
  lead:
    "AviSafe is a Norwegian web platform that gives drone operators in the EASA specific category decision support for risk assessment under SORA 2.5 (JARUS/EASA).",
  intro:
    "AviSafe collects the information a SORA-based assessment depends on and structures the documentation, so the operator can focus on judgement and mitigations rather than gathering data.",
  whoFor: [
    "Operators in the EASA specific category preparing operational authorisation applications",
    "Remote pilots planning missions that require a risk assessment",
    "Safety and compliance staff who review assessments before flight",
  ],
  features: [
    {
      title: "Mission data collected automatically",
      text: "Location, crew, equipment and time for the mission are gathered from the platform.",
    },
    {
      title: "Weather and airspace",
      text: "Current weather and airspace information is retrieved automatically for the planned operation.",
    },
    {
      title: "The operator's own limits",
      text: "The organisation's own safety requirements and limits are always applied to the assessment.",
    },
    {
      title: "Pilot mitigations",
      text: "The pilot adds operational conditions and mitigations for the identified risk areas.",
    },
    {
      title: "Structured, traceable report",
      text: "AviSafe produces a structured report covering GRC, ARC, SAIL and OSO, with inputs and decisions stored for later review.",
    },
  ],
  regulatory: [
    { name: "Article 11 of Regulation (EU) 2019/947", text: "Rules for conducting an operational risk assessment in the specific category." },
    { name: "SORA 2.5 (JARUS/EASA)", text: "The Specific Operations Risk Assessment methodology the tool is built around." },
  ],
  note:
    "AviSafe is a decision-support tool. The operator remains responsible for the risk assessment, and authorisation is granted by the competent authority where required.",
  faq: [
    {
      q: "What is SORA 2.5?",
      a: "SORA (Specific Operations Risk Assessment) is a methodology published by JARUS and adopted by EASA for assessing the risk of drone operations in the specific category. Version 2.5 is the current edition.",
    },
    {
      q: "Can AviSafe do my SORA for me?",
      a: "AviSafe supports the process by collecting data and structuring the documentation. The operator remains responsible for the risk assessment and for the decisions in it.",
    },
    {
      q: "Does AviSafe approve my operation?",
      a: "No. Authorisation is granted by the competent authority where required. AviSafe helps the operator prepare a structured, traceable assessment.",
    },
    {
      q: "What does the SORA report in AviSafe include?",
      a: "The report is structured around ground risk (GRC), air risk (ARC), the resulting SAIL and the operational safety objectives (OSO), together with the mitigations the pilot has added.",
    },
    {
      q: "Where does the weather and airspace data come from?",
      a: "AviSafe retrieves current weather and airspace information automatically when the mission is planned, so the assessment is based on up-to-date data.",
    },
    {
      q: "Can our company's own limits be built into the assessment?",
      a: "Yes. The operator's own safety requirements and limits are applied to every assessment and cannot be overridden by the pilot.",
    },
    {
      q: "Is the SORA tool only for the specific category?",
      a: "Yes. SORA applies to the specific category, and AviSafe's SORA support is designed for that category.",
    },
  ],
};

export const OCCURRENCE_PAGE: LandingPage = {
  path: "/en/occurrence-reporting",
  navLabel: "Occurrence reporting",
  metaTitle: "Drone Occurrence Reporting with ECCAIRS 2 Integration | AviSafe",
  metaDescription:
    "Report and follow up drone occurrences in one system, with direct integration to ECCAIRS 2 via the E2 API.",
  h1: "Occurrence reporting for drone operators",
  lead:
    "AviSafe is a Norwegian web platform that lets drone operators report and follow up occurrences in one system, with direct integration to ECCAIRS 2 via the E2 API.",
  intro:
    "Occurrences are reported where the operation is managed, followed up internally and submitted to ECCAIRS 2 without re-entering the data in a separate system.",
  whoFor: [
    "Operators in the EASA specific category",
    "LUC holders with an occurrence reporting process in their SMS",
    "Safety managers responsible for follow-up and reporting to the authority",
  ],
  features: [
    {
      title: "Report occurrences quickly",
      text: "Pilots and crew can report occurrences directly in AviSafe, linked to the mission, drone and people involved.",
    },
    {
      title: "Direct ECCAIRS 2 integration",
      text: "Reports are submitted to ECCAIRS 2 through a direct integration with the E2 API, not through manual file export.",
    },
    {
      title: "Internal follow-up",
      text: "Assign actions, track them to closure and keep the history of each occurrence in one place.",
    },
    {
      title: "Statistics and trends",
      text: "Occurrence data feeds the safety statistics used in the organisation's SMS.",
    },
  ],
  regulatory: [
    { name: "Regulation (EU) 376/2014", text: "Reporting, analysis and follow-up of occurrences in civil aviation." },
    { name: "Article 19 of Regulation (EU) 2019/947", text: "Safety information and occurrence reporting for UAS operations." },
  ],
  faq: [
    {
      q: "Do drone operators have to report occurrences?",
      a: "Regulation (EU) 376/2014 and Article 19 of Regulation (EU) 2019/947 set out occurrence reporting for UAS operations. Which occurrences must be reported depends on the operation and the applicable rules.",
    },
    {
      q: "What is ECCAIRS 2?",
      a: "ECCAIRS 2 is the European system used by aviation authorities to collect and analyse occurrence reports.",
    },
    {
      q: "How does AviSafe send reports to ECCAIRS 2?",
      a: "AviSafe has a direct integration with ECCAIRS 2 via the E2 API, so reports can be submitted without exporting files or re-typing data.",
    },
    {
      q: "Can we follow up occurrences internally before reporting?",
      a: "Yes. Occurrences can be followed up with actions and history inside AviSafe as part of the organisation's safety work.",
    },
    {
      q: "Who in the organisation can report an occurrence?",
      a: "Pilots and crew can report occurrences in AviSafe; follow-up is handled by the people responsible for safety in the organisation.",
    },
    {
      q: "Does occurrence data connect to the SMS?",
      a: "Yes. Occurrence reports feed follow-up and safety statistics in AviSafe's safety management system.",
    },
  ],
};

export const FLEET_PAGE: LandingPage = {
  path: "/en/drone-fleet-management",
  navLabel: "Fleet management",
  metaTitle: "Drone Fleet Management with DJI, Dronetag and ArduPilot | AviSafe",
  metaDescription:
    "Manage drones, equipment, pilots, competence, maintenance and flight logs in one platform, with DJI Cloud API, Dronetag and ArduPilot integrations.",
  h1: "Drone fleet management",
  lead:
    "AviSafe is a Norwegian web platform that helps drone operators manage drones, equipment, pilots, competence, maintenance and flight logs in one system.",
  intro:
    "Fleet data is connected to missions, risk assessments and the safety management system, and integrations bring telemetry and logs in from the tools operators already use.",
  whoFor: [
    "Operators with several drones, pilots or teams",
    "Organisations that need an overview of competence and maintenance",
    "Operators flying DJI enterprise drones or ArduPilot-based systems",
  ],
  features: [
    { title: "Drones and equipment", text: "Keep a register of drones, batteries and other equipment with status and history." },
    { title: "Pilots and competence", text: "Track pilots, their competence and qualifications in one overview." },
    { title: "Maintenance", text: "Plan and record maintenance for drones and equipment." },
    { title: "Flight logs", text: "Log flights in AviSafe and import log files from your aircraft." },
    {
      title: "DJI live position and telemetry",
      text: "Live position and telemetry from DJI Pilot 2 and DJI FlightHub 2 (Sync) via the DJI Cloud API.",
    },
    { title: "Export to FlightHub 2", text: "Export routes and SORA buffers from AviSafe to DJI FlightHub 2." },
    { title: "Dronetag Remote ID", text: "Integration with Dronetag Remote ID devices." },
    { title: "ArduPilot", text: "Integration with ArduPilot-based drones and import of their log files." },
  ],
  regulatory: [
    { name: "Regulation (EU) 2019/947", text: "Operator responsibilities, including records of flights, maintenance and remote pilot competence." },
    { name: "Regulation (EU) 2019/945", text: "Requirements for UAS, including Remote ID for relevant classes." },
  ],
  faq: [
    {
      q: "Can AviSafe show live position from DJI drones?",
      a: "Yes. AviSafe receives live position and telemetry from DJI Pilot 2 and DJI FlightHub 2 (Sync) through the DJI Cloud API.",
    },
    {
      q: "Can I send routes from AviSafe to DJI FlightHub 2?",
      a: "Yes. Routes and SORA buffers can be exported from AviSafe to DJI FlightHub 2.",
    },
    {
      q: "Does AviSafe support non-DJI drones?",
      a: "Yes. AviSafe integrates with ArduPilot and supports importing log files.",
    },
    {
      q: "Can I track pilot competence and maintenance in the same system?",
      a: "Yes. Pilots, competence, drones, equipment and maintenance are all managed in AviSafe.",
    },
    {
      q: "Does AviSafe work with Dronetag Remote ID?",
      a: "Yes. AviSafe has an integration with Dronetag Remote ID devices.",
    },
    {
      q: "How are flight logs recorded?",
      a: "Flights can be logged in AviSafe, and log files from the aircraft can be imported.",
    },
  ],
};

export const AIRSPACE_PAGE: LandingPage = {
  path: "/en/live-airspace-awareness",
  navLabel: "Live airspace awareness",
  metaTitle: "Live Airspace Awareness for Drone Operators with SafeSky | AviSafe",
  metaDescription:
    "Live air traffic from SafeSky, position sharing at take-off, NOTAM and airspace checks during planning, and real-time weather data in one map.",
  h1: "Live airspace awareness for drone operations",
  lead:
    "AviSafe is a Norwegian web platform that gives drone operators a live airspace picture with SafeSky air traffic, NOTAM and airspace checks, and real-time weather in one map.",
  intro:
    "Situational awareness is part of planning and flying: AviSafe shows what is in the air, what restrictions apply and what the weather is doing, in the same system as the mission.",
  whoFor: [
    "Remote pilots who need an overview of nearby air traffic",
    "Operators flying near airports, helicopter routes or in busy airspace",
    "Organisations that want airspace checks to be part of planning",
  ],
  features: [
    { title: "Live air traffic from SafeSky", text: "Air traffic from SafeSky is shown live in the AviSafe map." },
    { title: "Position sharing at take-off", text: "The drone's position is shared when the flight starts, so other airspace users can see it." },
    { title: "NOTAM and airspace checks", text: "NOTAM and airspace are checked when the mission is planned." },
    { title: "Real-time weather", text: "Current weather data is available for the operating area." },
  ],
  regulatory: [
    { name: "Regulation (EU) 2019/947", text: "Operator and remote pilot responsibilities for checking airspace conditions and restrictions before flight." },
  ],
  faq: [
    {
      q: "Can I see manned air traffic in AviSafe?",
      a: "Yes. Live air traffic from SafeSky is shown in the AviSafe map.",
    },
    {
      q: "Is my drone visible to other airspace users?",
      a: "AviSafe shares the drone's position when the flight starts, so it can be seen by other airspace users.",
    },
    {
      q: "Does AviSafe check NOTAM when I plan a mission?",
      a: "Yes. NOTAM and airspace are checked as part of mission planning.",
    },
    {
      q: "Does AviSafe show weather for my flight area?",
      a: "Yes. Real-time weather data is available for the operating area.",
    },
    {
      q: "Does live air traffic replace my own lookout?",
      a: "No. The live airspace picture supports situational awareness; the remote pilot remains responsible for the safe conduct of the flight.",
    },
    {
      q: "Where can I read more about the SafeSky integration?",
      a: "SafeSky has published an article about the collaboration: “Aviation-grade safety for a maturing drone industry” on safesky.app.",
    },
  ],
};

export const LANDING_PAGES: LandingPage[] = [SMS_PAGE, SORA_PAGE, OCCURRENCE_PAGE, FLEET_PAGE, AIRSPACE_PAGE];
