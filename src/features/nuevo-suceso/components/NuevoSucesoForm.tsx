import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ClearFormDialog } from "./ClearFormDialog";
import {
  useNuevoSuceso,
  NuevoSucesoProvider,
} from "../context/NuevoSucesoContext";
import {
  ReviewStep,
  WizardSteps,
  LocationStep,
  BasicDataStep,
  ValidationStep,
  VehiclesAffectedStep,
  NotificacionesChannelStep,
} from "./steps";

function NuevoSucesoFormContent() {
  const { currentStep, steps, nextStep, prevStep, saveDraft, clearForm } =
    useNuevoSuceso();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleClearForm = () => {
    clearForm();
    setIsClearDialogOpen(false);
    toast.success("Formulario limpiado exitosamente");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  const handleNextStep = () => {
    nextStep();
    scrollToTop();
  };

  const handlePrevStep = () => {
    prevStep();
    scrollToTop();
  };

  return (
    <div className="space-y-6">
      <WizardSteps steps={steps} currentStep={currentStep} />

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
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            ← Anterior
          </Button>
          <Button type="button" variant="outline" onClick={saveDraft}>
            Guardar Borrador
          </Button>
          <ClearFormDialog
            isOpen={isClearDialogOpen}
            onOpenChange={setIsClearDialogOpen}
            onClearForm={handleClearForm}
          >
            <Button
              type="button"
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Limpiar Filtros
            </Button>
          </ClearFormDialog>
        </div>

        <Button
          type="button"
          onClick={handleNextStep}
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
