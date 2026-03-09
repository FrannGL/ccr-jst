import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Calendar } from "lucide-react";

import { MODOS_JST } from "@/constants";
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

import { useNuevoSuceso } from "../../context/NuevoSucesoContext";
import { weatherConditions, eventClassificationsByMode } from "../../constants";

export function BasicDataStep() {
  const { form, onSubmit } = useNuevoSuceso();
  const selectedTransportMode = form.watch("transportMode");
  const selectedWeatherCondition = form.watch("weatherCondition");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Transport Mode */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          MODO DE TRANSPORTE
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MODOS_JST.slice(0, 4).map((mode) => {
            const { Icon } = mode;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  const isCurrent = selectedTransportMode === mode.id;
                  form.setValue("transportMode", isCurrent ? "" : mode.id);
                  form.setValue("eventClassification", "");
                }}
                className={`cursor-pointer p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
                  selectedTransportMode === mode.id
                    ? "border-jst-500 bg-jst-50 text-jst-700 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200 text-slate-600"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-8 h-8 ${
                      selectedTransportMode === mode.id
                        ? "text-jst-500"
                        : "text-slate-500"
                    }`}
                  />
                )}
                <span className="text-sm font-semibold">{mode.label}</span>
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
          key={selectedTransportMode}
          disabled={!selectedTransportMode}
          value={form.watch("eventClassification")}
          onValueChange={(value) => form.setValue("eventClassification", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                selectedTransportMode
                  ? "Seleccione una opción..."
                  : "Primero seleccione un modo..."
              }
            />
          </SelectTrigger>
          <SelectContent position="popper">
            {selectedTransportMode &&
              eventClassificationsByMode[
                selectedTransportMode as keyof typeof eventClassificationsByMode
              ]?.map((classification) => (
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
                onSelect={(date) => date && form.setValue("eventDate", date)}
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
                  form.setValue("weatherCondition", condition.id);
                }}
                className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  selectedWeatherCondition === condition.id
                    ? "border-jst-500 bg-jst-50 text-jst-700 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200 text-slate-600"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-6 h-6 ${
                      selectedWeatherCondition === condition.id
                        ? "text-jst-500"
                        : "text-slate-500"
                    }`}
                  />
                )}
                <span className="text-xs font-semibold">{condition.label}</span>
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
  );
}
