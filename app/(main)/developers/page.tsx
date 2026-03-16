import { Metadata } from 'next'
import { toolsData } from '@/lib/tools-data'
import Link from 'next/link'
import { LuBot, LuExternalLink, LuPlane, LuSettings, LuUser } from 'react-icons/lu'
import { capitalize } from '@/lib/utils'


import { FaApple } from 'react-icons/fa'
import { BsAndroid2 } from 'react-icons/bs'
import { MdOutlineAirlines, MdOutlineQueryStats, MdTrackChanges } from 'react-icons/md'
import { TbApiApp, TbFilePencil, TbTools } from 'react-icons/tb'
import { TbRoute } from 'react-icons/tb'
import { PiAirTrafficControlBold } from 'react-icons/pi'

export const metadata: Metadata = {
  title: 'App Developers - InfiniteToolbox',
  description: 'Thank you to all the amazing creators who build tools for the Infinite Flight community',
}

export default function CreatorsPage() {
  // Get unique creators and their tools
  // Alphabetical order
  const creators = toolsData.sort((a, b) => a.creator.localeCompare(b.creator)).reduce((acc, tool) => {
    if (!acc[tool.creator]) {
      acc[tool.creator] = {
        name: tool.creator,
        tools: []
      }
    }
    acc[tool.creator].tools.push(tool)
    return acc
  }, {} as Record<string, { name: string, tools: typeof toolsData }>)

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
    'utility': <LuSettings />,
    'android': <BsAndroid2 />,
    'ios': <FaApple />,
  };

  const tagTextColors: Record<string, string> = {
    'tracker': 'text-blue-600 dark:text-blue-400',
    'stats':   'text-green-600 dark:text-green-400',
    'fpl':     'text-purple-600 dark:text-purple-400',
    'api':     'text-cyan-600 dark:text-cyan-400',
    'va':      'text-red-600 dark:text-red-400',
    'logger':  'text-amber-600 dark:text-amber-400',
    'addons':  'text-pink-600 dark:text-pink-400',
    'atc':     'text-indigo-600 dark:text-indigo-400',
    'bots':    'text-teal-600 dark:text-teal-400',
    'utility': 'text-orange-600 dark:text-orange-400',
    'android': 'text-lime-600 dark:text-lime-400',
    'ios':     'text-neutral-600 dark:text-neutral-400',
  };

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal dark:bg-gray-900 rounded-4xl font-medium flex flex-col gap-6 h-full">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">App Developers</h1>
        <p className="text-gray-500 dark:text-gray-300">
          Thank you to all the amazing developers who contribute to the wonderful world of the Infinite Flight ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(creators).map((creator) => (
          <div 
            key={creator.name}
            className="p-6 rounded-xl bg-lightOriginal/50 flex flex-col gap-4 self-start"
          >
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">{creator.name}</h2>
            
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-500">Tools Created:</h3>
              {creator.tools.map((tool) => (
                <Link 
                  key={tool.id}
                  href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-light overflow-hidden">
                       { tool.imageUrl ? <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" /> : <LuPlane className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">{tool.name}</p>
                      <div className="flex gap-1 flex-wrap mt-1">
                        {tool.tags.map(tag => (
                          <span
                            key={tag}
                            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-lightOriginal dark:bg-gray-800 ${tagTextColors[tag.toLowerCase()] ?? 'text-orange-400'}`}
                          >
                            {tagIcons[tag.toLowerCase()] && (
                              <span className="[&>svg]:w-3 [&>svg]:h-3">{tagIcons[tag.toLowerCase()]}</span>
                            )}
                            {capitalize(tag)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <LuExternalLink className="text-gray-400 group-hover:text-accentOriginal transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
