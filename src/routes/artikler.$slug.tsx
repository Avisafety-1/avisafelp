import { createFileRoute } from "@tanstack/react-router";
import Artikkel from "@/pages/Artikkel";

export const Route = createFileRoute("/artikler/$slug")({
  component: Artikkel,
});
