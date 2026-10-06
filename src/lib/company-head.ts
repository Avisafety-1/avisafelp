import { ABOUT, PARTNERS, LINKEDIN_URL } from "@/content/company";
import { pageHead, ldScript, breadcrumbLd, ORGANIZATION_REF } from "@/lib/seo";

const home = (lang: "nb" | "en") => (lang === "en" ? { name: "Home", path: "/en" } : { name: "Forside", path: "/" });

export function aboutHead(lang: "nb" | "en") {
  const c = ABOUT[lang];
  return {
    ...pageHead({ path: c.path, title: c.metaTitle, description: c.metaDescription }),
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: `https://avisafe.no${c.path}`,
        about: { ...ORGANIZATION_REF, foundingDate: "2025", sameAs: [LINKEDIN_URL] },
      }),
      ...c.people.map((p) =>
        ldScript({ "@context": "https://schema.org", "@type": "Person", name: p.name, jobTitle: p.jobTitle, worksFor: ORGANIZATION_REF }),
      ),
      ldScript(breadcrumbLd([home(lang), { name: c.h1, path: c.path }])),
    ],
  };
}

export function partnersHead(lang: "nb" | "en") {
  const c = PARTNERS[lang];
  return {
    ...pageHead({ path: c.path, title: c.metaTitle, description: c.metaDescription }),
    scripts: [ldScript(breadcrumbLd([home(lang), { name: c.h1, path: c.path }]))],
  };
}
