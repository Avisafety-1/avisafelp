import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isEnglishPath, switchTargetFor } from "@/lib/alternates";

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

/** Links to the same page in the other language when it exists, otherwise to / or /en. */
const LanguageSwitcher = ({ className = "", variant = "light" }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const onEnglish = isEnglishPath(pathname);
  const target = switchTargetFor(pathname);

  const triggerClasses =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
      : "bg-card/80 hover:bg-card text-foreground border-border/50";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("language.label")}
        className={`inline-flex items-center justify-center rounded-full border p-2 backdrop-blur-xs transition-colors ${triggerClasses} ${className}`}
      >
        <Globe className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        <DropdownMenuItem asChild className={!onEnglish ? "font-semibold" : ""}>
          <Link to={onEnglish ? target : pathname}>
            <span className="mr-2">🇳🇴</span>Norsk
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={onEnglish ? "font-semibold" : ""}>
          <Link to={onEnglish ? pathname : target}>
            <span className="mr-2">🇬🇧</span>English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
