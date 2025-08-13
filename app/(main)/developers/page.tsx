import { Metadata } from 'next'
import { toolsData } from '@/lib/tools-data'
import Link from 'next/link'
import { LuExternalLink, LuPlane, LuUser } from 'react-icons/lu'
import { capitalize } from '@/lib/utils'

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

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-6 h-full">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">App Developers</h1>
        <p className="text-gray-500">
          Thank you to all the amazing developers who contribute to the wonderful world of the Infinite Flight ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(creators).map((creator) => (
          <div 
            key={creator.name}
            className="p-6 rounded-xl bg-lightOriginal/50 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold text-gray-700">{creator.name}</h2>
            
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-500">Tools Created:</h3>
              {creator.tools.map((tool) => (
                <Link 
                  key={tool.id}
                  href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-light overflow-hidden">
                       { tool.imageUrl ? <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" /> : <LuPlane className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">{tool.name}</p>
                      <div className="flex gap-1 mt-1">
                        {tool.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-lightOriginal text-orange-400">
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
