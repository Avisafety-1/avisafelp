import { createFileRoute } from "@tanstack/react-router";
import Sora from "@/pages/Sora";

export const Route = createFileRoute("/sora")({
  component: Sora,
});
