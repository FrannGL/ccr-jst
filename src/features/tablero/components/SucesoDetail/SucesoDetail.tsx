import {
  Clock,
  Cloud,
  Phone,
  Users,
  ArrowLeft,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

interface SucesoDetailProps {
  sucesoId?: number;
  onBack?: () => void;
}

const mockSucesoDetail = {
  fechaHoraCarga: "24 Mayo 2024, 14:30 UTC",
  fechaHoraNotificacion: "24 Mayo 2024, 14:22 UTC",
  fechaHoraSuceso: "24 Mayo 2024, 14:15 UTC",
  modo: "AERONÁUTICO",
  ubicacion: "Ezeiza, Buenos Aires, Aeropuerto Int. Ministro Pistarini",
  tipoEvento: "Falla de Motor en Vuelo",
  tipoTransporte: "Aeronave Comercial - Boeing 737-800",
  heridos: 0,
  fallecidos: 0,
  canalNotificacion: "E-mail Corporativo",
  organismoNotificante: "Aerolíneas Argentinas",
  agenteCCR: "Juan Pérez",
  tipoRespuesta: "INVESTIGACIÓN",
  fechaHoraPublicacionWhatsApp: "24 Mayo 2024, 15:00 UTC",
  sedeInterviene: "Sede Central - Buenos Aires",
  fechaHoraLlegada: "24 Mayo 2024, 16:30 UTC",
  meteorologia: "Cielo despejado, 18°C, vientos de 15 km/h NE",
  coordenadas: "34°49'20.0\"S 58°32'10.0\"W",
  resena:
    "Aeronave experimentó falla en motor izquierdo durante fase de ascenso. Tripulación ejecutó procedimientos de emergencia y realizó aterrizaje seguro. No se reportan lesionados. Se activó protocolo de investigación de seguridad aérea.",
};

export function SucesoDetail({ sucesoId, onBack }: SucesoDetailProps) {
  const getModoBadge = (modo: string) => {
    const variants = {
      AERONÁUTICO: "bg-blue-100 text-blue-800 border-blue-200",
      AUTOMOTOR: "bg-orange-100 text-orange-800 border-orange-200",
      FERROVIARIO: "bg-red-100 text-red-800 border-red-200",
      MARÍTIMO: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            modo === "AERONÁUTICO"
              ? "bg-blue-500"
              : modo === "AUTOMOTOR"
                ? "bg-orange-500"
                : modo === "FERROVIARIO"
                  ? "bg-red-500"
                  : "bg-green-500"
          }`}
        />
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variants[modo as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}`}
        >
          {modo}
        </span>
      </div>
    );
  };

  const getRespuestaBadge = (respuesta: string) => {
    const variants = {
      INVESTIGACIÓN: "bg-blue-600 text-white border-blue-600",
      GRAVE: "bg-red-600 text-white border-red-600",
      SEGUIMIENTO: "bg-orange-500 text-white border-orange-500",
      ARCHIVO: "bg-gray-500 text-white border-gray-500",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variants[respuesta as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}`}
      >
        {respuesta}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Detalle del Suceso
            </h1>
            <p className="text-gray-600">ID: {sucesoId || "3250"}</p>
          </div>
        </div>
        {getModoBadge(mockSucesoDetail.modo)}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Temporal */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Información Temporal
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Fecha y hora de carga:</span>
              <span className="font-medium">
                {mockSucesoDetail.fechaHoraCarga}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                Fecha y hora de notificación:
              </span>
              <span className="font-medium">
                {mockSucesoDetail.fechaHoraNotificacion}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Fecha y hora del suceso:</span>
              <span className="font-medium">
                {mockSucesoDetail.fechaHoraSuceso}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                Fecha y hora publicación WhatsApp:
              </span>
              <span className="font-medium">
                {mockSucesoDetail.fechaHoraPublicacionWhatsApp}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">
                Fecha y hora llegada al suceso:
              </span>
              <span className="font-medium">
                {mockSucesoDetail.fechaHoraLlegada}
              </span>
            </div>
          </div>
        </div>

        {/* Información del Suceso */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gray-600" />
            Información del Suceso
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Modo:</span>
              <span className="font-medium">{mockSucesoDetail.modo}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Ubicación:</span>
              <span className="font-medium text-right max-w-xs">
                {mockSucesoDetail.ubicacion}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tipo de evento:</span>
              <span className="font-medium text-right max-w-xs">
                {mockSucesoDetail.tipoEvento}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tipo de transporte:</span>
              <span className="font-medium text-right max-w-xs">
                {mockSucesoDetail.tipoTransporte}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Coordenadas:</span>
              <span className="font-medium text-sm">
                {mockSucesoDetail.coordenadas}
              </span>
            </div>
          </div>
        </div>

        {/* Información de Víctimas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            Información de Víctimas
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Heridos:</span>
              <span className="font-medium text-lg">
                {mockSucesoDetail.heridos}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Fallecidos:</span>
              <span className="font-medium text-lg text-red-600">
                {mockSucesoDetail.fallecidos}
              </span>
            </div>
          </div>
        </div>

        {/* Información de Notificación */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-600" />
            Información de Notificación
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Canal de notificación:</span>
              <span className="font-medium">
                {mockSucesoDetail.canalNotificacion}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Organismo notificante:</span>
              <span className="font-medium">
                {mockSucesoDetail.organismoNotificante}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Agente CCR:</span>
              <span className="font-medium">{mockSucesoDetail.agenteCCR}</span>
            </div>
          </div>
        </div>

        {/* Información de Respuesta */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            Información de Respuesta
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tipo de respuesta:</span>
              <div>{getRespuestaBadge(mockSucesoDetail.tipoRespuesta)}</div>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">SEDE que interviene:</span>
              <span className="font-medium text-right max-w-xs">
                {mockSucesoDetail.sedeInterviene}
              </span>
            </div>
          </div>
        </div>

        {/* Información Ambiental */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-gray-600" />
            Información Ambiental
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Meteorología:</span>
              <span className="font-medium text-right max-w-xs">
                {mockSucesoDetail.meteorologia}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reseña */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Reseña</h2>
        <p className="text-gray-700 leading-relaxed">
          {mockSucesoDetail.resena}
        </p>
      </div>
    </div>
  );
}
