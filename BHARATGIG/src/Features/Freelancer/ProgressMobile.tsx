import React from "react";

interface ProgressMobileProps {
  currentStep: number;
  steps: Array<{
    label: string;
  }>;
}

export default function ProgressMobile({ currentStep, steps }: ProgressMobileProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="block md:hidden w-full max-w-2xl mx-auto mb-8 px-4">
      {/* Progress Labels */}
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <span
              key={index}
              className={`
                text-[10px] sm:text-xs font-medium transition-colors duration-300
                ${isCurrent ? "text-blue-600" : isCompleted ? "text-gray-700" : "text-gray-400"}
              `}
            >
            </span>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      
    </div>
  );
}
