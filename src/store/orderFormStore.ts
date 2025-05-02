// store/orderFormStore.ts
import { create } from 'zustand'
import { OrderInterface } from '@/types/order.type'

type FormStage = {
    title: string
    active: boolean
}

const defaultStages: FormStage[] = [
    { title: "Start Your Order", active: true },
    { title: "Order Type", active: true },
    { title: "Video Footage", active: false },
    { title: "Add Ons", active: false },
    { title: "Logistics", active: true },
    { title: "Style Details", active: true },
    { title: "Order Details", active: true },
    { title: "Footage Upload", active: true },
    { title: "Review Order", active: true }
]

interface OrderFormState {
    order: OrderInterface
    formStages: FormStage[]
    currentStep: number
    setCurrentStep: (step: number) => void
    updateField: <K extends keyof OrderInterface>(field: K, value: OrderInterface[K]) => void
    updatePartial: (data: Partial<OrderInterface>) => void
    setFormStageActive: (title: string, active: boolean) => void
    getActiveStages: () => FormStage[]
    resetOrder: () => void
}

const defaultOrder: OrderInterface = {
    order_id: '',
    order_type: '',
    order_quantity: 1,
    video_footage: {
        raw_footage_size: '',
        raw_footage_length: ''
    },
    add_ons: [
        { title: 'Thumbnail', number: 0 },
        { title: 'Vertical Reformat', number: 0 },
        { title: 'Square Reformat', number: 0 },
        { title: 'Horizontal Reformat', number: 0 },
        { title: 'Full Video Captions', number: 0 },
        { title: 'Premiere Pro Project File', number: 0 },
    ],
    logistics: {
        video_title: '',
        video_category: '',
        video_description: '',
        publish_date: '',
        final_length: ''
    },
    video_tone: {
        funny: false,
        serious: false,
        professional: false,
        elegant: false,
        casual: false,
        informational: false,
        entertaining: false
    },
    video_pace: '',
    raw_footage_url: '',
    order_details: {
        instruction_by_client: '',
        example_videos: '',
        script_link: ''
    },
    last_updated_stage: '',
    status: 'Draft'
}

export const useOrderFormStore = create<OrderFormState>((set, get) => ({
    order: defaultOrder,
    formStages: defaultStages,
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
    updateField: (field, value) =>
        set((state) => ({
            order: {
                ...state.order,
                [field]: value
            }
        })),
    updatePartial: (data) =>
        set((state) => ({
            order: {
                ...state.order,
                ...data
            }
        })),
    setFormStageActive: (title, active) =>
        set((state) => ({
            formStages: state.formStages.map((stage) =>
                stage.title === title ? { ...stage, active } : stage
            )
        })),
    getActiveStages: () => get().formStages.filter((s) => s.active),
    resetOrder: () => set({ order: defaultOrder, formStages: defaultStages })
}))