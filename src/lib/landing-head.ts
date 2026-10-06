import type { LandingPage } from "@/content/en/landing-pages";
import { pageHead, ldScript, SOFTWARE_APP_LD, breadcrumbLd, faqLd } from "@/lib/seo";

/** Head for an English landing page: own meta + Organization (root), SoftwareApplication, BreadcrumbList, FAQPage. */
export function landingHead(page: LandingPage) {
  return {
    ...pageHead({ path: page.path, title: page.metaTitle, description: page.metaDescription }),
    scripts: [
      ldScript({ ...SOFTWARE_APP_LD, description: page.lead }),
      ldScript(breadcrumbLd([{ name: "Home", path: "/en" }, { name: page.navLabel, path: page.path }])),
      ldScript(faqLd(page.faq)),
    ],
  };
}
