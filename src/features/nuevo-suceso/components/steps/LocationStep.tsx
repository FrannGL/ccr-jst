import { MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Map,
  MapMarker,
  MapControls,
  MarkerPopup,
  MarkerContent,
} from "@/components/ui/map";

import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

export function LocationStep() {
  const { form } = useNuevoSuceso();

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const lugar = watch("lugar");
  const latitud = watch("latitud");
  const longitud = watch("longitud");

  const hasCoordinates =
    latitud &&
    longitud &&
    !isNaN(parseFloat(latitud.toString())) &&
    !isNaN(parseFloat(longitud.toString()));

  return (
    <div className="space-y-6">
      {/* Referencia */}
      <div>
        <Label
          htmlFor="lugar"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Referencia
        </Label>
        <Input
          id="lugar"
          placeholder="Ej: Estación de servicio ABC, Autopista Central..."
          {...register("lugar")}
        />
        {errors.lugar && (
          <p className="text-red-500 text-sm mt-1">{errors.lugar.message}</p>
        )}
      </div>

      {/* Dirección */}
      <div>
        <Label
          htmlFor="direccion"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Dirección
        </Label>
        <Input
          id="direccion"
          placeholder="Ej: Av. Principal #123, Col. Centro..."
          {...register("direccion")}
        />
        {errors.direccion && (
          <p className="text-red-500 text-sm mt-1">
            {errors.direccion.message}
          </p>
        )}
      </div>

      {/* Coordenadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="latitud"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Latitud
          </Label>
          <Input
            id="latitud"
            placeholder="Ej: -34.6037"
            type="number"
            step="any"
            {...register("latitud", { valueAsNumber: true })}
          />
          {errors.latitud && (
            <p className="text-red-500 text-sm mt-1">
              {errors.latitud.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="longitud"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Longitud
          </Label>
          <Input
            id="longitud"
            placeholder="Ej: -58.3816"
            type="number"
            step="any"
            {...register("longitud", { valueAsNumber: true })}
          />
          {errors.longitud && (
            <p className="text-red-500 text-sm mt-1">
              {errors.longitud.message}
            </p>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ubicación en mapa
          </h3>
        </div>

        <div className="h-64 rounded-lg overflow-hidden border">
          <Map
            center={
              hasCoordinates
                ? [
                    parseFloat(longitud.toString()),
                    parseFloat(latitud.toString()),
                  ]
                : [-63.6167, -38.4161]
            }
            zoom={latitud ? 14 : 4}
            theme="light"
          >
            <MapControls showZoom />
            {hasCoordinates && (
              <MapMarker
                longitude={parseFloat(longitud?.toString() || "0")}
                latitude={parseFloat(latitud?.toString() || "0")}
              >
                <MarkerContent>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500 animate-blink-glow" />
                    <div className="relative h-5 w-5 rounded-full border border-white bg-indigo-600 shadow-lg animate-blink-pulse" />
                  </div>
                </MarkerContent>
                <MarkerPopup closeButton>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {lugar || "Ubicación ingresada"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {parseFloat(latitud?.toString() || "0").toFixed(2)}°S{" "}
                      {parseFloat(longitud?.toString() || "0").toFixed(2)}°W
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${parseFloat(latitud?.toString() || "0")},${parseFloat(longitud?.toString() || "0")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-xs inline-block"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </MarkerPopup>
              </MapMarker>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
