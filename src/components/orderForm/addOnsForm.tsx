
import React, { useEffect } from 'react'
import NextAndBackButtons from './nextAndBackButtons';
import Image from 'next/image';
import iHorizontalVideo from "@/assets/icons/hVideoIcon.png"
import iVerticalVideo from "@/assets/icons/vVideoIcon.png"
import iThumbnail from "@/assets/icons/thumbnailIcon.png"
import iSquareVideo from "@/assets/icons/order-icons/squareVideo.png"
import iCaptions from "@/assets/icons/order-icons/caption.png"
import iPremiere from "@/assets/icons/order-icons/premiere.png"
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { OrderInterface } from '@/types/order.type';
import { useOrderFormStore } from '@/store/orderFormStore';


export default function AddOnsForm() {
    const { order, updateField } = useOrderFormStore()
    console.log(order, "this is order in add ons form")
    const [addOns, setAddOns] = React.useState<any[]>(order?.add_ons.length > 0 ? order.add_ons : AddOns);

    const upsertAddons = async (order: OrderInterface) => {
        try {
            const res = await fetch("/api/order_form/add_ons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order }),
            })
            console.log(res)
            return res;
        }
        catch (e: any) {
            console.log("Error creating order")
            console.log(e)
        }
        return null;
    }
    return (
        <div className='w-full h-full'>
            <div className=''>
                <h1 className='text-3xl'>Select add-ons for your order!</h1>
                <p>You can choose multiple add-ons below.</p>
            </div>

            <div className='grid grid-cols-3 h-full w-full gap-4 mt-5 pb-16'>
                {order.add_ons.map((item: any, idx: number) => {
                    return (
                        <div
                            key={idx}
                            className={` px-4 border rounded-2xl text-center relative flex flex-col items-center justify-around gap-2 ${item.number > 0 ? "bg-red-500 border-red-500" : ""}`}
                        >
                            {/* <div className={`w-3.5 h-3.5 rounded-full border absolute top-4 right-4 ${item.number > 0 ? "bg-primary" : "bg-gray-200"} `} /> */}

                            <Image src={AddOns[idx].icon} alt='' className='w-14' />
                            <div>
                                <h1 className='text-xl font-semibold'>{item.title}</h1>
                                <p className='text-sm'>{AddOns[idx].description}</p>
                            </div>
                            {/* plus minus controller */}
                            <div className='flex items-center justify-center gap-x-4 mt-2'>
                                <div
                                    onClick={() => {
                                        // setAddOns((prev) => {
                                        //     const newAddOns = [...prev]
                                        //     newAddOns[idx].number = newAddOns[idx].number - 1
                                        //     return newAddOns
                                        // })
                                        updateField("add_ons", (order.add_ons).map((i: any) =>
                                            i.title === item.title ? { ...i, number: item.number - 1 } : i // Update only the matched item
                                        ));
                                    }}
                                    className='text-2xl cursor-pointer hover:text-primary flex items-center justify-center'
                                >
                                    <CiCircleMinus />
                                </div>

                                <div>{order.add_ons.find((i) => i.title === item.title)?.number || 0}</div>
                                {/* <div>{addOns.find((i) => i.title == item.title).number}</div> */}

                                <div
                                    onClick={() => {
                                        // setAddOns((prev) => {
                                        //     const newAddOns = [...prev]
                                        //     const newNumb = (newAddOns[idx].number + 1)
                                        //     newAddOns[idx].number = newNumb
                                        //     return newAddOns
                                        // })
                                        updateField("add_ons", (order.add_ons).map((i: any) =>
                                            i.title === item.title ? { ...i, number: item.number + 1 } : i // Update only the matched item
                                        ));
                                    }}
                                    className='text-2xl cursor-pointer hover:text-primary flex items-center justify-center'

                                >
                                    <CiCirclePlus />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <NextAndBackButtons
                disabled={false}
            // handleNext={async () => {
            //     // setFormData({ ...formData, form_stage: 4 })
            //     await upsertAddons(formData)
            // }}
            />

        </div>
    )
}


export const AddOns = [
    {
        icon: iThumbnail,
        title: "Thumbnail",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
    {
        icon: iVerticalVideo,
        title: "Vertical Reformat",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
    {
        icon: iSquareVideo,
        title: "Square Reformat",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
    {
        icon: iHorizontalVideo,
        title: "Horizontal Reformat",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
    {
        icon: iCaptions,
        title: "Full Video Captions",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
    {
        icon: iPremiere,
        title: "Premiere Pro Project File",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
        number: 0
    },
]