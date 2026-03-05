import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SucesoInfo,
  SucesoHeader,
  SucesoReseña,
  SucesoLocation,
} from "@/features/tablero/components/SucesoDetail";

// Mock data - replace with actual API call
const mockSuceso = {
  id: 3250,
  modo: "AERONÁUTICO",
  nro_expediente: "EXP-2024-3250",
  estado: "Activo",
  fecha: "2024-05-24",
  hora: "14:15",
  clase_evento: "Falla de Motor en Vuelo",
  lugar: "Ezeiza, Buenos Aires, Aeropuerto Int. Ministro Pistarini",
  latitud: -34.8222,
  longitud: -58.5358,
  reseña:
    "Aeronave experimentó falla en motor izquierdo durante fase de ascenso. Tripulación ejecutó procedimientos de emergencia y realizó aterrizaje seguro. No se reportan lesionados. Se activó protocolo de investigación de seguridad aérea.",
  vehiculos: [
    {
      tipo: "Aeronave Comercial",
      marca: "Boeing",
      modelo: "737-800",
      dominio: "LV-CVO",
    },
  ],
};

export function SucesoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // For now, use mock data. Replace with actual API call using id
  const suceso = mockSuceso;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-90 mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-5 pt-10">
          <Link to="/" className="w-fit inline-block">
            <Button className="cursor-pointer bg-jst-500  text-white  border-0 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Reporte de investigación
        </h1>
        <div className="border-b border-gray-200 my-6" />

        <SucesoHeader suceso={suceso} />
      </div>

      <SucesoInfo suceso={suceso} />
      <SucesoLocation suceso={suceso} />
      <SucesoReseña reseña={suceso.reseña} />
    </div>
  );
}
