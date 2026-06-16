import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const FOLDER_ID = Deno.env.get("DRIVE_MEDIA_FOLDER_ID") ?? "1fkX3wG0ojgV9cn2XdrsDxYmotHpL8V56";
const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";

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

function classify(mime: string): "image" | "video" | "other" {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "other";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const driveKey = Deno.env.get("GOOGLE_DRIVE_API_KEY");
  if (!lovableKey || !driveKey) {
    return new Response(
      JSON.stringify({ error: "Missing LOVABLE_API_KEY or GOOGLE_DRIVE_API_KEY" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const q = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed=false`);
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
      return new Response(
        JSON.stringify({ error: "Drive API error", status: res.status, details: text }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = (await res.json()) as { files?: DriveFile[] };
    const files = (data.files ?? []).map((f) => {
      const kind = classify(f.mimeType);
      const width = f.imageMediaMetadata?.width ?? f.videoMediaMetadata?.width;
      const height = f.imageMediaMetadata?.height ?? f.videoMediaMetadata?.height;
      return {
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        kind,
        size: f.size ? Number(f.size) : undefined,
        modifiedTime: f.modifiedTime,
        thumbnail: f.thumbnailLink ?? null,
        url: `https://drive.google.com/uc?export=view&id=${f.id}`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`,
        embedUrl: kind === "video" ? `https://drive.google.com/file/d/${f.id}/preview` : null,
        width,
        height,
      };
    });

    return new Response(JSON.stringify({ files }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", message: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
