import { Fragment } from "react";

import { Button } from "@/components/ui/button";

import {
  useNuevoSuceso,
  NuevoSucesoProvider,
} from "../context/NuevoSucesoContext";
import {
  ReviewStep,
  LocationStep,
  BasicDataStep,
  ValidationStep,
  VehiclesAffectedStep,
  NotificacionesChannelStep,
} from "./steps";

function NuevoSucesoFormContent() {
  const { currentStep, steps, nextStep, prevStep, saveDraft } =
    useNuevoSuceso();

  return (
    <div className="space-y-6">
      <div className="mb-8 p-6 pb-3 bg-white rounded-xl border border-gray-200 shadow-lg">
        {/* Círculos y líneas en una fila */}
        <div className="px-4">
          <div className="flex items-start">
            {steps.map((step, index) => (
              <Fragment key={index}>
                {/* Contenedor del paso (círculo + label) */}
                <div
                  className="flex flex-col items-center relative shrink-0"
                  style={{ width: "40px" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 z-10 bg-white transition-all duration-300 ${
                      index < currentStep
                        ? "border-jst-500 text-jst-500 shadow-sm"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Label del paso */}
                  <div
                    className={`absolute top-12 w-24 text-center text-[11px] leading-tight transition-all duration-300 ${
                      index + 1 === currentStep
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
                        index < currentStep - 1 ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          {/* Espaciador para las labels absolute */}
          <div className="h-10" />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          Paso {currentStep}: {steps[currentStep - 1]}
        </h2>

        {currentStep === 1 && <BasicDataStep />}

        {currentStep === 2 && <LocationStep />}

        {currentStep === 3 && <VehiclesAffectedStep />}

        {currentStep === 4 && <NotificacionesChannelStep />}

        {currentStep === 5 && <ReviewStep />}

        {currentStep === 6 && <ValidationStep />}

        {/* Other steps placeholder */}
        {currentStep > 6 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Contenido del paso {currentStep} en construcción...
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
            disabled={currentStep === 1}
          >
            ← Anterior
          </Button>
          <Button type="button" variant="outline" onClick={saveDraft}>
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

export function NuevoSucesoForm() {
  return (
    <NuevoSucesoProvider>
      <NuevoSucesoFormContent />
    </NuevoSucesoProvider>
  );
}
