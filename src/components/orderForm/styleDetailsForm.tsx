import React, { useEffect, useState } from 'react'
import NextAndBackButtons from './nextAndBackButtons'
import iSlow from "@/assets/icons/order-icons/snail.png"
import iMedium from "@/assets/icons/order-icons/medium.png"
import iFast from "@/assets/icons/order-icons/rabbit.png"
import Image from 'next/image'
import iFunny from "@/assets/icons/order-icons/laugh.png"
import iSerious from "@/assets/icons/order-icons/worry.png"
import iProfessional from "@/assets/icons/order-icons/businessman.png"
import iElegant from "@/assets/icons/order-icons/woman.png"
import iCasual from "@/assets/icons/order-icons/man.png"
import iInformational from "@/assets/icons/order-icons/working.png"
import iEntertaining from "@/assets/icons/order-icons/cinema.png"
import { createOrder } from '@/utils/api-requests'
import { useOrderFormStore } from '@/store/orderFormStore'
import ThumbnailGrid from './thumbnailGrid'


const ToneIcons = [iFunny, iSerious, iProfessional, iElegant, iCasual, iInformational, iEntertaining]


export default function StyleDetailsForm() {
    const { order, updateField } = useOrderFormStore()

    useEffect(() => console.log(order.video_tone, "this is order in style details form"), [order.video_tone])
    return (
        <div className='w-full h-full'>
            {
                order.order_type === "Thumbnail" ?
                    <>
                        <div>
                            <h2 className="text-3xl">Thumbnail Style</h2>
                            <p className="">
                                Select the style of thumbnail you're looking for.
                            </p>
                        </div>

                        <ThumbnailGrid />
                        <NextAndBackButtons disabled={false} />

                    </> :
                    <>
                        <div>
                            <h2 className="text-3xl">Pacing and Tone</h2>
                            <p className="">
                                Tell us a bit more about your order...
                            </p>
                        </div>
                        <div className='w-full flex flex-col items-center justify-between gap-6 mt-4'>
                            <div className='w-full'>
                                <p className='font-semibold text-gray-200 mb-2'>What should be the pacing be?</p>
                                <div className='flex items-center justify-between gap-2 h-full'>
                                    {Pace.map((item, idx) => {
                                        return (
                                            <div
                                                onClick={() => updateField("video_pace", item.pace)}
                                                key={idx}
                                                className={`w-full rounded-xl glow-border border flex py-3 gap-4 items-center justify-center cursor-pointer hover:shadow-md ${order.video_pace === item.pace ? "bg-[var(--color-brand-red)] border-red-400" : ""}`}
                                            >
                                                <Image src={item.icon} alt='' className='w-12' />
                                                <p className='text-lg font-semibold'>{item.pace}</p>
                                            </div>)
                                    })}
                                </div>
                            </div>

                            <div className='w-full h-full relative mt-1'>
                                <p className='font-semibold text-gray-200 mb-2'>What should the tone be?</p>
                                <div className='grid grid-cols-4 gap-2 flex-wrap overflow-hidden w-full'>
                                    {Object.keys(order.video_tone).map((item, idx: number) => {
                                        const toneKey = item as keyof typeof order.video_tone;
                                        console.log(toneKey, "this is tone key")
                                        console.log(order.video_tone[toneKey], "this is tone value")
                                        return (
                                            <div
                                                onClick={() => updateField("video_tone", { ...order.video_tone, [toneKey]: !order.video_tone[toneKey] })}
                                                key={idx}
                                                className={`rounded-xl glow-border border py-12 flex flex-col gap-4 items-center justify-center cursor-pointer hover:shadow-md ${Object.values(order.video_tone)[idx] ? "bg-[var(--color-brand-red)] border-red-400" : ""}`}
                                            >
                                                <Image src={ToneIcons[idx]} alt='' className='w-12' />
                                                <p className='capitalize text-lg font-semibold'>{toneKey}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>


                        </div>

                        <NextAndBackButtons disabled={order.video_pace ? false : true} />
                    </>

            }
        </div>
    )
}



const Pace = [
    {
        icon: iSlow,
        pace: "Slow-paced"
    },
    {
        icon: iMedium,
        pace: "Medium-paced"
    },
    {
        icon: iFast,
        pace: "Fast-paced"
    }
]
