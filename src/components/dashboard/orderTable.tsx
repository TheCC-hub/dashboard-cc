import React from 'react'

const orders: any[] = [] // replace with your data

export default function OrderTable() {
    return (
        <table className="min-w-full h-full divide-y divide-gray-200">
            <thead className="bg-white">
                <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Order</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Editor/Artist</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Next draft in</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-400">
                            No orders available.
                        </td>
                    </tr>
                ) : (
                    orders.map((order, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 text-sm text-gray-800">{order.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.editor}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.nextDraftIn}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}