'use client';

import { useState } from 'react';
import { Mail, MessageSquare, PhoneCall, Plus, Minus } from 'lucide-react';

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

        <div className="max-h-screen h-screen p-6 text-center bg-white overflow-scroll">
            <div className='max-w-3xl mx-auto mt-20'>
                {/* Contact Section */}
                <h2 className="text-3xl font-semibold mb-1">Contact Us</h2>
                <p className="text-gray-500 mb-6">You can reach us through these communication methods below</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    <div className="border rounded-lg p-6 flex flex-col items-center">
                        <MessageSquare className="text-red-400 mb-2" size={32} />
                        <span className="font-medium">Chat with Video Manager</span>
                    </div>
                    <div className="border rounded-lg p-6 flex flex-col items-center">
                        <Mail className="text-red-400 mb-2" size={32} />
                        <span className="font-medium">Support Email</span>
                    </div>
                    <div className="border  rounded-lg p-6 flex flex-col items-center">
                        <PhoneCall className="text-red-400 mb-2" size={32} />
                        <span className="font-medium">Schedule Call with Video Manager</span>
                    </div>
                </div>

                {/* FAQ Section */}
                <h2 className="text-3xl font-semibold mb-1">Frequently Asked Questions</h2>
                <p className="text-gray-500 mb-6">These are the most commonly asked questions amongst our creators.</p>

                {/* <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Type here..."
                        className="w-full border rounded-lg p-3 text-sm outline-none"
                    />
                </div> */}

                <div className="space-y-6 text-center">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b-[0.1px] border-gray-600 pb-6 text-center">
                            <button
                                onClick={() => toggleIndex(index)}
                                className="flex text-xl justify-center items-center w-full font-medium relative"
                            >
                                <span>{faq.question}</span>
                                <span className='absolute right-0'>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-4 text-lg text-gray-800">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}