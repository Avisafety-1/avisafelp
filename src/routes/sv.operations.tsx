import { localizedHead } from "@/lib/localized-head";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Operations from "@/pages/Operations";

export const Route = createFileRoute("/sv/operations")({
  staticData: { sitemap: false },
  head: (args) => localizedHead((() => pageHead({ path: '/operations', title: 'Drone operations | AviSafe', description: 'AviSafe helps organisations plan and carry out drone operations.' }))(), "sv", "/sv/operations"),
  component: Operations,
});
