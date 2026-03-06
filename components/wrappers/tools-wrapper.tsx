'use client'

import { Suspense, useState } from 'react';
import React from 'react';
import TagSelector from "@/components/tools/tag-selector";
import { toolsData } from "@/lib/tools-data";
import { ToolCard } from "@/components/tools/tool-card";
import { useSearchParams } from "next/navigation";
import { LuLayoutGrid, LuLayoutList, LuBot, LuSettings, LuArchive } from "react-icons/lu";
import { MdTrackChanges, MdOutlineQueryStats, MdOutlineAirlines } from 'react-icons/md';
import { TbApiApp, TbFilePencil, TbRoute, TbTools } from 'react-icons/tb';
import { PiAirTrafficControlBold } from 'react-icons/pi';
import Link from "next/link";
import { LuExternalLink, LuPlane } from "react-icons/lu";

const tagIcons: Record<string, React.ReactElement> = {
  'tracker': <MdTrackChanges />,
  'stats': <MdOutlineQueryStats />,
  'fpl': <TbRoute />,
  'api': <TbApiApp />,
  'va': <MdOutlineAirlines />,
  'logger': <TbFilePencil />,
  'addons': <TbTools />,
  'atc': <PiAirTrafficControlBold />,
  'bots': <LuBot />,
  'utility': <LuSettings />
};

const tagColors: Record<string, string> = {
  'tracker': 'bg-blue-500 dark:bg-blue-600',
  'stats': 'bg-green-500 dark:bg-green-600',
  'fpl': 'bg-purple-500 dark:bg-purple-600',
  'api': 'bg-cyan-500 dark:bg-cyan-600',
  'va': 'bg-red-500 dark:bg-red-600',
  'logger': 'bg-amber-500 dark:bg-amber-600',
  'addons': 'bg-pink-500 dark:bg-pink-600',
  'atc': 'bg-indigo-500 dark:bg-indigo-600',
  'bots': 'bg-teal-500 dark:bg-teal-600',
  'utility': 'bg-orange-500 dark:bg-orange-600'
};

function ToolsContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [viewMode, setViewMode] = useState<'normal' | 'mini'>('normal')
  const [hideLegacy, setHideLegacy] = useState(true)

  const filteredTools = (() => {
    let tools = category?.toLowerCase() === "all" || !category
      ? toolsData
      : toolsData.filter(tool =>
          tool.tags.some(tag => tag.toLowerCase() === category?.toLowerCase())
        )
    if (hideLegacy) tools = tools.filter(tool => !tool.isLegacy)
    return tools
  })()

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal dark:bg-gray-900 rounded-4xl font-medium flex flex-col gap-4 h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <TagSelector />
        <div className="flex gap-2 items-center shrink-0">
          <button
            onClick={() => setHideLegacy(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              hideLegacy
                ? 'bg-accentOriginal dark:bg-orange-400 text-white'
                : 'bg-lightOriginal/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-lightOriginal dark:hover:bg-gray-700'
            }`}
            title="Toggle legacy tools"
          >
            <LuArchive className="w-4 h-4" />
            {hideLegacy ? 'Show Legacy Apps' : 'Hide Legacy Apps'}
          </button>
          <button
            onClick={() => setViewMode('normal')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'normal'
                ? 'bg-accentOriginal text-white'
                : 'bg-lightOriginal/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-lightOriginal dark:hover:bg-gray-700'
            }`}
            title="Normal View"
          >
            <LuLayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('mini')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'mini'
                ? 'bg-accentOriginal text-white'
                : 'bg-lightOriginal/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-lightOriginal dark:hover:bg-gray-700'
            }`}
            title="Mini View"
          >
            <LuLayoutList className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'normal' ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.sort((a, b) => a.name.localeCompare(b.name)).map((tool, index) => (
            <ToolCard 
              key={index} 
              id={index} 
              name={tool.name} 
              creator={tool.creator} 
              description={tool.description || ""} 
              imageUrl={tool.imageUrl} 
              tags={tool.tags} 
              link={tool.link} 
              isBeta={tool.isBeta || false}
              isLegacy={tool.isLegacy || false}
            />
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredTools.sort((a, b) => a.name.localeCompare(b.name)).map((tool, index) => (
            <div 
              key={index}
              className="relative border border-dashed border-primaryOriginal dark:border-orange-400/30 p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-lightOriginal/30 dark:hover:bg-gray-800 transition-colors justify-between dark:bg-gray-900"
            >
              {/* Tag Icons - Top Right */}
              <div className="absolute -top-2 -left-2 flex gap-1">
                {tool.tags.slice(0, 2).map((tag, idx) => {
                  const icon = tagIcons[tag.toLowerCase()];
                  const color = tagColors[tag.toLowerCase()];
                  if (!icon) return null;
                  return (
                    <div
                      key={idx}
                      className={`w-6 h-6 rounded-full ${color || 'bg-accentOriginal/80 dark:bg-orange-400/20'} flex items-center justify-center text-white text-xs shadow-sm`}
                      title={tag}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>

              <section className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-light dark:bg-gray-800 overflow-hidden">
                  {tool.imageUrl ? (
                    <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover"/>
                  ) : (
                    <LuPlane className="text-accent w-full h-full p-2 dark:text-white"/>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center line-clamp-2">
                  {tool.name}
                </span>
              </section>
              {!tool.isLegacy ? (
                <Link 
                  href={tool.link} 
                  target="_blank" 
                  className="flex gap-1 items-center px-3 py-1.5 rounded-lg bg-primaryOriginal hover:bg-primaryOriginal/80 text-lightOriginal dark:text-white font-bold text-xs"
                >
                  <LuExternalLink className="w-3 h-3" />
                  Open
                </Link>
              ) : (
                <span
                  className=" text-gray-500 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800"
                >
                  Legacy App
                </span>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default function ToolsWrapper() {
  return (
    <Suspense fallback={
      <div className="px-4 py-8 md:p-8 bg-secondaryOriginal dark:bg-gray-900 rounded-4xl font-medium flex flex-col gap-4 h-full">
        <div className="h-12 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg w-full"></div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-[200px] bg-gray-200/50 dark:bg-gray-800/50 rounded-lg animate-pulse"></div>
          ))}
        </section>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  )
}