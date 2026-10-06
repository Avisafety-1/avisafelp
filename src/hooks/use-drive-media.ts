import { useEffect, useState } from "react";
import { driveMedia, type DriveMediaFile } from "@/lib/driveMedia.functions";

export type { DriveMediaFile };

export function useDriveMedia() {
  const [files, setFiles] = useState<DriveMediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    driveMedia()
      .then((data) => {
        if (cancelled) return;
        setFiles(data.files ?? []);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { files, loading, error };
}
