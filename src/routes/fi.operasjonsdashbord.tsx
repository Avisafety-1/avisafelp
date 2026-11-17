import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /aviops; keep old links working.
export const Route = createFileRoute("/fi/operasjonsdashbord")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/fi/aviops", statusCode: 301 });
  },
});
