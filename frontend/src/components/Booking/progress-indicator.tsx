interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, title: "Choose Your Package" },
    { number: 2, title: "Select Hotel & Transport" },
    { number: 3, title: "Enter Traveler Details" },
    { number: 4, title: "Payment" },
    { number: 5, title: "Confirmation" },
  ]

  return (
    <div className="py-6">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.number < currentStep
                  ? "bg-green-500 text-white"
                  : step.number === currentStep
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number < currentStep ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${step.number === currentStep ? "text-[#1E3A8A]" : "text-gray-500"}`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.number < currentStep
                    ? "bg-green-500 text-white"
                    : step.number === currentStep
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {step.number < steps.length && (
                <div
                  className={`absolute top-4 left-8 w-[calc(100%-1rem)] h-0.5 ${
                    step.number < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-[#1E3A8A] font-medium">
          Step {currentStep}: {steps[currentStep - 1].title}
        </p>
      </div>
    </div>
  )
}

