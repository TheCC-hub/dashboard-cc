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
            case 'Edit Credits':
                return <div>other comp</div>
            // Add more cases as needed
            default:
                return <div className="p-4 text-gray-500">Not Found</div>
        }
    }

    return (
        <div className="p-4">
            {renderComponent()}
        </div>
    )
}