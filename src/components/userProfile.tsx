import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import { FaRegUser } from 'react-icons/fa6';
import Image from 'next/image';

export default function UserProfile() {
    const [menuPopup, setMenuPopup] = React.useState(false);
    const { data: session } = useSession();
    return (
        <div className='w-full flex items-end justify-center mt-10 relative'>
            {menuPopup && (
                <div className='absolute bottom-14 right-0 bg-[var(--color-background-dark)] p-4 rounded-md shadow-lg w-full'>
                    <ul className='flex flex-col gap-2'>
                        <li className='cursor-pointer hover:text-[var(--color-brand-red)]'>Profile</li>
                        <li className='cursor-pointer hover:text-[var(--color-brand-red)]'>Settings</li>
                        <li className='cursor-pointer hover:text-[var(--color-brand-red)]' onClick={() => { signOut(); setMenuPopup(false) }}>Logout</li>
                    </ul>
                </div>
            )}

            <div className='flex items-center justify-center gap-3 relative hover:bg-white/10 cursor-pointer hover:border-red-400 border-y-[0.5px] transform ease-out duration-300 border-transparent w-full py-2' onClick={() => setMenuPopup(!menuPopup)}>
                <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:border-2 border-primary'>
                    {session?.user?.image ?
                        <Image src={session?.user?.image} alt='icon' width={500} height={500} /> :
                        <FaRegUser />
                    }
                </div>
                <span className="text-lg font-semibold">{session?.user?.name}</span>

            </div>

        </div>
    )
}
