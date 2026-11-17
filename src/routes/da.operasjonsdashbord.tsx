import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /aviops; keep old links working.
export const Route = createFileRoute("/da/operasjonsdashbord")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/da/aviops", statusCode: 301 });
  },
});
