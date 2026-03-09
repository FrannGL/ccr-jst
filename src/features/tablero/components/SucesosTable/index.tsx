import type { VisibilityState } from "@tanstack/react-table";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DataTable } from "@/components/custom/DataTable";
import { mockEventos, mockPaginacion } from "@/data/mockData";

import { createColumns } from "./columns";

export function SucesosTable() {
  const navigate = useNavigate();
  const columns = createColumns(navigate);

  const isMediumOrSmaller = useMediaQuery("(max-width: 1280px)");

  const columnVisibility: VisibilityState = useMemo(
    () => ({
      tipo: !isMediumOrSmaller,
      canalNotificacion: !isMediumOrSmaller,
    }),
    [isMediumOrSmaller],
  );

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
        columnVisibility={columnVisibility}
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
