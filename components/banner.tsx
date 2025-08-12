'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdOutlineQueryStats } from 'react-icons/md'
import { LuExternalLink } from 'react-icons/lu'

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const releaseDate = new Date('2025-08-25T00:00:00')
    const calculateTimeLeft = () => {
      const now = new Date()
      const secondsUntilRelease = Math.floor((releaseDate.getTime() - now.getTime()) / 1000)
      
      const days = Math.floor(secondsUntilRelease / (24 * 60 * 60))
      const hours = Math.floor((secondsUntilRelease % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((secondsUntilRelease % (60 * 60)) / 60)
      const seconds = secondsUntilRelease % 60
      
      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Link 
      href="https://iflytics.app" 
      target="_blank"
      className="mt-8 p-4 rounded-xl bg-indigo-300 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-2 text-white">
        <div className="flex items-center gap-2">
          <MdOutlineQueryStats className="w-5 h-5" />
          <h3 className="font-bold text-lg tracking-tight">IFlytics</h3>
        </div>
        <p className="text-sm opacity-90">
          Official Release on August 25th!
        </p>
        <div className="flex gap-2 text-xs mt-1">
          <span className="font-mono font-bold">{timeLeft.days.toString().padStart(2, '0')}d</span>
          <span className="font-mono font-bold">{timeLeft.hours.toString().padStart(2, '0')}h</span>
          <span className="font-mono font-bold">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
          <span className="font-mono font-bold">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium mt-1 group-hover:gap-2 group-hover:bg-indigo-500 transition-all duration-300 bg-indigo-400 px-2 py-1 rounded-md self-start">
          Visit IFlytics <LuExternalLink />
        </span>
      </div>
    </Link>
  )
}
