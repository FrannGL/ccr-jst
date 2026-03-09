import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NuevoSucesoForm } from "@/features/nuevo-suceso/components/NuevoSucesoForm";

export function NuevoSucesoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <Link to="/" className="w-fit inline-block">
            <Button className="cursor-pointer bg-jst-500 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Nuevo Suceso</h1>
        <p className="text-gray-600">
          Complete el formulario para registrar un nuevo suceso de transporte
        </p>
      </div>

      <Separator />

      <div className="mt-8">
        <NuevoSucesoForm />
      </div>
    </div>
  );
}
