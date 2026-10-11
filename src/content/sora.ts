/**
 * Copy for /sora. Based on "Slik fungerer AI-risikovurderingen" v2.0 and
 * "SORA-profiler i AviSafe" v1.0 (October 2026). Layout: src/pages/Sora.tsx.
 */

export type Actor = "pilot" | "system" | "ai";
export type Tone = "go" | "caution" | "nogo" | "info";

export const SORA_PAGE = {
  path: "/sora",
  meta: {
    title: "SORA-risikovurdering for droneoperasjoner | AviSafe",
    description:
      "AviSafe beregner iGRC, fGRC, ARC og SAIL etter SORA 2.5 med faste regler, vurderer oppdraget mot selskapets egen SORA-profil og gir GO, forsiktighet eller NO-GO.",
  },
  hero: {
    tag: "SORA 2.5 · Risikovurdering",
    h1: "Risikovurdering du kan etterprøve",
    lead: "Risikovurderingen samler oppdragets data, vær, luftrom, befolkning, mannskap og utstyr, og gir en anbefaling: GO, forsiktighet eller NO-GO. Faste regler bestemmer tallene og stoppene. AI-en skriver vurderingen.",
    ctaPrimary: "Book en demo",
    ctaSecondary: "Slik fungerer det",
    stats: [
      { value: "17", label: "datakilder" },
      { value: "ca. 30 s", label: "per vurdering" },
      { value: "SAIL I–VI", label: "SORA 2.5" },
    ],
  },
  result: {
    title: "Risikovurdering",
    mission: "Inspeksjon kraftlinje",
    missionMeta: "DJI M350 RTK · observatør · 42 m · < 5 pers/km²",
    recommendationLabel: "Anbefaling",
    recommendation: "GO",
    score: "7,8",
    scoreLabel: "Samlet poengsum",
    numbers: [
      { label: "iGRC", value: "3" },
      { label: "fGRC", value: "1" },
      { label: "ARC", value: "b" },
      { label: "SAIL", value: "II" },
    ],
    categories: [
      { label: "Vær", score: "8,0", tone: "go" as Tone },
      { label: "Luftrom", score: "7,5", tone: "go" as Tone },
      { label: "Utstyr", score: "8,5", tone: "go" as Tone },
      { label: "Pilot og kompetanse", score: "8,0", tone: "go" as Tone },
      { label: "Oppdragskompleksitet", score: "6,8", tone: "caution" as Tone },
    ],
    profileTitle: "SORA-profil: Innenfor rammene",
    profileBody:
      "M1(A) Low og M1(C) Low kreditert fra selskapets SORA. Ingen avvik.",
    systemNote: "Tallene er beregnet av systemet",
  },
  facts: {
    h2: "Kort fortalt",
    items: [
      {
        title: "Beslutningsstøtte",
        body: "Vurderingen erstatter ikke fartøysjefens ansvar. Den endelige beslutningen tas av ansvarlig pilot og godkjenner.",
      },
      {
        title: "Faste regler bestemmer",
        body: "Hard stop, SORA-tall (iGRC, fGRC, ARC, SAIL), inneslutning og godkjenning beregnes av systemet. AI-en kan ikke endre dem.",
      },
      {
        title: "AI-en forklarer",
        body: "AI-en gir poeng per kategori og skriver begrunnelser, bekymringer og tiltak ut fra de samme dataene.",
      },
      {
        title: "Forsiktig når data mangler",
        body: "Mangler vær, luftrom eller befolkning, sier rapporten det. Vurderingen velger da det sikre alternativet og godkjenner ikke automatisk.",
      },
    ],
  },
  flow: {
    h2: "Fra input til resultat",
    lead: "Seks steg – og det er tydelig hvem som gjør hva.",
    actors: { pilot: "Pilot", system: "System", ai: "AI" } as Record<
      Actor,
      string
    >,
    steps: [
      {
        actor: "pilot" as Actor,
        title: "Piloten fyller ut input",
        body: "Flyhøyde (fra ruteplanleggeren når den er satt), VLOS/BVLOS, nærhet til mennesker, antall bakkeobservatører, ATC-kontakt, kritisk infrastruktur og om vær skal vurderes.",
      },
      {
        actor: "system" as Actor,
        title: "Systemet henter datagrunnlaget",
        body: "Oppdrag, rute, personell med roller, droner, utstyr og vedlikehold hentes fra AviSafe. Vær, Kp-indeks, luftrom, arealbruk og befolkning hentes samtidig fra eksterne kilder.",
      },
      {
        actor: "system" as Actor,
        title: "Systemet tar de faste beslutningene",
        body: "Hard stop, operasjonskategori (åpen eller specific), iGRC/fGRC, AEC/ARC, SAIL, ALOS, inneslutning, utstyrsstatus og tåkevarsel beregnes før AI-en kalles.",
      },
      {
        actor: "ai" as Actor,
        title: "AI-en vurderer og skriver",
        body: "AI-en får dataene og systembeslutningene som fasit. Den gir poeng (1–10) for fem kategorier og skriver oversikt, begrunnelser, bekymringer og tiltak.",
      },
      {
        actor: "system" as Actor,
        title: "Systemet kontrollerer svaret",
        body: "Systemverdiene skrives inn igjen. Kategorier med hard stop får NO-GO og maks 3,0. Oppsummeringen får en fast første setning med anbefalingen.",
      },
      {
        actor: "system" as Actor,
        title: "Resultat og godkjenning",
        body: "Vurderingen lagres på oppdraget. Bruker selskapet automatisk godkjenning, avgjør godkjenningsreglene om statusen endres.",
      },
    ],
  },
  split: {
    h2: "Hva bestemmer systemet, og hva gjør AI-en?",
    system: {
      title: "Faste regler",
      sub: "Samme input gir alltid samme resultat",
      items: [
        "Hard stop",
        "Åpen eller specific kategori",
        "iGRC, mitigeringer og fGRC",
        "AEC, ARC og SAIL",
        "Inneslutning og ALOS",
        "Utstyrs- og vedlikeholdsstatus",
        "Anbefaling (GO / forsiktighet / NO-GO)",
        "Godkjenningsstatus",
      ],
    },
    ai: {
      title: "Vurdering og tekst",
      sub: "Språkmodell som forklarer",
      items: [
        "Poeng per kategori (1–10)",
        "Oppdragsoversikt og oppsummering",
        "Faktorer, bekymringer og anbefalte tiltak",
        "Beskrivende tekst i SORA-revurderingen (ConOps, mitigeringer)",
      ],
      note: "AI-en kan ikke opprette, fjerne eller endre hard stop, SORA-tall eller godkjenning. Den kan heller ikke sette en kategori til NO-GO uten at systemet har en hard stop for den.",
    },
  },
  profiles: {
    tag: "Nytt",
    h2: "Selskapets egen SORA i hver vurdering",
    lead: "Med SORA-profiler leser AviSafe selskapets SORA-dokument og lager en profil med rammer, droner, GRC/ARC, reduksjoner, SAIL og inneslutning. Hver risikovurdering sjekker oppdraget mot rammene – uten at piloten må velge noe.",
    chain: [
      "SORA-dokument",
      "SORA-profil",
      "Oppdragstype",
      "Oppdrag",
      "Risikovurdering",
      "Resultat",
    ],
    setup: {
      title: "Oppsett – gjøres én gang av administrator",
      steps: [
        {
          title: "Last opp dokumentet",
          body: "Legg SORA-en (PDF) i dokumentregisteret.",
        },
        {
          title: "Opprett SORA-profil",
          body: "Velg dokumentet. Profilen knyttes til dette dokumentet.",
        },
        {
          title: "Les SORA med AI",
          body: "Fyller ut rammer, droner, GRC/ARC, reduksjoner, SAIL og inneslutning – med sidetall. Kan også fylles ut manuelt. iGRC, fGRC, SAIL og TMPR konsistenssjekkes automatisk.",
        },
        {
          title: "Kontroller og bekreft",
          body: "Sjekk verdiene mot PDF-en, koble hver drone i SORA-en til droner i registeret og bekreft profilen. Kun bekreftet profil brukes.",
        },
      ],
    },
    use: {
      title: "Bruk – i det daglige",
      steps: [
        {
          title: "Knytt til oppdragstype",
          body: "Velg dokumentet på oppdragstypen og merk det som SORA.",
        },
        {
          title: "Velg oppdragstype",
          body: "Oppdraget arver SORA-dokumentet fra oppdragstypen automatisk. Kan overstyres per oppdrag.",
        },
        {
          title: "Kjør risikovurdering",
          body: "Systemet finner SORA-profilen og sjekker oppdraget mot rammene.",
        },
        {
          title: "Les resultatet",
          body: "Boksen «SORA-profil» viser brukte reduksjoner, avvik og merknader. Tallene er systemberegnet – AI-en kan ikke endre dem.",
        },
      ],
    },
    outcomes: [
      {
        tone: "go" as Tone,
        title: "Innenfor SORA-rammene",
        items: [
          "SORA-ens reduksjoner krediteres, f.eks. M1(A) og M1(C)",
          "Dronemål fra SORA-en brukes når de er større enn katalogens",
          "M1(C) kun med observatør, hvis profilen krever det",
          "Automatisk godkjenning som normalt",
        ],
      },
      {
        tone: "caution" as Tone,
        title: "Utenfor rammene",
        items: [
          "Avvik vises som anbefalinger: drone ikke dekket, høyde, befolkningstetthet, avstand, VLOS/BVLOS, fGRC/SAIL/ARC over SORA",
          "Ingen reduksjoner fra profilen",
          "Automatisk godkjenning stoppes – send til godkjenning manuelt",
          "Aldri hard stop eller NO-GO alene",
        ],
      },
      {
        tone: "info" as Tone,
        title: "Ikke bekreftet eller utdatert",
        items: [
          "Profilen brukes ikke i beregningene",
          "Dokumentet brukes kun som SORA-referanse",
          "Merknad: «verdiene er ikke brukt»",
          "Bekreft profilen for å aktivere den",
        ],
      },
    ],
    example: {
      title: "Eksempel – innenfor rammene",
      head: ["Oppdrag", "DJI M350 RTK, observatør, 42 m, < 5 pers/km²"],
      rows: [
        ["Dimensjon (SORA-profil, katalog 0,90 m)", "1,43 m"],
        ["iGRC (kolonne 3 m, < 5 pers/km²)", "3"],
        ["M1(A) Low fra SORA · M1(C) Low fra SORA", "−1 · −1"],
        ["fGRC (gulv 1)", "1"],
        ["ARC-b → SAIL", "II"],
        ["SORA-avvik", "Ingen"],
      ],
    },
    notes: {
      title: "Viktig å vite",
      items: [
        "Drone-dekning avgjøres kun av koblingen i profilen – ikke av modellnavn.",
        "Avdelinger bruker morselskapets profil når dokumentet er delt med dem.",
        "Risikovurderingen setter aldri «Venter» – kun manuell innsending gjør det. Godkjente oppdrag endres aldri.",
        "Hard stop (f.eks. forfalt vedlikehold) gjelder uavhengig av SORA.",
        "En SORA-profil er et hjelpemiddel og erstatter ikke driftstillatelsen.",
      ],
    },
  },
  scoring: {
    h2: "Slik leser du resultatet",
    lead: "Høy poengsum betyr lav risiko. Anbefalingen følger poengsummen, med mindre det er hard stop.",
    head: ["Samlet poengsum", "Anbefaling", "Betydning"],
    rows: [
      {
        range: "7,0 – 10",
        label: "GO",
        tone: "go" as Tone,
        body: "Akseptabel risiko med normale forholdsregler.",
      },
      {
        range: "5,0 – 6,9",
        label: "Forsiktighet",
        tone: "caution" as Tone,
        body: "Forhøyet risiko. Konkrete tiltak bør gjennomføres.",
      },
      {
        range: "Under 5,0",
        label: "NO-GO",
        tone: "nogo" as Tone,
        body: "Ikke anbefalt uten vesentlige endringer.",
      },
      {
        range: "Hard stop",
        label: "NO-GO",
        tone: "nogo" as Tone,
        body: "Alltid NO-GO. Samlet poengsum maks 4,9 og berørt kategori maks 3,0.",
      },
    ],
    categories:
      "De fem kategoriene er vær, luftrom, utstyr, pilot og kompetanse og oppdragskompleksitet. Hver kategori står som GO, BETINGET, NO-GO eller IKKE VURDERT.",
  },
  hardStops: {
    h2: "Hard stop",
    lead: "En hard stop betyr at et absolutt krav er brutt. Ingen andre forhold kan veie opp for det – heller ikke en erfaren pilot eller gode prosedyrer. Grensene settes i selskapets SORA-innstillinger.",
    head: ["Hard stop", "Utløses når", "Standard"],
    rows: [
      ["Vind", "Middelvind over selskapets grense", "10 m/s"],
      ["Vindkast", "Vindkast over selskapets grense", "15 m/s"],
      ["Temperatur", "Under minimum eller over maksimum", "−10 / +40 °C"],
      [
        "Utstyr",
        "Primærdronen eller utstyr valgt på oppdraget har rød status",
        "Alltid",
      ],
      [
        "Reservebatteri",
        "Selskapet krever det, og færre enn 2 batterier er talt",
        "Av",
      ],
      ["Pilot mangler", "Ingen med pilotrolle er satt på oppdraget", "Alltid"],
      [
        "Kompetanse",
        "Piloten mangler påkrevd kompetansebevis for dronen og operasjonen",
        "Alltid",
      ],
      [
        "Pilotinaktivitet",
        "Siste flyging er eldre enn selskapets grense",
        "Av",
      ],
      ["Flyhøyde", "Høyden er over selskapets maksimale høyde", "Av"],
      ["BVLOS", "Oppdraget er BVLOS, og selskapet tillater ikke BVLOS", "Av"],
      [
        "Natt / sivil skumring",
        "Start eller slutt ligger utenfor sivil skumring",
        "Av",
      ],
      ["Befolkningstetthet", "Tettheten er over selskapets maksimum", "Av"],
      [
        "Observatør",
        "Selskapet krever observatør, og ingen er satt på oppdraget",
        "Av",
      ],
    ],
    note: "Sikt og luftrom gir aldri hard stop. Tåke gir et varsel om å kontrollere sikt mot selskapets grense, og luftromssoner gir varsel og krav til Ninox eller PPR der det gjelder.",
  },
  approval: {
    h2: "Automatisk godkjenning",
    lead: "Automatisk godkjenning er en selskapsinnstilling med egen poengterskel. En vurdering kan sette et oppdrag til godkjent – men aldri trekke tilbake en godkjenning eller avvise et oppdrag som venter.",
    allOkTitle: "Godkjenner bare når alt er i orden:",
    allOk: [
      "Samlet poengsum er lik eller over terskelen",
      "Ingen hard stop og ingen NO-GO, verken i en kategori eller samlet",
      "Vær er vurdert, og vær, luftrom og befolkning kunne hentes",
      "Vurderingen ble lagret",
      "Den som kjører vurderingen har opprettet oppdraget, er admin eller operativ leder, eller er satt på oppdraget",
    ],
    note: "Godkjenneren kan fortsatt godkjenne et oppdrag med hard stop manuelt, for eksempel når pilotens egne målinger viser lavere vind enn varslet. Begrunnelsen skrives da i godkjenningen.",
  },
  sources: {
    h2: "Datagrunnlag",
    head: ["Kilde", "Brukes til", "Hvis kilden ikke svarer"],
    rows: [
      [
        "MET Norway Locationforecast 2.0",
        "Vind, vindkast, temperatur, nedbør, duggpunkt og tåkeandel på oppdragstidspunktet",
        "Vær blir «IKKE VURDERT». Ingen automatisk godkjenning.",
      ],
      [
        "NOAA SWPC",
        "Kp-indeks for geomagnetisk aktivitet (GNSS/kompass)",
        "Rapporten ber om manuell sjekk.",
      ],
      [
        "Nasjonale UAS-geosoner (for Norge: dronesoner.no)",
        "CTR/TIZ, 5 km-soner, restriksjons- og fareområder langs ruten, fra de offisielt publiserte sonene der de finnes",
        "«Må sjekkes manuelt». Luftrom blir minst BETINGET.",
      ],
      [
        "NOTAM",
        "Aktive NOTAM for området og tidspunktet",
        "Sjekk NOTAM manuelt.",
      ],
      [
        "SSB befolkning 250 m-rutenett (Norge), Eurostat 1 km (utlandet)",
        "Høyeste tetthet i fotavtrykket: flygeografi, contingency og bakkerisikobuffer",
        "Tettheten regnes som ukjent, og et høyt befolkningsbånd brukes.",
      ],
      [
        "Geonorge / SSB arealbruk",
        "Bebyggelse og arealtyper i området",
        "Vurderes uten arealdata.",
      ],
      [
        "AviSafe",
        "Oppdrag, rute, personell og roller, kompetanse, flylogger, droner, utstyr, vedlikehold, dronekatalog og selskapets SORA-innstillinger",
        "Vedlikeholdsstatus som ikke kan hentes, blir «Ukjent» (gul), ikke grønn.",
      ],
    ],
  },
  method: {
    h2: "Metoden – for SMS og revisjon",
    lead: "Systemet avgjør først om operasjonen er i åpen eller specific kategori. SORA-tall beregnes etter JARUS SORA 2.5 og vises i begge tilfeller. Inneslutning kreves bare i specific-kategorien.",
    specificTitle: "Specific-kategori når",
    specific: [
      "BVLOS",
      "Flyhøyde over 120 m",
      "Droneklasse C5 eller C6, eller drone uten klassemerke over 25 kg",
      "Selskapet krever SORA på oppdrag",
      "SORA-dokument er valgt på oppdraget",
    ],
    grc: {
      title: "Bakkerisiko (iGRC og fGRC)",
      body: "iGRC slås opp i SORA 2.5-tabellen. Kolonnen er den strengeste av dronens karakteristiske dimensjon og maksfart. Raden er høyeste befolkningstetthet i fotavtrykket.",
      head: [
        "Tetthet (pers/km²)",
        "≤ 1 m / ≤ 25 m/s",
        "≤ 3 m / ≤ 35 m/s",
        "≤ 8 m / ≤ 75 m/s",
        "≤ 20 m / ≤ 120 m/s",
        "≤ 40 m / ≤ 200 m/s",
      ],
      rows: [
        ["Kontrollert bakkeområde", "1", "1", "2", "3", "3"],
        ["< 5", "2", "3", "4", "5", "6"],
        ["< 50", "3", "4", "5", "6", "7"],
        ["< 500", "4", "5", "6", "7", "8"],
        ["< 5 000", "5", "6", "7", "8", "9"],
        ["< 50 000", "6", "7", "8", "9", "10"],
        ["≥ 50 000", "7", "8", "–", "–", "–"],
      ],
      mitigationHead: ["Mitigering", "Reduksjon", "Krediteres"],
      mitigations: [
        [
          "M1(A) Skjerming",
          "Lav −1, middels −2",
          "Manuelt eller fra SORA-profilen",
        ],
        [
          "M1(B) Operative begrensninger",
          "Middels −1, høy −2",
          "Manuelt eller fra SORA-profilen",
        ],
        [
          "M1(C) Bakkeobservasjon",
          "Lav −1",
          "Automatisk når en observatør er satt på oppdraget",
        ],
        [
          "M2 Redusert treffenergi",
          "Middels −1, høy −2",
          "Bare manuelt, med dokumentert MoC/DVR",
        ],
      ],
      footnote:
        "fGRC = iGRC + reduksjoner, men aldri lavere enn verdien for kontrollert bakkeområde i samme kolonne. fGRC over 7 gir sertifisert kategori og ingen SAIL.",
    },
    sail: {
      title: "Luftrisiko, SAIL og ALOS",
      body: "AEC bestemmes av høyde, luftrom (kontrollert luftrom, 5 km-sone rundt flyplass) og om området er urbant. AEC gir initiell ARC. Residual ARC er lik initiell ARC, med mindre piloten dokumenterer en reduksjon eller erklærer atypisk eller segregert luftrom.",
      head: ["fGRC", "ARC-a", "ARC-b", "ARC-c", "ARC-d"],
      rows: [
        ["≤ 2", "I", "II", "IV", "VI"],
        ["3", "II", "II", "IV", "VI"],
        ["4", "III", "III", "IV", "VI"],
        ["5", "IV", "IV", "IV", "VI"],
        ["6", "V", "V", "V", "VI"],
        ["7", "VI", "VI", "VI", "VI"],
      ],
      alos: "ALOS (største avstand for visuell kontakt) beregnes fra karakteristisk dimensjon (CD): multirotor 327 × CD + 20 m, fastvinge 490 × CD + 30 m.",
    },
    containment: {
      title: "Inneslutning (SORA 2.5 steg 8)",
      body: "Inneslutning bruker Luftfartstilsynets SORA 2.5-matrise, med tilstøtende område beregnet i kartet. Mangler beregningen, står kravet som «Ikke beregnet» i en gul boks – systemet utleder aldri kravet fra SAIL alene.",
    },
    revision: {
      title: "SORA-revurdering",
      body: "Lager en oppdragsspesifikk SORA-analyse ut fra siste vurdering og pilotens kommentarer per kategori. fGRC, ARC og SAIL beregnes av systemet, også når piloten har endret mitigeringer manuelt. AI-en skriver ConOps, beskrivelse av mitigeringer, OSO-oversikt og restrisiko. Den er ikke en myndighetsgodkjent SORA eller driftstillatelse.",
    },
  },
  limits: {
    h2: "Ansvar og begrensninger",
    items: [
      "Vurderingen bygger på dataene som var tilgjengelige da den ble kjørt. Endres vær, rute, mannskap eller utstyr, bør den kjøres på nytt.",
      "Piloten må selv kontrollere sikt mot selskapets grense, lokale forhold og NOTAM før flyging.",
      "Kreditering av M1(C) og andre mitigeringer forutsetter at de er beskrevet i selskapets driftshåndbok og prosedyrer.",
      "Vurderingen er beslutningsstøtte og en del av operatørens SMS. Ved regulatorisk tvil gjelder operatørens godkjente prosedyrer, Luftfartstilsynets krav og EASA-regelverket.",
    ],
    sources:
      "Kilder: JARUS SORA 2.5 · Luftfartstilsynets SORA 2.5-kalkulator · (EU) 2019/947 og (EU) 2019/945 · dronesoner.no · MET Norway · NOAA SWPC · SSB · Geonorge · Eurostat",
  },
  cta: {
    h2: "Se risikovurderingen på deres egne oppdrag",
    body: "Book en demo, så viser vi hvordan SORA-profilen og risikovurderingen fungerer med selskapets egen SORA.",
    button: "Book en demo",
    related: "Les også om Compliance-modulen",
  },
};
