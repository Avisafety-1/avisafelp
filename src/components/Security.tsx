import { useTranslation } from "react-i18next";
import { Link, useLocation } from "@/lib/router-compat";
import { isEnglishPath } from "@/lib/alternates";

const Security = () => {
  const { t } = useTranslation();
  const en = isEnglishPath(useLocation().pathname);
  return (
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-12 tracking-tight">
        {t("security.title")}
      </h2>
      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
        {t("security.body")}
      </p>
      <Link to={en ? "/en/security" : "/sikkerhet"} className="mt-8 inline-block text-lg font-semibold text-primary hover:underline">
        {en ? "Read more about security in AviSafe →" : "Les mer om sikkerhet i AviSafe →"}
      </Link>
    </div>
  );
};

export default Security;
