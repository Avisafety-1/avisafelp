import { SECURITY, SECURITY_PATHS, type SecLang } from "@/content/security";
import { breadcrumbLd, faqLd, ldScript, pageHead } from "@/lib/seo";

/** Server-rendered head for /sikkerhet and /en/security. */
export function securityHead(lang: SecLang) {
  const c = SECURITY[lang];
  const path = SECURITY_PATHS[lang];
  return {
    ...pageHead({ path, title: c.meta.title, description: c.meta.description }),
    scripts: [
      ldScript(breadcrumbLd([c.home, { name: c.navLabel, path }])),
      ldScript(faqLd(c.faq.items)),
    ],
  };
}
