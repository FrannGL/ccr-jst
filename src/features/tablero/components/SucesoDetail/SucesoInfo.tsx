interface SucesoInfoProps {
  suceso: {
    fecha?: string;
    hora?: string;
    modo?: string;
    clase_evento?: string;
    vehiculos?: Array<{
      tipo: string;
      marca: string;
      modelo: string;
      dominio?: string;
      matricula?: string;
    }>;
  };
}

export function SucesoInfo({ suceso }: SucesoInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Información del suceso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-medium text-gray-700">Fecha:</span>
            <p className="text-gray-900">
              {formatDate(suceso.fecha)}, {suceso.hora || "N/A"}hs
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Modo:</span>
            <p className="text-gray-900">{suceso.modo || "N/A"}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Clase de suceso:</span>
            <p className="text-gray-900">{suceso.clase_evento || "-"}</p>
          </div>
        </div>
      </div>

      {suceso.vehiculos && suceso.vehiculos.length > 0 && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Vehículos Involucrados
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-700">
                    Tipo
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">
                    Marca
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">
                    Modelo
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">
                    Dominio/Matrícula
                  </th>
                </tr>
              </thead>
              <tbody>
                {suceso.vehiculos.map((vehiculo, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 font-medium">{vehiculo.tipo}</td>
                    <td className="py-2 px-4">{vehiculo.marca}</td>
                    <td className="py-2 px-4">{vehiculo.modelo}</td>
                    <td className="py-2 px-4">
                      {vehiculo.dominio || vehiculo.matricula || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
