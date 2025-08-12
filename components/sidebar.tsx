"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoWarning } from 'react-icons/io5';
import { LuBookmark, LuHouse, LuSearch, LuWrench } from "react-icons/lu";

import Banner from './banner';

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
                <Link key={index} href={link.path} className={`flex gap-2 items-center rounded-md group cursor-pointer text-gray-700 tracking-tight ${isActive(link.path) ? "bg-accentOriginal text-white [&>span]:text-white" : ""}`}>
                  <span className='p-1.5 border-2 duration-200 group-hover:bg-accentOriginal group-hover:text-white text-accentOriginal border-accentOriginal flex items-center justify-center rounded-md'>{link.icon}</span>
                  {link.name}
                </Link>
              ))
            }

<div className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
              <IoWarning className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-500">Needs Fact Check</span>
            </div>
      <Banner />
        </section>
    </aside>
  )
}

export default Sidebar