import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Operations = () => {
  const { t, i18n } = useTranslation();
  const isNo = i18n.language?.startsWith("no");

  return (
    <div className="min-h-screen bg-[hsl(210,30%,96%)] pt-24 md:pt-32 pb-24">
      <Helmet>
        <html lang={isNo ? "nb" : "en"} />
        <title>{t("operations.pageTitle")}</title>
        <meta name="description" content={t("operations.metaDescription")} />
        <link rel="canonical" href="https://avisafe.no/operations" />
      </Helmet>

      <main className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--text-dark-blue))] mb-6">
            {t("operations.h1")}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
            {t("operations.body")}
          </p>
          <Button
            asChild
            className="h-12 rounded-full bg-[#123b87] hover:bg-[#0e2f6b] text-white px-8 text-base font-semibold shadow-lg"
          >
            <a href="mailto:kontakt@avisafe.no">
              <Mail className="w-4 h-4 mr-2" />
              {t("operations.cta")}
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Operations;
