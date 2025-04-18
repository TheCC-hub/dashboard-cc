
import React, { useEffect, useState } from 'react'
import NextAndBackButtons from './nextAndBackButtons';
import iHorizontalVideo from "@/assets/icons/hVideoIcon.png"
import iVerticalVideo from "@/assets/icons/vVideoIcon.png"
import iThumbnail from "@/assets/icons/thumbnailIcon.png"
import iChannelAssist from "@/assets/icons/order-icons/channelAssist.png"
import iOtherVideo from "@/assets/icons/order-icons/otherVideo.png"
import iSquareVideo from "@/assets/icons/order-icons/squareVideo.png"
import Image from 'next/image';
import { useOrderFormStore } from '@/store/orderFormStore';

export default function OrderType() {
    const { order, updateField } = useOrderFormStore()



    return (
        <div className='w-full h-full'>
            <div className=''>
                <h1 className='text-3xl'>Select an order type!</h1>
                <p>What type of order is it?</p>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-6 h-full w-full pb-20 pt-6'>
                {OrderTypes.map((item, idx) => {
                    return (
                        <div
                            onClick={() => updateField("order_type", item.title)}
                            key={idx}
                            className={`cursor-pointer w-[31%] h-[50%] p-2 border rounded-2xl text-center content-center relative flex flex-col items-center justify-center gap-2 hover:shadow-md ${order.order_type === item.title ? "border-red-500 shadow-md bg-red-200" : ""}`}
                        >
                            {/* <div className={`w-4 h-4 rounded-full border absolute top-4 right-4 ${formData.order_type === order.title ? "bg-primary" : "bg-gray-200"} `} /> */}
                            <Image src={item.icon} alt='' className='w-14' />
                            <h1 className='text-xl'>{item.title}</h1>
                            <p className='text-sm'>{item.description}</p>
                        </div>
                    )
                })}
            </div>

            <NextAndBackButtons disabled={order.order_type ? false : true} />
        </div>
    )
}


const OrderTypes = [
    {
        icon: iHorizontalVideo,
        title: "Horizontal Video",
        description: "Any horizontal 16:9 video. Usually for YouTube, Facebook, Vimeo, etc.",
    },
    {
        icon: iVerticalVideo,
        title: "Vertical Video",
        description: "Any vertical 9:16 video less than 3 minutes long. Usually for YouTube Shorts, Instagram Reels, or TikTok.",
    },
    {
        icon: iSquareVideo,
        title: "Square Video",
        description: "Any square 1:1 or 4:5 video. Usually for Instagram Posts",
    },
    {
        icon: iChannelAssist,
        title: "Channel Assets",
        description: "Custom Brand Intro, Endscreen, and Call to Actions that can be used in all of your YouTube videos.",
    },
    {
        icon: iThumbnail,
        title: "Thumbnail",
        description: "A custom YouTube thumbnail only, no video editing.",
    },
    {
        icon: iOtherVideo,
        title: "Other Video",
        description: "Anything else. Please contact us before submitting.",
    },
]