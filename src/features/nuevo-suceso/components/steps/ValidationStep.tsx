import { format } from "date-fns";
import {
  Info,
  MapPin,
  CarFront,
  BellRing,
  FileText,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import type { VehicleFormValues } from "../../schemas/vehicles-data";

import { responseTypes } from "../../constants";
import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

interface SummarySectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SummarySection = ({
  title,
  icon: Icon,
  children,
}: SummarySectionProps) => (
  <div className="space-y-3 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
    <div className="flex items-center gap-2 text-jst-700 font-bold text-xs uppercase tracking-widest">
      <Icon className="w-4 h-4" />
      {title}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

interface DataItemProps {
  label: string;
  value: string | number | null | undefined;
}

const DataItem = ({ label, value }: DataItemProps) => {
  if (!value && value !== 0) return null;
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-gray-400 font-semibold uppercase">
        {label}
      </p>
      <p className="text-sm text-gray-700 font-medium">{value}</p>
    </div>
  );
};

export function ValidationStep() {
  const { form } = useNuevoSuceso();
  const values = form.getValues();

  return (
    <div className="space-y-8 mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-jst-500" />
          Validación del Suceso
        </h3>
        <p className="text-sm text-gray-500">
          Revise los datos ingresados y determine el curso de acción.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Izquierdo: Resumen de Datos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Resumen de Información
            </h4>
            <Separator />

            {/* Datos Básicos */}
            <SummarySection title="Datos Básicos" icon={Info}>
              <DataItem label="Modo" value={values.transportMode} />
              <DataItem
                label="Clasificación"
                value={values.eventClassification}
              />
              <DataItem
                label="Fecha"
                value={
                  values.eventDate
                    ? format(values.eventDate as Date, "dd/MM/yyyy")
                    : "-"
                }
              />
              <DataItem label="Hora" value={values.eventTime} />
              <DataItem label="Meteorología" value={values.weatherCondition} />
            </SummarySection>

            {/* Ubicación */}
            <SummarySection title="Ubicación" icon={MapPin}>
              <DataItem label="Lugar" value={values.lugar} />
              <DataItem label="Dirección" value={values.direccion} />
              <DataItem
                label="Coordenadas"
                value={`${values.latitud}, ${values.longitud}`}
              />
            </SummarySection>

            {/* Vehículos */}
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-jst-700 font-bold text-xs uppercase tracking-widest">
                <CarFront className="w-4 h-4" />
                Vehículos ({values.vehicles?.length || 0})
              </div>
              <div className="space-y-2">
                {values.vehicles?.map((v: VehicleFormValues, i: number) => (
                  <div
                    key={i}
                    className="text-sm bg-white p-2 rounded border border-gray-100 flex justify-between"
                  >
                    <span className="font-medium text-gray-700">{v.type}</span>
                    <span className="text-gray-400 font-mono text-xs">
                      {v.matricula || v.dominio || v.nombre || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notificación */}
            <SummarySection title="Notificación" icon={BellRing}>
              <DataItem label="Canal" value={values.notificationChannel} />
              <DataItem label="Organismo" value={values.notifyingOrganism} />
              <DataItem
                label="Fecha"
                value={
                  values.notificationDate
                    ? format(values.notificationDate as Date, "dd/MM/yyyy")
                    : "-"
                }
              />
              <DataItem label="Hora" value={values.notificationTime} />
            </SummarySection>

            {/* Reseña */}
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-jst-700 font-bold text-xs uppercase tracking-widest">
                <FileText className="w-4 h-4" />
                Reseña
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "{values.review}"
              </p>
              {values.sourceLink && (
                <div className="flex items-center gap-2 text-jst-500 text-xs font-semibold">
                  <ExternalLink className="w-3 h-3" />
                  <a
                    href={values.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Ver fuente original
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lado Derecho: Acciones de Validación */}
        <div className="space-y-6">
          <div className="bg-jst-50/50 p-6 rounded-xl border border-jst-100 space-y-6 sticky top-6">
            <h4 className="text-sm font-bold text-jst-900 uppercase tracking-widest">
              Acción Final
            </h4>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tipo de Respuesta
              </Label>
              <Select
                onValueChange={(value) => form.setValue("responseType", value)}
                defaultValue={form.watch("responseType")}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  {responseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.responseType && (
                <p className="text-red-500 text-[10px] mt-1">
                  {form.formState.errors.responseType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Observaciones
              </Label>
              <Textarea
                placeholder="Ingrese observaciones de validación..."
                className="min-h-30 bg-white text-sm resize-none"
                {...form.register("observations")}
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-700">
                <Info className="w-4 h-4 shrink-0" />
                <p className="text-[11px] leading-tight">
                  Al confirmar la validación, el suceso será registrado
                  formalmente en el sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
