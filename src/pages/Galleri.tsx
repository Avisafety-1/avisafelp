import { useTranslation } from "react-i18next";
import { DriveMediaGrid } from "@/components/DriveMediaGrid";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Galleri() {
  const { t } = useTranslation();
  return (
    <main className="relative min-h-screen bg-[hsl(210,30%,96%)]">
      <BackgroundPaths />
      <div className="relative z-10 container mx-auto px-4 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-[hsl(210,45%,12%)]">
            {t("media.title", "Galleri")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t("media.subtitle", "Bilder og videoer fra AviSafe.")}
          </p>
        </header>
        <DriveMediaGrid />
      </div>
    </main>
  );
}
