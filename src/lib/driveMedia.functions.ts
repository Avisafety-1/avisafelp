import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";
const DEFAULT_FOLDER_ID = "1fkX3wG0ojgV9cn2XdrsDxYmotHpL8V56";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  imageMediaMetadata?: { width?: number; height?: number };
  videoMediaMetadata?: { width?: number; height?: number; durationMillis?: string };
};

export type DriveMediaFile = {
  id: string;
  name: string;
  mimeType: string;
  kind: "image" | "video" | "other";
  size: number | null;
  modifiedTime: string | null;
  thumbnail: string | null;
  url: string;
  downloadUrl: string;
  embedUrl: string | null;
  width: number | null;
  height: number | null;
};

function classify(mime: string): "image" | "video" | "other" {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "other";
}

export const driveMedia = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ files: DriveMediaFile[] }> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const driveKey = process.env["GOOGLE_DRIVE_API_KEY"];
    const folderId = process.env["DRIVE_MEDIA_FOLDER_ID"] ?? DEFAULT_FOLDER_ID;
    if (!lovableKey || !driveKey) {
      throw new Error("Missing LOVABLE_API_KEY or GOOGLE_DRIVE_API_KEY");
    }

    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const fields = encodeURIComponent(
      "files(id,name,mimeType,size,modifiedTime,thumbnailLink,imageMediaMetadata,videoMediaMetadata)",
    );
    const url = `${GATEWAY}/files?q=${q}&fields=${fields}&pageSize=200&orderBy=modifiedTime%20desc`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": driveKey,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Drive API error [${res.status}]: ${text}`);
      throw new Error(`Drive API error [${res.status}]: ${text}`);
    }

    const data = (await res.json()) as { files?: DriveFile[] };
    const files = (data.files ?? []).map((f): DriveMediaFile => {
      const kind = classify(f.mimeType);
      const width = f.imageMediaMetadata?.width ?? f.videoMediaMetadata?.width;
      const height = f.imageMediaMetadata?.height ?? f.videoMediaMetadata?.height;
      return {
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        kind,
        size: f.size ? Number(f.size) : null,
        modifiedTime: f.modifiedTime ?? null,
        thumbnail: f.thumbnailLink ?? null,
        url: `https://drive.google.com/uc?export=view&id=${f.id}`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`,
        embedUrl: kind === "video" ? `https://drive.google.com/file/d/${f.id}/preview` : null,
        width: width ?? null,
        height: height ?? null,
      };
    });

    return { files };
  },
);
