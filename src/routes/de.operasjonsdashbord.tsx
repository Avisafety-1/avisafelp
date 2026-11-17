import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /aviops; keep old links working.
export const Route = createFileRoute("/de/operasjonsdashbord")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/de/aviops", statusCode: 301 });
  },
});
