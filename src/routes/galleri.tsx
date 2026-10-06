import { createFileRoute } from "@tanstack/react-router";
import Galleri from "@/pages/Galleri";

export const Route = createFileRoute("/galleri")({
  component: Galleri,
});
