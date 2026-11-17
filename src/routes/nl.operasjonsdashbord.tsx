import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /aviops; keep old links working.
export const Route = createFileRoute("/nl/operasjonsdashbord")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/nl/aviops", statusCode: 301 });
  },
});
