import type MapLibreGL from "maplibre-gl";

import { MapPin } from "lucide-react";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressAutocomplete } from "@/components/custom/address-autocomplete";
import {
  Map,
  MapMarker,
  MapControls,
  MarkerPopup,
  MarkerContent,
} from "@/components/ui/map";

import type { AddressSuggestion } from "../../types";

import { useNuevoSuceso } from "../../context/NuevoSucesoContext";

export function LocationStep() {
  const { form } = useNuevoSuceso();
  const mapRef = useRef<MapLibreGL.Map | null>(null);
  const [coordinatesSetByAutocomplete, setCoordinatesSetByAutocomplete] =
    useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const lugar = watch("lugar");
  const direccion = watch("direccion");
  const latitud = watch("latitud");
  const longitud = watch("longitud");

  const hasCoordinates =
    latitud &&
    longitud &&
    !isNaN(parseFloat(latitud.toString())) &&
    !isNaN(parseFloat(longitud.toString()));

  const handleAddressSelect = (address: AddressSuggestion) => {
    setValue("direccion", address.display_name);
    setValue("latitud", address.lat);
    setValue("longitud", address.lon);
    setCoordinatesSetByAutocomplete(true);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [address.lon, address.lat],
        zoom: 16,
        duration: 1500,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="direccion"
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          Dirección
        </Label>
        <AddressAutocomplete
          value={direccion || ""}
          onChange={(value) => setValue("direccion", value)}
          onSelectAddress={handleAddressSelect}
          placeholder="Ej: Av. Corrientes 1000, Buenos Aires..."
        />
        {errors.direccion && (
          <p className="text-red-500 text-sm mt-1">
            {errors.direccion.message}
          </p>
        )}
      </div>

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
            disabled={coordinatesSetByAutocomplete}
            className={
              coordinatesSetByAutocomplete
                ? "cursor-not-allowed! opacity-60"
                : ""
            }
            {...register("latitud", { valueAsNumber: true })}
            onChange={() => setCoordinatesSetByAutocomplete(false)}
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
            disabled={coordinatesSetByAutocomplete}
            className={
              coordinatesSetByAutocomplete
                ? "cursor-not-allowed! opacity-60"
                : ""
            }
            {...register("longitud", { valueAsNumber: true })}
            onChange={() => setCoordinatesSetByAutocomplete(false)}
          />
          {errors.longitud && (
            <p className="text-red-500 text-sm mt-1">
              {errors.longitud.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ubicación en mapa
          </h3>
        </div>

        <div className="h-64 rounded-lg overflow-hidden border">
          <Map
            ref={mapRef}
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
