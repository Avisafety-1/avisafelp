import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-12 tracking-tight">
        {t("security.title")}
      </h2>
      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
        {t("security.body")}
      </p>
    </div>
  );
};

export default Security;
