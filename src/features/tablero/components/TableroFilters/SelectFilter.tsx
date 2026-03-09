import type { SelectOption } from "@/types";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

interface SelectFilterProps {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function SelectFilter({
  label,
  placeholder,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  return (
    <Field>
      <FieldLabel className="text-gray-500">{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
