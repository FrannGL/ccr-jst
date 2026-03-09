import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

import type { WheatherCondition } from "@/types/modos-jst";

export const weatherConditions: WheatherCondition[] = [
  { id: "despejado", label: "Despejado", Icon: Sun },
  { id: "nublado", label: "Nublado", Icon: Cloud },
  { id: "lluvia", label: "Lluvia", Icon: CloudRain },
  { id: "nieve", label: "Nieve", Icon: CloudSnow },
  { id: "tormenta", label: "Tormenta", Icon: CloudLightning },
];
