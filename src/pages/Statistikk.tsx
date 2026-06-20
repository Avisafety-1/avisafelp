import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn, LogOut, ExternalLink } from "lucide-react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

type Row = { path: string; referrer: string | null; country: string | null; city: string | null; session_id: string | null; duration_ms: number | null; created_at: string };

const Statistikk = () => {
  const { t } = useTranslation();
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

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(210,30%,96%)] px-4 pt-24">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-center">{t("stats.loginTitle")}</h1>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Input type="email" placeholder={t("common.email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder={t("common.password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full bg-[#123b87] hover:bg-[#0f3170]"><LogIn className="w-4 h-4 mr-2" />{t("common.login")}</Button>
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
        <h1 className="text-2xl font-bold">{t("stats.noAccess")}</h1>
        <p className="text-sm text-slate-600">{t("stats.noAccessBody")}</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}><LogOut className="w-4 h-4 mr-2" />{t("common.logout")}</Button>
      </div>
    );
  }

  // Aggregations
  const total = rows.length;
  const uniqueSessions = new Set(rows.map(r => r.session_id).filter(Boolean)).size;
  const durations = rows.map(r => r.duration_ms).filter((d): d is number => typeof d === "number" && d > 0);
  const avgDuration = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000) : 0;

  const byPath = aggregate(rows.map(r => r.path));
  const byCountry = aggregate(rows.map(r => r.country || "—"));
  const byReferrer = aggregate(rows.map(r => (r.referrer ? new URL(r.referrer, window.location.origin).hostname : t("stats.direct"))));

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 pb-16 px-4">
      <Helmet><title>{t("stats.pageTitle")}</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(210,45%,12%)]">{t("stats.title")}</h1>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value={7}>{t("stats.last7")}</option>
              <option value={30}>{t("stats.last30")}</option>
              <option value={90}>{t("stats.last90")}</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchStats} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("stats.refresh")}
            </Button>
            {GA_MEASUREMENT_ID && (
              <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">
                <Button size="sm" className="bg-[#123b87] hover:bg-[#0f3170]"><ExternalLink className="w-4 h-4 mr-2" />{t("stats.openGA")}</Button>
              </a>
            )}
            <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Stat label={t("stats.totalViews")} value={total.toLocaleString()} />
          <Stat label={t("stats.uniqueVisitors")} value={uniqueSessions.toLocaleString()} />
          <Stat label={t("stats.avgDuration")} value={`${avgDuration}s`} />
          <Stat label={t("stats.topCountry")} value={byCountry[0]?.key || "—"} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ListCard title={t("stats.topPages")} items={byPath.slice(0, 20)} />
          <ListCard title={t("stats.topCountries")} items={byCountry.slice(0, 10)} />
          <ListCard title={t("stats.referrers")} items={byReferrer.slice(0, 10)} />
          <ListCard title={t("stats.recent")} items={rows.slice(0, 20).map(r => ({ key: `${r.path} · ${r.country || "—"}`, value: new Date(r.created_at).toLocaleString() }))} />
        </div>

        {!GA_MEASUREMENT_ID && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
            {t("stats.noGA")}
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-2xl font-bold mt-1 text-[hsl(210,45%,12%)]">{value}</p>
  </div>
);

const ListCard = ({ title, items }: { title: string; items: { key: string; value: number | string }[] }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
    <h3 className="font-semibold mb-3 text-[hsl(210,45%,12%)]">{title}</h3>
    {items.length === 0 ? (
      <p className="text-sm text-slate-500">—</p>
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
  </div>
);

function aggregate(values: string[]): { key: string; value: number }[] {
  const map = new Map<string, number>();
  for (const v of values) map.set(v, (map.get(v) || 0) + 1);
  return Array.from(map.entries()).map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);
}

export default Statistikk;
