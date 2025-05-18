"use client"
import { useSession } from 'next-auth/react';
import React, { Suspense, useEffect } from 'react'
import ProgressBar from './ProgressBar';
import GetStartForm from '@/components/orderForm/getStartForm';
import OrderType from '@/components/orderForm/orderType';
import VideoFootageFrom from '@/components/orderForm/videoFootageFrom';
import AddOnsForm from '@/components/orderForm/addOnsForm';
import LogisticsForm from '@/components/orderForm/logisticsForm';
import StyleDetailsForm from '@/components/orderForm/styleDetailsForm';
import VideoDetailsForm from '@/components/orderForm/orderDetails';
import FootageUploadForm from '@/components/orderForm/footageUpload';
import { FaRegUser } from 'react-icons/fa6';
import Image from 'next/image';
import OrderSummary from '@/components/orderForm/orderSummary';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AuthPage from '@/components/auth';
import { useOrderFormStore } from '@/store/orderFormStore';
import UserProfile from '@/components/userProfile';


export default function OrderForm() {

    const { data: session, status } = useSession();
    const { currentStep, order, setCurrentStep, updatePartial } = useOrderFormStore()

    // console.log(order, "this is order in order form")
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const authMode = searchParams.get("auth");
    const notAuthenticated = authMode === "login" || authMode === "signup";

    useEffect(() => {
        if (!session && status !== "loading" && !authMode) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("auth", "login");
            router.replace(`${pathname}?${params.toString()}`);
        }

        if (session && status === "authenticated" && authMode) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("auth");
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [session, status, pathname, searchParams, authMode]);

    const handleDraftLoading = async () => {
        const order_id = searchParams.get("id")

        if (order_id) {
            const res = await fetch(`/api/order/${order_id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data)
                updatePartial({
                    order_id: data.data.id,
                    order_type: data.data.orderType ? data.data.orderType : "",
                    video_footage: {
                        raw_footage_size: data.data.rawFootageSize ? data.data.rawFootageSize : "",
                        raw_footage_length: data.data.rawFootageLength ? data.data.rawFootageLength : "",
                    },
                    add_ons:
                        Object.keys(data.data.addOns).map((key: any) => ({
                            title: key,
                            number: data.data.addOns[key] || 0,
                        })),

                    logistics: {
                        video_title: data.data.videTitle ? data.data.videTitle : "",
                        video_category: data.data.videoCategory ? data.data.videoCategory : "",
                        video_description: data.data.videoDescription ? data.data.videoDescription : "",
                        publish_date: data.data.publishDate ? data.data.publishDate : "",
                        final_length: data.data.finalLength ? data.data.finalLength : "",
                    },
                    video_tone: {
                        funny: data.data.funny,
                        serious: data.data.serious,
                        professional: data.data.professional,
                        elegant: data.data.elegant,
                        casual: data.data.casual,
                        informational: data.data.informational,
                        entertaining: data.data.entertaining
                    },
                    video_pace: data.data.videoPace ? data.data.videoPace : "",
                    order_details: {
                        instruction_by_client: data.data.instructionByClient ? data.data.instructionByClient : "",
                        example_videos: data.data.exampleVideos ? data.data.exampleVideos : "",
                        script_link: data.data.scriptLink ? data.data.scriptLink : ""
                    },
                    raw_footage_url: data.data.rawFootageUrl ? data.data.rawFootageUrl : "",
                })
                setCurrentStep(1)

            }
        }
    }
    useEffect(() => {
        handleDraftLoading()
    }, [])
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <div className='py-8 flex items-center justify-center px-10 w-full min-h-screen h-screen relative'>

                {notAuthenticated &&
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center dark:text-white'>
                        <AuthPage authMode={authMode} />
                    </div>
                }

                <div className='flex items-center rounded-2xl w-full h-full overflow-hidden border border-red-400'>
                    {/* form index */}
                    <div className='h-full max-w-[250px] px-4 py-6 bg-[var(--color-background-2)] border-r border-gray-400  flex flex-col items-center justify-between'>
                        <div className='w-full flex-col flex items-center justify-center'>
                            <div className=' h-12'>
                                <Link href={"/"} className='text-3xl hover:text-4xl transform text-gray-200 hover:text-[var(--color-brand-red)] duration-300 ease-in-out hover:font-bold'>ClipCurve</Link>
                            </div>

                            {/* progress bar  */}
                            <div className='w-full flex items-center justify-center mx-10 mt-10'>
                                <ProgressBar currentStep={currentStep} />
                            </div>
                        </div>
                        {/* user profile  */}
                        <UserProfile />
                    </div>

                    <div className='w-full h-full relative px-10 py-6 bg-[var(--color-background-2)]'>
                        <div className='h-full w-full pb-20'>

                            {currentStep === 0 && <GetStartForm />}
                            {currentStep === 1 && <OrderType />}
                            {currentStep === 2 && <VideoFootageFrom />}
                            {currentStep === 3 && <AddOnsForm />}
                            {currentStep === 4 && <LogisticsForm />}
                            {currentStep === 5 && <StyleDetailsForm />}
                            {currentStep === 6 && <VideoDetailsForm />}
                            {currentStep === 7 && <FootageUploadForm />}
                            {currentStep === 8 && <OrderSummary />}
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>

    )
}

