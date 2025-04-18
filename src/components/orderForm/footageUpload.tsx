import React from 'react'
import NextAndBackButtons from './nextAndBackButtons'
import { FiUploadCloud } from 'react-icons/fi'
import { LuLink } from 'react-icons/lu'
import { useOrderFormStore } from '@/store/orderFormStore'

export default function FootageUploadForm() {
    const [urlPopup, setUrlPopup] = React.useState(true)
    const { order, updateField } = useOrderFormStore()

    return (
        <div className='h-full w-full'>
            <div className=''>
                <h1 className='text-3xl'>Let's get started on your order!</h1>
                <p>Please select one of the following options to start your order!</p>
            </div>

            <div className='w-full h-full flex items-center justify-between gap-4 py-4'>
                <div className='border border-gray-400 opacity-80 bg-black/10 cursor-not-allowed rounded-xl w-full h-full flex flex-col items-center justify-center ga-2 text-center content-center'>
                    <FiUploadCloud className='text-4xl text-primary' />
                    <p className=''>Upload raw footage</p>
                    <p className='text-sm text-gray-400 mt-3'>Upload to our cloud</p>
                </div>
                <div className='border border-gray-400 rounded-xl w-full h-full flex flex-col items-center justify-center ga-2 text-center content-center'>
                    <div onClick={() => setUrlPopup(!urlPopup)} className='flex flex-col items-center justify-center gap-2 cursor-pointer'>
                        <LuLink className='text-4xl text-primary' />
                        <p className=''>Personal Storage</p>
                        <p className='text-sm text-gray-400 mt-3'>Leave a link to your own personal storage</p>
                    </div>
                    {urlPopup &&
                        <div className='mt-4 w-full' >
                            <input
                                type='text'
                                value={order.raw_footage_url}
                                onChange={(e) => updateField("raw_footage_url", e.target.value)}
                                name='raw_footage_url'
                                className='border border-gray-300 rounded-md p-2 w-[60%] bg-transparent outline-red-500'
                                placeholder='Enter your URL here'
                            />
                        </div>}

                </div>
            </div>

            <NextAndBackButtons
                disabled={order.raw_footage_url ? false : true}
            />
        </div >
    )
}
