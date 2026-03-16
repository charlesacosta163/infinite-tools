'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LuExternalLink, LuPlane, LuStar, LuClock, LuBot, LuSettings } from 'react-icons/lu'
import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines } from 'react-icons/md'
import { TbApiApp, TbFilePencil, TbRoute, TbTools } from 'react-icons/tb'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { BsAndroid2 } from 'react-icons/bs'
import { FaApple } from 'react-icons/fa'
import { getAppOfTheDay } from '@/lib/app-of-the-day'
import { capitalize } from '@/lib/utils'
import React from 'react'

const tagIcons: Record<string, React.ReactElement> = {
  tracker: <MdTrackChanges />,
  stats:   <MdOutlineQueryStats />,
  fpl:     <TbRoute />,
  api:     <TbApiApp />,
  va:      <MdOutlineAirlines />,
  logger:  <TbFilePencil />,
  addons:  <TbTools />,
  atc:     <PiAirTrafficControlBold />,
  bots:    <LuBot />,
  utility: <LuSettings />,
  android: <BsAndroid2 />,
  ios:     <FaApple />,
}

const tagTextColors: Record<string, string> = {
  tracker: 'text-blue-600 dark:text-blue-400',
  stats:   'text-green-600 dark:text-green-400',
  fpl:     'text-purple-600 dark:text-purple-400',
  api:     'text-cyan-600 dark:text-cyan-400',
  va:      'text-red-600 dark:text-red-400',
  logger:  'text-amber-600 dark:text-amber-400',
  addons:  'text-pink-600 dark:text-pink-400',
  atc:     'text-indigo-600 dark:text-indigo-400',
  bots:    'text-teal-600 dark:text-teal-400',
  utility: 'text-orange-600 dark:text-orange-400',
  android: 'text-lime-600 dark:text-lime-400',
  ios:     'text-neutral-600 dark:text-neutral-400',
}

export default function AppOfTheDay() {
  const [app, setApp] = useState(getAppOfTheDay())

  useEffect(() => {
    const checkForUpdate = () => {
      const newApp = getAppOfTheDay()
      if (newApp.id !== app.id) {
        setApp(newApp)
      }
    }

    const interval = setInterval(checkForUpdate, 3600000) // Check every hour

    return () => clearInterval(interval)
  }, [app.id])

  return (

      <div className="rounded-3xl p-6 backdrop-blur-xs border-2 border-dashed border-accentOriginal">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LuStar className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Tool of the Day</h2>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-200 bg-white/50 px-3 py-1.5 rounded-full">
            <LuClock className="w-4 h-4" />
            <span>Refreshes Daily!</span>
          </div>
        </div>

        {/* App Card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border-2 border-dashed border-orange-300">
          <div className="flex flex-col md:flex-row gap-5">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 overflow-hidden border-2 border-white shadow-lg">
                {app.imageUrl ? (
                  <img 
                    src={app.imageUrl} 
                    alt={app.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LuPlane className="w-10 h-10 text-orange-500" />
                  </div>
                )}
              </div>
            </div>

            {/* App Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-gray-700">{app.name}</h3>
                  {app.isBeta && (
                    <span className="text-xs text-orange-100 bg-orange-500 px-2 py-0.5 rounded-full font-semibold">
                      Beta
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-0.5 text-left">by {app.creator}</p>
              </div>

              <p className="text-sm text-gray-600 text-left bg-white/50 p-2 rounded-lg">
                {app.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {app.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tools?category=${tag.toLowerCase()}`}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-lightOriginal dark:bg-gray-800 font-medium hover:opacity-80 transition-opacity ${tagTextColors[tag.toLowerCase()] ?? 'text-orange-400'}`}
                  >
                    {tagIcons[tag.toLowerCase()] && (
                      <span className="[&>svg]:w-3 [&>svg]:h-3">{tagIcons[tag.toLowerCase()]}</span>
                    )}
                    {capitalize(tag)}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <Link 
                  href={`/tools/${app.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Learn More
                </Link>
                <Link 
                  href={app.link} 
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-accentOriginal hover:from-pink-500 hover:to-accentOriginal/80 text-white font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Visit <LuExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-3xl" />
      </div>
  )
}

