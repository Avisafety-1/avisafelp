import { Link } from "@/lib/router-compat";
import { PARTNERS, SAFESKY_ARTICLE_URL } from "@/content/company";
import { DemoCta, RelatedLinks } from "@/pages/en/LandingTemplate";

export default function PartnersPage({ lang }: { lang: "nb" | "en" }) {
  const c = PARTNERS[lang];
  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-20 pt-28 md:pt-36">
      <main className="container mx-auto max-w-5xl space-y-14 px-4">
        <header className="space-y-5">
          <h1 className="text-4xl font-bold text-[hsl(var(--text-dark-blue))] md:text-6xl">{c.h1}</h1>
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">{c.lead}</p>
        </header>
        <section className="grid gap-5 md:grid-cols-2">
          {c.items.map((p) => (
            <article key={p.name} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-2 text-2xl font-semibold text-foreground">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{p.name}</a>
              </h2>
              <p className="leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </section>
        <section aria-labelledby="press">
          <h2 id="press" className="mb-3 text-2xl font-bold text-foreground">{c.pressHeading}</h2>
          <a href={SAFESKY_ARTICLE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {c.pressLink}
          </a>
        </section>
        {lang === "en" ? (
          <>
            <DemoCta />
            <RelatedLinks current="/en/partners" />
          </>
        ) : (
          <p className="text-muted-foreground">
            <Link to="/integrasjoner" className="text-primary hover:underline">Alle integrasjoner</Link> ·{" "}
            <Link to="/om-oss" className="text-primary hover:underline">Om AviSafe</Link> ·{" "}
            <Link to="/sora" className="text-primary hover:underline">SORA</Link>
          </p>
        )}
      </main>
    </div>
  );
}
