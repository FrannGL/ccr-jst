import type { ColumnDef } from "@tanstack/react-table";

import { useNavigate } from "react-router-dom";
import { Mail, Phone, Radio, Monitor, ExternalLink } from "lucide-react";

import type { Evento } from "@/data/mockData";

import { DataTable } from "@/components/custom/DataTable";
import { mockEventos, mockPaginacion } from "@/data/mockData";

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
        className={`w-2 h-2 rounded-full ${
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
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[modo as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}`}
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[respuesta as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}`}
    >
      {respuesta}
    </span>
  );
};

const getCanalIcon = (canal: string) => {
  const icons = {
    "E-mail Corporativo": <Mail className="w-4 h-4" />,
    "Llamada 911": <Phone className="w-4 h-4" />,
    "Radio Operativa": <Radio className="w-4 h-4" />,
    "Portal Web": <Monitor className="w-4 h-4" />,
  };

  return icons[canal as keyof typeof icons] || <Mail className="w-4 h-4" />;
};

const createColumns = (
  navigate: (path: string) => void,
): ColumnDef<Evento, unknown>[] => [
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-slate-600 font-medium whitespace-nowrap">
        {row.getValue("fecha")}
      </div>
    ),
  },
  {
    accessorKey: "modo",
    header: "Modo",
    cell: ({ row }) => (
      <div className="min-w-[140px]">{getModoBadge(row.getValue("modo"))}</div>
    ),
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => (
      <div
        className="text-slate-600 truncate text-sm max-w-[180px] lg:max-w-[250px] xl:max-w-xs"
        title={row.getValue("ubicacion")}
      >
        {row.getValue("ubicacion")}
      </div>
    ),
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => (
      <div className="text-slate-600 text-sm min-w-[120px]">
        {row.getValue("tipo")}
      </div>
    ),
  },
  {
    accessorKey: "canalNotificacion",
    header: "Canal",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-slate-600 text-sm min-w-[150px]">
        {getCanalIcon(row.getValue("canalNotificacion"))}
        <span className="truncate">{row.getValue("canalNotificacion")}</span>
      </div>
    ),
  },
  {
    accessorKey: "tipoRespuesta",
    header: "Respuesta",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        {getRespuestaBadge(row.getValue("tipoRespuesta"))}
      </div>
    ),
  },
  {
    accessorKey: "detalle",
    header: "Detalle",
    enableSorting: false,
    cell: ({ row }) => (
      <button
        onClick={() => navigate(`/sucesos/${row.original.id}`)}
        className="cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-colors group"
        title="Ver detalles"
      >
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
      </button>
    ),
  },
];

export function EjemploDataTable() {
  const navigate = useNavigate();
  const columns = createColumns(navigate);

  const handlePageChange = (page: number) => {
    console.log("Cambiando a página:", page);
  };

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={mockEventos}
        paginas={mockPaginacion}
        onPageChange={handlePageChange}
        emptyMessage="No se encontraron incidentes"
        mobileCardConfig={{
          header: { left: "fecha", right: "modo" },
          body: [
            { label: "Ubicación", columnId: "ubicacion" },
            { label: "Tipo", columnId: "tipo" },
            { label: "Canal", columnId: "canalNotificacion" },
          ],
          footer: "tipoRespuesta",
        }}
      />
    </div>
  );
}
