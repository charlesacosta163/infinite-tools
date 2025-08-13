'use client';

import { useEffect, useState } from 'react';
import { getBookmarks, removeBookmark, addBookmark } from '@/lib/bookmark';
import { LuExternalLink, LuPlane, LuBookmarkCheck, LuBookmark, LuInfo } from "react-icons/lu";
import { capitalize } from "@/lib/utils";
import Link from "next/link";

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
  }
  
  export function ToolCard({id, name, creator, description, imageUrl, tags, link, isBeta, isLegacy}: ToolCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
  
    useEffect(() => {
      // Check if tool is bookmarked on component mount
      const bookmarks = getBookmarks();
      setIsBookmarked(bookmarks.some(b => b.id === id));
    }, [id]);
  
    const handleBookmark = () => {
      if (isBookmarked) {
        removeBookmark(id);
      } else {
        addBookmark({ id, name, creator, description, imageUrl, tags, link });
      }
      setIsBookmarked(!isBookmarked);
    };
  
    return (
      <div key={id} className="border border-dashed border-primaryOriginal p-4 rounded-lg flex flex-col justify-between gap-3 h-[225px] font-medium">
  
        <header className="flex justify-between items-center">
           <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-light overflow-hidden">
              {imageUrl ? <img src={imageUrl} alt={name} className="w-full h-full"/> : <LuPlane className="text-accent w-full h-full"/>}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 flex items-center gap-2">
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
              <span className="text-xs text-gray-500">by {creator}</span>
            </div>
          </div>
          <button 
            onClick={handleBookmark}
            className="p-1.5 rounded-md hover:bg-light/50 transition-colors"
          >
            {isBookmarked ? 
              <LuBookmarkCheck className="w-5 h-5 text-orange-400 hover:text-accentOriginal/80" /> : 
              <LuBookmark className="w-5 h-5 text-gray-400 hover:text-accentOriginal/80" />
            }
          </button>
        </header>
  
        <div className="overflow-auto text-sm font-medium bg-gray-100/30 p-2 rounded-lg text-gray-500 w-full h-full">
          {description || "No description available"}
        </div>
  
        <footer className="flex justify-between items-center gap-2">
           <div className="flex gap-2 flex-wrap">
              {tags.map(tag => <span key={tag} className="text-xs px-3 py-1 rounded-lg bg-lightOriginal text-orange-400">{capitalize(tag)}</span>)}
           </div>
           {
            isLegacy ? (
             <></>
            ) : (
              <div className="flex gap-2 items-center">
                <Link 
                  href={`/tools/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex gap-2 items-center px-3 py-2 rounded-lg bg-accentOriginal hover:bg-accentOriginal/80 text-lightOriginal font-bold"
                >
                  <LuInfo />
                </Link>
                <Link href={link} target="_blank" className="flex gap-2 items-center px-3 py-2 rounded-lg bg-primaryOriginal hover:bg-primaryOriginal/80 text-lightOriginal font-bold"><LuExternalLink /></Link>
              </div>
            )
           }
        </footer>
      </div>
    )
  }