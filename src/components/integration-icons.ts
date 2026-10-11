import {
  Cpu,
  FileText,
  FileWarning,
  Map,
  Plane,
  Radio,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { IntegrationId } from "@/content/integrations";

/** Same icons the old integrations selector used. */
export const INTEGRATION_ICONS: Record<IntegrationId, LucideIcon> = {
  dji: Plane,
  flighthub2: Map,
  safesky: Radio,
  ardupilot: Cpu,
  dronetag: Wifi,
  eccairs: FileWarning,
  loggfiler: FileText,
};
