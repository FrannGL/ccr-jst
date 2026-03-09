import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFiltersStore } from "@/features/tablero/store";
import { SucesosTable } from "@/features/tablero/components/SucesosTable";
import { TableroHeader } from "@/features/tablero/components/TableroTopBar";
import { TableroFilters } from "@/features/tablero/components/TableroFilters";

export function HomePage() {
  const { filters, setFilters } = useFiltersStore();

  return (
    <div className="app-container-wide flex-1 pt-6 space-y-6">
      <TableroHeader />
      <Separator />
      <div className="flex justify-between items-center">
        <TableroFilters values={filters} onChange={setFilters} />
        <Button variant="outline" className="mt-12">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="mt-8">
        <SucesosTable />
      </div>
    </div>
  );
}
