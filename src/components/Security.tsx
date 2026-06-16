import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
        {t("security.title")}
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        {t("security.body")}
      </p>
    </div>
  );
};

export default Security;
