import { create } from "zustand";

import type { FiltersStore } from "./types";
import type { TableroFiltersState } from "../types/tablero-filter-state";

const initialState: TableroFiltersState = {
  modoTransporte: "",
  fechaDesde: "",
  fechaHasta: "",
  tipoRespuesta: "",
  ubicacion: "",
  busqueda: "",
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: initialState,

  setFilters: (filters: TableroFiltersState) =>
    set(() => ({
      filters,
    })),

  updateFilter: <K extends keyof TableroFiltersState>(key: K, value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  resetFilters: () =>
    set(() => ({
      filters: initialState,
    })),

  setModoTransporte: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        modoTransporte: value,
      },
    })),

  setTipoRespuesta: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tipoRespuesta: value,
      },
    })),

  setUbicacion: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ubicacion: value,
      },
    })),

  setFechaDesde: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        fechaDesde: value,
      },
    })),

  setFechaHasta: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        fechaHasta: value,
      },
    })),

  setBusqueda: (value: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        busqueda: value,
      },
    })),
}));
