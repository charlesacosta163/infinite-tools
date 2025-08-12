'use client'

import React from 'react'
import { LuSearch, LuWrench, LuBookmark, LuHouse, LuMenu } from 'react-icons/lu'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet"
import Link from 'next/link'
import { FaToolbox } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { IoWarning } from 'react-icons/io5'
import Banner from './banner'

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

const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className='px-4 py-2 w-full'>
      <nav className='flex justify-between md:justify-center items-center gap-2'>
        <Link 
          href="/" 
          className='text-xl font-bold tracking-tighter flex items-center gap-2 bg-accentOriginal text-white px-4 py-2 rounded-lg hover:bg-accentOriginal/80 transition-all duration-200 ease-in-out cursor-pointer group'
        >
          <FaToolbox className='group-hover:rotate-12 transition-all duration-200 ease-in-out' /> 
          InfiniteTools
        </Link>
           
        <Sheet>
          <SheetTrigger className='md:hidden p-2 hover:bg-light/50 rounded-lg transition-colors'>
          <LuMenu className="w-6 h-6 text-gray-500" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[225px] p-4 bg-lightOriginal">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 font-semibold">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`
                    flex gap-2 items-center rounded-md group cursor-pointer text-gray-700 tracking-tight
                    ${isActive(link.path) 
                      ? "bg-accentOriginal text-white [&>span]:text-white" 
                      : "hover:bg-lightOriginal/50"
                    }
                  `}
                >
                  <span className={`
                    p-1.5 border-2 duration-200 
                    ${isActive(link.path)
                      ? "bg-accentOriginal text-white border-accentOriginal"
                      : "text-accentOriginal border-accentOriginal group-hover:bg-accentOriginal group-hover:text-white"
                    }
                    flex items-center justify-center rounded-md
                  `}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}

<div className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
              <IoWarning className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-500">Needs Fact Check</span>
            </div>

            <Banner />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar