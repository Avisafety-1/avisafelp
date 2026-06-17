import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import droneAsset from "@/assets/operations-drone.jpg.asset.json";

const Operations = () => {
  const { t, i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pb-24">
      <Helmet>
        <html lang={isNo ? "nb" : "en"} />
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
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            {t("operations.body")}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Operations;
