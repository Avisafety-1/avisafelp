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
import { Helmet } from "@/lib/page-head";
import { useTranslation } from "react-i18next";
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
  phaseLabel: string;
  accentColor: string;
  dimColor: string;
  midColor: string;
  prose: string;
  glow?: boolean | undefined;
}

const ProsePhaseCard = ({
  phase,
  icon,
  title,
  subtitle,
  phaseLabel,
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
          className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
          style={{ background: midColor, border: `1px solid ${accentColor}50` }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm"
              style={{ background: midColor, color: accentColor }}
            >
              {phaseLabel} {phase}
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
  const { t, i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");

  const phaseStyles = [
    { icon: <Database size={20} />, accent: C.primaryLight, dim: C.primaryDim, mid: "hsl(210 50% 20%)" },
    { icon: <Globe size={20} />, accent: C.green, dim: C.greenDim, mid: C.greenMid },
    { icon: <Shield size={20} />, accent: C.red, dim: C.redDim, mid: C.redMid },
    { icon: <User size={20} />, accent: C.yellow, dim: C.yellowDim, mid: C.yellowMid },
    { icon: <Brain size={20} />, accent: C.purple, dim: C.purpleDim, mid: C.purpleMid, glow: true },
    { icon: <MessageSquare size={20} />, accent: C.yellow, dim: C.yellowDim, mid: C.yellowMid },
    { icon: <Zap size={20} />, accent: C.purple, dim: C.purpleDim, mid: C.purpleMid, glow: true },
  ];
  const connectorKeys = ["missionData", "situation", "policies", "params", "risk", "mitigations", "analysis"] as const;
  const phaseKeys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;

  const stats = [
    { value: t("sora.stats.phases.value"), label: t("sora.stats.phases.label") },
    { value: t("sora.stats.analysis.value"), label: t("sora.stats.analysis.label") },
    { value: t("sora.stats.sail.value"), label: t("sora.stats.sail.label") },
    { value: t("sora.stats.time.value"), label: t("sora.stats.time.label") },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: C.bg, color: C.text, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >
      <Helmet>
        <html lang={isNo ? "nb" : "en"} />
        <title>{t("sora.pageTitle")}</title>
        <meta name="description" content={t("sora.metaDescription")} />
        <link rel="canonical" href="https://avisafe.no/sora" />
      </Helmet>
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${C.primaryLight} 1px, transparent 1px), linear-gradient(90deg, ${C.primaryLight} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="fixed inset-x-0 top-0 h-64 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${C.primary}, transparent 70%)` }}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        {/* HERO */}
        <div className="text-center mb-20">
          <img
            src={avisafeLogoText}
            alt={t("sora.logoAlt")}
            className="h-12 mx-auto mb-8"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border"
            style={{ background: C.primaryDim, borderColor: C.borderPrimary, color: C.primaryLight }}
          >
            <Activity size={12} />
            {t("sora.badge")}
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4"
            style={{ color: C.text }}
          >
            {t("sora.h1Top")}
            <br />
            <span className="text-3xl sm:text-4xl" style={{ color: C.primaryLight }}>
              {t("sora.h1Sub")}
            </span>
          </h1>

          <p className="text-lg mb-2" style={{ color: C.textMuted }}>
            {t("sora.intro")}
          </p>
          <p className="text-sm font-semibold tracking-wide" style={{ color: C.primaryLight }}>
            {t("sora.introSub")}
          </p>

          <div
            className="flex flex-wrap justify-center gap-px mt-12 rounded-2xl overflow-hidden border"
            style={{ borderColor: C.border }}
          >
            {stats.map((s, i) => (
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

        {/* FLOW DIAGRAM */}
        <div className="space-y-0">
          {phaseKeys.map((pk, i) => (
            <div key={pk}>
              <ProsePhaseCard
                phase={i + 1}
                icon={phaseStyles[i]!.icon}
                title={t(`sora.phases.${pk}.title`)}
                subtitle={t(`sora.phases.${pk}.subtitle`)}
                phaseLabel={t("sora.phase")}
                accentColor={phaseStyles[i]!.accent}
                dimColor={phaseStyles[i]!.dim}
                midColor={phaseStyles[i]!.mid}
                prose={t(`sora.phases.${pk}.prose`)}
                glow={phaseStyles[i]!.glow}
              />
              <FlowConnector label={t(`sora.connectors.${connectorKeys[i]}`)} />
            </div>
          ))}

          {/* SORA OUTPUT */}
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
                  {t("sora.output.badge")}
                </div>
                <h2 className="text-2xl font-black" style={{ color: C.text }}>
                  {t("sora.output.title")}
                </h2>
                <p className="text-sm mt-1" style={{ color: C.textMuted }}>
                  {t("sora.output.subtitle")}
                </p>
              </div>

              {/* GRC */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.textDim }}>
                  {t("sora.output.grc")}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-xl p-4 text-center border" style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.yellowDim})`, borderColor: `${C.yellow}40` }}>
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>{t("sora.output.iGRC")}</div>
                    <div className="text-3xl font-black" style={{ color: C.yellow }}>3</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{t("sora.output.initial")}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={18} style={{ color: C.textDim }} />
                    <span className="text-xs text-center" style={{ color: C.textDim, maxWidth: 56 }}>{t("sora.output.groundMit")}</span>
                  </div>
                  <div className="flex-1 rounded-xl p-4 text-center border" style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.greenDim})`, borderColor: `${C.green}40` }}>
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>{t("sora.output.fGRC")}</div>
                    <div className="text-3xl font-black" style={{ color: C.green }}>2</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{t("sora.output.final")}</div>
                  </div>
                </div>
              </div>

              {/* ARC */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: C.textDim }}>
                  {t("sora.output.arc")}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-xl p-4 text-center border" style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.yellowDim})`, borderColor: `${C.yellow}40` }}>
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>{t("sora.output.initialARC")}</div>
                    <div className="text-3xl font-black" style={{ color: C.yellow }}>B</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{t("sora.output.uncontrolled")}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight size={18} style={{ color: C.textDim }} />
                    <span className="text-xs text-center" style={{ color: C.textDim, maxWidth: 56 }}>{t("sora.output.airMit")}</span>
                  </div>
                  <div className="flex-1 rounded-xl p-4 text-center border" style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${C.greenDim})`, borderColor: `${C.green}40` }}>
                    <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: C.textMuted }}>{t("sora.output.residualARC")}</div>
                    <div className="text-3xl font-black" style={{ color: C.green }}>A</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{t("sora.output.afterMit")}</div>
                  </div>
                </div>
              </div>

              {/* SAIL + Residual + OSO */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: t("sora.output.sail"), value: "II", sub: t("sora.output.sailSub"), color: C.primaryLight, dim: C.primaryDim },
                  { label: t("sora.output.residual"), value: t("sora.output.low"), sub: t("sora.output.residualSub"), color: C.green, dim: C.greenDim },
                  { label: t("sora.output.oso"), value: "M", sub: t("sora.output.osoSub"), color: C.purple, dim: C.purpleDim },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-4 text-center border" style={{ background: `linear-gradient(135deg, ${C.bgCard}, ${m.dim})`, borderColor: `${m.color}35` }}>
                    <div className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: C.textMuted }}>{m.label}</div>
                    <div className="text-2xl sm:text-3xl font-black" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* GO badge */}
              <div className="rounded-xl p-5 text-center border" style={{ background: `linear-gradient(135deg, ${C.greenMid}, ${C.greenDim})`, borderColor: `${C.green}60`, boxShadow: `0 0 30px ${C.green}25` }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: C.textMuted }}>{t("sora.output.aiRec")}</div>
                <div className="text-5xl font-black tracking-widest mb-2" style={{ color: C.green }}>{t("sora.output.go")}</div>
                <p className="text-sm" style={{ color: C.textMuted }}>{t("sora.output.goNoteSora")}</p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-center" style={{ color: C.textMuted }}>{t("sora.output.disclaimer")}</p>
            </div>
          </div>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div className="mt-24 mb-16">
          <h2 className="text-3xl font-black text-center mb-12" style={{ color: C.text }}>
            {t("sora.highlights.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { key: "automated", color: C.primaryLight, dimColor: C.primaryDim, icon: <Cpu size={26} /> },
              { key: "traceable", color: C.yellow, dimColor: C.yellowDim, icon: <Clock size={26} /> },
              { key: "regulatory", color: C.green, dimColor: C.greenDim, icon: <Shield size={26} /> },
            ].map((col) => (
              <div key={col.key} className="rounded-2xl p-6 border" style={{ background: `linear-gradient(145deg, ${C.bgCard}, ${col.dimColor})`, borderColor: `${col.color}30` }}>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4 border" style={{ background: `${col.color}15`, borderColor: `${col.color}40` }}>
                  <div style={{ color: col.color }}>{col.icon}</div>
                </div>
                <h3 className="text-base font-bold text-center mb-3" style={{ color: C.text }}>
                  {t(`sora.highlights.${col.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: C.textMuted }}>
                  {t(`sora.highlights.${col.key}.prose`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-10 border-t" style={{ borderColor: C.border }}>
          <img
            src={avisafeLogoText}
            alt={t("sora.logoAlt")}
            className="h-8 mx-auto mb-3"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
          />
          <p className="text-sm" style={{ color: C.textDim }}>
            {t("sora.footerNote")}
          </p>
          <p className="text-xs mt-1" style={{ color: C.textDim }}>
            © {new Date().getFullYear()} AviSafe AS
          </p>
        </div>
      </div>
    </div>
  );
}
