'use client'
import { useEffect, useState} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines } from 'react-icons/md'
import { FaRegBuilding } from 'react-icons/fa'
import { TbApiApp, TbFilePencil, TbTools } from 'react-icons/tb'
import { GrResources } from 'react-icons/gr'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { getToolCategoryAmounts } from '@/lib/actions'
import { toolsData } from '@/lib/tools-data';

const categories = [{
   name: "All",
   icon: <FaRegBuilding />
}, {
   name: "Tracker",
   icon: <MdTrackChanges />
}, {
   name: "Stats",
   icon: <MdOutlineQueryStats />
}, {
   name: "API",
   icon: <TbApiApp />
}, {
   name: "VA",
   icon: <MdOutlineAirlines />
}, {
   name: "Logger",
   icon: <TbFilePencil />
},{
   name: "Addons",
   icon: <TbTools />
}, {
   name: "ATC",
   icon: <PiAirTrafficControlBold />
}, {
   name: "Other",
   icon: <GrResources />
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
     <section className="flex gap-3 flex-wrap border-b border-accentOriginal/20 pb-4">
        {
            categories.map((category, index) => (
              <button 
                key={index} 
                onClick={() => handleSelectTag(category.name.toLowerCase())} 
                className={`
                  px-4 py-1.5 rounded-lg font-medium text-sm 
                  transition-all duration-200 ease-in-out cursor-pointer flex items-center gap-2
                  ${selectedCategory === category.name.toLowerCase() 
                    ? "bg-accentOriginal text-white shadow-md shadow-accentOriginal/20 scale-105 !font-bold" 
                    : "bg-lightOriginal/50 text-gray-500 hover:bg-lightOriginal hover:text-accentOriginal hover:scale-105"
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