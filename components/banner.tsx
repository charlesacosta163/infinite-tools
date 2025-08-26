'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdOutlineQueryStats } from 'react-icons/md'
import { LuExternalLink } from 'react-icons/lu'

export default function PromoBanner() {
  // const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  // useEffect(() => {
  //   const releaseDate = new Date('2025-08-25T00:00:00')
  //   const calculateTimeLeft = () => {
  //     const now = new Date()
  //     const secondsUntilRelease = Math.floor((releaseDate.getTime() - now.getTime()) / 1000)
      
  //     const days = Math.floor(secondsUntilRelease / (24 * 60 * 60))
  //     const hours = Math.floor((secondsUntilRelease % (24 * 60 * 60)) / (60 * 60))
  //     const minutes = Math.floor((secondsUntilRelease % (60 * 60)) / 60)
  //     const seconds = secondsUntilRelease % 60
      
  //     setTimeLeft({ days, hours, minutes, seconds })
  //   }

  //   calculateTimeLeft()
  //   const timer = setInterval(calculateTimeLeft, 1000)

  //   return () => clearInterval(timer)
  // }, [])

  return (
    <Link 
      href="https://iflytics.app" 
      target="_blank"
      className="mt-2 p-4 rounded-xl bg-green-400 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-2 items-center text-white">
        <p className="text-sm opacity-90 text-center">Check out my app:</p>
        <div className="flex items-center gap-2">
          <MdOutlineQueryStats className="w-5 h-5" />
          <h3 className="font-black text-2xl tracking-tight text-purple-100">IFlytics</h3>
        </div>
        <p className="text-sm opacity-90 text-center">
          Version 1.0.0 in 1 or 2 days...
        </p>
        <span className="flex items-center gap-1 text-sm font-medium mt-1 group-hover:gap-2 group-hover:bg-green-600 transition-all duration-300 bg-green-500 px-2 py-1 rounded-md w-full flex justify-center">
          Visit IFlytics <LuExternalLink />
        </span>
      </div>
    </Link>
  )
}
