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
                    order_id: data.data[0].id,
                    order_type: data.data[0].orderType ? data.data[0].orderType : "",
                    video_footage: {
                        raw_footage_size: data.data[0].rawFootageSize ? data.data[0].rawFootageSize : "",
                        raw_footage_length: data.data[0].rawFootageLength ? data.data[0].rawFootageLength : "",
                    },
                    add_ons:
                        Object.keys(data.data[0].addOns).map((key: any) => ({
                            title: key,
                            number: data.data[0].addOns[key] || 0,
                        })),

                    logistics: {
                        video_title: data.data[0].videTitle ? data.data[0].videTitle : "",
                        video_category: data.data[0].videoCategory ? data.data[0].videoCategory : "",
                        video_description: data.data[0].videoDescription ? data.data[0].videoDescription : "",
                        publish_date: data.data[0].publishDate ? data.data[0].publishDate : "",
                        final_length: data.data[0].finalLength ? data.data[0].finalLength : "",
                    },
                    video_tone: {
                        funny: data.data[0].funny,
                        serious: data.data[0].serious,
                        professional: data.data[0].professional,
                        elegant: data.data[0].elegant,
                        casual: data.data[0].casual,
                        informational: data.data[0].informational,
                        entertaining: data.data[0].entertaining
                    },
                    video_pace: data.data[0].videoPace ? data.data[0].videoPace : "",
                    order_details: {
                        instruction_by_client: data.data[0].instructionByClient ? data.data[0].instructionByClient : "",
                        example_videos: data.data[0].exampleVideos ? data.data[0].exampleVideos : "",
                        script_link: data.data[0].scriptLink ? data.data[0].scriptLink : ""
                    },
                    raw_footage_url: data.data[0].rawFootageUrl ? data.data[0].rawFootageUrl : "",
                })
                setCurrentStep(1)

            }
        }
    }
    useEffect(() => {
        handleDraftLoading()
    }, [])
    return (
        <Suspense>
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
                        <div className='w-full flex items-end justify-center mt-10'>
                            <div className='flex items-center justify-center gap-3 relative'>
                                <div
                                    className='w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:border-2 border-primary'
                                >
                                    {session?.user?.image ?
                                        <Image src={session?.user?.image} alt='icon' width={500} height={500} /> :
                                        <FaRegUser />
                                    }
                                </div>
                                <span className="text-lg font-semibold">{session?.user?.name}</span>

                            </div>
                        </div>
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

