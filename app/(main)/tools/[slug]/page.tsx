import { Metadata } from 'next'
import { toolsData } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'  // Import the arrow icon

// Generate static params for all tools
export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.name.toLowerCase().replace(/\s+/g, '-')
  }))
}

// Dynamic metadata for each tool
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug

  const tool = toolsData.find(
    (tool) => tool.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!tool) return notFound()

  return {
    title: `${tool.name} - InfiniteTools`,
    description: tool.description || `Learn more about ${tool.name} for Infinite Flight`,
    openGraph: {
      title: `${tool.name} - InfiniteTools`,
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
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-6 h-full">
      {/* Back Button */}
      <Link 
        href="/tools" 
        className="self-start flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group"
      >
        <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      {/* Tool Icon/Image */}
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-xl bg-light overflow-hidden">
          <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
        </div>

        {/* Tool Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-700">{tool.name}</h1>
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

      {/* Description */}
      <p className="text-gray-600">{tool.description || "No description available"}</p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {tool.tags.map(tag => (
          <span key={tag} className="text-sm px-3 py-1 rounded-lg bg-lightOriginal text-orange-400">
            {tag}
          </span>
        ))}
      </div>

      {/* Visit Button */}
      {!tool.isLegacy && (
        <a 
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start px-6 py-2.5 rounded-lg bg-accentOriginal text-white 
                   font-semibold hover:bg-accentOriginal/90 transition-colors"
        >
          Visit Website
        </a>
      )}
    </div>
  )
}