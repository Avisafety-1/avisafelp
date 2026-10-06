import { createFileRoute } from "@tanstack/react-router";
import ButikkCheckout from "@/pages/ButikkCheckout";

export const Route = createFileRoute("/butikk/checkout")({
  component: ButikkCheckout,
});
