import React from 'react'

// SEO
import { Metadata } from 'next'
import ChannelsWrapper from '@/components/wrappers/channels-wrapper'

export const metadata: Metadata = {
  title: 'Youtube Channels - InfiniteToolbox',
  description: 'Find Infinite flight youtube channels',
}

const ChannelsPage = () => {
  return (
    <ChannelsWrapper />
  )
}

export default ChannelsPage