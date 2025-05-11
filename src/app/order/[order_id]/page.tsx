'use client';

import {
    CheckCircle,
    Video,
    FileText,
    Clock,
    FileDown,
    UserCircle,
    Layers,
    CalendarDays,
    TimerReset,
    BookText,
    Link,
    LayoutDashboard,
    XCircle
} from 'lucide-react';
import { FaPaypal } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IoMdSpeedometer } from 'react-icons/io';
import { BiCategory } from 'react-icons/bi';

export default function OrderSummary() {
    // const order = sampleOrder
    // const [delivered, setDelivered] = useState(!!order.deliveredOn);
    interface OrderData {
        clientMail: string;
        orderType: string;
        rawFootageSize: string;
        rawFootageLength: string;
        finalLength: string;
        publishDate: string;
        videTitle: string;
        videoCategory: string;
        videoPace: string;
        videoTone: { mood: string };
        nextDraftIn: string;
        addOns?: Record<string, number>;
        instructionByClient?: string;
        exampleVideos?: string;
        scriptLink?: string;
        rawFootageUrl?: string;
        draftVideoLink?: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        deliveredOn: string | null;
    }

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const { order_id } = useParams();

    console.log(order_id, "order id from params")

    const handleDeliveryConfirm = () => {
        // Placeholder for backend API
        // setDelivered(true);
    };

    const getData = async (order_id: string) => {
        const res = await fetch(`/api/order/${order_id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (res.ok) {
            console.log(data)
            setOrderData(data.data)
        }
    }

    useEffect(() => {
        getData(order_id as string)
    }, [order_id])
    if (orderData === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-200">Loading...</p>
            </div>
        )
    }

    return (
        <main className='bg-[#05061a] text-white'>
            <div className="max-w-6xl mx-auto p-8  space-y-8 animate-fade-in border-gray-100">
                <div className="flex items-center gap-4 border-b pb-4">
                    <LayoutDashboard className="text-red-500" size={36} />
                    <h2 className="text-4xl font-bold text-gray-200">Order Details</h2>
                </div>

                {/* Section 1: Basic Info */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p><UserCircle className="inline-block mr-2" size={18} /><strong>Account Email:</strong> {orderData.clientMail}</p>
                        <p><Video className="inline-block mr-2" size={18} /><strong>Order Type:</strong> {orderData.orderType}</p>
                        <p><TimerReset className="inline-block mr-2" size={18} /><strong>Footage:</strong> {orderData.rawFootageSize} / {orderData.rawFootageLength}</p>
                        <p><Layers className="inline-block mr-2" size={18} /><strong>Final Length:</strong> {orderData.finalLength}</p>
                    </div>

                    <div className="space-y-2">
                        <p><BookText className="inline-block mr-2" size={18} /><strong>Video Title:</strong> {orderData.videTitle}</p>
                        <p><BiCategory className="inline-block mr-2" size={18} /><strong>Category:</strong> {orderData.videoCategory}</p>
                        <p><IoMdSpeedometer className="inline-block mr-2" size={18} /><strong>Pace:</strong> {orderData.videoPace}</p>
                        {/* <p><strong>Tone:</strong> {JSON.stringify(orderData.videoTone)}</p> */}
                        <p className="flex items-center gap-2"><Clock size={16} /> <strong>Next Draft In:</strong> {orderData.nextDraftIn}</p>
                    </div>
                </section>

                {/* Tone */}
                <Section title="🎭 Video Tone">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {Object.entries(orderData.videoTone).map(([key, value]) => (
                            <li key={key} className={`flex items-center gap-2 p-2 rounded-md ${value ? "bg-red-100 text-red-700" : "bg-gray-700 text-gray-300"}`}>
                                {value ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* Add-ons */}
                <Section title="🛠️ Add-ons">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {
                            orderData.addOns ? Object.entries(orderData.addOns).map(([addon, qty], i) => (
                                <li key={i} className="bg-gray-900 p-3 rounded-md shadow border border-gray-300">
                                    <span className="font-medium">{addon}</span>
                                    <div className="text-sm text-gray-300">x {qty}</div>
                                </li>
                            )) : <li className="text-gray-300">No add-ons selected</li>
                        }
                    </ul>
                </Section>


                {/* Resources Section */}
                <div className="space-y-2 text-sm">
                    {orderData.instructionByClient && (
                        <p><FileText className="inline-block mr-2" size={16} /><strong>Instructions:</strong> {orderData.instructionByClient}</p>
                    )}
                    {orderData.exampleVideos && (
                        <p><Link className="inline-block mr-2" size={16} /><strong>Examples:</strong> <a href={orderData.exampleVideos} target="_blank" className="text-blue-600 underline">View</a></p>
                    )}
                    {orderData.scriptLink && (
                        <p><Link className="inline-block mr-2" size={16} /><strong>Script:</strong> <a href={orderData.scriptLink} target="_blank" className="text-blue-600 underline">Open</a></p>
                    )}
                    {orderData.rawFootageUrl && (
                        <p><FileDown className="inline-block mr-2" size={16} /><strong>Raw Footage:</strong> <a href={orderData.rawFootageUrl} target="_blank" className="text-blue-600 underline">Download</a></p>
                    )}
                    <p><strong>Draft Video:</strong> {orderData.draftVideoLink}</p>
                </div>

                {/* Status & Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm p-4 rounded-xl">
                    <div>
                        <p className="">Status</p>
                        <p className="font-semibold text-gray-200">{orderData.status}</p>
                    </div>
                    <div>
                        <p className="">Created At</p>
                        <p className="font-semibold text-gray-200">{new Date(orderData.createdAt)?.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="">Last Updated</p>
                        <p className="font-semibold text-gray-200">{new Date(orderData.updatedAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="">Delivered On</p>
                        <p className="font-semibold text-gray-200">{orderData.deliveredOn ? new Date(orderData.deliveredOn).toLocaleString() : 'Pending'}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        onClick={handleDeliveryConfirm}
                        disabled={orderData.deliveredOn !== null}
                        className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-2 rounded-xl text-white font-semibold transition ${orderData.deliveredOn ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        <CheckCircle size={18} />
                        {orderData.deliveredOn ? 'Delivery Confirmed' : 'Confirm Delivery'}
                    </button>

                    <a
                        href="https://your-payment-link.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        <FaPaypal />
                        Make Payment
                    </a>
                </div>
            </div>
        </main>

    );
}


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div>{children}</div>
    </div>
);