import {
  COMPLIANCE,
  COMPLIANCE_PATHS,
  type ComplianceLang,
} from "@/content/compliance";
import {
  SOFTWARE_APP_LD,
  breadcrumbLd,
  faqLd,
  ldScript,
  pageHead,
} from "@/lib/seo";

/** Server-rendered head for /compliance and /en/compliance. */
export function complianceHead(lang: ComplianceLang) {
  const c = COMPLIANCE[lang];
  const path = COMPLIANCE_PATHS[lang];
  return {
    ...pageHead({ path, title: c.meta.title, description: c.meta.description }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(breadcrumbLd([c.home, { name: c.navLabel, path }])),
      ldScript(faqLd(c.faq.items)),
    ],
  };
}
