import { formatDate } from '@/utils/helper-functions'
import Link from 'next/link'
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
            <div className="w-full bg-[var(--color-background-2)] py-5 px-10 border-b border-gray-400 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl">Draft Orders</h1>
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
                            <th className="px-6 py-3 text-left font-semibold text-red-200">Order Id</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-200">Title</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-200">Order Type</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-200">CreatedAt</th>
                            <th className="px-6 py-3 text-left font-semibold text-red-200">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 ">
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
                                    {/* <td className="px-6 py-3 text-gray-50">{order.videTitle ? order.videTitle : "No Title is Provided"}</td> */}
                                    <td className="px-6 py-3 text-gray-50"><Link className='hover:underline hover:text-red-500' href={`/order/${order.id}`} target='_blanck'>{order.videTitle ? order.videTitle : "No Title is Provided"}</Link></td>

                                    <td className="px-6 py-3 text-gray-50">{order.orderType}</td>
                                    <td className="px-6 py-3 text-gray-50">{formatDate(order.createdAt)}</td>
                                    <td className="px-6 py-1 text-gray-50 flex items-center justify-start">
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