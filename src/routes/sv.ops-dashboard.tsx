import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /en/aviops; keep old links working.
export const Route = createFileRoute("/sv/ops-dashboard")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/sv/aviops", statusCode: 301 });
  },
});
