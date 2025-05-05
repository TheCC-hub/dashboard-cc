import { formatDate } from '@/utils/helper-functions'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function DeliveredOrdersTable() {
    const [orders, setOrders] = useState<any[]>([])
    const fetchAllOrders = async () => {
        try {
            const res = await fetch("/api/orders/delivered", {
                method: "GET",
            })
            if (res.ok) {
                const result = await res.json();
                console.log(result)
                setOrders(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])
    return (
        <>
            <div className="w-full bg-[var(--color-background-2)] py-5 px-10 border-b border-gray-400 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl">Delivered Orders</h1>
                    <p>total orders {orders.length}</p>
                </div>

                <button
                    className="text-white text-lg bg-red-500 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-red-600 hover:shadow-md"
                    onClick={() => redirect("/order_form")}
                >
                    Create Order
                </button>
            </div>

            <div className="bg-[var(--color-background-2)] rounded-xl border mx-5 my-8 border-gray-400 overflow-auto h-[calc(100vh-160px)]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Order Id</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Order Type</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Artist/Editor</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Delivered On</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr className="align-top">
                                <td colSpan={5} className="px-6 py-6 text-center text-xl text-gray-200">
                                    No orders available.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, i) => (
                                <tr key={i} className="align-top">
                                    <td className="px-6 py-3 text-gray-50">{order.id.slice(0, 3)}...{order.id.slice(-3)}</td>
                                    <td className="px-6 py-3 text-gray-50">{formatDate(order.createdAt)}</td>
                                    <td className="px-6 py-3 text-gray-50">{order.orderType}</td>
                                    <td className="px-6 py-3 text-gray-50">{order.status}</td>
                                    <td className="px-6 py-3 text-gray-50">{order.nextDraftIn}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}