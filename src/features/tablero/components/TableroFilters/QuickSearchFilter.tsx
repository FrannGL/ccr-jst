import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

interface QuickSearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuickSearchFilter({ value, onChange }: QuickSearchFilterProps) {
  return (
    <Field>
      <FieldLabel className="text-gray-500">Búsqueda Rápida</FieldLabel>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          id="filter-busqueda"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar suceso..."
          className="pl-8 text-sm"
        />
      </div>
    </Field>
  );
}
