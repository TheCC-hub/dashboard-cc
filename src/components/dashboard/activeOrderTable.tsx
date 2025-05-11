import { formatDate } from '@/utils/helper-functions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function ActiveOrdersTable() {
    const [orders, setOrders] = useState<any[]>([])
    const fetchAllOrders = async () => {
        try {
            const res = await fetch("/api/orders/active", {
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
            <div className="w-full bg-[#1E293B] py-5 px-10 border-b border-gray-400 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl">All Orders</h1>
                    <p>total orders {orders.length}</p>
                </div>

                <button
                    className="text-white text-lg bg-red-500 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-red-600 hover:shadow-md"
                    onClick={() => redirect("/order_form")}
                >
                    Create Order
                </button>
            </div>


            <div className="bg-[#1E293B] rounded-xl border mx-5 my-8 border-gray-400 overflow-auto h-[calc(100vh-160px)]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Order Id</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Order Type</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">CreatedAt</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-300">Last draft</th>
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
                                    <td className="px-6 py-3 text-gray-50"><Link className='hover:underline hover:text-red-500' href={`/order/${order.id}`} target='_blanck'>{order.videTitle}</Link></td>
                                    <td className="px-6 py-3 text-gray-50">{order.orderType}</td>
                                    <td className="px-6 py-3 text-gray-50">{formatDate(order.createdAt)}</td>
                                    <td className="px-6 py-3 text-gray-50">{order.draftVideoLink}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}