import { Link } from "@/lib/router-compat";
import { ABOUT, LINKEDIN_URL } from "@/content/company";
import { DemoCta, RelatedLinks } from "@/pages/en/LandingTemplate";

export default function AboutPage({ lang }: { lang: "nb" | "en" }) {
  const c = ABOUT[lang];
  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-20 pt-28 md:pt-36">
      <main className="container mx-auto max-w-5xl space-y-14 px-4">
        <header className="space-y-5">
          <h1 className="text-4xl font-bold text-[hsl(var(--text-dark-blue))] md:text-6xl">{c.h1}</h1>
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">{c.lead}</p>
        </header>
        <section aria-labelledby="team">
          <h2 id="team" className="mb-6 text-3xl font-bold text-foreground">{c.teamHeading}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.people.map((p) => (
              <article key={p.name} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-2xl font-semibold text-foreground">{p.name}</h3>
                <p className="mb-4 font-medium text-primary">{p.role}</p>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {p.cv.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="contact">
          <h2 id="contact" className="mb-3 text-2xl font-bold text-foreground">{c.contactHeading}</h2>
          <p className="text-muted-foreground">
            AviSafe AS · <a className="text-primary hover:underline" href="mailto:kontakt@avisafe.no">kontakt@avisafe.no</a> ·{" "}
            <a className="text-primary hover:underline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </section>
        {lang === "en" ? (
          <>
            <DemoCta />
            <RelatedLinks current="/en/about" />
          </>
        ) : (
          <p className="text-muted-foreground">
            <Link to="/partnere" className="text-primary hover:underline">Partnere og integrasjoner</Link> ·{" "}
            <Link to="/sora" className="text-primary hover:underline">SORA</Link>
          </p>
        )}
      </main>
    </div>
  );
}
