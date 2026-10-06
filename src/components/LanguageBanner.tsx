import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import { languageForPath } from "@/i18n";
import { switchTargetFor } from "@/lib/alternates";

const PREF_KEY = "avisafe-lang-banner";

/**
 * Discreet suggestion based on the browser language. The stored value only
 * controls whether the banner shows; it never decides which content renders.
 */
const LanguageBanner = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const pageLang = languageForPath(location.pathname);
  const suggest = pageLang === "no" ? "en" : "no";

  useEffect(() => {
    try {
      if (localStorage.getItem(PREF_KEY)) return setShow(false);
    } catch {
      /* ignore */
    }
    const browser = (navigator.languages?.[0] || navigator.language || "").toLowerCase();
    const browserIsNo = /^(nb|nn|no)\b/.test(browser);
    setShow(pageLang === "no" ? !browserIsNo && browser !== "" : browserIsNo);
  }, [pageLang]);

  if (!show) return null;

  const remember = (value: string) => {
    try {
      localStorage.setItem(PREF_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Language"
      className="fixed bottom-4 left-4 z-[60] flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur"
    >
      <Link
        to={switchTargetFor(location.pathname)}
        className="font-medium underline-offset-2 hover:underline"
        onClick={() => remember(suggest)}
      >
        {suggest === "en" ? "Switch to English" : "Bytt til norsk"}
      </Link>
      <button
        type="button"
        aria-label={suggest === "en" ? "Close" : "Lukk"}
        className="rounded-full p-1 text-muted-foreground hover:text-foreground"
        onClick={() => remember("dismissed")}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LanguageBanner;
