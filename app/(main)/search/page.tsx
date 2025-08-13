import SearchWrapper from '@/components/wrappers/search-wrapper'
import React from 'react'
import { Metadata } from 'next'

// Make metadata dynamic with search params
export async function generateMetadata({ searchParams }: { searchParams: { q?: string } }): Promise<Metadata> {
  const query = (await searchParams).q

  return {
    title: query 
      ? `Search results for "${query}" - InfiniteTools`
      : 'Search - InfiniteTools',
    description: query
      ? `Search results for "${query}" in the Infinite Flight ecosystem`
      : 'Search for third-party tools and resources in the Infinite Flight ecosystem',
    openGraph: {
      title: query 
        ? `Search results for "${query}" - InfiniteTools`
        : 'Search - InfiniteTools',
      description: query
        ? `Search results for "${query}" in the Infinite Flight ecosystem`
        : 'Search for third-party tools and resources in the Infinite Flight ecosystem',
    },  
  }
}

const SearchPage = () => {
  return (
    <SearchWrapper />
  )
}

export default SearchPage