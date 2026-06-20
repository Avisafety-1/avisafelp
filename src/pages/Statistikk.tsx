import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn, LogOut, ExternalLink, RefreshCw } from "lucide-react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

type Row = {
  path: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  country_code: string | null;
  session_id: string | null;
  duration_ms: number | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  language: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
};

const WORLD_TOPO =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const BRAND = "#123b87";
const PIE_COLORS = ["#123b87", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

const Statistikk = () => {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setIsAdmin(null); return; }
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, [user]);

  useEffect(() => {
    if (isAdmin) void fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, days]);

  const fetchStats = async () => {
    setLoading(true);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("page_views")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(10000);
    if (error) console.error(error);
    else setRows((data as Row[]) || []);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  // ---------- Aggregations ----------
  const stats = useMemo(() => {
    const total = rows.length;
    const uniqueSessions = new Set(rows.map(r => r.session_id).filter(Boolean)).size;
    const durations = rows.map(r => r.duration_ms).filter((d): d is number => typeof d === "number" && d > 0);
    const avgDuration = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000) : 0;

    const byPath = aggregate(rows.map(r => r.path));
    const byCountry = aggregateWithMeta(rows, r => r.country || "—", r => r.country_code || null);
    const byReferrer = aggregate(rows.map(r => {
      if (!r.referrer) return "Direkte";
      try { return new URL(r.referrer).hostname.replace(/^www\./, ""); }
      catch { return "Direkte"; }
    }));
    const byDevice = aggregate(rows.map(r => r.device_type || "ukjent"));
    const byBrowser = aggregate(rows.map(r => r.browser || "ukjent"));
    const byOS = aggregate(rows.map(r => r.os || "ukjent"));
    const byUtm = aggregate(rows
      .map(r => r.utm_source)
      .filter((s): s is string => !!s));
    const byLang = aggregate(rows.map(r => (r.language || "—").split("-")[0]));

    // Daily series
    const dayMap = new Map<string, { views: number; sessions: Set<string> }>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      dayMap.set(d, { views: 0, sessions: new Set() });
    }
    for (const r of rows) {
      const d = r.created_at.slice(0, 10);
      const cur = dayMap.get(d);
      if (!cur) continue;
      cur.views += 1;
      if (r.session_id) cur.sessions.add(r.session_id);
    }
    const daily = Array.from(dayMap.entries()).map(([date, v]) => ({
      date: date.slice(5),
      Visninger: v.views,
      Besøkende: v.sessions.size,
    }));

    return { total, uniqueSessions, avgDuration, byPath, byCountry, byReferrer, byDevice, byBrowser, byOS, byUtm, byLang, daily };
  }, [rows, days]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(210,30%,96%)] px-4 pt-24">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-center">Logg inn</h1>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Passord" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full bg-[#123b87] hover:bg-[#0f3170]"><LogIn className="w-4 h-4 mr-2" />Logg inn</Button>
        </form>
      </div>
    );
  }

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-4 bg-[hsl(210,30%,96%)] pt-24">
        <h1 className="text-2xl font-bold">Ingen tilgang</h1>
        <p className="text-sm text-slate-600">Du har ikke administratortilgang til denne siden.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}><LogOut className="w-4 h-4 mr-2" />Logg ut</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>Statistikk – AviSafe</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(210,45%,12%)]">Statistikk</h1>
          <p className="text-xs sm:text-sm text-slate-600 truncate">{user.email}</p>
        </div>

        {/* Sticky controls */}
        <div className="sticky top-16 z-10 -mx-3 sm:mx-0 mb-4 sm:mb-6 bg-[hsl(210,30%,96%)]/90 backdrop-blur px-3 sm:px-0 py-2 sm:py-0 sm:bg-transparent">
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm flex-1 sm:flex-none min-w-[120px]"
            >
              <option value={7}>Siste 7 dager</option>
              <option value={30}>Siste 30 dager</option>
              <option value={90}>Siste 90 dager</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchStats} disabled={loading} className="gap-1">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="hidden sm:inline">Oppdater</span>
            </Button>
            {GA_MEASUREMENT_ID && (
              <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">
                <Button size="sm" className="bg-[#123b87] hover:bg-[#0f3170] gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Åpne GA</span>
                </Button>
              </a>
            )}
            <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()} className="ml-auto">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Stat label="Visninger" value={stats.total.toLocaleString("no-NO")} />
          <Stat label="Unike besøk" value={stats.uniqueSessions.toLocaleString("no-NO")} />
          <Stat label="Snitt-tid" value={`${stats.avgDuration}s`} />
          <Stat label="Topp-land" value={stats.byCountry[0]?.key || "—"} />
        </div>

        {/* Daily chart */}
        <Card title="Trafikk over tid" className="mb-4 sm:mb-6">
          <div className="h-56 sm:h-72 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.daily} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" fontSize={11} stroke="#64748b" />
                <YAxis fontSize={11} stroke="#64748b" allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Visninger" stroke={BRAND} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Besøkende" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Map + country bars */}
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Card title="Verdenskart" className="lg:col-span-3">
            <WorldMap data={stats.byCountry} />
          </Card>
          <Card title="Topp land" className="lg:col-span-2">
            <div className="h-56 sm:h-72 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.byCountry.slice(0, 8)} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
                  <XAxis type="number" fontSize={11} stroke="#64748b" allowDecimals={false} />
                  <YAxis type="category" dataKey="key" fontSize={11} stroke="#64748b" width={90} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="value" fill={BRAND} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Device / Browser / OS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <PieCard title="Enhet" data={stats.byDevice} />
          <PieCard title="Nettleser" data={stats.byBrowser} />
          <PieCard title="OS" data={stats.byOS} />
        </div>

        {/* Lists */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <ListCard title="Topp sider" items={stats.byPath.slice(0, 15)} />
          <ListCard title="Henvisninger" items={stats.byReferrer.slice(0, 15)} />
          <ListCard title="UTM-kilder" items={stats.byUtm.slice(0, 10)} empty="Ingen kampanjebesøk ennå" />
          <ListCard title="Språk" items={stats.byLang.slice(0, 10)} />
        </div>

        {!GA_MEASUREMENT_ID && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
            Google Analytics er ikke konfigurert.
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- UI helpers ----------

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-slate-200">
    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-lg sm:text-2xl font-bold mt-1 text-[hsl(210,45%,12%)] truncate">{value}</p>
  </div>
);

const Card = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 ${className}`}>
    <h3 className="font-semibold mb-3 text-sm sm:text-base text-[hsl(210,45%,12%)]">{title}</h3>
    {children}
  </div>
);

const ListCard = ({ title, items, empty = "—" }: { title: string; items: { key: string; value: number | string }[]; empty?: string }) => (
  <Card title={title}>
    {items.length === 0 ? (
      <p className="text-sm text-slate-500">{empty}</p>
    ) : (
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex justify-between gap-3 text-sm border-b border-slate-100 pb-1.5 last:border-0">
            <span className="truncate text-slate-700">{it.key}</span>
            <span className="font-mono text-slate-900 shrink-0">{it.value}</span>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

const PieCard = ({ title, data }: { title: string; data: { key: string; value: number }[] }) => {
  const top = data.slice(0, 5);
  return (
    <Card title={title}>
      {top.length === 0 ? (
        <p className="text-sm text-slate-500">—</p>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={top} dataKey="value" nameKey="key" innerRadius={36} outerRadius={64} paddingAngle={2}>
                {top.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

// ---------- Map ----------

const WorldMap = ({ data }: { data: { key: string; value: number; code: string | null }[] }) => {
  const lookup = useMemo(() => {
    const m = new Map<string, number>();
    for (const d of data) {
      m.set(d.key.toLowerCase(), d.value);
    }
    return m;
  }, [data]);

  const max = Math.max(1, ...data.map(d => d.value));
  const colorScale = scaleLinear<string>().domain([0, max]).range(["#e2e8f0", BRAND]);

  return (
    <div className="w-full overflow-hidden">
      <ComposableMap projectionConfig={{ scale: 130 }} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={WORLD_TOPO}>
          {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { name: string } }> }) =>
            geographies.map((geo) => {
              const name = (geo.properties.name || "").toLowerCase();
              const count = lookup.get(name) || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={count ? colorScale(count) : "#f1f5f9"}
                  stroke="#cbd5e1"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: BRAND, opacity: 0.85 },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

// ---------- Data helpers ----------

function aggregate(values: string[]): { key: string; value: number }[] {
  const map = new Map<string, number>();
  for (const v of values) map.set(v, (map.get(v) || 0) + 1);
  return Array.from(map.entries()).map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);
}

function aggregateWithMeta<T>(
  rows: T[],
  keyFn: (r: T) => string,
  codeFn: (r: T) => string | null,
): { key: string; value: number; code: string | null }[] {
  const map = new Map<string, { value: number; code: string | null }>();
  for (const r of rows) {
    const k = keyFn(r);
    const cur = map.get(k);
    if (cur) cur.value += 1;
    else map.set(k, { value: 1, code: codeFn(r) });
  }
  return Array.from(map.entries())
    .map(([key, v]) => ({ key, value: v.value, code: v.code }))
    .sort((a, b) => b.value - a.value);
}

export default Statistikk;
