"use client"
import Dashboard from "@/components/dashboard/renderComponent";
import Sidebar from "@/components/navbar.tsx/sidebar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthPage from "@/components/auth";
import { useEffect, useState } from "react";
import UserProfile from "@/components/userProfile";

export default function Home() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname()

  const [menuPopup, setMenuPopup] = useState(false);

  const authMode = searchParams.get("auth");
  const notAuthenticated = authMode === "login" || authMode === "signup";

  useEffect(() => {
    if (session && status === "authenticated") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("nav", "Active Orders");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [session, status]);

  useEffect(() => {
    if (!session && status !== "loading" && !authMode) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("auth", "login");
      router.replace(`${pathname}?${params.toString()}`);

    }
    if (session && status === "authenticated" && authMode) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [session, status, pathname, searchParams, authMode]);

  return (
    <div className="w-full h-screen bg-[var(--color-background)] flex text-white">
      {notAuthenticated &&
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center'>
          <AuthPage authMode={authMode} />
        </div>
      }

      <div className='h-full max-w-[250px] bg-[var(--color-background-2)] px-4 py-6  border-r border-gray-400  flex flex-col items-center justify-between'>
        <div className='w-full flex-col flex items-center justify-center'>
          <div className=' h-12 text-[var(--color-brand-red)]'>
            <Link href={"/"} className='text-3xl hover:text-4xl transform duration-300 ease-in-out hover:font-bold'>ClipCurve</Link>
          </div>

          {/* progress bar  */}
          <div className='w-full flex items-center justify-center mx-10 mt-10'>
            <Sidebar />
          </div>
        </div>

        {/* user profile  */}
        <UserProfile />
      </div>

      <div className="w-full min-h-screen">
        <Dashboard />
      </div>

    </div>
  );
}
