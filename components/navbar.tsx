'use client'

import React from 'react'
import { LuSearch, LuWrench, LuBookmark, LuHouse, LuMenu, LuExternalLink } from 'react-icons/lu'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet"
import Link from 'next/link'
import { FaLaptopCode, FaToolbox } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Banner from './banner'
import { TbHomeInfinity } from 'react-icons/tb'

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
          className='text-xl font-bold tracking-tighter flex items-center gap-2 bg-[#b58170] text-white px-4 py-2 rounded-full rounded-bl-none hover:bg-accentOriginal/80 transition-all duration-200 ease-in-out cursor-pointer group'
        >
          <FaToolbox className='group-hover:rotate-12 transition-all duration-200 ease-in-out' /> 
          InfiniteToolbox
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
                    flex gap-2 items-center rounded-md group cursor-pointer text-[#966554] tracking-tight
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
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Navbar