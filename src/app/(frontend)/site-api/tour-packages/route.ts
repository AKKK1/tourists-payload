import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type LocalizedValue = string | Record<string, string | null | undefined> | null | undefined
type LocalizedItems = Array<{ item?: LocalizedValue }> | Record<string, Array<{ item?: string }>> | null | undefined
type LocalizedItinerary =
  | Array<{ day?: number; title?: LocalizedValue; description?: LocalizedValue }>
  | Record<string, Array<{ day?: number; title?: string; description?: string }>>
  | null
  | undefined

const fallbackImages: Record<string, string> = {
  'basic-escape': '/package-basic-escape.webp',
  'deep-georgia': '/package-deep-georgia.webp',
  'custom-soul-recovery': '/package-custom.webp',
}

function localized(value: LocalizedValue) {
  if (!value) return { de: '', en: '', ka: '' }
  if (typeof value === 'string') return { de: value, en: value, ka: value }

  return {
    de: value.de || value.en || value.ka || '',
    en: value.en || value.de || value.ka || '',
    ka: value.ka || value.de || value.en || '',
  }
}

function localizedList(value: LocalizedItems) {
  if (!value) return { de: [], en: [], ka: [] }

  if (Array.isArray(value)) {
    const items = value.map((entry) => localized(entry.item).en).filter(Boolean)
    return { de: items, en: items, ka: items }
  }

  return {
    de: (value.de || []).map((entry) => entry.item || '').filter(Boolean),
    en: (value.en || value.de || []).map((entry) => entry.item || '').filter(Boolean),
    ka: (value.ka || value.de || value.en || []).map((entry) => entry.item || '').filter(Boolean),
  }
}

function localizedItinerary(value: LocalizedItinerary) {
  if (!value) return { de: [], en: [], ka: [] }

  if (Array.isArray(value)) {
    const items = value.map((entry) => ({
      day: entry.day || 1,
      title: localized(entry.title).en,
      desc: localized(entry.description).en,
    }))
    return { de: items, en: items, ka: items }
  }

  const toItems = (items: Array<{ day?: number; title?: string; description?: string }> = []) =>
    items.map((entry) => ({
      day: entry.day || 1,
      title: entry.title || '',
      desc: entry.description || '',
    }))

  return {
    de: toItems(value.de),
    en: toItems(value.en || value.de),
    ka: toItems(value.ka || value.de || value.en),
  }
}

function mediaURL(media: any, slug: string) {
  if (!media || typeof media === 'string') return fallbackImages[slug] || ''
  return media.transformedUrl || media.thumbnailURL || media.url || fallbackImages[slug] || ''
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const packages = await payload.find({
      collection: 'tour-packages',
      depth: 1,
      limit: 50,
      locale: 'all' as any,
      sort: 'sortOrder',
      where: {
        isActive: {
          equals: true,
        },
      },
    })

    return Response.json({
      docs: packages.docs.map((pkg: any) => ({
        id: pkg.id,
        slug: pkg.slug,
        image: mediaURL(pkg.coverImage, pkg.slug),
        duration: pkg.durationDays || 0,
        price: pkg.priceFromEUR || 0,
        type: pkg.packageType || 'fixed',
        highlight: Boolean(pkg.isFeatured),
        names: localized(pkg.title),
        taglines: localized(pkg.tagline),
        descriptions: localized(pkg.description),
        included: localizedList(pkg.included),
        notIncluded: localizedList(pkg.notIncluded),
        itinerary: localizedItinerary(pkg.itinerary),
      })),
    })
  } catch (error) {
    console.error('Tour packages GET failed:', error)
    return Response.json({ docs: [] }, { status: 200 })
  }
}
