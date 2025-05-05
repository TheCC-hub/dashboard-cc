import { useOrderFormStore } from "@/store/orderFormStore";


export default function ProgressBar({ currentStep }: { currentStep: number }) {
    const { formStages } = useOrderFormStore()

    return (
        <div className="min-h-fit flex items-start relative w-[400px] text-[var(--color-brand-red)]">

            {/* Progress Bar */}
            < div className="flex flex-col items-start justify-center h-full ml-6  gap-y-7" >
                {
                    formStages.map((step, index) => {
                        return step.active ? (
                            <div key={index} className="flex items-start justify-start relative">
                                {/* Step Indicator */}
                                <div className="flex gap-4 items-start justify-start">
                                    <div
                                        className={`w-5 h-5 z-10  flex items-center justify-center rounded-full border-2
                                         ${index === currentStep
                                                ? "bg-gray-400 border-gray-600"
                                                : index < currentStep
                                                    ? "bg-[var(--color-brand-red)] border-[var(--color-brand-red)]"
                                                    : "bg-white border-gray-300"
                                            }`}
                                    />
                                    <div
                                        className={`whitespace-nowrap 
                                        ${index === currentStep ?
                                                "text-red-300 font-bold"
                                                : index < currentStep
                                                    ? "text-[var(--color-brand-red)] font-bold"
                                                    : "text-gray-200"
                                            } `}
                                    >
                                        {step.title}
                                    </div>
                                </div>
                                {/* Line Above Circle */}
                                {index !== 0 && (
                                    <div
                                        className={`w-0.5 h-14 -top-10 left-[9px] absolute ${index <= currentStep ? "bg-[var(--color-brand-red)]" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>
                        ) : null
                    })
                }
            </div >
        </div>
    );
}