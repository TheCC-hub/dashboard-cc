// app/page.tsx or any client component
'use client'

import { useSearchParams } from 'next/navigation'
import OrdersTable from './orderTable'
// Add more components as needed

export default function Dashboard() {
    const searchParams = useSearchParams()
    const nav = searchParams.get('nav') || 'Orders'

    const renderComponent = () => {
        switch (nav) {
            case 'Orders':
                return <OrdersTable />
            case 'Drafts':
                return <div>Draft</div>
            case 'Delivered':
                return <div>Delivered</div>
            case 'Team Chat':
                return <div>Team Chat</div>
            case 'Prices':
                return <div>Prices</div>
            case 'Support':
                return <div>Support</div>
            default:
                return <div className="p-4 text-gray-500">Not Found</div>
        }
    }

    return (
        <div className="">
            {renderComponent()}
        </div>
    )
}