import { useEffect, useState } from "react";

export type DriveMediaFile = {
  id: string;
  name: string;
  mimeType: string;
  kind: "image" | "video" | "other";
  size?: number;
  modifiedTime?: string;
  thumbnail: string | null;
  url: string;
  downloadUrl: string;
  embedUrl: string | null;
  width?: number;
  height?: number;
};

export function useDriveMedia() {
  const [files, setFiles] = useState<DriveMediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supaUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const anon = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

    fetch(`${supaUrl}/functions/v1/drive-media`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { files: DriveMediaFile[] }) => {
        if (cancelled) return;
        setFiles(data.files ?? []);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { files, loading, error };
}
