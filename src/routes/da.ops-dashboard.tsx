import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /en/aviops; keep old links working.
export const Route = createFileRoute("/da/ops-dashboard")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/da/aviops", statusCode: 301 });
  },
});
