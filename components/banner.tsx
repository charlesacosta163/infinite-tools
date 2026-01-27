'use client'

import Link from 'next/link'
import { MdOutlineQueryStats } from 'react-icons/md'
import iflyticsLight from '@/public/iflyticslight.svg'
import { LuExternalLink } from 'react-icons/lu'
import Image from 'next/image'

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
      className="mt-2 p-4 rounded-xl bg-blue-300 transition-all duration-300 group hover:from-green-500 hover:via-blue-600 hover:to-purple-700"
    >
      <div className="flex flex-col gap-2 items-center text-white">
        <p className="text-sm opacity-90 text-center">Check out my app:</p>
        <div className="flex items-center gap-2">
          <Image src={iflyticsLight} alt="IFlytics" className="w-5 h-5" />
          <h3 className="font-black text-2xl tracking-tight">IFlytics</h3>
        </div>
        <p className="text-sm opacity-90 text-center">
          Version 1.5.2 OUT NOW!
        </p>

        {/* <span className="px-3 py-0.5 rounded-full text-[0.6rem] bg-red-400 text-white animate-bounce">Discounts Available!</span> */}
        <span className="flex items-center gap-1 text-sm font-medium mt-1 group-hover:gap-2 group-hover:bg-orange-600 transition-all duration-300 bg-orange-400 px-2 py-1 rounded-md w-full justify-center">
          Visit IFlytics <LuExternalLink />
        </span>
      </div>
    </Link>
  )
}
