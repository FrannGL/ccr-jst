import { MODOS_JST, PROVINCIAS, TIPOS_RESPUESTA } from "@/constants";

import type { TableroFiltersState } from "../../types/tablero-filter-state";

import { SelectFilter } from "./SelectFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { QuickSearchFilter } from "./QuickSearchFilter";

interface TableroFiltersProps {
  values: TableroFiltersState;
  onChange: (values: TableroFiltersState) => void;
}

export function TableroFilters({ values, onChange }: TableroFiltersProps) {
  const set =
    <K extends keyof TableroFiltersState>(key: K) =>
    (val: string) =>
      onChange({ ...values, [key]: val });

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        <SelectFilter
          label="Modo de Transporte"
          placeholder="Todos los modos"
          value={values.modoTransporte}
          options={MODOS_JST}
          onChange={set("modoTransporte")}
        />

        <DateRangeFilter
          fechaDesde={values.fechaDesde}
          fechaHasta={values.fechaHasta}
          onChange={(key, val) => set(key)(val)}
        />

        <SelectFilter
          label="Tipo de Respuesta"
          placeholder="Todos los tipos"
          value={values.tipoRespuesta}
          options={TIPOS_RESPUESTA}
          onChange={set("tipoRespuesta")}
        />

        <SelectFilter
          label="Ubicación"
          placeholder="Todas las provincias"
          value={values.ubicacion}
          options={PROVINCIAS}
          onChange={set("ubicacion")}
        />

        <QuickSearchFilter value={values.busqueda} onChange={set("busqueda")} />
      </div>
    </div>
  );
}
