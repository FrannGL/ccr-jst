import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function TableroHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight text-gray-900">
          Tablero de Gestión de Sucesos
        </h1>
        <p className="leading-3 text-sm text-gray-600 mt-2">
          Gestión centralizada de notificaciones de transporte
        </p>
      </div>
      <Link to="/nuevo-suceso">
        <Button className="bg-jst-500 hover:bg-jst-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Suceso
        </Button>
      </Link>
    </div>
  );
}
