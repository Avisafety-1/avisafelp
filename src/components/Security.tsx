import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("security.title")}
          </h2>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("security.body")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Security;
