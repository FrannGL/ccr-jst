import type { useForm } from "react-hook-form";

import type { AllFormValues } from "../schemas/nuevo-suceso-form";

export interface NuevoSucesoContextType {
  form: ReturnType<typeof useForm<AllFormValues>>;
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  onSubmit: (data: AllFormValues) => void;
  saveDraft: () => void;
  clearForm: () => void;
}
