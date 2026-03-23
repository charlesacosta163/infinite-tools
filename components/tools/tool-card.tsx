'use client';

import { useEffect, useState } from 'react';
import { getBookmarks, removeBookmark, addBookmark } from '@/lib/bookmark';
import { LuExternalLink, LuPlane, LuBookmarkCheck, LuBookmark, LuInfo, LuBot, LuSettings, LuEye } from "react-icons/lu";
import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines } from 'react-icons/md';
import { TbApiApp, TbFilePencil, TbRoute, TbTools } from 'react-icons/tb';
import { PiAirTrafficControlBold } from 'react-icons/pi';
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import React from 'react';
import { BsAndroid2 } from 'react-icons/bs';
import { FaApple } from 'react-icons/fa';

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
};

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
  ios: 'text-neutral-600 dark:text-neutral-400',
};

type ToolCardProps = {
    id: number,
    name: string,
    creator: string,
    description: string,
    imageUrl: string,
    tags: string[],
    link: string,
    isBeta?: boolean
    isLegacy?: boolean
    previewImages?: string[]
  }
  
  export function ToolCard({id, name, creator, description, imageUrl, tags, link, isBeta, isLegacy, previewImages}: ToolCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
  
    useEffect(() => {
      // Check if tool is bookmarked on component mount
      const bookmarks = getBookmarks();
      setIsBookmarked(bookmarks.some(b => b.name.toLowerCase() === name.toLowerCase()));
    }, [name]);
  
    const handleBookmark = () => {
      if (isBookmarked) {
        removeBookmark(name);
      } else {
        addBookmark({ id, name, creator, description, imageUrl, tags, link, isBeta: isBeta || false, isLegacy: isLegacy || false });
      }
      setIsBookmarked(!isBookmarked);
    };
  
    return (
      <div key={id} className="border border-dashed border-primaryOriginal dark:border-orange-400/30 p-4 rounded-lg flex flex-col justify-between gap-3 h-[225px] font-medium bg-white/20 dark:bg-gray-900">
  
        <header className="flex justify-between items-center">
           <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-light dark:bg-gray-800 overflow-hidden">
              {imageUrl ? <img src={imageUrl} alt={name} className="w-full h-full object-cover"/> : <LuPlane className="text-accent w-full h-full dark:text-white object-cover"/>}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 dark:text-gray-300 flex items-center gap-2">
                {name}
                <span className="text-xs text-gray-500 flex gap-1">
                  {isBeta && (
                    <span className="text-xs text-orange-100 bg-orange-400 px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  )}
                  {isLegacy && (
                    <span className="text-xs text-gray-100 bg-gray-400 px-2 py-0.5 rounded-full">
                      Legacy
                    </span>
                  )}
                </span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">by {creator}</span>
            </div>
          </div>
          <button 
            onClick={handleBookmark}
            className="p-1.5 rounded-md hover:bg-light/50 dark:hover:bg-gray-800 transition-colors"
          >
            {isBookmarked ? 
              <LuBookmarkCheck className="w-5 h-5 text-orange-400 hover:text-accentOriginal/80" /> : 
              <LuBookmark className="w-5 h-5 text-gray-400 hover:text-accentOriginal/80" />
            }
          </button>
        </header>
  
        <div className="overflow-auto text-sm font-medium bg-gray-100/30 dark:bg-gray-800/50 p-2 rounded-lg text-gray-500 dark:text-gray-400 w-full h-full">
          {description || "No description available"}
        </div>
        
        <section className="flex flex-col gap-2">
        {previewImages.length > 0 && (
          <span className="text-xs text-green-800 dark:text-green-200 animate-pulse">
            <LuEye className="inline" /> Previews Available
          </span>
        )}
          <footer className="flex justify-between items-center gap-2">
            <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tools?category=${tag.toLowerCase()}`}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-lightOriginal dark:bg-gray-800 hover:opacity-80 transition-opacity ${tagTextColors[tag.toLowerCase()] ?? 'text-orange-400'}`}
                  >
                    {tagIcons[tag.toLowerCase()] && (
                      <span className="[&>svg]:w-3 [&>svg]:h-3">{tagIcons[tag.toLowerCase()]}</span>
                    )}
                    {capitalize(tag)}
                  </Link>
                ))}
            </div>
            {
              isLegacy ? (
              <></>
              ) : (
                <div className="flex gap-2 items-center">
                  <Link 
                    href={`/tools/${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex gap-2 items-center px-3 py-2 rounded-lg bg-accentOriginal hover:bg-accentOriginal/80 dark:bg-orange-500/20 dark:hover:bg-orange-400/30 text-white font-bold"
                  >
                    <LuInfo />
                  </Link>
                  <Link href={link} target="_blank" className="flex gap-2 items-center px-3 py-2 rounded-lg bg-primaryOriginal hover:bg-primaryOriginal/80 dark:bg-sky-600/20 dark:hover:bg-sky-500/30 text-white font-bold"><LuExternalLink /></Link>
                </div>
              )
            }
          </footer>
        </section>
      </div>
    )
  }