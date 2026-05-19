import type { Metadata } from 'next'

import { MapPageClient } from '@/components/map/MapPageClient'

export const metadata: Metadata = {
  title: 'Georgia Discovery Map',
  description: 'Discover hidden villages, viewpoints, photos, and travel moments across Georgia.',
}

export default function MapPage() {
  return <MapPageClient />
}
