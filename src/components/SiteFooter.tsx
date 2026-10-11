import { Link, useLocation } from "@/lib/router-compat";
import { isEnglishPath } from "@/lib/alternates";
import { LANDING_PAGES } from "@/content/en/landing-pages";

/** Site footer on both languages; English landing pages are always linked. */
export default function SiteFooter() {
  const { pathname } = useLocation();
  const en = isEnglishPath(pathname);
  const company = en
    ? [
        { to: "/en/about", label: "About" },
        { to: "/en/partners", label: "Partners" },
        { to: "/personvern", label: "Privacy (Norwegian)" },
      ]
    : [
        { to: "/om-oss", label: "Om oss" },
        { to: "/partnere", label: "Partnere" },
        { to: "/compliance", label: "Compliance" },
        { to: "/operasjonsdashbord", label: "AviOps" },
        { to: "/integrasjoner", label: "Integrasjoner" },
        { to: "/sora", label: "SORA" },
        { to: "/artikler", label: "Artikler" },
        { to: "/personvern", label: "Personvern" },
      ];
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-foreground">AviSafe AS</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {en ? "Norwegian platform for drone operators." : "Norsk plattform for droneoperatører."}
          </p>
          <a href="mailto:kontakt@avisafe.no" className="mt-2 inline-block text-sm text-primary hover:underline">
            kontakt@avisafe.no
          </a>
        </div>
        <nav aria-label={en ? "Company" : "Selskap"}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">{en ? "Company" : "Selskap"}</p>
          <ul className="space-y-2 text-sm">
            {company.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-muted-foreground hover:text-foreground">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="English">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
            {en ? "Platform" : "In English"}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/en" className="text-muted-foreground hover:text-foreground">AviSafe (English)</Link></li>
            <li><Link to="/en/compliance" className="text-muted-foreground hover:text-foreground">Compliance</Link></li>
            <li><Link to="/en/ops-dashboard" className="text-muted-foreground hover:text-foreground">AviOps</Link></li>
            {LANDING_PAGES.map((p) => (
              <li key={p.path}><Link to={p.path} className="text-muted-foreground hover:text-foreground">{p.navLabel}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} AviSafe AS</p>
    </footer>
  );
}
