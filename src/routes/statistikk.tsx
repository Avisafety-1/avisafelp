import { createFileRoute } from "@tanstack/react-router";
import Statistikk from "@/pages/Statistikk";

export const Route = createFileRoute("/statistikk")({
  component: Statistikk,
});
