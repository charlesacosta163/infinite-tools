'use client'

import React from 'react'
import { channelsData } from '@/lib/channels-data'
import { LuYoutube } from 'react-icons/lu'
import { FaPersonFallingBurst } from 'react-icons/fa6'

const ChannelsWrapper = () => {
  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-4 h-full">
        <header>
          <h1 className='flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-600'>
            <LuYoutube/>
            Channels
          </h1>
        </header>

        <section className='flex-1 w-full h-full flex flex-col items-center justify-center'>

          <div className="flex flex-col gap-4 items-center justify-center text-gray-600 text-center">
            <FaPersonFallingBurst className='text-6xl' />
            Page will be updated from time to time...
          </div>
        </section>
    </div>
  )
}

export default ChannelsWrapper