import HomeWrapper from '@/components/wrappers/home-wrapper'
import React from 'react'

// SEO
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InfiniteToolbox - Discover Third-Party Tools in Infinite Flight',
  description: 'Your one-stop hub for discovering third-party tools and resources in the Infinite Flight ecosystem',
  openGraph: {
    title: 'InfiniteToolbox - Discover Third-Party Tools in Infinite Flight',
    description: 'Your one-stop hub for discovering third-party tools and resources in the Infinite Flight ecosystem',
    images: [
      {
        url: 'https://images.emojiterra.com/twitter/v13.1/512px/1f9f0.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'InfiniteToolbox',
    type: 'website',
    url: 'https://infinitetools.vercel.app',
    locale: 'en_US',
  },
}


const HomePage = () => {
  return (
    <HomeWrapper />
  )
}

export default HomePage