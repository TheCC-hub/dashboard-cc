import Link from 'next/link'
import React from 'react'

export default function PackageCard({ item, bgRed }: any) {

    return (
        <div className='w-auto text-center relative rounded-3xl overflow-hidden border-2 border-[var(--color-brand-red)] backdrop-blur-sm bg-zinc-800'>
            <div className={`w-full  py-5 border-b-[0.1px] border-[var(--color-brand-red)]  ${bgRed ? "bg-[var(--color-brand-red)] text-white" : "bg-zinc-700 text-white"}`}>
                <h1 className='text-3xl font-semibold '>{item.name}</h1>
                <p>{item.description}</p>
            </div>

            <div className='flex flex-col gap-y-10 pt-10 pb-10'>
                {/* price  */}
                <div className="flex flex-col items-center relative">
                    <div className="flex items-end gap-2 relative">
                        <span className="absolute top-2 -left-3 text-lg font-semibold">$</span>
                        <span className="text-3xl line-through">{item.price}</span>
                        <span className="text-5xl font-semibold text-[var(--color-brand-red)]">{item.discountedPrice}</span>
                    </div>
                    <span className="absolute -bottom-4 text-sm">per {item.per}</span>
                </div>

                <div>✅ {item.endDelevery}</div>

                <Link href={"/order_form"}
                    className='px-5 py-2 mx-auto text-lg font-bold border-gray-400 border-2 hover:border-[var(--color-brand-red)] hover:text-white rounded-xl hover:bg-[var(--color-brand-red)] transform duration-300 ease-in-out'
                >
                    Get Start
                </Link>
            </div>
        </div>
    )
}
