import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import iNewOrder from "@/assets/icons/order-icons/order.png"
import iOldOrder from "@/assets/icons/order-icons/oldOrder.png"
import { useSession } from 'next-auth/react';
import { AddOns } from './addOnsForm';
import { formatDate } from '@/utils/helper-functions';
import { useOrderFormStore } from '@/store/orderFormStore';

export default function GetStartForm() {
    const { data: session } = useSession()
    const { setCurrentStep, updatePartial, order: defaultOrder } = useOrderFormStore()

    const [allOrders, setAllOrders] = useState<any>([])

    const getAllPendingOrders = async () => {
        try {
            const res = await fetch("/api/orders/draft", {
                method: "GET",
            })
            const data = await res.json()

            if (data.status === 200) {
                setAllOrders(data.data)
                return data.data
            } else {
                console.log("Error getting orders")
                setAllOrders([])
                return null
            }
        } catch (error) {
            return null
        }
    }

    useEffect(() => {
        const result = getAllPendingOrders()
        setAllOrders(result)
    }, [session])
    return (
        <div className='h-full w-full'>
            <div className=''>
                <h1 className='text-3xl'>Let's get started on your order!</h1>
                <p>Please select one of the following options to start your order!</p>
            </div>

            <div className='w-full h-full flex items-center justify-between gap-4 py-4'>
                {/* new order  */}
                <div
                    onClick={async () => {
                        if (!session?.user?.email) return
                        // if (allOrders.length >= 5) {
                        //     return
                        // }
                        setCurrentStep(1)
                        return
                    }}
                    className='cursor-pointer group glow-text-red hover:bg-[var(--color-background-2)] text-gray-100 hover:border-red-400 hover:shadow-[0_0_10px_#F87171] transform duration-300 ease-in-out hover:border-primary border border-gray-400 rounded-xl text-xl font-semibold w-full h-full text-center content-center flex flex-col items-center justify-center gap-4'
                >
                    <Image src={iNewOrder} alt='' className='w-20 transform ease-out duration-300 group-hover:w-32' />
                    New Order
                </div>

                {/* abandoned orders  */}
                <div className='transform duration-300 ease-in-out px-2 border group hover:border-red-400 border-gray-400 hover:shadow-[0_0_10px_#F87171] rounded-xl text-xl font-semibold w-full h-full text-center flex flex-col items-center justify-start gap-4 pt-4'>
                    <div className='flex items-center gap-5 text-gray-200'>
                        <Image src={iOldOrder} alt='' className='w-16 ' />
                        Draft Order
                    </div>
                    <div className='flex flex-col w-full items-center justify-center gap-2 overflow-hidden overflow-y-scroll'>

                        {/* old orders maped */}
                        {allOrders.length > 0 ? allOrders.slice(0, 5).map((order: any, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center border-gray-400 hover:border-gray-200 border p-4 rounded-xl w-full shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-lg">{order.videTitle ? order.videTitle : "No Title Given Yet"}</span>
                                        <span className="text-sm text-gray-300">Created On: {formatDate(order.createdAt)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="text-sm bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                                            onClick={async () => {
                                                const res = await fetch(`/api/order/${order.id}`, {
                                                    method: "GET",
                                                })
                                                const data = await res.json()
                                                console.log(data.data, "this is data")
                                                updatePartial({
                                                    order_id: data.data.id,
                                                    order_type: data.data.orderType ? data.data.orderType : "",
                                                    video_footage: {
                                                        raw_footage_size: data.data.rawFootageSize ? data.data.rawFootageSize : "",
                                                        raw_footage_length: data.data.rawFootageLength ? data.data.rawFootageLength : "",
                                                    },
                                                    add_ons: data.data.addOns ? Object.keys(data.data.addOns).map((key: any) => ({
                                                        title: key,
                                                        number: data.data.addOns[key] || 0,
                                                    })) : [],
                                                    logistics: {
                                                        video_title: data.data.videTitle ? data.data.videTitle : "",
                                                        video_category: data.data.videoCategory ? data.data.videoCategory : "",
                                                        video_description: data.data.videoDescription ? data.data.videoDescription : "",
                                                        publish_date: data.data.publishDate ? data.data.publishDate : "",
                                                        final_length: data.data.finalLength ? data.data.finalLength : "",
                                                    },
                                                    video_tone: {
                                                        funny: data.data.videoTone?.funny || false,
                                                        serious: data.data.videoTone?.serious || false,
                                                        professional: data.data.videoTone?.professional || false,
                                                        elegant: data.data.videoTone?.elegant || false,
                                                        casual: data.data.videoTone?.casual || false,
                                                        informational: data.data.videoTone?.informational || false,
                                                        entertaining: data.data.videoTone?.entertaining || false
                                                    },
                                                    video_pace: data.data.videoPace ? data.data.videoPace : "",
                                                    order_details: {
                                                        instruction_by_client: data.data.instructionByClient ? data.data.instructionByClient : "",
                                                        example_videos: data.data.exampleVideos ? data.data.exampleVideos : "",
                                                        script_link: data.data.scriptLink ? data.data.scriptLink : ""
                                                    },
                                                    raw_footage_url: data.data?.rawFootageUrl ? data.data.rawFootageUrl : "",
                                                })
                                                setCurrentStep(1)
                                            }}
                                        >
                                            Resume
                                        </button>

                                        <button
                                            className="text-sm bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 cursor-pointer"
                                            onClick={() => { console.log("delete order") }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        ) : <p className='text-lg font-semibold my-auto'>No Drafts</p>}
                    </div>
                </div>
            </div>

            {/* <NextAndBackButtons setCurrentStep={setCurrentStep} canMoveNext={canMoveNext} /> */}
        </div >
    )
}

