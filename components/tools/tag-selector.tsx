'use client'
import { useEffect, useState} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines, MdOutlineCalendarMonth } from 'react-icons/md'
import { FaRegBuilding } from 'react-icons/fa'
import { TbApiApp, TbFilePencil, TbRoute, TbTools } from 'react-icons/tb'
import { GrResources } from 'react-icons/gr'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { getToolCategoryAmounts } from '@/lib/actions'
import { toolsData } from '@/lib/tools-data';
import { LuBot, LuSettings } from 'react-icons/lu'

const categories = [{
   name: "All",
   icon: <FaRegBuilding />,
   color: "text-gray-600 dark:text-gray-400",
   bgColor: "bg-gray-500 dark:bg-gray-600"
}, {
   name: "Tracker",
   icon: <MdTrackChanges />,
   color: "text-blue-600 dark:text-blue-400",
   bgColor: "bg-blue-500 dark:bg-blue-600"
}, {
   name: "Stats",
   icon: <MdOutlineQueryStats />,
   color: "text-green-600 dark:text-green-400",
   bgColor: "bg-green-500 dark:bg-green-600"
}, {
   name: "FPL",
   icon: <TbRoute />,
   color: "text-purple-600 dark:text-purple-400",
   bgColor: "bg-purple-500 dark:bg-purple-600"
},
{
   name: "API",
   icon: <TbApiApp />,
   color: "text-cyan-600 dark:text-cyan-400",
   bgColor: "bg-cyan-500 dark:bg-cyan-600"
}, {
   name: "VA",
   icon: <MdOutlineAirlines />,
   color: "text-red-600 dark:text-red-400",
   bgColor: "bg-red-500 dark:bg-red-600"
}, {
   name: "Logger",
   icon: <TbFilePencil />,
   color: "text-amber-600 dark:text-amber-400",
   bgColor: "bg-amber-500 dark:bg-amber-600"
},{
   name: "Addons",
   icon: <TbTools />,
   color: "text-pink-600 dark:text-pink-400",
   bgColor: "bg-pink-500 dark:bg-pink-600"
}, {
   name: "ATC",
   icon: <PiAirTrafficControlBold />,
   color: "text-indigo-600 dark:text-indigo-400",
   bgColor: "bg-indigo-500 dark:bg-indigo-600"
}, {
   name: "Bots",
   icon: <LuBot />,
   color: "text-teal-600 dark:text-teal-400",
   bgColor: "bg-teal-500 dark:bg-teal-600"
}, {
   name: "Utility",
   icon: <LuSettings />,
   color: "text-orange-600 dark:text-orange-400",
   bgColor: "bg-orange-500 dark:bg-orange-600"
}]

export default function TagSelector() {
   const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
   const [selectedCategory, setSelectedCategory] = useState("all")
   const router = useRouter()
   const pathname = usePathname()

   const searchParams = useSearchParams()
   const category = searchParams.get("category")

   useEffect(() => {
     const counts = getToolCategoryAmounts();
     setCategoryCounts(counts);
   }, []);

   useEffect(() => {
      setSelectedCategory(category || "all")
   }, [category])
    
   function handleSelectTag(category: string) {
      setSelectedCategory(category)
      router.push(`${pathname}?category=${category}`)
   }

   return (
     <section className="flex gap-3 flex-wrap border-b border-accentOriginal/20 dark:border-orange-400/20 pb-4">
        {
            categories.map((category, index) => (
              <button 
                key={index} 
                onClick={() => handleSelectTag(category.name.toLowerCase())} 
                className={`
                  px-4 py-1.5 rounded-lg font-medium text-sm 
                  transition-all duration-200 ease-in-out cursor-pointer flex items-center gap-2
                  ${selectedCategory === category.name.toLowerCase() 
                    ? `${category.bgColor} text-white shadow-md scale-105 !font-bold [&>svg]:text-white` 
                    : `bg-lightOriginal/50 dark:bg-gray-800 hover:bg-lightOriginal dark:hover:bg-gray-700 hover:scale-105 ${category.color}`
                  }
                `}
              >
                {category.icon}
                {category.name}
                <span className="text-xs">
                  ({category.name === "All" ? toolsData.length : categoryCounts[category.name.toLowerCase()] || 0})
                </span>
              </button>
            ))
        }
     </section>
   )
}