import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getConsent, setConsent } from "@/lib/analytics";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setOpen(false);
  };
  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false });
    setOpen(false);
  };
  const saveSettings = () => {
    setConsent({ analytics, marketing });
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/95 backdrop-blur-md shadow-2xl p-4 sm:p-5">
        {!showSettings ? (
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-base font-semibold text-[hsl(210,45%,12%)]">
                {t("cookies.title")}
              </h2>
              <p className="mt-1 text-sm text-[hsl(210,30%,30%)]">
                {t("cookies.body")}{" "}
                <Link to="/personvern" className="underline">
                  {t("cookies.privacyLink")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                {t("cookies.settings")}
              </Button>
              <Button variant="outline" size="sm" onClick={rejectAll}>
                {t("cookies.reject")}
              </Button>
              <Button size="sm" onClick={acceptAll} className="bg-[#123b87] hover:bg-[#0f3170]">
                {t("cookies.accept")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[hsl(210,45%,12%)]">
              {t("cookies.settingsTitle")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("cookies.necessary")}</p>
                  <p className="text-xs text-slate-600">{t("cookies.necessaryBody")}</p>
                </div>
                <Switch checked disabled />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("cookies.analytics")}</p>
                  <p className="text-xs text-slate-600">{t("cookies.analyticsBody")}</p>
                </div>
                <Switch checked={analytics} onCheckedChange={setAnalytics} />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("cookies.marketing")}</p>
                  <p className="text-xs text-slate-600">{t("cookies.marketingBody")}</p>
                </div>
                <Switch checked={marketing} onCheckedChange={setMarketing} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                {t("common.back")}
              </Button>
              <Button size="sm" onClick={saveSettings} className="bg-[#123b87] hover:bg-[#0f3170]">
                {t("cookies.savePrefs")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
