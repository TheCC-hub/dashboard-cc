'use client';

import { useState } from 'react';
import { Mail, MessageSquare, PhoneCall, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    { question: 'What are Edit Credits?', answer: 'Edit Credits are tokens used for requesting video edits.' },
    { question: 'When do my Edit Credits expire?', answer: 'Credits expire 30 days after purchase.' },
    { question: 'How do I buy more Edit Credits?', answer: 'Go to your dashboard and click “Buy Credits”.' },
    { question: 'How do I download my video?', answer: 'You can download it from your project delivery page.' },
];

export default function ContactAndFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-h-screen h-screen p-6 text-center  overflow-scroll">
            <div className='max-w-3xl mx-auto mt-12'>
                {/* Contact Section */}
                <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-300 mb-10">You can reach us through these communication methods below</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    <div className="bg-[var(--color-background-2)] border border-gray-300 rounded-lg p-6 py-16 flex flex-col gap-4 items-center justify-center hover:text-red-500 cursor-not-allowed">
                        <MessageSquare className="text-red-400 mb-2" size={42} />
                        <span className="font-medium">Chat with Video Manager</span>
                    </div>
                    <Link href="mailto:theclipcurve@gmail.com" target='_blanck' className="bg-[var(--color-background-2)] border border-gray-300 rounded-lg p-6 py-10 flex gap-4 flex-col items-center justify-center hover:text-red-500 cursor-pointer">
                        <Mail className="text-red-400 mb-2" size={32} />
                        <span className="font-medium">Support Email</span>
                    </Link>
                    <Link href={"https://calendly.com/clip-curve"} target='_blank' className="bg-[var(--color-background-2)] border border-gray-300 rounded-lg p-6 py-10 flex gap-4 flex-col items-center justify-center hover:text-red-500 cursor-pointer">
                        <PhoneCall className="text-red-400 mb-2" size={32} />
                        <span className="font-medium">Schedule Call</span>
                    </Link>
                </div>

                {/* FAQ Section */}
                <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-300 mb-6">These are the most commonly asked questions amongst our creators.</p>

                {/* <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Type here..."
                        className="w-full border rounded-lg p-3 text-sm outline-none"
                    />
                </div> */}

                <div className="space-y-5 text-center">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b-[0.1px] border-gray-600 pb-5 text-center">
                            <button
                                onClick={() => toggleIndex(index)}
                                className="flex text-xl justify-center items-center w-full font-medium relative"
                            >
                                <span className='text-red-300'>{faq.question}</span>
                                <span className='absolute right-0'>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-4 text-lg ">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}