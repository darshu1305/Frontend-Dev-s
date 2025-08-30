import { Check } from '@mui/icons-material';

interface StepperProps {
  currentStep: number;
  steps: Array<{
    label: string;
    icon: React.ReactNode;
  }>;
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-center relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 relative z-10
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 text-white shadow-lg' 
                      : isCurrent 
                      ? 'bg-white border-blue-500 text-blue-600 shadow-lg ring-2 sm:ring-4 ring-blue-100' 
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">{stepNumber}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`
                    text-xs sm:text-sm mt-2 sm:mt-3 font-medium transition-colors duration-300 text-center whitespace-nowrap
                    ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="w-8 sm:w-12 md:w-16 lg:w-24 mx-2 sm:mx-3 md:mx-4 relative">
                  <div className="h-0.5 bg-gray-200 absolute top-4 sm:top-5 md:top-6 left-0 right-0">
                    <div 
                      className={`
                        h-full transition-all duration-500 ease-in-out
                        ${isCompleted 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-full' 
                          : isCurrent && index < currentStep - 1
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-full'
                          : 'bg-gray-200 w-0'
                        }
                      `}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}