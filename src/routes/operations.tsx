import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import Operations from "@/pages/Operations";

export const Route = createFileRoute("/operations")({
  staticData: { sitemap: false },
  head: () => pageHead({ path: '/operations', title: 'Drone operations | AviSafe', description: 'AviSafe helps organisations plan and carry out drone operations.' }),
  component: Operations,
});
