import type { TableroFiltersState } from "@/features/tablero/types";

export interface FiltersStore {
  filters: TableroFiltersState;
  setFilters: (filters: TableroFiltersState) => void;
  updateFilter: <K extends keyof TableroFiltersState>(
    key: K,
    value: string,
  ) => void;
  resetFilters: () => void;
  setModoTransporte: (value: string) => void;
  setTipoRespuesta: (value: string) => void;
  setUbicacion: (value: string) => void;
  setFechaDesde: (value: string) => void;
  setFechaHasta: (value: string) => void;
  setBusqueda: (value: string) => void;
}
