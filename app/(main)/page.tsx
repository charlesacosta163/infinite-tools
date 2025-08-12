'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toolsData } from '@/lib/tools-data'
import { ToolCard } from '@/components/tools/tool-card'
import { LuSearch } from 'react-icons/lu'

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)

  // Update input when URL changes
  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const filteredTools = query
    ? toolsData.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description?.toLowerCase().includes(query.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        tool.creator.toLowerCase().includes(query.toLowerCase())
      )
    : toolsData

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-6">
      {/* Search Section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-700">Search Tools</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, description, tags, or creator..."
              className="w-full px-4 py-2.5 pr-10 rounded-lg bg-lightOriginal/50 
                       placeholder:text-gray-400 text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-accentOriginal/20"
            />
            <LuSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-accentOriginal text-white font-semibold
                     hover:bg-accentOriginal/90 transition-colors"
          >
            Search
          </button>
        </form>
      </section>

      {/* Results Section */}
      <section className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {query ? `Search Results (${filteredTools.length})` : 'All Tools'}
          </h2>
        </div>

        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p>No tools found</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id}
                id={tool.id}
                name={tool.name}
                creator={tool.creator}
                description={tool.description || "No description available"}
                imageUrl={tool.imageUrl}
                tags={tool.tags}
                link={tool.link}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}