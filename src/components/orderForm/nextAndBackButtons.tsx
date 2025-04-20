
import { createOrder } from '@/utils/api-requests'
import React, { useRef } from 'react'
import isEqual from "lodash.isequal";
import { useOrderFormStore } from '@/store/orderFormStore';
import { redirect } from "next/navigation";

export default function NextAndBackButtons({ disabled }: { disabled: boolean }) {
    const { formStages, currentStep, setCurrentStep, order, updateField } = useOrderFormStore()

    const lastSavedRef = useRef(order)

    const updateIdDataChanges = async (order: any) => {
        if (!isEqual(order, lastSavedRef.current)) {
            // 🔄 Data changed, call update
            console.log("Data changed → calling update function...");
            const res = await createOrder(order);
            const data = await res?.json();
            console.log(data)
            if (!order.order_id) { updateField("order_id", data.id) }
            lastSavedRef.current = order; // update reference
        } else {
            console.log("No changes detected → skipping update");
        }
    };

    const handleNext = () => {
        if (currentStep == formStages.length - 1) {
            // If the next step is the last step, do not move to the next step
            setCurrentStep(currentStep)
            createOrder(order);
        }

        for (let i = currentStep + 1; i < formStages.length; i++) {
            if (!formStages[i].active) {
                continue
            } else {
                setCurrentStep(i)
                break
            }
        }
    }

    const handleBack = () => {
        if (currentStep == 0) {
            return
        }
        for (let i = currentStep - 1; i >= 0; i--) {
            if (!formStages[i].active) {
                continue
            } else {
                setCurrentStep(i)
                break
            }
        }
    }
    return (
        <div className=" flex w-full absolute bottom-0 left-0 items-center justify-between px-10 py-5" >
            <button
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                onClick={handleBack}
            >
                Back
            </button>
            <button
                className="px-4 py-2 bg-[var(--color-brand-red)] text-white rounded cursor-pointer"
                onClick={() => {
                    if (currentStep === 8) {
                        updateIdDataChanges({ ...order, status: "completed" })
                        alert("Order created successfully");
                        redirect("/");
                    } else {
                        handleNext()
                        updateIdDataChanges(order)
                    }
                }}
                disabled={disabled}
            >
                {currentStep == 8 ? "Submit Order" : "Next"}
            </button>
        </div >
    )
}
