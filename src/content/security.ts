/**
 * Copy for the security page (/sikkerhet and /en/security), one object per
 * language. Written for customers, not engineers: each card says what we do
 * in plain words, and `tech` gives the short technical term for IT staff.
 * The page layout lives in src/pages/SecurityPage.tsx.
 */

export type SecLang = "nb" | "en";

export const SECURITY_PATHS: Record<SecLang, string> = {
  nb: "/sikkerhet",
  en: "/en/security",
};

export const SECURITY_EMAIL = "support@avisafe.no";
const DPA_MAILTO_SUBJECT: Record<SecLang, string> = {
  nb: "Databehandleravtale",
  en: "Data processing agreement",
};
export const dpaMailto = (lang: SecLang) =>
  `mailto:kontakt@avisafe.no?subject=${encodeURIComponent(DPA_MAILTO_SUBJECT[lang])}`;

export type SecIcon =
  | "lock"
  | "building"
  | "fingerprint"
  | "key"
  | "file"
  | "shieldCheck"
  | "database"
  | "radar"
  | "globe"
  | "fileText"
  | "eraser"
  | "siren"
  | "timer";

type Card = { icon: SecIcon; title: string; body: string; tech?: string };

export type SecurityContent = {
  meta: { title: string; description: string };
  home: { name: string; path: string };
  navLabel: string;
  hero: {
    tag: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    facts: { value: string; label: string }[];
  };
  protect: { eyebrow: string; h2: string; lead: string; items: Card[] };
  audits: {
    eyebrow: string;
    h2: string;
    lead: string;
    items: (Card & { marker: string })[];
  };
  privacy: { eyebrow: string; h2: string; lead: string; items: Card[] };
  incident: { eyebrow: string; h2: string; lead: string; items: Card[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  disclosure: {
    h2: string;
    body: string;
    pgp: string;
    cta: string;
    dpa: string;
  };
};

export const SECURITY: Record<SecLang, SecurityContent> = {
  nb: {
    meta: {
      title: "Sikkerhet og personvern i AviSafe",
      description:
        "Slik beskytter AviSafe flylogger, hendelsesrapporter og personopplysninger: kryptering, adskilte kundedata, sikker innlogging, ekstern testing og lagring i EU/EØS.",
    },
    home: { name: "Forside", path: "/" },
    navLabel: "Sikkerhet",
    hero: {
      tag: "Sikkerhet og personvern",
      h1: "Dataene deres er trygge hos oss",
      lead: "AviSafe tar vare på flylogger, hendelsesrapporter, dokumenter og opplysninger om pilotene deres. Her forklarer vi hvordan vi beskytter dem, og hva vi har gjort for å sjekke at det virker.",
      ctaPrimary: "Be om databehandleravtale",
      ctaSecondary: "Meld fra om sårbarhet",
      facts: [
        { value: "Kryptert", label: "både lagret og under overføring" },
        { value: "EU/EØS", label: "datasentre i Tyskland og Irland" },
        { value: "0", label: "kritiske funn i ekstern penetrasjonstest" },
        { value: "72 t", label: "lengste tid før vi varsler ved brudd" },
      ],
    },
    protect: {
      eyebrow: "Beskyttelse",
      h2: "Slik beskytter vi dataene",
      lead: "Sikkerheten er bygget inn i selve plattformen, ikke lagt på i etterkant.",
      items: [
        {
          icon: "lock",
          title: "Kryptert hele veien",
          body: "Alt dere lagrer i AviSafe er kryptert, både i databasen og i fillageret. Trafikken mellom dere, appen, dronene og videostrømmene går over krypterte forbindelser.",
          tech: "AES-256 · TLS 1.3 · HTTPS, WSS og RTMPS · HSTS",
        },
        {
          icon: "fingerprint",
          title: "Sikker innlogging",
          body: "Logg inn med passkey (fingeravtrykk, ansikt eller sikkerhetsnøkkel), eller bruk tofaktor med en kodeapp. Økter som står ubrukt, logges ut etter 60 minutter, med varsel fem minutter før.",
          tech: "FIDO2/WebAuthn · TOTP",
        },
        {
          icon: "building",
          title: "Hvert selskap har sine egne data",
          body: "Dataene til hvert selskap er skilt fra alle andre i selve databasen. Ingen i et annet selskap, heller ikke en administrator, kan se eller endre dataene deres. Brukerroller styrer hva hver person har tilgang til, og morselskap og avdelinger ser bare det dere har gitt dem tilgang til.",
          tech: "Row Level Security på alle tabeller · rollebasert tilgang",
        },
        {
          icon: "key",
          title: "Koblinger til DJI og ECCAIRS",
          body: "Når dere kobler AviSafe til DJI FlightHub 2 eller ECCAIRS, lagres tilgangsnøklene kryptert i et eget hvelv. De ligger aldri i klartekst.",
          tech: "Feltkryptering med nøkler i et hvelv",
        },
        {
          icon: "file",
          title: "Filer deles med utløpsdato",
          body: "Bilder, loggfiler og vedlegg åpnes bare via midlertidige lenker som slutter å virke etter høyst én time. Avtaler og kontrakter ligger i et eget, lukket lagringsområde.",
          tech: "Signerte lenker, maks én time",
        },
      ],
    },
    audits: {
      eyebrow: "Testet og kontrollert",
      h2: "Vi stoler ikke bare på oss selv",
      lead: "Sikkerheten testes utenfra og gjennomgås jevnlig, og funn blir rettet.",
      items: [
        {
          marker: "Mai 2026",
          icon: "shieldCheck",
          title: "Ekstern penetrasjonstest",
          body: "Hele løsningen ble testet utenfra med Aikido Security, slik en angriper ville gått frem. Testen fant ingen kritiske sårbarheter. Alle de 15 funnene med høy eller middels alvorlighetsgrad er rettet, og rettingene er kontrollert i koden.",
        },
        {
          marker: "Okt 2026",
          icon: "database",
          title: "Gjennomgang av databasesikkerheten",
          body: "Vi gikk gjennom alle funksjonene i databasen som har utvidede rettigheter, strammet inn hvem som kan bruke dem, og bekreftet at ingen av dem kan brukes til å nå et annet selskaps data.",
        },
        {
          marker: "Løpende",
          icon: "radar",
          title: "Automatisk sårbarhetsskanning",
          body: "Koden, serverne og alle tredjepartsbiblioteker skannes automatisk for kjente sårbarheter, slik at vi kan rette dem raskt.",
        },
      ],
    },
    privacy: {
      eyebrow: "Personvern",
      h2: "Lagring og personvern",
      lead: "Dataene blir i Europa, og dere har kontroll på personopplysningene.",
      items: [
        {
          icon: "globe",
          title: "Lagret i EU/EØS",
          body: "Dataene ligger i datasentre i Tyskland og Irland, hos leverandører som er sertifisert etter anerkjente sikkerhetsstandarder.",
          tech: "ISO 27001 · ISO 27018 · SOC 2 Type II",
        },
        {
          icon: "fileText",
          title: "Databehandleravtale",
          body: "Alle bedriftskunder får en standard databehandleravtale som beskriver hvordan vi behandler personopplysninger på deres vegne.",
          tech: "GDPR artikkel 28",
        },
        {
          icon: "eraser",
          title: "Sletting som tar hensyn til flyhistorikken",
          body: "Når en bruker slettes, fjerner vi personopplysningene. Flyhistorikk som dere er pålagt å ta vare på, blir liggende, men uten navnet til personen.",
          tech: "Anonymisering ved sletting",
        },
      ],
    },
    incident: {
      eyebrow: "Beredskap",
      h2: "Hvis noe skulle skje",
      lead: "Vi har en plan, og dere får beskjed.",
      items: [
        {
          icon: "siren",
          title: "Fast beredskapsrutine",
          body: "Vi har en egen prosedyre for sikkerhetshendelser, med tydelige roller for hvem som gjør hva.",
        },
        {
          icon: "timer",
          title: "Varsling innen 72 timer",
          body: "Ved brudd på personopplysningssikkerheten varsler vi berørte kunder og Datatilsynet innen 72 timer, slik GDPR krever.",
          tech: "GDPR artikkel 33",
        },
      ],
    },
    faq: {
      h2: "Spørsmål og svar",
      items: [
        {
          q: "Hvor lagres dataene våre?",
          a: "I datasentre i Tyskland og Irland, innenfor EU/EØS. Leverandørene er sertifisert etter ISO 27001, ISO 27018 og SOC 2 Type II.",
        },
        {
          q: "Kan andre kunder se dataene våre?",
          a: "Nei. Hvert selskaps data er skilt fra alle andre i selve databasen, så en bruker i et annet selskap kan ikke se eller endre dem, heller ikke en administrator.",
        },
        {
          q: "Hvordan logger vi inn sikkert?",
          a: "Med passkey (fingeravtrykk, ansikt eller sikkerhetsnøkkel) eller med tofaktor via en kodeapp. Økter som står ubrukt, logges ut automatisk etter 60 minutter.",
        },
        {
          q: "Har AviSafe blitt testet av andre enn dere selv?",
          a: "Ja. En ekstern penetrasjonstest i mai 2026 fant ingen kritiske sårbarheter, og alle funn med høy eller middels alvorlighetsgrad er rettet. I tillegg skannes koden og tredjepartsbibliotekene automatisk.",
        },
        {
          q: "Får vi en databehandleravtale?",
          a: "Ja. Alle bedriftskunder får en standard databehandleravtale. Send en e-post til kontakt@avisafe.no, så sender vi den.",
        },
        {
          q: "Hva skjer hvis det oppstår et sikkerhetsbrudd?",
          a: "Vi følger en fast beredskapsrutine. Ved brudd på personopplysningssikkerheten varsler vi berørte kunder og Datatilsynet innen 72 timer.",
        },
      ],
    },
    disclosure: {
      h2: "Har du funnet en sårbarhet?",
      body: "Vi setter pris på at sikkerhetsforskere og kunder sier fra. Send oss en beskrivelse, så bekrefter vi at vi har mottatt den, følger opp og holder deg orientert. Vi går ikke rettslig til verks mot noen som tester i god tro og melder fra til oss.",
      pgp: "PGP-nøkkel sendes på forespørsel.",
      cta: "Meld fra om sårbarhet",
      dpa: "Be om databehandleravtale",
    },
  },
  en: {
    meta: {
      title: "Security and privacy in AviSafe",
      description:
        "How AviSafe protects flight logs, occurrence reports and personal data: encryption, separated customer data, secure sign-in, external testing and storage in the EU/EEA.",
    },
    home: { name: "Home", path: "/en" },
    navLabel: "Security",
    hero: {
      tag: "Security and privacy",
      h1: "Your data is safe with us",
      lead: "AviSafe stores your flight logs, occurrence reports, documents and information about your pilots. This page explains how we protect it, and what we have done to check that the protection works.",
      ctaPrimary: "Request a data processing agreement",
      ctaSecondary: "Report a vulnerability",
      facts: [
        { value: "Encrypted", label: "at rest and in transit" },
        { value: "EU/EEA", label: "data centres in Germany and Ireland" },
        { value: "0", label: "critical findings in external penetration test" },
        { value: "72 h", label: "longest time before we notify of a breach" },
      ],
    },
    protect: {
      eyebrow: "Protection",
      h2: "How we protect your data",
      lead: "Security is built into the platform itself, not added afterwards.",
      items: [
        {
          icon: "lock",
          title: "Encrypted all the way",
          body: "Everything you store in AviSafe is encrypted, in the database and in file storage. Traffic between you, the app, the drones and the video streams runs over encrypted connections.",
          tech: "AES-256 · TLS 1.3 · HTTPS, WSS and RTMPS · HSTS",
        },
        {
          icon: "fingerprint",
          title: "Secure sign-in",
          body: "Sign in with a passkey (fingerprint, face or security key), or use two-factor authentication with an authenticator app. Idle sessions are signed out after 60 minutes, with a warning five minutes before.",
          tech: "FIDO2/WebAuthn · TOTP",
        },
        {
          icon: "building",
          title: "Every company's data is kept separate",
          body: "Each company's data is separated from everyone else's in the database itself. Nobody in another company, not even an administrator, can see or change your data. User roles control what each person can access, and parent companies and departments only see what you have given them access to.",
          tech: "Row Level Security on every table · role-based access",
        },
        {
          icon: "key",
          title: "Connections to DJI and ECCAIRS",
          body: "When you connect AviSafe to DJI FlightHub 2 or ECCAIRS, the access keys are stored encrypted in a dedicated vault. They are never stored in plain text.",
          tech: "Field encryption with keys in a vault",
        },
        {
          icon: "file",
          title: "Files are shared with an expiry",
          body: "Images, log files and attachments are only opened through temporary links that stop working after one hour at most. Agreements and contracts are kept in a separate, closed storage area.",
          tech: "Signed links, max one hour",
        },
      ],
    },
    audits: {
      eyebrow: "Tested and checked",
      h2: "We don't just take our own word for it",
      lead: "Security is tested from the outside and reviewed regularly, and findings get fixed.",
      items: [
        {
          marker: "May 2026",
          icon: "shieldCheck",
          title: "External penetration test",
          body: "The whole solution was tested from the outside with Aikido Security, the way an attacker would approach it. The test found no critical vulnerabilities. All 15 high and medium findings have been fixed, and the fixes have been verified in the code.",
        },
        {
          marker: "Oct 2026",
          icon: "database",
          title: "Database security review",
          body: "We went through every database function that runs with elevated rights, tightened who can use them, and confirmed that none of them can be used to reach another company's data.",
        },
        {
          marker: "Ongoing",
          icon: "radar",
          title: "Automated vulnerability scanning",
          body: "The code, the servers and all third-party libraries are scanned automatically for known vulnerabilities, so we can fix them quickly.",
        },
      ],
    },
    privacy: {
      eyebrow: "Privacy",
      h2: "Storage and privacy",
      lead: "Your data stays in Europe, and you stay in control of personal data.",
      items: [
        {
          icon: "globe",
          title: "Stored in the EU/EEA",
          body: "Your data is kept in data centres in Germany and Ireland, with providers certified to recognised security standards.",
          tech: "ISO 27001 · ISO 27018 · SOC 2 Type II",
        },
        {
          icon: "fileText",
          title: "Data processing agreement",
          body: "Every business customer gets a standard data processing agreement that describes how we process personal data on your behalf.",
          tech: "GDPR Article 28",
        },
        {
          icon: "eraser",
          title: "Deletion that respects flight history",
          body: "When a user is deleted, we remove their personal data. Flight history you are required to keep stays in place, but without the person's name.",
          tech: "Anonymisation on deletion",
        },
      ],
    },
    incident: {
      eyebrow: "Incident response",
      h2: "If something should happen",
      lead: "We have a plan, and you will be told.",
      items: [
        {
          icon: "siren",
          title: "Set incident procedure",
          body: "We have a dedicated procedure for security incidents, with clear roles for who does what.",
        },
        {
          icon: "timer",
          title: "Notification within 72 hours",
          body: "If there is a personal data breach, we notify affected customers and the Norwegian Data Protection Authority within 72 hours, as GDPR requires.",
          tech: "GDPR Article 33",
        },
      ],
    },
    faq: {
      h2: "Questions and answers",
      items: [
        {
          q: "Where is our data stored?",
          a: "In data centres in Germany and Ireland, within the EU/EEA. The providers are certified to ISO 27001, ISO 27018 and SOC 2 Type II.",
        },
        {
          q: "Can other customers see our data?",
          a: "No. Each company's data is separated from everyone else's in the database itself, so a user in another company cannot see or change it, not even an administrator.",
        },
        {
          q: "How do we sign in securely?",
          a: "With a passkey (fingerprint, face or security key) or with two-factor authentication through an authenticator app. Idle sessions are signed out automatically after 60 minutes.",
        },
        {
          q: "Has AviSafe been tested by anyone other than you?",
          a: "Yes. An external penetration test in May 2026 found no critical vulnerabilities, and all high and medium findings have been fixed. The code and third-party libraries are also scanned automatically.",
        },
        {
          q: "Do we get a data processing agreement?",
          a: "Yes. Every business customer gets a standard data processing agreement. Email kontakt@avisafe.no and we will send it to you.",
        },
        {
          q: "What happens if there is a security breach?",
          a: "We follow a set incident procedure. If there is a personal data breach, we notify affected customers and the Norwegian Data Protection Authority within 72 hours.",
        },
      ],
    },
    disclosure: {
      h2: "Found a vulnerability?",
      body: "We appreciate it when security researchers and customers tell us. Send us a description and we will confirm that we have received it, follow up and keep you informed. We take no legal action against anyone who tests in good faith and reports to us.",
      pgp: "PGP key available on request.",
      cta: "Report a vulnerability",
      dpa: "Request a data processing agreement",
    },
  },
};
