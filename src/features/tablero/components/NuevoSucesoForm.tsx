import * as z from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Car,
  Sun,
  Ship,
  Clock,
  Plane,
  Train,
  Cloud,
  Calendar,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

const transportModes = [
  { id: "aeronautico", label: "Aeronáutico", Icon: Plane },
  { id: "maritimo", label: "Marítimo", Icon: Ship },
  { id: "ferroviario", label: "Ferroviario", Icon: Train },
  { id: "automotor", label: "Automotor", Icon: Car },
];

const weatherConditions = [
  { id: "despejado", label: "Despejado", Icon: Sun },
  { id: "nublado", label: "Nublado", Icon: Cloud },
  { id: "lluvia", label: "Lluvia", Icon: CloudRain },
  { id: "nieve", label: "Nieve", Icon: CloudSnow },
  { id: "tormenta", label: "Tormenta", Icon: CloudLightning },
];

const eventClassifications = [
  "Falla de Motor en Vuelo",
  "Incidente en Pista",
  "Colisión en Tierra",
  "Pérdida de Comunicaciones",
  "Emergencia Médica",
  "Otro",
];

const steps = [
  "Datos Básicos",
  "Ubicación",
  "Vehículos",
  "Notificación",
  "Reseña",
  "Validación",
];

const basicDataSchema = z.object({
  transportMode: z.string().min(1, "Seleccione un modo de transporte"),
  eventClassification: z.string().min(1, "Seleccione una clasificación"),
  eventDate: z.date().refine((date) => date !== undefined, {
    message: "Seleccione una fecha",
  }),
  eventTime: z.string().min(1, "Ingrese una hora"),
  weatherCondition: z.string().min(1, "Seleccione una condición meteorológica"),
});

type BasicDataFormValues = z.infer<typeof basicDataSchema>;

interface NuevoSucesoFormProps {
  onSaveDraft?: () => void;
}

export function NuevoSucesoForm({ onSaveDraft }: NuevoSucesoFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTransportMode, setSelectedTransportMode] = useState("");
  const [selectedWeatherCondition, setSelectedWeatherCondition] = useState("");

  const form = useForm<BasicDataFormValues>({
    resolver: zodResolver(basicDataSchema),
    defaultValues: {
      transportMode: "",
      eventClassification: "",
      eventTime: "",
      weatherCondition: "",
    },
  });

  const onSubmit = (data: BasicDataFormValues) => {
    console.log("Form data:", data);
    // Handle form submission
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 p-6 pb-3 bg-white rounded-xl border border-gray-200 shadow-lg">
        {/* Círculos y líneas en una fila */}
        <div className="px-4">
          <div className="flex items-start">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Contenedor del paso (círculo + label) */}
                <div
                  className="flex flex-col items-center relative shrink-0"
                  style={{ width: "40px" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 z-10 bg-white transition-all duration-300 ${
                      index <= currentStep
                        ? "border-jst-500 text-jst-500 shadow-sm"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Label del paso */}
                  <div
                    className={`absolute top-12 w-24 text-center text-[11px] leading-tight transition-all duration-300 ${
                      index === currentStep
                        ? "text-jst-700 font-bold"
                        : "text-gray-500 font-medium"
                    }`}
                  >
                    {step}
                  </div>
                </div>

                {/* Línea conectora */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mt-5 bg-gray-100 self-start transition-all duration-300">
                    <div
                      className={`h-full bg-jst-500 transition-all duration-500 ${
                        index < currentStep ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Espaciador para las labels absolute */}
          <div className="h-10" />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          Paso {currentStep + 1}: {steps[currentStep]}
        </h2>

        {currentStep === 0 && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Transport Mode */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                MODO DE TRANSPORTE
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {transportModes.map((mode) => {
                  const { Icon } = mode;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setSelectedTransportMode(mode.id);
                        form.setValue("transportMode", mode.id);
                      }}
                      className={`cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
                        selectedTransportMode === mode.id
                          ? "border-jst-500 bg-jst-50 text-jst-700 shadow-sm"
                          : "border-gray-100 bg-white hover:border-gray-200 text-slate-600"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          selectedTransportMode === mode.id
                            ? "text-jst-500"
                            : "text-slate-500"
                        }`}
                      />
                      <span className="text-sm font-semibold">
                        {mode.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {form.formState.errors.transportMode && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.transportMode.message}
                </p>
              )}
            </div>

            {/* Event Classification */}
            <div>
              <Label
                htmlFor="eventClassification"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                CLASIFICACIÓN DEL EVENTO
              </Label>
              <Select
                onValueChange={(value) =>
                  form.setValue("eventClassification", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione una opción..." />
                </SelectTrigger>
                <SelectContent>
                  {eventClassifications.map((classification) => (
                    <SelectItem key={classification} value={classification}>
                      {classification}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.eventClassification && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.eventClassification.message}
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="eventDate"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  FECHA DEL SUCESO
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {form.watch("eventDate")
                        ? format(form.watch("eventDate") as Date, "PPP", {
                            locale: es,
                          })
                        : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={form.watch("eventDate") || undefined}
                      onSelect={(date) =>
                        date && form.setValue("eventDate", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.eventDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.eventDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="eventTime"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  HORA (LOCAL)
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="eventTime"
                    type="time"
                    className="pl-10"
                    {...form.register("eventTime")}
                  />
                </div>
                {form.formState.errors.eventTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.eventTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Weather Conditions */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                CONDICIONES METEOROLÓGICAS
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {weatherConditions.map((condition) => {
                  const { Icon } = condition;
                  return (
                    <button
                      key={condition.id}
                      type="button"
                      onClick={() => {
                        setSelectedWeatherCondition(condition.id);
                        form.setValue("weatherCondition", condition.id);
                      }}
                      className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        selectedWeatherCondition === condition.id
                          ? "border-jst-500 bg-jst-50 text-jst-700 shadow-sm"
                          : "border-gray-100 bg-white hover:border-gray-200 text-slate-600"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          selectedWeatherCondition === condition.id
                            ? "text-jst-500"
                            : "text-slate-500"
                        }`}
                      />
                      <span className="text-xs font-semibold">
                        {condition.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {form.formState.errors.weatherCondition && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.weatherCondition.message}
                </p>
              )}
            </div>
          </form>
        )}

        {/* Other steps placeholder */}
        {currentStep > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Contenido del paso {currentStep + 1} en construcción...
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← Anterior
          </Button>
          <Button type="button" variant="outline" onClick={onSaveDraft}>
            Guardar Borrador
          </Button>
        </div>

        <Button
          type="button"
          onClick={nextStep}
          className="bg-jst-500 hover:bg-jst-600 text-white"
        >
          Siguiente Paso →
        </Button>
      </div>
    </div>
  );
}
