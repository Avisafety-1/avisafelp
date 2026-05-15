import {
  Database,
  Globe,
  Shield,
  User,
  Brain,
  MessageSquare,
  Zap,
  ChevronDown,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Clock,
  Activity,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import avisafeLogoText from "@/assets/avisafe-logo-text.png";

const C = {
  bg: "hsl(210 30% 6%)",
  bgCard: "hsl(210 30% 10%)",
  bgCardAlt: "hsl(210 30% 13%)",
  primary: "hsl(210 80% 28%)",
  primaryLight: "hsl(210 80% 50%)",
  primaryDim: "hsl(210 50% 15%)",
  green: "hsl(142 71% 45%)",
  greenDim: "hsl(142 50% 10%)",
  greenMid: "hsl(142 60% 18%)",
  yellow: "hsl(38 92% 50%)",
  yellowDim: "hsl(38 60% 10%)",
  yellowMid: "hsl(38 70% 18%)",
  red: "hsl(0 84% 60%)",
  redDim: "hsl(0 60% 10%)",
  redMid: "hsl(0 70% 18%)",
  purple: "hsl(258 80% 65%)",
  purpleDim: "hsl(258 50% 10%)",
  purpleMid: "hsl(258 60% 18%)",
  text: "hsl(210 20% 96%)",
  textMuted: "hsl(215 20% 60%)",
  textDim: "hsl(215 15% 40%)",
  border: "hsl(210 30% 18%)",
  borderPrimary: "hsl(210 50% 25%)",
};

const FlowConnector = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center py-1" style={{ gap: 0 }}>
    <div className="w-px h-7" style={{ background: `linear-gradient(to bottom, ${C.border}, ${C.primaryLight}60)` }} />
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ background: C.primaryDim, borderColor: C.borderPrimary, color: C.primaryLight }}
    >
      <ChevronDown size={10} />
      {label}
    </div>
    <div className="w-px h-7" style={{ background: `linear-gradient(to bottom, ${C.primaryLight}60, ${C.border})` }} />
  </div>
);

interface ProsePhaseCardProps {
  phase: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  dimColor: string;
  midColor: string;
  prose: string;
  glow?: boolean;
}

const ProsePhaseCard = ({
  phase,
  icon,
  title,
  subtitle,
  accentColor,
  dimColor,
  midColor,
  prose,
  glow,
}: ProsePhaseCardProps) => (
  <div
    className="relative rounded-2xl border w-full overflow-hidden"
    style={{
      background: `linear-gradient(145deg, ${C.bgCard} 0%, ${dimColor} 100%)`,
      borderColor: `${accentColor}40`,
      boxShadow: glow
        ? `0 0 50px ${accentColor}25, 0 0 100px ${accentColor}10, inset 0 1px 0 ${accentColor}20`
        : `0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 ${accentColor}10`,
    }}
  >
    {glow && (
      <div
        className="absolute inset-0 pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${accentColor}20, transparent 60%)`,
          opacity: 0.6,
        }}
      />
    )}
    <div className="relative p-6">
      <div className="flex items-start gap-4 mb-5">
        <div
          className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
          style={{ background: midColor, border: `1px solid ${accentColor}50` }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
              style={{ background: midColor, color: accentColor }}
            >
              Fase {phase}
            </span>
          </div>
          <h2 className="font-bold text-lg leading-tight" style={{ color: C.text }}>
            {title}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: C.textMuted }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div
        className="rounded-xl p-4 border"
        style={{ background: `${accentColor}08`, borderColor: `${accentColor}18` }}
      >
        <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
          {prose}
        </p>
      </div>
    </div>
  </div>
);

