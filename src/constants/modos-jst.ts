import { Car, Ship, Plane, Train } from "lucide-react";

import type { ModoJST } from "@/types/modos-jst";

export const MODOS_JST: ModoJST[] = [
  { id: "automotor", label: "Automotor", Icon: Car },
  { id: "aeronautico", label: "Aeronáutico", Icon: Plane },
  { id: "ferroviario", label: "Ferroviario", Icon: Train },
  { id: "maritimo", label: "Marítimo", Icon: Ship },
  { id: "multimodal", label: "Multimodal" },
];
