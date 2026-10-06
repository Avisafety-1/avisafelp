import { Helmet } from "@/lib/page-head";
import { useTranslation } from "react-i18next";

const Personvern = () => {
  const { t, i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");
  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pt-28 pb-20 px-4">
      <Helmet>
        <title>{isNo ? "Personvern – AviSafe" : "Privacy – AviSafe"}</title>
        <meta name="description" content={isNo ? "Personvernerklæring for AviSafe." : "Privacy policy for AviSafe."} />
        <link rel="canonical" href="https://avisafe.no/personvern" />
      </Helmet>
      <article className="prose max-w-3xl mx-auto text-[hsl(210,45%,12%)]">
        <h1>{t("privacy.title")}</h1>
        <p>{t("privacy.intro")}</p>
        <h2>{t("privacy.dataTitle")}</h2>
        <p>{t("privacy.dataBody")}</p>
        <h2>{t("privacy.cookiesTitle")}</h2>
        <p>{t("privacy.cookiesBody")}</p>
        <h2>{t("privacy.rightsTitle")}</h2>
        <p>{t("privacy.rightsBody")}</p>
        <h2>{t("privacy.contactTitle")}</h2>
        <p>
          <a href="mailto:kontakt@avisafe.no">kontakt@avisafe.no</a>
        </p>
      </article>
    </div>
  );
};

export default Personvern;
