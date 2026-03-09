import { FileText, Link as LinkIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

export function ReviewStep() {
  const { form } = useNuevoSuceso();

  return (
    <div className="space-y-8 mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
          <FileText className="w-5 h-5 text-jst-500" />
          Reseña y Fuentes
        </h3>
        <p className="text-sm text-gray-500">
          Brinde un resumen detallado del suceso y adjunte enlaces a fuentes de
          información si dispone de ellos.
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl">
        {/* Reseña */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="review"
              className="text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              Reseña del Suceso
            </Label>
            <span className="text-[10px] bg-jst-50 text-jst-700 px-2 py-0.5 rounded-full font-bold">
              OBLIGATORIO
            </span>
          </div>
          <div className="relative group">
            <Textarea
              id="review"
              placeholder="Describa brevemente qué ocurrió, los involucrados y cualquier detalle relevante del suceso..."
              className="min-h-50 resize-none border-gray-200 focus:border-jst-500 focus:ring-jst-500 transition-all text-sm leading-relaxed"
              {...form.register("review")}
            />
          </div>
          {form.formState.errors.review && (
            <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
              {form.formState.errors.review.message}
            </p>
          )}
          <p className="text-[11px] text-gray-400 italic">
            Mínimo 10 caracteres. Esta información será la base para la
            validación inicial.
          </p>
        </div>

        <hr className="border-gray-100" />

        {/* Link de la Fuente */}
        <div className="space-y-3">
          <Label
            htmlFor="sourceLink"
            className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2"
          >
            <LinkIcon className="w-3.5 h-3.5 text-gray-400" />
            Link de la Fuente (Opcional)
          </Label>
          <Input
            id="sourceLink"
            type="url"
            placeholder="https://ejemplo.com/noticia-suceso"
            className="border-gray-200 focus:border-jst-500 focus:ring-jst-500"
            {...form.register("sourceLink")}
          />
          {form.formState.errors.sourceLink && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.sourceLink.message}
            </p>
          )}
          <p className="text-[11px] text-gray-400">
            Si el suceso fue reportado en un medio digital, pegue el enlace aquí
            para facilitar la validación.
          </p>
        </div>
      </div>
    </div>
  );
}
