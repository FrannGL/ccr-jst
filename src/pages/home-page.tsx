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
      <div className="flex justify-center items-center">
        <TableroFilters values={filters} onChange={setFilters} />
      </div>

      <div className="mt-8">
        <SucesosTable />
      </div>
    </div>
  );
}
