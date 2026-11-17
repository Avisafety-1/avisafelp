import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /en/aviops; keep old links working.
export const Route = createFileRoute("/de/ops-dashboard")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/de/aviops", statusCode: 301 });
  },
});
