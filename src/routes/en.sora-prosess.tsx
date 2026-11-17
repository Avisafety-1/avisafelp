import { createFileRoute, redirect } from "@tanstack/react-router";

// The process page was merged into /sora; keep old links working.
export const Route = createFileRoute("/en/sora-prosess")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/en/sora", statusCode: 301 });
  },
});
