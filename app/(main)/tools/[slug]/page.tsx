import { Metadata } from 'next'
import { toolsData } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LuArrowLeft, LuPlane, LuBot, LuSettings } from 'react-icons/lu'
import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines } from 'react-icons/md'
import { TbApiApp, TbFilePencil, TbRoute, TbTools } from 'react-icons/tb'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { BsAndroid2 } from 'react-icons/bs'
import { FaApple } from 'react-icons/fa'
import { capitalize } from '@/lib/utils'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const tagIcons: Record<string, React.ReactElement> = {
  tracker: <MdTrackChanges />,
  stats: <MdOutlineQueryStats />,
  fpl: <TbRoute />,
  api: <TbApiApp />,
  va: <MdOutlineAirlines />,
  logger: <TbFilePencil />,
  addons: <TbTools />,
  atc: <PiAirTrafficControlBold />,
  bots: <LuBot />,
  utility: <LuSettings />,
  android: <BsAndroid2 />,
  ios: <FaApple />,
}

const tagTextColors: Record<string, string> = {
  tracker: 'text-blue-600 dark:text-blue-400',
  stats: 'text-green-600 dark:text-green-400',
  fpl: 'text-purple-600 dark:text-purple-400',
  api: 'text-cyan-600 dark:text-cyan-400',
  va: 'text-red-600 dark:text-red-400',
  logger: 'text-amber-600 dark:text-amber-400',
  addons: 'text-pink-600 dark:text-pink-400',
  atc: 'text-indigo-600 dark:text-indigo-400',
  bots: 'text-teal-600 dark:text-teal-400',
  utility: 'text-orange-600 dark:text-orange-400',
  android: 'text-lime-600 dark:text-lime-400',
  ios: 'text-neutral-600 dark:text-neutral-400',
}

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.name.toLowerCase().replace(/\s+/g, '-')
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug

  const tool = toolsData.find(
    (tool) => tool.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!tool) return notFound()

  return {
    title: `${tool.name} - InfiniteToolbox`,
    description: tool.description || `Learn more about ${tool.name} for Infinite Flight`,
    openGraph: {
      title: `${tool.name} - InfiniteToolbox`,
      description: tool.description || `Learn more about ${tool.name} for Infinite Flight`,
      images: [tool.imageUrl],
    },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const tool = toolsData.find(
    (tool) => tool.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!tool) return notFound()

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal dark:bg-gray-900 rounded-4xl font-medium flex flex-col gap-6 h-full">
      <Link
        href="/tools"
        className="self-start flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
      >
        <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-xl bg-light overflow-hidden">
          {tool.imageUrl ? (
            <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
          ) : (
            <LuPlane className="text-accent w-full h-full object-cover" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{tool.name}</h1>
            {tool.isBeta && (
              <span className="text-xs text-orange-100 bg-orange-400 px-2 py-0.5 rounded-full">
                Beta
              </span>
            )}
            {tool.isLegacy && (
              <span className="text-xs text-gray-100 bg-gray-400 px-2 py-0.5 rounded-full">
                Legacy
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">by {tool.creator}</p>
        </div>
      </div>
      
      {
        tool.previewImages && tool.previewImages.length > 0 && (
          <div className='w-[90%] mx-auto border'>
            <Carousel>
              <CarouselContent className='rounded-md'>
                {tool.previewImages.map((image, index) => (
                  <CarouselItem key={index} className= {tool.previewImages.length === 1 ? 'basis-full' : 'md:basis-1/2 basis-full'}>
                    <Dialog>
                      <DialogTrigger className='w-full cursor-pointer hover:scale-105 transition-all duration-300'>
                        <img src={image} alt="Preview Image" className='w-full h-[250px] rounded-md object-cover object-top' />
                      </DialogTrigger>
                      <DialogContent className='bg-transparent border-none shadow-none w-[95vw] !max-w-[95vw] md:h-[90vh] md:w-[90vw] md:!max-w-[90vw] overflow-y-auto'>
                        <VisuallyHidden><DialogTitle>Preview Image</DialogTitle></VisuallyHidden>
                        <img src={image} alt="Preview Image" className='w-full h-full object-contain' />
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )
      }


      <p className="text-gray-600 dark:text-gray-300">{tool.description || "No description available"}</p>

      <div className="flex gap-2 flex-wrap">
        {tool.tags.map(tag => (
          <Link
            key={tag}
            href={`/tools?category=${tag.toLowerCase()}`}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-lightOriginal dark:bg-gray-800 hover:bg-lightOriginal/80 dark:hover:bg-gray-800/80 transition-colors ${tagTextColors[tag.toLowerCase()] ?? 'text-orange-400'}`}
          >
            {tagIcons[tag.toLowerCase()] && (
              <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{tagIcons[tag.toLowerCase()]}</span>
            )}
            {capitalize(tag)}
          </Link>
        ))}
      </div>

      {!tool.isLegacy && (
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start px-6 py-2.5 rounded-lg bg-accentOriginal dark:bg-orange-500/20 dark:hover:bg-orange-400/30 text-white 
                   font-semibold hover:bg-accentOriginal/90transition-colors"
        >
          Visit Website
        </a>
      )}
    </div>
  )
}