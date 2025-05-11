import React, { useState } from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { useOrderFormStore } from '@/store/orderFormStore';

export default function OrderoCountPopup({ onClose }: { onClose: () => void }) {
    const { order, updateField } = useOrderFormStore()

    const [count, setCount] = useState<number>(order.order_quantity || 0);

    return (
        <div className=" mx-auto bg-gray-800 rounded-xl p-6 px-16 flex flex-col items-center justify-center gap-y-4">
            <div>
                <h2 className="text-2xl font-semibold text-center">Select Order Quantity</h2>
                <p className="text-gray-500 text-center mb-6">How many items do you need?</p>
            </div>

            <div className="space-y-3 mb-6">
                <div className='flex items-center justify-center gap-x-4 mt-2'>
                    <div
                        onClick={() => {
                            if (count > 0) {
                                setCount(count - 1)
                            }
                        }}
                        className='text-2xl cursor-pointer hover:text-primary flex items-center justify-center'
                    >
                        <CiCircleMinus />
                    </div>

                    <div>{count}</div>

                    <div
                        onClick={() => {
                            setCount(count + 1)
                        }}
                        className='text-2xl cursor-pointer hover:text-primary flex items-center justify-center'

                    >
                        <CiCirclePlus />
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-4">
                <button
                    onClick={onClose}
                    className="w-1/2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        updateField("order_quantity", count)
                        onClose()
                    }}
                    disabled={count <= 0}
                    className={`w-1/2 py-2 px-4 text-white rounded-lg cursor-pointer ${count > 0 ? "bg-red-500 hover:bg-red-600" : "bg-red-300 cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
