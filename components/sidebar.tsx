"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuBookmark, LuExternalLink, LuHouse, LuSearch, LuWrench } from "react-icons/lu";

import Banner from './banner';
import { FaLaptopCode } from 'react-icons/fa';
import { TbHomeInfinity } from 'react-icons/tb';
import { FiYoutube } from 'react-icons/fi';

const links = [
  {
    name: "Home",
    path: "/",
    icon: <LuHouse />
  },
  {
    name: "Search",
    path: "/search",
    icon: <LuSearch />
  },
  {
    name: "Tools",
    path: "/tools",
    icon: <LuWrench />
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: <LuBookmark />
  },
  {
    name: "Developers",
    path: "/developers",
    icon: <FaLaptopCode />
  }
]

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <aside className='w-[225px] py-8 px-4 flex flex-col justify-between h-full'>
        <section className="flex flex-col gap-2 font-semibold">
            <div className="grid grid-cols-2 gap-2">
              {
                links.map((link, index) => (
                  <Link key={index} href={link.path} className={`flex flex-col px-2 py-5 items-center rounded-md hover:bg-accentOriginal hover:text-white text-sm group cursor-pointer text-[#966554] tracking-tight transition-all duration-200 ${isActive(link.path) ? "bg-accentOriginal text-white [&>span]:text-white" : ""} ${index === links.length - 1 ? "col-span-2" : ""}`}>
                    <span className='group-hover:text-white text-accentOriginal text-lg flex items-center justify-center rounded-md'>{link.icon}</span>
                    {link.name}
                  </Link>
                ))
              }
            </div>

      <Banner />
      <div className="mt-2 bg-gradient-to-br from-gray-800 to-gray-900 py-4 px-2 rounded-xl text-white flex flex-col items-center justify-between gap-3 relative overflow-hidden">
         <TbHomeInfinity className="absolute -left-0 -bottom-6 w-36 h-36 text-white/5" />
         <p className='text-sm font-medium relative z-10'>Infinite Flight Community</p>
         <Link 
         target='_blank'
           href="https://community.infiniteflight.com/t/infinitetoolbox-an-all-in-one-directory-for-infinite-flight-third-party-apps/1080167?u=charlesacosta163" 
           className="text-xs bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white flex items-center gap-2 z-10"
         >
           Visit Forum <LuExternalLink className="w-4 h-4" />
         </Link>
      </div>
        </section>
    </aside>
  )
}

export default Sidebar