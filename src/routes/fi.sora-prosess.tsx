import { createFileRoute, redirect } from "@tanstack/react-router";

// The process page was merged into /sora; keep old links working.
export const Route = createFileRoute("/fi/sora-prosess")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/fi/sora", statusCode: 301 });
  },
});
