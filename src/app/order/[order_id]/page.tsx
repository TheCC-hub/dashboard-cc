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
    LayoutDashboard
} from 'lucide-react';
import { FaPaypal } from 'react-icons/fa';
import { useState } from 'react';

export default function OrderSummary() {
    const order = sampleOrder
    const [delivered, setDelivered] = useState(!!order.deliveredOn);

    const handleDeliveryConfirm = () => {
        // Placeholder for backend API
        setDelivered(true);
    };

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
                        <p><UserCircle className="inline-block mr-2" size={18} /><strong>Client Email:</strong> {order.clientMail}</p>
                        <p><Video className="inline-block mr-2" size={18} /><strong>Order Type:</strong> {order.orderType}</p>
                        <p><TimerReset className="inline-block mr-2" size={18} /><strong>Footage:</strong> {order.rawFootageSize} / {order.rawFootageLength}</p>
                        <p><Layers className="inline-block mr-2" size={18} /><strong>Final Length:</strong> {order.finalLength}</p>
                    </div>

                    <div className="space-y-2">
                        <p><BookText className="inline-block mr-2" size={18} /><strong>Video Title:</strong> {order.videTitle}</p>
                        <p><BookText className="inline-block mr-2" size={18} /><strong>Category:</strong> {order.videoCategory}</p>
                        <p><strong>Pace:</strong> {order.videoPace}</p>
                        <p><strong>Tone:</strong> {JSON.stringify(order.videoTone)}</p>
                        <p className="flex items-center gap-2"><Clock size={16} /> <strong>Next Draft In:</strong> {order.nextDraftIn}</p>
                    </div>
                </section>

                {/* Addons Section */}
                {order.addOns && (
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Add-Ons</h3>
                        <ul className="list-disc list-inside pl-4 text-gray-200">
                            {Object.entries(order.addOns).map(([addon, qty]) => (
                                <li key={addon}>{addon} x {qty}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Resources Section */}
                <div className="space-y-2 text-sm">
                    {order.instructionByClient && (
                        <p><FileText className="inline-block mr-2" size={16} /><strong>Instructions:</strong> {order.instructionByClient}</p>
                    )}
                    {order.exampleVideos && (
                        <p><Link className="inline-block mr-2" size={16} /><strong>Examples:</strong> <a href={order.exampleVideos} target="_blank" className="text-blue-600 underline">View</a></p>
                    )}
                    {order.scriptLink && (
                        <p><Link className="inline-block mr-2" size={16} /><strong>Script:</strong> <a href={order.scriptLink} target="_blank" className="text-blue-600 underline">Open</a></p>
                    )}
                    {order.rawFootageUrl && (
                        <p><FileDown className="inline-block mr-2" size={16} /><strong>Raw Footage:</strong> <a href={order.rawFootageUrl} target="_blank" className="text-blue-600 underline">Download</a></p>
                    )}
                    <p><strong>Draft Video:</strong> {order.draftVideoLink}</p>
                </div>

                {/* Status & Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm p-4 rounded-xl">
                    <div>
                        <p className="">Status</p>
                        <p className="font-semibold text-gray-200">{order.status}</p>
                    </div>
                    <div>
                        <p className="">Created At</p>
                        <p className="font-semibold text-gray-200">{new Date(order.createdAt)?.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="">Last Updated</p>
                        <p className="font-semibold text-gray-200">{new Date(order.updatedAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="">Delivered On</p>
                        <p className="font-semibold text-gray-200">{order.deliveredOn ? new Date(order.deliveredOn).toLocaleString() : 'Pending'}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        onClick={handleDeliveryConfirm}
                        disabled={delivered}
                        className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-2 rounded-xl text-white font-semibold transition ${delivered ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        <CheckCircle size={18} />
                        {delivered ? 'Delivery Confirmed' : 'Confirm Delivery'}
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


const sampleOrder = {
    id: 'ord_xyz',
    clientMail: 'client@example.com',
    orderType: 'YouTube Edit',
    rawFootageSize: '2 GB',
    rawFootageLength: '15 mins',
    addOns: { "Thumbnail": 1, "Captions": 1, "Thumbnaiel": 1, "Captifons": 1, },
    videTitle: 'My First Clip',
    videoCategory: 'Education',
    publishDate: '2025-05-01',
    finalLength: '6 mins',
    videoTone: { mood: 'Energetic' },
    videoPace: 'Fast',
    instructionByClient: 'Focus on main CTA',
    exampleVideos: 'https://youtu.be/example1',
    scriptLink: 'https://docs.google.com/script',
    rawFootageUrl: 'https://drive.google.com/file',
    createdAt: new Date().toISOString(),
    deliveredOn: null,
    status: 'Draft',
    nextDraftIn: '24 hrs',
    draftVideoLink: 'Available Soon',
    updatedAt: "2025-05-01"
}