'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
    FaWhatsapp,
    FaDiscord,
    FaSlack,
    FaEnvelope,
    FaTelegramPlane,
    FaFacebookMessenger,
} from 'react-icons/fa';

const platforms = [
    {
        name: 'WhatsApp',
        icon: <FaWhatsapp className="text-green-500 text-xl group-hover:text-white" size={40} />,
        link: 'https://wa.me/7027950914',
        description: 'Chat with us instantly on WhatsApp.',
    },
    {
        name: 'Discord',
        icon: <FaDiscord className="text-indigo-500 text-xl group-hover:text-white" size={40} />,
        link: 'https://discord.com/users/1362356643366568006',
        description: 'Join our Discord server for real-time support.',
    },
    {
        name: 'Slack',
        icon: <FaSlack className="text-purple-500 text-xl group-hover:text-white" size={40} />,
        link: 'https://app.slack.com/client/T08RG37HLTA/C08RG37QN72',
        description: 'Connect with us on Slack for async collaboration.',
    },
    {
        name: 'Email',
        icon: <FaEnvelope className="text-red-500 text-xl group-hover:text-white" size={40} />,
        link: 'mailto:theclipcurve@gmail.com',
        description: 'Send us an email anytime.',
    },
    {
        name: 'Telegram',
        icon: <FaTelegramPlane className="text-blue-400 text-xl group-hover:text-white" size={40} />,
        link: 'https://t.me/@adiabhiraj195',
        description: 'Reach us via Telegram for quick queries.',
    },
    // {
    //     name: 'Messenger',
    //     icon: <FaFacebookMessenger className="text-blue-600 text-xl group-hover:text-white" size={40} />,
    //     link: 'https://m.me/yourPage',
    //     description: 'Drop a message on Messenger.',
    // },
];

export default function ChatTabs() {

    return (
        <div className="w-full p-4 rounded-xl shadow-lg px-10">
            <h2 className="text-3xl font-semibold mb-10 mt-10 text-center">Connect With Us</h2>

            <div className="mt-12 p py-8 text-white mx-auto">
                <h2 className="text-2xl font-semibold mb-3">Let’s not ghost each other 👻</h2>
                <p className="text-gray-300 leading-relaxed">
                    Got feedback? Ideas? Memes? Slide into our DMs (or emails, if you're classy like that). We're chill,
                    we reply fast, and we don’t bite—unless you ask nicely.
                </p>
            </div>
            <div className="grid grid-cols-3 justify-center gap-4 mb-4 overflow-x-auto">
                {platforms.map((platform, idx) => (
                    <Link
                        key={platform.name}
                        href={platform.link}
                        target='_blank'
                        className={`flex flex-col items-center gap-5 px-3 py-10 text-lg rounded-xl transition hover:bg-red-500 bg-zinc-800 group hover:text-white`}
                    >
                        {platform.icon}
                        {platform.name}
                    </Link>
                ))}
            </div>

            {/* <div className="text-center px-4">
                <p className="text-lg font-medium mb-2">{active.description}</p>
                <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition"
                >
                    Go to {active.name}
                </a>
            </div> */}
        </div>
    );
}


// export function ConnectSection() {
//     return (
//         <div className="mt-12 text-center px-4 py-6 bg-[#050613] text-white rounded-2xl shadow-lg">
//             <h2 className="text-xl font-semibold mb-2">Have questions or want to collaborate?</h2>
//             <p className="text-base text-gray-300 mb-4">
//                 We’re always here to help! Reach out to us through your favorite platform—
//                 whether it's <span className="text-green-400 font-medium">WhatsApp</span>,
//                 <span className="text-blue-400 font-medium"> Slack</span>,
//                 <span className="text-indigo-400 font-medium"> Discord</span>, or
//                 <span className="text-yellow-300 font-medium"> Email</span>—for quick support,
//                 project discussions, or just to say hello. Let's stay connected and build
//                 something great together.
//             </p>

//             <div className="flex justify-center gap-6 text-2xl mt-4">
//                 <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
//                     <FaWhatsapp />
//                 </a>
//                 <a href="https://slack.com/your-workspace-link" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//                     <FaSlack />
//                 </a>
//                 <a href="https://discord.gg/your-invite-code" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">
//                     <FaDiscord />
//                 </a>
//                 <a href="mailto:your@email.com" className="text-yellow-300 hover:text-yellow-200">
//                     <FaEnvelope />
//                 </a>
//             </div>
//         </div>
//     );
// }