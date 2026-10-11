/**
 * Copy for the Compliance module page, one object per language.
 * The page layout lives in src/pages/CompliancePage.tsx.
 * All names in the mockups are fictitious demo data.
 */

export type ComplianceLang = "nb" | "en";

export const COMPLIANCE_PATHS: Record<ComplianceLang, string> = {
  nb: "/compliance",
  en: "/en/compliance",
};

export type ComplianceAreaId =
  "operations" | "fleet" | "personnel" | "documents" | "incidents" | "audit";

export type ComplianceArea = {
  id: ComplianceAreaId;
  label: string;
  summary: string;
  examples: string[];
};

type Severity = "critical" | "warning";

export type ComplianceContent = {
  meta: { title: string; description: string };
  home: { name: string; path: string };
  navLabel: string;
  hero: {
    tag: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  spectrum: { source: string; prism: string; ariaLabel: string };
  areas: ComplianceArea[];
  measure: { h2: string; lead: string };
  how: {
    h2: string;
    lead: string;
    steps: { title: string; body: string }[];
    panel: {
      kpis: {
        label: string;
        value: number;
        tone: "critical" | "warning" | "neutral" | "ok";
      }[];
      heading: string;
      rows: {
        severity: Severity;
        severityLabel: string;
        item: string;
        detail: string;
        department: string;
        responsible: string;
      }[];
      sendReminder: string;
      sent: string;
    };
  };
  inbox: {
    h2: string;
    body: string;
    bullets: string[];
    mock: {
      inboxTitle: string;
      filters: string[];
      list: { severity: Severity | "info"; title: string; meta: string }[];
      badge: string;
      title: string;
      question: string;
      actions: [string, string, string];
      open: string;
      message: string[];
      sender: string;
      seenBy: string;
      done: string;
      doneNote: (action: string) => string;
      reset: string;
    };
  };
  audit: {
    h2: string;
    body: string;
    steps: { title: string; body: string }[];
    mock: {
      title: string;
      saved: string;
      audit: string;
      unit: string;
      item: string;
      reference: string;
      level: string;
      status: string;
      deadline: string;
      rootCauseLabel: string;
      rootCause: string;
      planLabel: string;
      action: string;
      responsible: string;
      due: string;
      actionStatus: string;
      markDone: string;
      done: string;
    };
  };
  inspection: {
    h2: string;
    body: string;
    packageTitle: string;
    items: string[];
    button: string;
    ready: string;
  };
  benefits: { h2: string; items: { title: string; body: string }[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  cta: { h2: string; body: string; button: string };
};

export const COMPLIANCE: Record<ComplianceLang, ComplianceContent> = {
  nb: {
    meta: {
      title: "Compliance – ta pulsen på organisasjonen din | AviSafe",
      description:
        "Compliance-modulen i AviSafe måler operasjoner, flåte, personell, dokumenter, hendelser og internrevisjon – og sier tydelig hva som må følges opp.",
    },
    home: { name: "Forside", path: "/" },
    navLabel: "Compliance",
    hero: {
      tag: "#TaPulsen",
      h1: "Ta pulsen på organisasjonen din",
      lead: "Compliance-modulen er hjertet i AviSafe. Den måler hele virksomheten og sier tydelig hva som må følges opp – hendelser, oppdrag, dokumenter, sertifikater og kurs.",
      ctaPrimary: "Book en demo",
      ctaSecondary: "Se hvordan det virker",
    },
    spectrum: {
      source: "Din organisasjon",
      prism: "AviSafe Compliance",
      ariaLabel:
        "Illustrasjon: organisasjonen din går inn i AviSafe Compliance og splittes i seks områder som måles – operasjoner, flåte, personell, dokumenter, hendelser og internrevisjon.",
    },
    areas: [
      {
        id: "operations",
        label: "Operasjoner",
        summary: "Oppdrag som må fullføres eller dokumenteres bedre.",
        examples: [
          "Planlagte oppdrag som har passert uten å bli avsluttet",
          "Oppdrag uten flylogg",
          "Flyginger gjennomført med NO-GO",
        ],
      },
      {
        id: "fleet",
        label: "Flåte",
        summary: "Droner og utstyr med forfalt inspeksjon eller vedlikehold.",
        examples: [
          "Inspeksjon som har forfalt eller snart forfaller",
          "Batterier og tilleggsutstyr med forfalt vedlikehold",
          "Rød status: dronen skal ikke brukes før feilen er rettet",
        ],
      },
      {
        id: "personnel",
        label: "Personell",
        summary: "Kompetanse, sertifikater og kurs som må fornyes eller tas.",
        examples: [
          "Sertifikater og kompetansebevis som går ut",
          "Kurs og opplæring som mangler",
          "Kompetanse som må friskes opp",
        ],
      },
      {
        id: "documents",
        label: "Dokumenter",
        summary:
          "Driftshåndbok, prosedyrer og avtaler som må revideres eller fornyes.",
        examples: [
          "Dokumenter som har gått ut på dato",
          "Prosedyrer som skal revideres",
          "Avtaler som må fornyes",
        ],
      },
      {
        id: "incidents",
        label: "Hendelser",
        summary: "Avvik og hendelser som må følges opp og lukkes.",
        examples: [
          "Hendelser som har stått åpne lenge",
          "Oppfølgingssaker som venter på svar",
          "Tiltak som ikke er lukket",
        ],
      },
      {
        id: "audit",
        label: "Internrevisjon",
        summary: "Funn fra internrevisjon med frist og ansvarlig.",
        examples: [
          "Åpne funn og avvik",
          "Tiltak som nærmer seg fristen",
          "Funn som venter på rotårsak og tiltaksplan",
        ],
      },
    ],
    measure: {
      h2: "Én modul som måler alt",
      lead: "Compliance-modulen henter status fra hele AviSafe og samler alt som krever oppfølging på ett sted.",
    },
    how: {
      h2: "Fra funn til lukket sak – uten å purre",
      lead: "Compliance-modulen gjør oppfølgingen til en flyt: den finner sakene, prioriterer dem og sender dem til riktig person.",
      steps: [
        {
          title: "Måler",
          body: "Modulen følger med på hele virksomheten hele tiden – på tvers av avdelinger.",
        },
        {
          title: "Prioriterer",
          body: "«Krever handling nå» viser det viktigste øverst, merket Kritisk eller Advarsel, med avdeling og ansvarlig. Du følger både compliance-score (status) og oppfølgingsgrad (handling) – for hele organisasjonen eller én avdeling.",
        },
        {
          title: "Følger opp",
          body: "Send påminnelse rett til den det gjelder. Du ser hvem som har svart og hvem som ikke har, og saker kan utsettes eller aksepteres med begrunnelse.",
        },
      ],
      panel: {
        kpis: [
          { label: "Kritiske funn", value: 2, tone: "critical" },
          { label: "Advarsler", value: 1, tone: "warning" },
          { label: "Ubehandlet", value: 3, tone: "neutral" },
          { label: "Påminnet, uten svar", value: 0, tone: "ok" },
        ],
        heading: "Krever handling nå",
        rows: [
          {
            severity: "critical",
            severityLabel: "Kritisk",
            item: "DJI Matrice 350 RTK: rød status",
            detail: "Dronen skal ikke brukes før feilen er rettet.",
            department: "Avdeling Nord",
            responsible: "Kari Nordmann",
          },
          {
            severity: "critical",
            severityLabel: "Kritisk",
            item: "DJI FlyCart 100: rød status",
            detail: "Vedlikehold av tilleggsutstyr har forfalt.",
            department: "Avdeling Vest",
            responsible: "Ola Hansen",
          },
          {
            severity: "warning",
            severityLabel: "Advarsel",
            item: "DJI Mavic 3 Enterprise: gul status",
            detail: "Inspeksjonen forfaller om 3 dager.",
            department: "Avdeling Nord",
            responsible: "Kari Nordmann",
          },
        ],
        sendReminder: "Send påminnelse",
        sent: "Påminnet",
      },
    },
    inbox: {
      h2: "Lukk saken rett fra innboksen",
      body: "Funn og observasjoner sendes som melding til personen det gjelder, i AviSafes interne innboks. Meldingen har hurtigknapper som passer til saken, så mottakeren kan svare og lukke saken med ett klikk.",
      bullets: [
        "Hurtigknapper tilpasset saken",
        "Du ser når meldingen er lest",
        "Svar og tiltak lagres på saken",
      ],
      mock: {
        inboxTitle: "Innboks",
        filters: ["Alle", "Ulest", "Utført", "Sendt"],
        list: [
          {
            severity: "warning",
            title:
              "Handling nødvendig: Kartlegging Fjellvegen – planlagt oppdrag er passert",
            meta: "Compliance · Avdeling Nord",
          },
          {
            severity: "critical",
            title: "Handling nødvendig: Hendelse åpen i 40 dager",
            meta: "Compliance · Avdeling Nord",
          },
          {
            severity: "warning",
            title: "Handling nødvendig: Oppdrag uten flylogg",
            meta: "Compliance · Avdeling Vest",
          },
        ],
        badge: "Advarsel",
        title:
          "Handling nødvendig: Kartlegging Fjellvegen – planlagt oppdrag er passert",
        question:
          "«Kartlegging Fjellvegen» har passert, men står fortsatt som planlagt. Hva skjedde?",
        actions: ["Ikke fløyet", "Ble fløyet", "Endre dato"],
        open: "Åpne oppdrag",
        message: [
          "Hei,",
          "dette er en påminnelse fra compliance-verktøyet i AviSafe.",
          "Oppdraget står fortsatt som planlagt 3 dager etter sluttidspunktet. Vennligst følg opp så snart som mulig.",
        ],
        sender: "Compliance · Avdeling Nord",
        seenBy: "Lest av Kari Nordmann",
        done: "Utført",
        doneNote: (action) => `Besvart med «${action}». Saken er lukket.`,
        reset: "Prøv igjen",
      },
    },
    audit: {
      h2: "Internrevisjon fra plan til lukket funn",
      body: "Funn havner som oppgaver i innboksen til de som er berørt – med nivå, henvisning til regelverket og frist. Den ansvarlige beskriver rotårsaken og legger inn tiltak med ansvarlig, frist og status. Alt lagres automatisk, og du følger hvert funn til det er lukket.",
      steps: [
        {
          title: "Planlegg",
          body: "Sett opp revisjonen og hva som skal revideres.",
        },
        { title: "Gjennomfør", body: "Gå gjennom punktene for hver enhet." },
        {
          title: "Registrer funn",
          body: "Nivå, henvisning og frist på hvert funn.",
        },
        {
          title: "Tildel ansvar",
          body: "Funnet sendes til den som skal følge opp.",
        },
        {
          title: "Følg opp og lukk",
          body: "Rotårsak, tiltak og status – til funnet er lukket.",
        },
      ],
      mock: {
        title: "Revisjonsoppgave",
        saved: "Endringer lagres automatisk",
        audit: "Årlig internrevisjon 2026",
        unit: "Revidert enhet: Avdeling Nord",
        item: "Punkt: Klassemerking registrert per drone",
        reference: "Henvisning: (EU) 2019/945",
        level: "Nivå 2",
        status: "Åpen",
        deadline: "Frist: 10.12.2026",
        rootCauseLabel: "Rotårsak",
        rootCause:
          "Innkjøpsrutinen hadde ikke krav om å registrere klassemerking.",
        planLabel: "Tiltaksplan",
        action: "Oppdatere innkjøpsrutinen med krav om klassemerking",
        responsible: "Kari Nordmann",
        due: "01.12.2026",
        actionStatus: "Pågår",
        markDone: "Merk som utført",
        done: "Utført",
      },
    },
    inspection: {
      h2: "Klar for tilsyn",
      body: "Lag en tilsynspakke med all dokumentasjon samlet og strukturert – klar for tilsyn fra Luftfartstilsynet eller ekstern revisjon.",
      packageTitle: "Tilsynspakke",
      items: [
        "Operasjoner og flylogger",
        "Flåte og vedlikehold",
        "Personell og kompetanse",
        "Dokumenter og driftshåndbok",
        "Hendelser og oppfølging",
        "Internrevisjon og funn",
      ],
      button: "Generer tilsynspakke",
      ready: "Klar for tilsyn",
    },
    benefits: {
      h2: "Mindre administrasjon, mer kontroll",
      items: [
        {
          title: "Mindre tid på purring",
          body: "Påminnelser og svar går gjennom innboksen, med hurtigknapper som lukker saken.",
        },
        {
          title: "Full oversikt på tvers av avdelinger",
          body: "Se status for hele organisasjonen, eller én avdeling om gangen.",
        },
        {
          title: "Sporbarhet på alt som er gjort",
          body: "Hvem som fikk beskjed, når den ble lest og hva som ble gjort – alt er dokumentert.",
        },
      ],
    },
    faq: {
      h2: "Ofte stilte spørsmål",
      items: [
        {
          q: "Hva er Compliance-modulen i AviSafe?",
          a: "Compliance-modulen samler status fra operasjoner, flåte, personell, dokumenter, hendelser og internrevisjon på ett sted. Den viser hva som krever handling nå, hvem som er ansvarlig, og om saken er fulgt opp.",
        },
        {
          q: "Hvordan får de ansvarlige beskjed om funn?",
          a: "Du sender en påminnelse direkte fra Compliance-modulen. Den havner i mottakerens innboks i AviSafe, med hurtigknapper tilpasset saken – for eksempel «Ble fløyet» eller «Endre dato» for et oppdrag som har passert. Du ser når meldingen er lest og om saken er lukket.",
        },
        {
          q: "Kan vi bruke modulen til internrevisjon?",
          a: "Ja. Du planlegger og gjennomfører revisjonen, registrerer funn med nivå, henvisning og frist, og tildeler ansvar. Den ansvarlige får funnet som oppgave i innboksen og svarer med rotårsak og tiltaksplan.",
        },
        {
          q: "Hva inneholder tilsynspakken?",
          a: "Tilsynspakken samler dokumentasjonen fra operasjoner, flåte, personell, dokumenter, hendelser og internrevisjon i én strukturert pakke, klar for tilsyn eller ekstern revisjon.",
        },
        {
          q: "Hva koster modulen?",
          a: "Ta kontakt, så finner vi en løsning som passer dere.",
        },
      ],
    },
    cta: {
      h2: "Ta pulsen på organisasjonen din",
      body: "Book en demo, så viser vi hvordan Compliance-modulen fungerer med deres egne operasjoner.",
      button: "Book en demo",
    },
  },

  en: {
    meta: {
      title: "Compliance – take the pulse of your organisation | AviSafe",
      description:
        "AviSafe Compliance monitors operations, fleet, personnel, documents, incidents and internal audits – and tells you exactly what needs follow-up.",
    },
    home: { name: "Home", path: "/en" },
    navLabel: "Compliance",
    hero: {
      tag: "#TakeThePulse",
      h1: "Take the pulse of your organisation",
      lead: "The Compliance module is the heart of AviSafe. It monitors your whole organisation and tells you clearly what needs follow-up – incidents, missions, documents, certificates and courses.",
      ctaPrimary: "Book a demo",
      ctaSecondary: "See how it works",
    },
    spectrum: {
      source: "Your organisation",
      prism: "AviSafe Compliance",
      ariaLabel:
        "Illustration: your organisation enters AviSafe Compliance and splits into six monitored areas – operations, fleet, personnel, documents, incidents and internal audit.",
    },
    areas: [
      {
        id: "operations",
        label: "Operations",
        summary: "Missions that need to be completed or better documented.",
        examples: [
          "Planned missions that have passed without being closed",
          "Missions without a flight log",
          "Flights carried out with a NO-GO",
        ],
      },
      {
        id: "fleet",
        label: "Fleet",
        summary: "Drones and equipment with overdue inspection or maintenance.",
        examples: [
          "Inspections that are overdue or due soon",
          "Batteries and accessories with overdue maintenance",
          "Red status: the drone must not be used until the fault is fixed",
        ],
      },
      {
        id: "personnel",
        label: "Personnel",
        summary: "Competence, certificates and courses to renew or complete.",
        examples: [
          "Certificates and competence records that expire",
          "Missing courses and training",
          "Competence that needs a refresher",
        ],
      },
      {
        id: "documents",
        label: "Documents",
        summary:
          "Operations manual, procedures and agreements to review or renew.",
        examples: [
          "Expired documents",
          "Procedures due for review",
          "Agreements to renew",
        ],
      },
      {
        id: "incidents",
        label: "Incidents",
        summary:
          "Deviations and incidents that must be followed up and closed.",
        examples: [
          "Incidents that have been open for a long time",
          "Follow-ups waiting for a reply",
          "Actions that are not closed",
        ],
      },
      {
        id: "audit",
        label: "Internal audit",
        summary: "Internal audit findings with a deadline and an owner.",
        examples: [
          "Open findings and deviations",
          "Actions approaching their deadline",
          "Findings waiting for root cause and action plan",
        ],
      },
    ],
    measure: {
      h2: "One module that measures everything",
      lead: "The Compliance module pulls status from all of AviSafe and gathers everything that needs follow-up in one place.",
    },
    how: {
      h2: "From finding to closed case – without chasing people",
      lead: "The Compliance module turns follow-up into a flow: it finds the cases, prioritises them and sends them to the right person.",
      steps: [
        {
          title: "Monitors",
          body: "The module keeps track of the whole organisation, across departments, all the time.",
        },
        {
          title: "Prioritises",
          body: "“Requires action now” puts the most important items at the top, marked Critical or Warning, with department and owner. Track both the compliance score (state) and the follow-up rate (action) – for the whole organisation or one department.",
        },
        {
          title: "Follows up",
          body: "Send a reminder straight to the person responsible. See who has replied and who hasn't, and snooze or accept items with a reason.",
        },
      ],
      panel: {
        kpis: [
          { label: "Critical findings", value: 2, tone: "critical" },
          { label: "Warnings", value: 1, tone: "warning" },
          { label: "Untreated", value: 3, tone: "neutral" },
          { label: "Reminded, no response", value: 0, tone: "ok" },
        ],
        heading: "Requires action now",
        rows: [
          {
            severity: "critical",
            severityLabel: "Critical",
            item: "DJI Matrice 350 RTK: red status",
            detail: "The drone must not be used until the fault is fixed.",
            department: "North department",
            responsible: "Kari Nordmann",
          },
          {
            severity: "critical",
            severityLabel: "Critical",
            item: "DJI FlyCart 100: red status",
            detail: "Accessory maintenance is overdue.",
            department: "West department",
            responsible: "Ola Hansen",
          },
          {
            severity: "warning",
            severityLabel: "Warning",
            item: "DJI Mavic 3 Enterprise: yellow status",
            detail: "Inspection is due in 3 days.",
            department: "North department",
            responsible: "Kari Nordmann",
          },
        ],
        sendReminder: "Send reminder",
        sent: "Reminded",
      },
    },
    inbox: {
      h2: "Close the case straight from the inbox",
      body: "Findings and observations are sent as a message to the person concerned, in AviSafe's internal inbox. The message has quick actions that fit the case, so the recipient can reply and close it with one click.",
      bullets: [
        "Quick actions that fit the case",
        "See when the message has been read",
        "Replies and actions are stored on the case",
      ],
      mock: {
        inboxTitle: "Inbox",
        filters: ["All", "Unread", "Done", "Sent"],
        list: [
          {
            severity: "warning",
            title:
              "Action required: Survey Fjellvegen – planned mission has passed",
            meta: "Compliance · North department",
          },
          {
            severity: "critical",
            title: "Action required: Incident open for 40 days",
            meta: "Compliance · North department",
          },
          {
            severity: "warning",
            title: "Action required: Mission without flight log",
            meta: "Compliance · West department",
          },
        ],
        badge: "Warning",
        title:
          "Action required: Survey Fjellvegen – planned mission has passed",
        question:
          "“Survey Fjellvegen” has passed but is still planned. What happened?",
        actions: ["Not flown", "Was flown", "Change date"],
        open: "Open mission",
        message: [
          "Hi,",
          "this is a reminder from the compliance tool in AviSafe.",
          "The mission is still planned 3 days after its end time. Please follow up as soon as possible.",
        ],
        sender: "Compliance · North department",
        seenBy: "Seen by Kari Nordmann",
        done: "Done",
        doneNote: (action) => `Answered “${action}”. The case is closed.`,
        reset: "Try again",
      },
    },
    audit: {
      h2: "Internal audit from plan to closed finding",
      body: "Findings land as tasks in the inbox of the people concerned – with level, regulatory reference and deadline. The owner describes the root cause and adds actions with owner, deadline and status. Everything is saved automatically, and you follow each finding until it is closed.",
      steps: [
        { title: "Plan", body: "Set up the audit and what it covers." },
        { title: "Perform", body: "Work through the items for each unit." },
        {
          title: "Record findings",
          body: "Level, reference and deadline on every finding.",
        },
        {
          title: "Assign",
          body: "The finding goes to the person who follows it up.",
        },
        {
          title: "Follow up and close",
          body: "Root cause, actions and status – until the finding is closed.",
        },
      ],
      mock: {
        title: "Audit task",
        saved: "Changes are saved automatically",
        audit: "Annual internal audit 2026",
        unit: "Audited unit: North department",
        item: "Item: Class marking recorded per drone",
        reference: "Reference: (EU) 2019/945",
        level: "Level 2",
        status: "Open",
        deadline: "Deadline: 10/12/2026",
        rootCauseLabel: "Root cause",
        rootCause:
          "The purchasing procedure did not require class marking to be recorded.",
        planLabel: "Action plan",
        action: "Update the purchasing procedure to require class marking",
        responsible: "Kari Nordmann",
        due: "01/12/2026",
        actionStatus: "In progress",
        markDone: "Mark as done",
        done: "Done",
      },
    },
    inspection: {
      h2: "Ready for inspection",
      body: "Generate an inspection package with all documentation collected and structured – ready for an inspection by the aviation authority or an external audit.",
      packageTitle: "Inspection package",
      items: [
        "Operations and flight logs",
        "Fleet and maintenance",
        "Personnel and competence",
        "Documents and operations manual",
        "Incidents and follow-up",
        "Internal audit and findings",
      ],
      button: "Generate inspection package",
      ready: "Ready for inspection",
    },
    benefits: {
      h2: "Less admin, more control",
      items: [
        {
          title: "Less time chasing people",
          body: "Reminders and replies go through the inbox, with quick actions that close the case.",
        },
        {
          title: "Full overview across departments",
          body: "See the status of the whole organisation, or one department at a time.",
        },
        {
          title: "Traceability for everything done",
          body: "Who was notified, when it was read and what was done – it is all documented.",
        },
      ],
    },
    faq: {
      h2: "Frequently asked questions",
      items: [
        {
          q: "What is the Compliance module in AviSafe?",
          a: "The Compliance module brings together status from operations, fleet, personnel, documents, incidents and internal audit in one place. It shows what requires action now, who is responsible, and whether the case has been followed up.",
        },
        {
          q: "How are the people responsible notified about findings?",
          a: "You send a reminder directly from the Compliance module. It lands in the recipient's AviSafe inbox with quick actions that fit the case – for example “Was flown” or “Change date” for a mission that has passed. You can see when the message has been read and whether the case is closed.",
        },
        {
          q: "Can we use the module for internal audits?",
          a: "Yes. You plan and perform the audit, record findings with level, reference and deadline, and assign an owner. The owner receives the finding as a task in the inbox and replies with root cause and an action plan.",
        },
        {
          q: "What does the inspection package contain?",
          a: "The inspection package collects documentation from operations, fleet, personnel, documents, incidents and internal audit in one structured package, ready for an inspection or external audit.",
        },
        {
          q: "What does the module cost?",
          a: "Get in touch and we will find a solution that fits your organisation.",
        },
      ],
    },
    cta: {
      h2: "Take the pulse of your organisation",
      body: "Book a demo and we will show you how the Compliance module works with your own operations.",
      button: "Book a demo",
    },
  },
};
