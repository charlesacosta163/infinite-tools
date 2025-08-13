import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'
import React from 'react'

// SEO
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Bookmarks - InfiniteTools',
  description: 'Your saved tools and resources in the Infinite Flight ecosystem',
}

const BookmarksPage = () => {
  return (
    <BookmarksWrapper />
  )
}

export default BookmarksPage