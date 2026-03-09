import type { Paginacion } from "@/features/tablero/types/paginacion";

export interface Evento {
  id: number;
  fecha: string;
  modo: "AERONÁUTICO" | "AUTOMOTOR" | "FERROVIARIO" | "MARÍTIMO";
  ubicacion: string;
  tipo: string;
  canalNotificacion:
    | "E-mail Corporativo"
    | "Llamada 911"
    | "Radio Operativa"
    | "Portal Web";
  tipoRespuesta: "INVESTIGACIÓN" | "GRAVE" | "SEGUIMIENTO" | "ARCHIVO";
}

export const mockEventos: Evento[] = [
  {
    id: 1,
    fecha: "24 Mayo 2024, 14:22 UTC",
    modo: "AERONÁUTICO",
    ubicacion: "Ezeiza, Buenos Aires, Aeropuerto Int. Ministro Pistarini",
    tipo: "Falla de Motor en Vuelo",
    canalNotificacion: "E-mail Corporativo",
    tipoRespuesta: "INVESTIGACIÓN",
  },
  {
    id: 2,
    fecha: "23 Mayo 2024, 09:15 UTC",
    modo: "AUTOMOTOR",
    ubicacion: "Rosario, Santa Fe, Ruta Nacional 9, km 245",
    tipo: "Colisión Frontal Múltiple",
    canalNotificacion: "Llamada 911",
    tipoRespuesta: "GRAVE",
  },
  {
    id: 3,
    fecha: "22 Mayo 2024, 22:45 UTC",
    modo: "FERROVIARIO",
    ubicacion: "Quilmes, GBA, Estación Quilmes - Línea Roca",
    tipo: "Descarrilamiento Leve",
    canalNotificacion: "Radio Operativa",
    tipoRespuesta: "SEGUIMIENTO",
  },
  {
    id: 4,
    fecha: "21 Mayo 2024, 03:30 UTC",
    modo: "MARÍTIMO",
    ubicacion: "Puerto Madero, CABA, Terminal 4, Puerto B.A.",
    tipo: "Incidente en Muelle de Carga",
    canalNotificacion: "Portal Web",
    tipoRespuesta: "ARCHIVO",
  },
  {
    id: 5,
    fecha: "20 Mayo 2024, 18:10 UTC",
    modo: "AUTOMOTOR",
    ubicacion: "Mendoza Capital, Av. San Martín y Garibaldi",
    tipo: "Vuelco de Vehículo de Carga",
    canalNotificacion: "E-mail Corporativo",
    tipoRespuesta: "INVESTIGACIÓN",
  },
  {
    id: 6,
    fecha: "19 Mayo 2024, 11:45 UTC",
    modo: "AERONÁUTICO",
    ubicacion: "Córdoba, Aeropuerto Internacional Ambrosio Taravella",
    tipo: "Aterrizaje de Emergencia",
    canalNotificacion: "Radio Operativa",
    tipoRespuesta: "SEGUIMIENTO",
  },
  {
    id: 7,
    fecha: "18 Mayo 2024, 16:30 UTC",
    modo: "FERROVIARIO",
    ubicacion: "Constitución, CABA, Estación Constitución - Línea Roca",
    tipo: "Falla en Sistema de Señalización",
    canalNotificacion: "Portal Web",
    tipoRespuesta: "INVESTIGACIÓN",
  },
  {
    id: 8,
    fecha: "17 Mayo 2024, 08:20 UTC",
    modo: "MARÍTIMO",
    ubicacion: "La Plata, Buenos Aires, Puerto de La Plata - Muelle 3",
    tipo: "Derrame de Combustible",
    canalNotificacion: "Llamada 911",
    tipoRespuesta: "GRAVE",
  },
  {
    id: 9,
    fecha: "16 Mayo 2024, 20:15 UTC",
    modo: "AUTOMOTOR",
    ubicacion: "Mar del Plata, Ruta 2, km 385",
    tipo: "Accidente Multiple con Lesionados",
    canalNotificacion: "Radio Operativa",
    tipoRespuesta: "GRAVE",
  },
  {
    id: 10,
    fecha: "15 Mayo 2024, 13:50 UTC",
    modo: "AERONÁUTICO",
    ubicacion: "Bariloche, Aeropuerto Internacional Teniente Luis Candelaria",
    tipo: "Pérdida de Comunicación",
    canalNotificacion: "E-mail Corporativo",
    tipoRespuesta: "SEGUIMIENTO",
  },
  {
    id: 11,
    fecha: "14 Mayo 2024, 07:25 UTC",
    modo: "MARÍTIMO",
    ubicacion: "Bahía Blanca, Puerto de Bahía Blanca - Terminal 1",
    tipo: "Colisión entre Embarcaciones",
    canalNotificacion: "Portal Web",
    tipoRespuesta: "INVESTIGACIÓN",
  },
  {
    id: 12,
    fecha: "13 Mayo 2024, 19:40 UTC",
    modo: "FERROVIARIO",
    ubicacion: "Once, CABA, Estación Once - Línea Sarmiento",
    tipo: "Incidente en Andén de Pasajeros",
    canalNotificacion: "Llamada 911",
    tipoRespuesta: "ARCHIVO",
  },
];

export const mockPaginacion: Paginacion = {
  anterior: "",
  siguiente: "2",
  max: 3,
  actual: 1,
  q: "",
  registros: 25,
};
