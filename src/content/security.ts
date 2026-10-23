export type SecLang = "nb" | "en";
type Item = { icon: string; title: string; body: string };
type Section = { id: string; eyebrow: string; title: string; items: Item[]; timeline?: boolean };

export const SECURITY_EMAIL = "support@avisafe.no";

export const SECURITY: Record<SecLang, {
  title: string; description: string; h1: string; lead: string; badges: string[];
  sections: Section[];
  disclosure: { title: string; body: string; pgp: string; cta: string };
}> = {
  nb: {
    title: "IT-sikkerhet og databeskyttelse | AviSafe",
    description: "Slik beskytter AviSafe operativ luftfartsdata, organisasjonsdata og flylogger: kryptering, tenant-isolasjon, revisjoner, beredskap og GDPR.",
    h1: "IT-sikkerhet og databeskyttelse i AviSafe",
    lead: "Slik beskytter AviSafe operativ luftfartsdata, organisasjonsdata og flylogger i henhold til strenge europeiske luftfarts- og personvernstandarder.",
    badges: ["AES-256 kryptering i hvile", "TLS 1.3 i transitt", "100 % Row Level Security (RLS)", "Datasenter i EU/EØS (Frankfurt/Irland)", "0 kritiske sårbarheter i ekstern penetrasjonstest"],
    sections: [
      { id: "kryptering", eyebrow: "01", title: "Kryptering og dataarkitektur", items: [
        { icon: "HardDrive", title: "Data i hvile", body: "All database- og fillagring er kryptert på disknivå med AES-256 via AWS KMS / Supabase." },
        { icon: "KeyRound", title: "Feltkryptering av hemmeligheter", body: "Tredjepartstokener (DJI FlightHub 2 OpenAPI, ECCAIRS 2) lagres aldri i klartekst, men feltkrypteres i databasen med pgp_sym_encrypt og nøkler fra Supabase Vault." },
        { icon: "Lock", title: "Data i transitt", body: "All trafikk, API-kall og sanntidsstrømmer (WebSockets / MQTT / RTMP) tvinges over TLS 1.3 / HTTPS / WSS / RTMPS med HSTS." },
        { icon: "FileLock", title: "Fil- og dokumentsikkerhet", body: "Loggbilder og flyvedlegg hentes utelukkende via tidsbegrensede, signerte URL-er (maks 1 time levetid). Selskapsavtaler og kontrakter ligger i en isolert, privat bucket tilgjengelig kun for superadministratorer." },
      ]},
      { id: "tilgang", eyebrow: "02", title: "Tenant-isolasjon og tilgangskontroll (RBAC)", items: [
        { icon: "Database", title: "PostgreSQL Row Level Security", body: "All data er isolert på selskapsnivå på databasenivå. En bruker eller administrator i ett selskap kan aldri hente eller manipulere data tilhørende et annet selskap via API-et." },
        { icon: "Network", title: "Hierarkisk selskapstilgang", body: "Morselskaper og avdelinger styres med eksplisitte tilgangsfunksjoner (ingen rekursiv RLS)." },
        { icon: "Fingerprint", title: "Autentisering og passkeys", body: "Støtte for FIDO2/WebAuthn-passkeys og TOTP-tofaktorautentisering (MFA). Automatisk inaktivitetsutlogging etter 60 minutter med 5 minutters forhåndsvarsel." },
      ]},
      { id: "revisjoner", eyebrow: "03", title: "Gjennomførte revisjoner og penetrasjonstesting", timeline: true, items: [
        { icon: "ShieldCheck", title: "Ekstern penetrasjonstest – mai 2026", body: "Ekstern DAST-penetrasjonstest av hele stacken via Aikido Security. Rapporten konkluderte med 0 kritiske sårbarheter. Samtlige 7 høye og 8 medium funn (primært knyttet til Edge Function JWT-validering) ble lukket og kildekodeverifisert." },
        { icon: "SearchCheck", title: "Database- og SECURITY DEFINER-audit – oktober 2026", body: "Full revisjon av alle 39 interne databasefunksjoner (A/B1-revisjon). Fastlåst søkesti (search_path = public), eksplisitt tilbakekalling av kjøretillatelser fra offentlig/anonym tilgang, og garantert tenant-isolasjon." },
        { icon: "Radar", title: "Kontinuerlig overvåking", body: "Automatisert sårbarhetsskanning av kodebase, Docker-containere og avhengigheter (npm/bun CVE-database)." },
      ]},
      { id: "beredskap", eyebrow: "04", title: "Beredskapsplan og hendelseshåndtering", items: [
        { icon: "Users", title: "Beredskapsteam", body: "Etablert beredskapsprosedyre for sikkerhetshendelser med definerte roller." },
        { icon: "Timer", title: "72-timers varsling", body: "Ved brudd på personopplysningssikkerheten varsles berørte selskaper og Datatilsynet innen 72 timer, i tråd med GDPR artikkel 33." },
        { icon: "Plane", title: "Flysikkerhetshendelser", body: "Integrert flyt for rapportering av operative hendelser til Luftfartstilsynet via ECCAIRS 2 / NF-2007." },
      ]},
      { id: "gdpr", eyebrow: "05", title: "Geografi, hosting og GDPR", items: [
        { icon: "Globe", title: "Hosting", body: "Datasentre innenfor EU/EØS (Tyskland / Irland) hos leverandører med ISO 27001-, SOC 2 Type II- og ISO 27018-sertifiseringer." },
        { icon: "FileText", title: "Databehandleravtale (DPA)", body: "Standardisert DPA tilgjengelig for alle bedriftskunder." },
        { icon: "Eraser", title: "Rett til sletting og databevaring", body: "Ved brukersletting benyttes anonymisering/SET NULL for å ivareta lovpålagt flyoperativ historikk uten å lagre personopplysninger lenger enn nødvendig." },
      ]},
    ],
    disclosure: {
      title: "Ansvarlig offentliggjøring",
      body: "Er du sikkerhetsforsker eller kunde og har funnet en mulig sårbarhet? Meld fra til oss. Vi bekrefter mottak raskt, følger opp funnet og tar ikke rettslige skritt mot etiske testere som handler i god tro.",
      pgp: "PGP-nøkkel sendes på forespørsel.",
      cta: "Meld fra om sårbarhet",
    },
  },
  en: {
    title: "IT security and data protection | AviSafe",
    description: "How AviSafe protects operational aviation data, organisation data and flight logs: encryption, tenant isolation, audits, incident response and GDPR.",
    h1: "IT security and data protection in AviSafe",
    lead: "How AviSafe protects operational aviation data, organisation data and flight logs in line with strict European aviation and privacy standards.",
    badges: ["AES-256 encryption at rest", "TLS 1.3 in transit", "100% Row Level Security (RLS)", "EU/EEA data centres (Frankfurt/Ireland)", "0 critical vulnerabilities in external pentest"],
    sections: [
      { id: "encryption", eyebrow: "01", title: "Encryption and data architecture", items: [
        { icon: "HardDrive", title: "Data at rest", body: "All database and file storage is encrypted at disk level with AES-256 via AWS KMS / Supabase." },
        { icon: "KeyRound", title: "Field encryption of secrets", body: "Third-party tokens (DJI FlightHub 2 OpenAPI, ECCAIRS 2) are never stored in plain text; they are field-encrypted in the database with pgp_sym_encrypt and keys from Supabase Vault." },
        { icon: "Lock", title: "Data in transit", body: "All traffic, API calls and real-time streams (WebSockets / MQTT / RTMP) are forced over TLS 1.3 / HTTPS / WSS / RTMPS with HSTS." },
        { icon: "FileLock", title: "File and document security", body: "Log images and flight attachments are only served via time-limited signed URLs (max 1 hour lifetime). Company agreements and contracts are kept in an isolated private bucket accessible only to super administrators." },
      ]},
      { id: "access", eyebrow: "02", title: "Tenant isolation and access control (RBAC)", items: [
        { icon: "Database", title: "PostgreSQL Row Level Security", body: "All data is isolated per company at database level. A user or administrator in one company can never read or modify another company's data through the API." },
        { icon: "Network", title: "Hierarchical company access", body: "Parent companies and departments are governed by explicit access functions (no recursive RLS)." },
        { icon: "Fingerprint", title: "Authentication and passkeys", body: "Support for FIDO2/WebAuthn passkeys and TOTP two-factor authentication (MFA). Automatic sign-out after 60 minutes of inactivity with a 5-minute warning." },
      ]},
      { id: "audits", eyebrow: "03", title: "Completed audits and penetration testing", timeline: true, items: [
        { icon: "ShieldCheck", title: "External penetration test – May 2026", body: "External DAST penetration test of the full stack via Aikido Security. The report found 0 critical vulnerabilities. All 7 high and 8 medium findings (mainly related to Edge Function JWT validation) were closed and verified in source code." },
        { icon: "SearchCheck", title: "Database and SECURITY DEFINER audit – October 2026", body: "Full review of all 39 internal database functions (A/B1 audit). Pinned search path (search_path = public), explicit revocation of execute rights from public/anonymous access, and guaranteed tenant isolation." },
        { icon: "Radar", title: "Continuous monitoring", body: "Automated vulnerability scanning of the codebase, Docker containers and dependencies (npm/bun CVE database)." },
      ]},
      { id: "incident", eyebrow: "04", title: "Incident response", items: [
        { icon: "Users", title: "Response team", body: "Established incident procedure for security events with defined roles." },
        { icon: "Timer", title: "72-hour notification", body: "In case of a personal data breach, affected companies and the Norwegian Data Protection Authority are notified within 72 hours, in line with GDPR Article 33." },
        { icon: "Plane", title: "Flight safety occurrences", body: "Integrated flow for reporting operational occurrences to the Norwegian CAA via ECCAIRS 2 / NF-2007." },
      ]},
      { id: "gdpr", eyebrow: "05", title: "Geography, hosting and GDPR", items: [
        { icon: "Globe", title: "Hosting", body: "Data centres within the EU/EEA (Germany / Ireland) with providers holding ISO 27001, SOC 2 Type II and ISO 27018 certifications." },
        { icon: "FileText", title: "Data processing agreement (DPA)", body: "Standard DPA available to all business customers." },
        { icon: "Eraser", title: "Right to erasure and retention", body: "When a user is deleted, anonymisation/SET NULL preserves legally required flight operations history without keeping personal data longer than necessary." },
      ]},
    ],
    disclosure: {
      title: "Responsible disclosure",
      body: "Are you a security researcher or customer who has found a possible vulnerability? Let us know. We acknowledge reports quickly, follow up on every finding and take no legal action against ethical testers acting in good faith.",
      pgp: "PGP key available on request.",
      cta: "Report a vulnerability",
    },
  },
};
