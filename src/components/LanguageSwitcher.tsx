import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

const LanguageSwitcher = ({ className = "", variant = "light" }: Props) => {
  const { i18n, t } = useTranslation();
  const current = LANGS.find((l) => i18n.language?.startsWith(l.code)) ?? LANGS[1];

  const change = (code: string) => {
    // In-session only; nothing stored, so the URL decides language on every load.
    void i18n.changeLanguage(code);
  };

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
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => change(l.code)}
            className={i18n.language?.startsWith(l.code) ? "font-semibold" : ""}
          >
            <span className="mr-2">{l.flag}</span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
