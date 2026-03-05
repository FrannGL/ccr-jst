import { Suspense } from "react";

import {
  Map,
  MapMarker,
  MapControls,
  MarkerPopup,
  MarkerContent,
} from "@/components/ui/map";

interface SucesoLocationProps {
  suceso: {
    lugar?: string;
    latitud?: number | string;
    longitud?: number | string;
  };
}

export function SucesoLocation({ suceso }: SucesoLocationProps) {
  const lat =
    typeof suceso.latitud === "string"
      ? parseFloat(suceso.latitud)
      : suceso.latitud;
  const lng =
    typeof suceso.longitud === "string"
      ? parseFloat(suceso.longitud)
      : suceso.longitud;

  const hasCoordinates =
    lat !== null && lng !== null && !isNaN(lat!) && !isNaN(lng!);

  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Lugar del suceso
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="font-medium text-gray-700">Localidad:</span>
          <p className="text-gray-900">{suceso.lugar || "No disponible"}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Coordenadas:</span>
          <p className="text-gray-900">
            {hasCoordinates
              ? `${lat!.toFixed(2)}°S ${lng!.toFixed(2)}°W`
              : "No disponibles"}
          </p>
        </div>
      </div>

      {hasCoordinates && (
        <div className="mt-6">
          <div className="h-64 rounded-lg overflow-hidden border">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse" />
                    <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
                    <span className="size-2 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
                  </div>
                </div>
              }
            >
              <Map center={[lng!, lat!]} zoom={14} theme="light">
                <MapControls showZoom showCompass />
                <MapMarker longitude={lng!} latitude={lat!}>
                  <MarkerContent>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-indigo-500 animate-blink-glow" />
                      <div className="relative h-5 w-5 rounded-full border border-white bg-indigo-600 shadow-lg animate-blink-pulse" />
                    </div>
                  </MarkerContent>
                  <MarkerPopup closeButton>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">
                        {suceso.lugar || "Ubicación desconocida"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lat!.toFixed(2)}°S {lng!.toFixed(2)}°W
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${lat!},${lng!}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-xs inline-block"
                      >
                        Ver en Google Maps
                      </a>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              </Map>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
