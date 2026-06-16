import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDriveMedia, type DriveMediaFile } from "@/hooks/use-drive-media";
import { Download } from "lucide-react";

export function DriveMediaGrid() {
  const { t } = useTranslation();
  const { files, loading, error } = useDriveMedia();
  const [active, setActive] = useState<DriveMediaFile | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl bg-white/40 backdrop-blur-sm animate-pulse border border-white/60"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {t("media.error", "Kunne ikke laste mediefiler.")}
      </p>
    );
  }

  if (files.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        {t("media.empty", "Ingen mediefiler ennå.")}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            aria-label={t("media.open", "Åpne") + " " + f.name}
          >
            {f.thumbnail ? (
              <img
                src={f.thumbnail.replace(/=s\d+$/, "=s600")}
                alt={f.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground p-3 text-center">
                {f.name}
              </div>
            )}
            {f.kind === "video" && (
              <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                VIDEO
              </span>
            )}
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background">
          {active && (
            <div className="flex flex-col">
              <div className="bg-black flex items-center justify-center max-h-[80vh]">
                {active.kind === "image" ? (
                  <img
                    src={active.url}
                    alt={active.name}
                    className="max-h-[80vh] w-auto object-contain"
                  />
                ) : active.kind === "video" && active.embedUrl ? (
                  <iframe
                    src={active.embedUrl}
                    title={active.name}
                    allow="autoplay"
                    className="w-full aspect-video"
                  />
                ) : (
                  <div className="p-8 text-white">{active.name}</div>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 p-4">
                <p className="text-sm truncate">{active.name}</p>
                <a
                  href={active.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#123b87] px-3 py-2 text-xs font-medium text-white hover:opacity-90"
                >
                  <Download className="h-3.5 w-3.5" />
                  {t("media.download", "Last ned")}
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
