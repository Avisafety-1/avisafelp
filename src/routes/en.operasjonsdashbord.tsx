import { createFileRoute, redirect } from "@tanstack/react-router";

// The page moved to /aviops; keep old links working.
export const Route = createFileRoute("/en/operasjonsdashbord")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/en/aviops", statusCode: 301 });
  },
});
