import config from '@payload-config'
import { getPayload } from 'payload'

const GEORGIA_BOUNDS = {
  minLat: 40.9,
  maxLat: 43.8,
  minLng: 39.8,
  maxLng: 46.8,
}

function isInsideGeorgia(latitude: number, longitude: number) {
  return (
    latitude >= GEORGIA_BOUNDS.minLat &&
    latitude <= GEORGIA_BOUNDS.maxLat &&
    longitude >= GEORGIA_BOUNDS.minLng &&
    longitude <= GEORGIA_BOUNDS.maxLng
  )
}

async function geocodeLocation(locationName: string) {
  if (process.env.GOOGLE_MAPS_GEOCODING_API_KEY) {
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
    url.searchParams.set('address', `${locationName}, Georgia`)
    url.searchParams.set('key', process.env.GOOGLE_MAPS_GEOCODING_API_KEY)

    const response = await fetch(url)
    const data = await response.json()
    const first = data.results?.[0]
    const location = first?.geometry?.location

    if (location && isInsideGeorgia(location.lat, location.lng)) {
      return {
        latitude: location.lat as number,
        longitude: location.lng as number,
        label: first.formatted_address as string,
      }
    }
  }

  const fallbackURL = new URL('https://nominatim.openstreetmap.org/search')
  fallbackURL.searchParams.set('q', `${locationName}, Georgia`)
  fallbackURL.searchParams.set('format', 'jsonv2')
  fallbackURL.searchParams.set('limit', '1')
  fallbackURL.searchParams.set('countrycodes', 'ge')

  const response = await fetch(fallbackURL, {
    headers: {
      'User-Agent': 'GeorgianSoulMap/1.0',
    },
  })
  const data = await response.json()
  const first = data?.[0]

  if (!first) return null

  const latitude = Number(first.lat)
  const longitude = Number(first.lon)

  if (!isFinite(latitude) || !isFinite(longitude) || !isInsideGeorgia(latitude, longitude)) {
    return null
  }

  return {
    latitude,
    longitude,
    label: first.display_name as string,
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const moments = await payload.find({
      collection: 'map-moments',
      depth: 1,
      limit: 200,
      sort: '-createdAt',
      where: {
        status: {
          equals: 'approved',
        },
      },
    })

    return Response.json(moments)
  } catch (error) {
    console.error('Map moments GET failed:', error)
    return Response.json({ message: 'Map moments could not be loaded.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = String(formData.get('title') || '').trim()
    const description = String(formData.get('description') || '').trim()
    const locationName = String(formData.get('locationName') || '').trim()
    const submittedByName = String(formData.get('submittedByName') || '').trim()
    const submittedByEmail = String(formData.get('submittedByEmail') || '').trim()
    const file = formData.get('file')

    if (!title || !locationName || !(file instanceof File)) {
      return Response.json({ message: 'Title, location, and file are required.' }, { status: 400 })
    }

    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')

    if (!isVideo && !isImage) {
      return Response.json({ message: 'Only image and video uploads are supported.' }, { status: 400 })
    }

    const maxSize = isVideo ? 100 * 1024 * 1024 : 15 * 1024 * 1024
    if (file.size > maxSize) {
      return Response.json({ message: isVideo ? 'Videos must be under 100MB.' : 'Photos must be under 15MB.' }, { status: 400 })
    }

    const location = await geocodeLocation(locationName)
    if (!location) {
      return Response.json({ message: 'Could not find that place in Georgia.' }, { status: 422 })
    }

    const payload = await getPayload({ config })
    const buffer = Buffer.from(await file.arrayBuffer())

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: title,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    })

    const moment = await payload.create({
      collection: 'map-moments',
      data: {
        title,
        description,
        locationName: location.label || locationName,
        coordinates: [location.longitude, location.latitude],
        media: media.id,
        mediaType: isVideo ? 'video' : 'photo',
        submittedByName,
        submittedByEmail,
        status: 'pending',
      },
      overrideAccess: true,
    })

    return Response.json({ id: moment.id, status: 'pending' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json({ message: 'Upload failed.' }, { status: 500 })
  }
}
