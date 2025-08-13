"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { LuBookmark, LuHouse, LuSearch, LuWrench } from "react-icons/lu";

import Banner from './banner';
import { FaLaptopCode } from 'react-icons/fa';

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
    name: "App Developers",
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

            {
              links.map((link, index) => (
                <Link key={index} href={link.path} className={`flex gap-2 items-center rounded-md group cursor-pointer text-[#966554] tracking-tight ${isActive(link.path) ? "bg-accentOriginal text-white [&>span]:text-white" : ""}`}>
                  <span className='p-1.5 border-2 duration-200 group-hover:bg-accentOriginal group-hover:text-white text-accentOriginal border-accentOriginal flex items-center justify-center rounded-md'>{link.icon}</span>
                  {link.name}
                </Link>
              ))
            }

      <Banner />
        </section>
    </aside>
  )
}

export default Sidebar