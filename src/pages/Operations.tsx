import { Helmet } from "@/lib/page-head";
import { useTranslation } from "react-i18next";
import droneAsset from "@/assets/operations-drone.jpg.asset.json";
import airwatchBadge from "@/assets/airwatch-badge.png.asset.json";

const Operations = () => {
  const { t, i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-24">
      <Helmet>
        <title>{t("operations.pageTitle")}</title>
        <meta name="description" content={t("operations.metaDescription")} />
        <link rel="canonical" href="https://avisafe.no/operations" />
      </Helmet>

      {/* Full-width drone banner */}
      <div className="w-full">
        <img
          src={droneAsset.url}
          alt="DJI M350 drone"
          className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover object-center"
        />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pt-16 md:pt-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--text-dark-blue))] mb-6">
            {t("operations.h1")}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {t("operations.body")}
          </p>
        </div>

        <section className="max-w-4xl mx-auto mt-20 rounded-3xl bg-card/70 backdrop-blur border border-border p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={airwatchBadge.url} alt="AirWatch NO.LUC.008" className="h-28 w-28 md:h-36 md:w-36 object-contain shrink-0" />
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text-dark-blue))] mb-4">
                {t("operations.airwatch.heading")}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">{t("operations.airwatch.body")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            {["k1", "k2", "k3", "k4", "k5", "k6"].map((k) => (
              <div key={k} className="rounded-xl bg-background/80 border border-border px-4 py-3 text-center font-medium text-[hsl(var(--text-dark-blue))]">
                {t(`operations.airwatch.${k}`)}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="mailto:kontakt@avisafe.no" className="rounded-full bg-[#123b87] px-6 py-3 font-semibold text-primary-foreground">
              {t("operations.cta")}
            </a>
            <a href="https://airwatch.no" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-6 py-3 font-semibold text-[hsl(var(--text-dark-blue))]">
              {t("operations.airwatch.link")}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Operations;
