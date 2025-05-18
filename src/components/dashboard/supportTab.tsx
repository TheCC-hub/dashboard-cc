'use client';

import { useState } from 'react';
import { Mail, MessageSquare, PhoneCall, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function ContactAndFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-h-screen h-screen p-6 text-center  overflow-scroll">
            <div className='px-10 mx-auto mt-12'>
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
                                <span className={` ${openIndex == index ? "text-red-400" : "text-gray-300"}`}>{faq.question}</span>
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

export const faqs = [
    {
        question: "What is ClipCurve?",
        answer: "ClipCurve is a professional video editing and growth service for content creators. We turn your raw footage or long-form videos into polished vertical and horizontal content ready for YouTube, Shorts, TikTok, Reels, and more."
    },
    {
        question: "Do you edit both vertical and horizontal videos?",
        answer: "Yes! We specialize in both vertical (9:16) content for Shorts, Reels, and TikTok, and horizontal (16:9) videos for platforms like YouTube, webinars, and courses. You choose the format — or we can recommend what works best."
    },
    {
        question: "How does the process work?",
        answer: "After signing up, you upload your footage or share a video link. Our editors review the content, pick key moments, and deliver high-quality edits. You’ll be able to request revisions and approve the final cut."
    },
    {
        question: "Is the first vertical video really free?",
        answer: "Yes! Your first vertical video is completely free — no commitment required. It's our way of showing you the quality of our work before you choose a plan."
    },
    {
        question: "Can I submit horizontal footage for editing?",
        answer: "Absolutely. We accept all aspect ratios and tailor our editing based on where you want to publish — YouTube, Shorts, Reels, TikTok, or others."
    },
    {
        question: "How long does delivery take?",
        answer: "Our standard delivery time is 1–3 business days per video, depending on complexity and plan. Express delivery is available if needed."
    },
    {
        question: "Can I request revisions?",
        answer: "Yes, we offer 1–2 rounds of revisions depending on your selected package. We want to make sure you’re completely satisfied."
    },
    {
        question: "Do I need to provide timestamps or clips?",
        answer: "You can provide timestamps if you have specific moments in mind, or let our editors pick the highlights based on engagement potential and trends."
    },
    {
        question: "Do you add captions, effects, and motion graphics?",
        answer: "Yes! All videos include stylized captions and optional motion effects like zooms, transitions, emojis, and on-screen text to boost engagement."
    },
    {
        question: "What formats do you deliver?",
        answer: "We deliver final videos in the format you choose: vertical (9:16), horizontal (16:9), or square (1:1) — all optimized for the platform you’re targeting."
    },
    {
        question: "How do I subscribe or change my plan?",
        answer: "You can explore and subscribe to any of our plans from the pricing page. To upgrade or downgrade your current plan, just log in to your dashboard or reach out to support."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel, pause, or change your subscription at any time directly from your dashboard — no questions asked."
    },
    {
        question: "How do I contact support?",
        answer: "You can reach us via the social links in team chat on our website or email us at theclipcurve@gmail.com. We usually respond within 24 hours."
    }
];