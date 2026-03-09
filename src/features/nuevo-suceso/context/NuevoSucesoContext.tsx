import type { ReactNode } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useContext, createContext } from "react";

import type { NuevoSucesoContextType } from "../types/nuevo-suceso";

import { steps, initialValues } from "../constants";
import {
  type AllFormValues,
  nuevoSucesoFormSchema,
} from "../schemas/nuevo-suceso-form";

const NuevoSucesoContext = createContext<NuevoSucesoContextType | undefined>(
  undefined,
);

export function NuevoSucesoProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<AllFormValues>({
    resolver: zodResolver(nuevoSucesoFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: AllFormValues) => {
    console.log("Form data:", data);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveDraft = () => {
    const values = form.getValues();
    console.log("Guardando borrador (Context):", values);
  };

  const clearForm = () => {
    form.reset(initialValues);
    setCurrentStep(1);
  };

  const value: NuevoSucesoContextType = {
    form,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    onSubmit,
    saveDraft,
    clearForm,
    steps,
  };

  return (
    <NuevoSucesoContext.Provider value={value}>
      {children}
    </NuevoSucesoContext.Provider>
  );
}

export function useNuevoSuceso() {
  const context = useContext(NuevoSucesoContext);
  if (context === undefined) {
    throw new Error("useNuevoSuceso must be used within a NuevoSucesoProvider");
  }
  return context;
}
