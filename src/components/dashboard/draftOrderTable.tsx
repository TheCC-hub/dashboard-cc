import { formatDate } from '@/utils/helper-functions'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function DraftOrdersTable() {
    const [orders, setOrders] = useState<any[]>([])
    const fetchAllOrders = async () => {
        try {
            const res = await fetch("/api/orders/draft", {
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

    const handleOrderContinue = (id: string) => {
        redirect(`/order_form?id=${id}`)
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])
    return (
        <>
            <div className="w-full bg-white py-5 px-10 border-b border-gray-400 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl text-black">Draft Orders</h1>
                    <p>total orders {orders.length}</p>
                </div>

                <button
                    className="text-white text-lg bg-red-500 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-red-600 hover:shadow-md"
                    onClick={() => redirect("/order_form")}
                >
                    Create Order
                </button>
            </div>

            <div className="bg-white rounded-xl border mx-5 my-8 border-gray-400 overflow-auto h-[calc(100vh-160px)]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-500">Order Id</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-500">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-500">Order Type</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-500">CreatedAt</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {orders.length === 0 ? (
                            <tr className="align-top">
                                <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-400">
                                    No orders available.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, i) => (
                                <tr key={i} className="align-top">
                                    <td className="px-6 py-3 text-gray-800">{order.id.slice(0, 3)}...{order.id.slice(-3)}</td>
                                    <td className="px-6 py-3 text-gray-600">{order.videTitle ? order.videTitle : "No Title is Provided"}</td>
                                    <td className="px-6 py-3 text-gray-800">{order.orderType}</td>
                                    <td className="px-6 py-3 text-gray-600">{formatDate(order.createdAt)}</td>
                                    <td className="px-6 py-1 text-gray-600 flex items-center justify-start">
                                        <button onClick={() => handleOrderContinue(order.id)} className='bg-red-500 hover:bg-red-500/90 cursor-pointer px-3 py-1.5 rounded text-white'>Continue</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}