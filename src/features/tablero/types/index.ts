export interface SelectOption {
  id: string;
  label: string;
}

export interface TableroFiltersState {
  modoTransporte: string;
  fechaDesde: string;
  fechaHasta: string;
  tipoRespuesta: string;
  ubicacion: string;
  busqueda: string;
}
