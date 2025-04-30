// app/page.tsx or any client component
'use client'

import { useSearchParams } from 'next/navigation'
import ActiveOrdersTable from './activeOrderTable'
import DraftOrdersTable from './draftOrderTable'
import DeliveredOrdersTable from './deliveredOrderTable'
import ContactAndFAQ from './supportTab'
import PricingSection from '../prices'
// Add more components as needed

export default function Dashboard() {
    const searchParams = useSearchParams()
    const nav = searchParams.get('nav') || 'Orders'

    const renderComponent = () => {
        switch (nav) {
            case 'Active Orders':
                return <ActiveOrdersTable />
            case 'Drafts':
                return <DraftOrdersTable />
            case 'Delivered':
                return <DeliveredOrdersTable />
            case 'Team Chat':
                return <div>Team Chat</div>
            case 'Prices':
                return <PricingSection />
            case 'Support':
                return <ContactAndFAQ />
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