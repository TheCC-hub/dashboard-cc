"use client"
import Dashboard from "@/components/dashboard/renderComponent";
import Sidebar from "@/components/navbar.tsx/sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="w-full h-screen bg-red-100 flex">

      <div className='h-full max-w-[250px] px-4 py-6 bg-gray-100 border-r border-gray-400 text-[var(--color-brand-red)] flex flex-col items-center justify-between'>
        <div className='w-full flex-col flex items-center justify-center'>
          <div className=' h-12'>
            <Link href={"/"} className='text-3xl hover:text-4xl transform duration-300 ease-in-out hover:font-bold'>ClipCurve</Link>
          </div>

          {/* progress bar  */}
          <div className='w-full flex items-center justify-center mx-10 mt-10'>
            <Sidebar />
          </div>
        </div>
        {/* user profile  */}
        <div className='w-full flex items-end justify-center mt-10'>
          <div className='flex items-center justify-center gap-3 relative'>
            <div
              className='w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:border-2 border-primary'
            >
              {session?.user?.image ?
                <Image src={session?.user?.image} alt='icon' width={500} height={500} /> :
                <FaRegUser />
              }
            </div>
            <span className="text-lg font-semibold">{session?.user?.name}</span>

          </div>
        </div>
      </div>

      <div className="w-full min-h-screen">
        <div className="w-full bg-white py-5 px-10 border-b border-gray-400 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-black">All Orders</h1>
            <p>0 current orders</p>
          </div>

          <button className="text-white text-lg bg-red-500 rounded-lg py-1.5 px-4">Create Order</button>
        </div>

        <div className="bg-white rounded-xl border mx-10 my-10 border-gray-400 overflow-auto h-[calc(100vh-180px)]">
          <Dashboard />
        </div>
      </div>

    </div>
  );
}
