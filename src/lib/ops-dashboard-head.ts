import {
  OPS_DASHBOARD,
  OPS_FILM,
  OPS_PATHS,
  type OpsLang,
} from "@/content/ops-dashboard";
import { SOFTWARE_APP_LD, breadcrumbLd, ldScript, pageHead } from "@/lib/seo";

/** schema.org VideoObject for the AviSafe Ops product film. */
const VIDEO_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: OPS_FILM.name,
  description:
    "AviSafe Ops brings every drone, every live feed and every team into one operational dashboard. Live positions and live video in real time, secure sharing, and instant messaging to pilots.",
  thumbnailUrl: `https://avisafe.no${OPS_FILM.poster}`,
  contentUrl: `https://avisafe.no${OPS_FILM.video}`,
  duration: OPS_FILM.duration,
  uploadDate: OPS_FILM.uploadDate,
};

/** Server-rendered head for /aviops and /en/aviops. */
export function opsDashboardHead(lang: OpsLang) {
  const c = OPS_DASHBOARD[lang];
  const path = OPS_PATHS[lang];
  return {
    ...pageHead({ path, title: c.meta.title, description: c.meta.description }),
    scripts: [
      ldScript(SOFTWARE_APP_LD),
      ldScript(breadcrumbLd([c.home, { name: c.navLabel, path }])),
      ldScript(VIDEO_LD),
    ],
  };
}
