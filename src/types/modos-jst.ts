import type { SelectOption } from "./select-option";

export interface ModoJST extends SelectOption {
  Icon?: React.ComponentType<{ className?: string }>;
}

export type WheatherCondition = ModoJST;
