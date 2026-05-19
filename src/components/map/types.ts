export type MapMomentMedia = {
  id?: string
  url?: string
  thumbnailURL?: string
  transformedUrl?: string
  alt?: string
  mimeType?: string
}

export type MapMoment = {
  id: string
  title: string
  description?: string
  locationName: string
  coordinates: [number, number]
  mediaType: 'photo' | 'video'
  media?: string | MapMomentMedia
  submittedByName?: string
  featured?: boolean
  createdAt?: string
}

export function getMediaURL(media: MapMoment['media']) {
  if (!media || typeof media === 'string') return ''
  return media.transformedUrl || media.thumbnailURL || media.url || ''
}
