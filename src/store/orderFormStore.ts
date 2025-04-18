// store/orderFormStore.ts
import { create } from 'zustand'

export interface OrderInterface {
    order_id: string
    order_type: string
    video_amount?: number
    video_footage: {
        raw_footage_size: string
        raw_footage_length: string
    }
    add_ons?: {
        title: string
        number: number
    }[]
    logistics: {
        video_title: string
        video_category?: string
        video_description?: string
        publish_date?: string
        final_length: string
    }
    video_tone: {
        funny: boolean
        serious: boolean
        professional: boolean
        elegant: boolean
        casual: boolean
        informational: boolean
        entertaining: boolean
    }
    video_pace: string
    raw_footage_url: string
    order_details: {
        instruction_by_client?: string
        example_videos?: string
        script_link?: string
    }
    last_updated_stage: string
    status: 'submited' | 'pending'
}
type FormStage = {
    title: string
    active: boolean
}

const defaultStages: FormStage[] = [
    { title: "Start Your Order", active: true },
    { title: "Order Type", active: true },
    { title: "Video Footage", active: false },
    { title: "Add Ons", active: true },
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
    video_amount: 0,
    video_footage: {
        raw_footage_size: '',
        raw_footage_length: ''
    },
    add_ons: [],
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
    status: 'pending'
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