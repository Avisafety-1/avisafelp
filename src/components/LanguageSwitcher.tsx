import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, LANGUAGE_NAMES, LANGUAGE_FLAGS, localeForPath, pathForLocale } from "@/lib/locales";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

/** Links to the same page in the other language when it exists, otherwise to / or /en. */
const LanguageSwitcher = ({ className = "", variant = "light" }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const active = localeForPath(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t("language.label")} className={`rounded-full backdrop-blur-xs ${className}`}>
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {LANGUAGES.map((lang) => <DropdownMenuItem key={lang} asChild className={active === lang ? "font-semibold" : ""}>
          <Link to={pathForLocale(pathname, lang)} preserveLanguage onClick={() => { document.cookie = `avisafe-language=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`; }} lang={lang === "no" ? "nb" : lang}>
            <span className="mr-2" data-no-translate>{LANGUAGE_FLAGS[lang]}</span><span data-no-translate>{LANGUAGE_NAMES[lang]}</span>
          </Link>
        </DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
