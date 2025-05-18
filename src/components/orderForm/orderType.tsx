
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
import OrderoCountPopup from '../popups/orderCountPopup';

export default function OrderType() {
    const { order, updateField, setFormStageActive, resetOrder } = useOrderFormStore()
    const [videoCountPopup, setVideoCountPopup] = useState(false)


    const handleOrderType = async (order: any) => {

        updateField("order_type", order.title)

        if (order.title == "Horizontal Video" || order.title === "Vertical Video" || order.title === "Square Video") {

            if (order.title === "Vertical Video") {
                setVideoCountPopup(true)
                setFormStageActive("Add Ons", true)

            }
            else {

                setFormStageActive("Add Ons", true)
                setFormStageActive("Video Footage", true)
            }
        }
        else if (order.title === "Channel Assets" || order.title === "Thumbnail") {
            setFormStageActive("Add Ons", false)
            setFormStageActive("Video Footage", false)
            if (order.title === "Thumbnail") {
                setVideoCountPopup(true)
            }

        }
    }
    useEffect(() => {
        if (order.order_type == "Horizontal Video" || order.order_type === "Vertical Video" || order.order_type === "Square Video") {
            setFormStageActive("Add Ons", true)
            setFormStageActive("Video Footage", true)
        }
    }, [])
    return (
        <div className='w-full h-full'>
            {videoCountPopup &&
                <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center'>
                    <OrderoCountPopup onClose={() => setVideoCountPopup(false)} />
                </div>
            }
            <div className=''>
                <h1 className='text-3xl'>Select an order type!</h1>
                <p>What type of order is it?</p>
            </div>

            <div className=' grid grid-cols-3 gap-6 h-full w-full pb-20 pt-6'>
                {OrderTypes.map((item, idx) => {
                    return (
                        <div
                            onClick={() => handleOrderType(item)}
                            key={idx}
                            className={`cursor-pointer glow-border p-2 border rounded-2xl text-center content-center relative flex flex-col items-center justify-center gap-2 hover:shadow-md ${order.order_type === item.title ? "border-red-400 shadow-md bg-[var(--color-brand-red)]" : ""}`}
                        >
                            {/* <div className={`w-4 h-4 rounded-full border absolute top-4 right-4 ${formData.order_type === order.title ? "bg-primary" : "bg-gray-200"} `} /> */}
                            <Image src={item.icon} alt='' className='w-14 ' />
                            <h1 className='text-xl'>{item.title}</h1>
                            <p className='text-sm'>{item.description}</p>
                            {order.order_type == "Vertical Video" && item.title === "Vertical Video" &&
                                <div className=' flex items-center justify-center text-gray-300 gap-2 font-bold' >
                                    {order.order_quantity && <p> Quantity: {order.order_quantity}</p>}
                                </div>
                            }
                            {order.order_type == "Thumbnail" && item.title === "Thumbnail" &&
                                <div className=' flex items-center justify-center text-gray-300 gap-2 font-bold' >
                                    {order.order_quantity && <p> Quantity: {order.order_quantity}</p>}
                                </div>
                            }
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
    // {
    //     icon: iChannelAssist,
    //     title: "Channel Assets",
    //     description: "Custom Brand Intro, Endscreen, and Call to Actions that can be used in all of your YouTube videos.",
    // },
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