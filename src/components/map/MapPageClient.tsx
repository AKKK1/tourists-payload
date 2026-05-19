'use client'

import dynamic from 'next/dynamic'

const GeorgiaDiscoveryMap = dynamic(
  () => import('@/components/map/GeorgiaDiscoveryMap').then((mod) => mod.GeorgiaDiscoveryMap),
  { ssr: false },
)

export function MapPageClient() {
  return <GeorgiaDiscoveryMap />
}
