'use client'

import Link from 'next/link'
import { FaToolbox } from 'react-icons/fa'
import { LuArrowRight } from 'react-icons/lu'
import { MdOutlineQueryStats, MdTrackChanges } from 'react-icons/md'
import { TbApiApp, TbFilePencil } from 'react-icons/tb'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { useEffect, useState } from 'react'

interface FloatingIcon {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function HomeWrapper() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Icons we want to float around
    const iconComponents = [
      { Icon: MdOutlineQueryStats, color: 'text-accentOriginal' }, 
      { Icon: MdTrackChanges, color: 'text-primaryOriginal' },
      { Icon: TbApiApp, color: 'text-lightOriginal' },
      { Icon: TbFilePencil, color: 'text-accentOriginal' },
      { Icon: PiAirTrafficControlBold, color: 'text-primaryOriginal' }
    ]

    // Create initial floating icons
    const initialIcons: FloatingIcon[] = Array.from({ length: 25 }, (_, i) => {
      const iconChoice = iconComponents[Math.floor(Math.random() * iconComponents.length)]
      return {
        id: i,
        Icon: iconChoice.Icon,
        color: iconChoice.color,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * (80 - 40) + 40,
        speed: Math.random() * (1 - 0.2) + 0.2,
        opacity: Math.random() * (1 - 0.8) + 0.9
      }
    })

    setIcons(initialIcons)

    // Animation function
    let animationFrameId: number
    const animate = () => {
      setIcons(prev => prev.map(icon => ({
        ...icon,
        y: icon.y - icon.speed,
        x: icon.x + Math.sin(icon.y * 0.01) * 0.5,
        // Reset position when icon goes off screen
        ...(icon.y + icon.size < 0 ? {
          y: window.innerHeight + icon.size,
          x: Math.random() * window.innerWidth
        } : {})
      })))
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col items-center justify-center gap-6 h-full text-center relative overflow-hidden">
      {/* Background Icons */}
      {icons.map(icon => (
        <icon.Icon
          key={icon.id}
          className={`absolute ${icon.color}`}
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            fontSize: `${icon.size}px`,
            opacity: icon.opacity,
            transform: `rotate(${Math.sin(icon.y * 0.01) * 10}deg)`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 text-4xl md:text-5xl font-bold tracking-tighter text-gray-700">
          <FaToolbox className="text-[#b58170]" />
          <h1><span className="text-[#b58170]">Infinite</span>Tools</h1>
        </div>

        <p className="text-[#966554] text-lg md:text-xl max-w-[600px] mt-6">
          Your one-stop hub for discovering third-party tools and resources in the Infinite Flight ecosystem
        </p>

        <Link 
          href="/search" 
          className="mt-8 inline-flex items-center gap-2 bg-[#b58170] text-white px-6 py-3 rounded-xl
                     font-semibold hover:gap-4 transition-all duration-300 hover:bg-accentOriginal/90"
        >
          Start Exploring <LuArrowRight />
        </Link>
      </div>
    </div>
  )
}