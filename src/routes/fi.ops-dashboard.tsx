import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /en/aviops; keep old links working.
export const Route = createFileRoute("/fi/ops-dashboard")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/fi/aviops", statusCode: 301 });
  },
});
