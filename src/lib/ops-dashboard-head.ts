import {
  OPS_DASHBOARD,
  OPS_PATHS,
  type OpsLang,
} from "@/content/ops-dashboard";
import { SOFTWARE_APP_LD, breadcrumbLd, ldScript, pageHead } from "@/lib/seo";

/** Server-rendered head for /operasjonsdashbord and /en/ops-dashboard. */
export function opsDashboardHead(lang: OpsLang) {
  const c = OPS_DASHBOARD[lang];
  const path = OPS_PATHS[lang];
  return {
    ...pageHead({ path, title: c.meta.title, description: c.meta.description }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(breadcrumbLd([c.home, { name: c.navLabel, path }])),
    ],
  };
}
