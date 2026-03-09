import { Fragment } from "react";

interface WizardStepsProps {
  steps: string[];
  currentStep: number;
}

export function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <div className="mb-8 p-6 pb-3 bg-white rounded-xl border border-gray-200 shadow-lg">
      <div className="px-4">
        <div className="flex items-start">
          {steps.map((step, index) => (
            <Fragment key={index}>
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

        <div className="h-10" />
      </div>
    </div>
  );
}
