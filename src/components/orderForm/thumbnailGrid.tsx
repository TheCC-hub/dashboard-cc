'use client';

import Image from 'next/image';

const thumbnails = [
    {
        title: 'MrBeast Exaggerated',
        img: '/thumbs/mrbeast.png',
    },
    {
        title: 'Headshot',
        img: '/thumbs/headshot.png',
    },
    {
        title: 'Quote',
        img: '/thumbs/quote.png',
    },
    {
        title: 'Statement / Fact',
        img: '/thumbs/fact.png',
    },
    {
        title: 'Before & After',
        img: '/thumbs/before-after.png',
    },
    {
        title: 'Versus / Comparison',
        img: '/thumbs/versus.png',
    },
    {
        title: 'Process Shot',
        img: '/thumbs/process.png',
    },
    {
        title: 'No Text',
        img: '/thumbs/no-text.png',
    },
];

export default function ThumbnailGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            {thumbnails.map((thumb, index) => (
                <div key={index} className="bg-white rounded-xl shadow hover:shadow-md transition p-2 text-center">
                    <div className="relative w-full h-40 rounded overflow-hidden">
                        <Image
                            src={thumb.img}
                            alt={thumb.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                        />
                    </div>
                    <p className="mt-2 font-semibold text-sm sm:text-base">{thumb.title}</p>
                </div>
            ))}
        </div>
    );
}