export default function Sora() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: C.bg, color: C.text, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${C.primaryLight} 1px, transparent 1px), linear-gradient(90deg, ${C.primaryLight} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Top glow */}
      <div
        className="fixed inset-x-0 top-0 h-64 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${C.primary}, transparent 70%)` }}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-16">

        {/* ── HERO ── */}
        <div className="text-center mb-20">
          <img
            src={avisafeLogoText}
            alt="AviSafe logo"
            className="h-12 mx-auto mb-8"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border"
            style={{ background: C.primaryDim, borderColor: C.borderPrimary, color: C.primaryLight }}
          >
            <Activity size={12} />
            EASA SORA · AI-drevet · Specific-kategori
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4"
            style={{ color: C.text }}
          >
            Intelligent SORA
            <br />
            <span className="text-3xl sm:text-4xl" style={{ color: C.primaryLight }}>
              fra data til beslutning
            </span>
          </h1>

          <p className="text-lg mb-2" style={{ color: C.textMuted }}>
            Automatisert risikovurdering etter EASA SORA-metodikken
          </p>
          <p className="text-sm font-semibold tracking-wide" style={{ color: C.primaryLight }}>
            Norges mest avanserte droneoperasjonsplattform
          </p>

          {/* Stats bar */}
          <div
            className="flex flex-wrap justify-center gap-px mt-12 rounded-2xl overflow-hidden border"
            style={{ borderColor: C.border }}
          >
            {[
              { value: "7", label: "Prosessfaser" },
              { value: "AI-drevet", label: "Analyse" },
              { value: "SAIL I–VI", label: "SORA-dekning" },
              { value: "< 60s", label: "Svartid" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex-1 min-w-[100px] py-4 px-6 text-center"
                style={{ background: i % 2 === 0 ? C.bgCard : C.bgCardAlt }}
              >
                <div className="text-2xl font-black" style={{ color: C.primaryLight }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: C.textDim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FLOW DIAGRAM ── */}
        <div className="space-y-0">

          <ProsePhaseCard
            phase={1}
            icon={<Database size={20} />}
            title="Oppdragsgrunnlag"
            subtitle="Automatisk innsamling av oppdragsdata"
            accentColor={C.primaryLight}
            dimColor={C.primaryDim}
            midColor="hsl(210 50% 20%)"
            prose="AviSafe samler automatisk alle relevante data om oppdraget — lokasjon, mannskap, utstyr og tidspunkt — slik at analysen alltid baseres på et komplett og oppdatert grunnlag uten manuelt arbeid fra pilotens side."
          />

          <FlowConnector label="Oppdragsdata" />

          <ProsePhaseCard
            phase={2}
            icon={<Globe size={20} />}
            title="Miljø og luftrom"
            subtitle="Oppdatert situasjonsbilde fra offentlige datakilder"
            accentColor={C.green}
            dimColor={C.greenDim}
            midColor={C.greenMid}
            prose="Systemet henter automatisk oppdatert informasjon om værforhold og luftromssituasjonen fra offentlige datakilder. Piloten får et komplett situasjonsbilde uten å måtte lete opp informasjonen manuelt, og analysen bygger alltid på ferske data."
          />

          <FlowConnector label="Situasjonsbilde" />

          <ProsePhaseCard
            phase={3}
            icon={<Shield size={20} />}
            title="Selskapets rammer"
            subtitle="Operatørens sikkerhetskrav legges alltid til grunn"
            accentColor={C.red}
            dimColor={C.redDim}
            midColor={C.redMid}
            prose="Operatørens egne sikkerhetskrav og begrensninger er bygget inn i systemet og legges alltid til grunn for vurderingen. Disse rammene kan aldri overstyres av piloten eller AI-en — de sikrer at selskapet alltid opererer innenfor egne krav, uavhengig av oppdrag."
          />

          <FlowConnector label="Selskapspolicyer" />

          <ProsePhaseCard
            phase={4}
            icon={<User size={20} />}
            title="Pilotens vurdering"
            subtitle="Operative forhold og parametere for det konkrete oppdraget"
            accentColor={C.yellow}
            dimColor={C.yellowDim}
            midColor={C.yellowMid}
            prose="Piloten beskriver de operative forholdene og de spesifikke parameterne for det aktuelle oppdraget. Dette gir AI-systemet den operative konteksten det trenger for å gjøre en presis risikovurdering — og setter piloten i sentrum av prosessen."
          />

          <FlowConnector label="Operasjonsparametre" />

          <ProsePhaseCard
            phase={5}
            icon={<Brain size={20} />}
            title="Første AI-analyse"
            subtitle="Kunstig intelligens identifiserer risikoområder"
            accentColor={C.purple}
            dimColor={C.purpleDim}
            midColor={C.purpleMid}
            glow
            prose="En kunstig intelligens gjennomgår alle innsamlede data simultant og identifiserer risikoområder på tvers av vær, luftrom, utstyr og mannskap. Analysen er objektiv, konsistent og tar hensyn til alle relevante faktorer på én gang — noe som er umulig å gjøre manuelt med samme presisjon."
          />

          <FlowConnector label="Risikovurdering" />

          <ProsePhaseCard
            phase={6}
            icon={<MessageSquare size={20} />}
            title="Tiltak og mitigeringer"
            subtitle="Piloten responderer med konkrete sikkerhetstiltak"
            accentColor={C.yellow}
            dimColor={C.yellowDim}
            midColor={C.yellowMid}
            prose="Basert på AI-analysen responderer piloten med konkrete sikkerhetstiltak for hvert identifisert risikoområde. Denne dialogen mellom pilot og AI sikrer at alle risikoer adresseres med reelle operative tiltak, og at piloten har et bevisst forhold til risikobildet."
          />

          <FlowConnector label="Mitigeringer" />

          <ProsePhaseCard
            phase={7}
            icon={<Zap size={20} />}
            title="SORA-beregning"
            subtitle="Fullstendig SORA-analyse etter EASA-metodikken"
            accentColor={C.purple}
            dimColor={C.purpleDim}
            midColor={C.purpleMid}
            glow
            prose="AI gjennomfører en fullstendig SORA-beregning etter EASA-metodikken med alle mitigeringer lagt til grunn. Resultatet er en strukturert, dokumenterbar risikovurdering med klare verdier for bakke- og luftromsrisiko, SAIL-nivå og en tydelig GO / NO GO anbefaling."
          />

          <FlowConnector label="SORA-analyse" />

          {/* ── SORA OUTPUT ── */}
          <div
            className="relative rounded-2xl border overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${C.bgCard} 0%, ${C.greenDim} 100%)`,
              borderColor: `${C.green}50`,
              boxShadow: `0 0 60px ${C.green}20, 0 0 120px ${C.green}08`,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none animate-pulse"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${C.green}18, transparent 60%)`,
                opacity: 0.7,
              }}
            />
            <div className="relative p-6">
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-3 border"
                  style={{ background: C.greenMid, borderColor: `${C.green}50`, color: C.green }}
                >
                  <CheckCircle2 size={14} />
                  SORA OUTPUT
                </div>
                <h2 className="text-2xl font-black" style={{ color: C.text }}>
                  Strukturert risikovurdering
                </h2>
                <p className="text-sm mt-1" style={{ color: C.textMuted }}>
                  Komplett SORA-rapport etter EASA SORA-metodikken
                </p>
              </div>

              {/* GRC row */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.textDim }}>
                  Bakkerisikoklasse (GRC)
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 rounded-xl p-4 text-center border"
                    style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.yellowDim})`, borderColor: `${C.yellow}40` }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>iGRC</div>
                    <div className="text-3xl font-black" style={{ color: C.yellow }}>3</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>Initial</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={18} style={{ color: C.textDim }} />
                    <span className="text-xs text-center" style={{ color: C.textDim, maxWidth: 56 }}>Bakke­mitigeringer</span>
                  </div>
                  <div
                    className="flex-1 rounded-xl p-4 text-center border"
                    style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.greenDim})`, borderColor: `${C.green}40` }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>fGRC</div>
                    <div className="text-3xl font-black" style={{ color: C.green }}>2</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>Final</div>
                  </div>
                </div>
              </div>

              {/* ARC row */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.textDim }}>
                  Luftromsrisikoklasse (ARC)
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 rounded-xl p-4 text-center border"
                    style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.yellowDim})`, borderColor: `${C.yellow}40` }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>Initial ARC</div>
                    <div className="text-3xl font-black" style={{ color: C.yellow }}>B</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>Ukontrollert luftrom</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={18} style={{ color: C.textDim }} />
                    <span className="text-xs text-center" style={{ color: C.textDim, maxWidth: 56 }}>Luftroms­mitigeringer</span>
                  </div>
                  <div
                    className="flex-1 rounded-xl p-4 text-center border"
                    style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.greenDim})`, borderColor: `${C.green}40` }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>Residual ARC</div>
                    <div className="text-3xl font-black" style={{ color: C.green }}>A</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>Etter mitigeringer</div>
                  </div>
                </div>
              </div>

              {/* SAIL + Rest-risiko + OSO */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "SAIL-nivå", value: "II", sub: "Skala I–VI", color: C.primaryLight, dim: C.primaryDim },
                  { label: "Rest-risiko", value: "Lav", sub: "Etter mitigeringer", color: C.green, dim: C.greenDim },
                  { label: "OSO-krav", value: "M", sub: "Medium robusthet", color: C.purple, dim: C.purpleDim },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl p-4 text-center border"
                    style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${m.dim})`, borderColor: `${m.color}35` }}
                  >
                    <div className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: C.textMuted }}>{m.label}</div>
                    <div className="text-2xl sm:text-3xl font-black" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* GO badge */}
              <div
                className="rounded-xl p-5 text-center border"
                style={{
                  background: `linear-gradient(135deg, ${C.greenMid}, ${C.greenDim})`,
                  borderColor: `${C.green}60`,
                  boxShadow: `0 0 30px ${C.green}25`,
                }}
              >
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: C.textMuted }}>
                  AI-anbefaling
                </div>
                <div className="text-5xl font-black tracking-widest mb-2" style={{ color: C.green }}>
                  GO
                </div>
                <p className="text-sm" style={{ color: C.textMuted }}>
                  Alle sikkerhetskrav bestått · Tiltak vurdert tilstrekkelige · SAIL II godkjent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURE HIGHLIGHTS ── */}
        <div className="mt-24 mb-16">
          <h2 className="text-3xl font-black text-center mb-12" style={{ color: C.text }}>
            Hvorfor AviSafe SORA?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                color: C.primaryLight,
                dimColor: C.primaryDim,
                icon: <Cpu size={26} />,
                title: "Automatisert",
                prose:
                  "Hele prosessen fra datainnsamling til ferdig rapport skjer automatisk. Piloten slipper å lete opp informasjon fra ulike kilder — AviSafe gjør det på sekunder.",
              },
              {
                color: C.yellow,
                dimColor: C.yellowDim,
                icon: <Clock size={26} />,
                title: "Sporbar",
                prose:
                  "Hver vurdering er fullstendig dokumentert med et komplett revisjonsspor. Alle beslutninger, inputs og resultater er lagret og kan etterprøves til enhver tid.",
              },
              {
                color: C.green,
                dimColor: C.greenDim,
                icon: <Shield size={26} />,
                title: "Regulatorisk klar",
                prose:
                  "Analysen følger EASA SORA-metodikken og ivaretar norske myndighetskrav. Resultatet er en vurdering som er klar til å presenteres for tilsynsmyndigheter.",
              },
            ].map((col) => (
              <div
                key={col.title}
                className="rounded-2xl p-6 border"
                style={{
                  background: `linear-gradient(145deg, ${C.bgCard}, ${col.dimColor})`,
                  borderColor: `${col.color}30`,
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4 border"
                  style={{ background: `${col.color}15`, borderColor: `${col.color}40` }}
                >
                  <div style={{ color: col.color }}>{col.icon}</div>
                </div>
                <h3 className="text-base font-bold text-center mb-3" style={{ color: C.text }}>
                  {col.title}
                </h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: C.textMuted }}>
                  {col.prose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="text-center pt-10 border-t" style={{ borderColor: C.border }}>
          <img
            src={avisafeLogoText}
            alt="AviSafe logo"
            className="h-8 mx-auto mb-3"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
          />
          <p className="text-sm" style={{ color: C.textDim }}>
            Powered by AviSafe · EASA SORA · AI-drevet droneoperasjonsplattform
          </p>
          <p className="text-xs mt-1" style={{ color: C.textDim }}>
            © {new Date().getFullYear()} AviSafe AS
          </p>
        </div>
      </div>
    </div>
  );
}
