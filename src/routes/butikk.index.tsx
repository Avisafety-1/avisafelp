import { createFileRoute } from "@tanstack/react-router";
import Butikk from "@/pages/Butikk";

export const Route = createFileRoute("/butikk/")({
  component: Butikk,
});
