interface SucesoHeaderProps {
  suceso: {
    modo: string;
    nro_expediente?: string;
    estado?: string;
  };
}

export function SucesoHeader({ suceso }: SucesoHeaderProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {suceso.modo} | {suceso.nro_expediente || "N/A"}
        </h2>
        <div
          className={
            suceso.estado === "Cerrado" || suceso.estado === "Finalizada"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
          }
        >
          Estado: {suceso.estado || "Activo"}
        </div>
      </div>
    </div>
  );
}
