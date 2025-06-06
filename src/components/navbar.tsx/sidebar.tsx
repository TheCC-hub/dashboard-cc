'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// import { cn } from '@/lib/utils' // Tailwind class merge utility
import {
    FileText,
    DollarSign,
    MessageCircle,
    HelpCircle,
    DraftingCompass,
} from 'lucide-react'
import { IoCheckmarkDoneSharp } from "react-icons/io5";


const menuItems = [
    { name: 'Active Orders', icon: FileText },
    { name: 'Drafts', icon: DraftingCompass },
    { name: 'Delivered', icon: IoCheckmarkDoneSharp },
    { name: 'Team Chat', icon: MessageCircle },
    { name: 'Prices', icon: DollarSign },
    { name: 'Support', icon: HelpCircle },
]

export default function Sidebar() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const current = searchParams.get('nav') || 'Orders'

    const handleClick = (name: string) => {
        router.push(`/?nav=${encodeURIComponent(name)}`)
    }

    return (
        <div className="w-full p-4">
            <div className="space-y-2">
                {menuItems.map(({ name, icon: Icon }) => (
                    <div
                        key={name}
                        className={
                            `flex items-center space-x-3 p-3 rounded-md cursor-pointer text-gray-200 transition-all 
                            ${current === name && 'bg-red-100 text-red-600 font-semibold'}`
                        }
                        onClick={() => handleClick(name)}
                    >
                        <Icon className="w-5 h-5" />
                        <span>{name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}