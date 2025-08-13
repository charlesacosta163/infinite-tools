import ToolsWrapper from '@/components/wrappers/tools-wrapper'
import React from 'react'
import { Metadata } from 'next'
import { capitalize } from '@/lib/utils'

export async function generateMetadata({ searchParams }: { searchParams: { category?: string | undefined } }): Promise<Metadata> {
  // Await the searchParams
  const category = (await searchParams).category

  return {
    title: category 
      ? `${capitalize(category)} Tools - InfiniteTools`
      : 'All Tools - InfiniteTools',
    description: category
      ? `Browse ${category.toLowerCase()} tools and resources for Infinite Flight`
      : 'Discover third-party tools and resources in the Infinite Flight ecosystem',
    openGraph: {
      title: category 
        ? `${capitalize(category)} Tools - InfiniteTools`
        : 'All Tools - InfiniteTools',
      description: category
        ? `Browse ${category.toLowerCase()} tools and resources for Infinite Flight`
        : 'Discover third-party tools and resources in the Infinite Flight ecosystem',
    },
  }
}

const ToolsPage = () => {
  return (
    <ToolsWrapper />
  )
}

export default ToolsPage