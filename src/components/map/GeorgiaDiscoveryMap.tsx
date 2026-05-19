'use client'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import { Camera, ChevronLeft, ChevronRight, Loader2, MapPin, Plus, Route, Upload, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { MapMoment } from './types'
import { getMediaURL } from './types'

const GEORGIA_CENTER: [number, number] = [42.1, 43.6]
const GEORGIA_BOUNDS: [[number, number], [number, number]] = [[40.85, 39.6], [43.85, 46.9]]

const markerIcon = new L.DivIcon({
  className: 'map-moment-marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function FitGeorgiaBounds() {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(GEORGIA_BOUNDS, { paddingTopLeft: [24, 96], paddingBottomRight: [24, 96] })
  }, [map])

  return null
}

function FocusSelectedMoment({ moment }: { moment?: MapMoment | null }) {
  const map = useMap()

  useEffect(() => {
    if (!moment) return
    map.flyTo([moment.coordinates[1], moment.coordinates[0]], 13, { duration: 0.9 })
  }, [map, moment])

  return null
}

function MomentCarousel({ moments, onAddToRoute }: { moments: MapMoment[]; onAddToRoute: (moment: MapMoment) => void }) {
  const [index, setIndex] = useState(0)
  const moment = moments[index] || moments[0]
  const mediaURL = getMediaURL(moment.media)
  const hasMany = moments.length > 1

  return (
    <div className="w-64 overflow-hidden rounded-xl bg-background text-foreground shadow-xl">
      <div className="relative aspect-[4/5] bg-muted">
        {moment.mediaType === 'video' ? (
          <video src={mediaURL} className="h-full w-full object-cover" controls playsInline />
        ) : mediaURL ? (
          <img src={mediaURL} alt={moment.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Camera className="size-8" />
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
          {index + 1}/{moments.length} ? {moment.mediaType === 'video' ? 'Video' : 'Photo'}
        </div>
        {hasMany && (
          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65"
              onClick={() => setIndex((value) => (value - 1 + moments.length) % moments.length)}
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65"
              onClick={() => setIndex((value) => (value + 1) % moments.length)}
              aria-label="Next photo"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3 p-3">
        <div>
          <h3 className="text-sm font-bold leading-tight">{moment.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {moment.locationName}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Uploaded by {moment.submittedByName || 'Guest traveler'}</p>
        </div>
        {moment.description && <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{moment.description}</p>}
        <Button size="sm" className="w-full gap-1.5" onClick={() => onAddToRoute(moment)}>
          <Plus className="size-3.5" />
          Add to route
        </Button>
      </div>
    </div>
  )
}

function UploadPanel({ onUploaded }: { onUploaded: () => void }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const openPanel = () => setOpen(true)
    document.addEventListener('open-map-upload', openPanel)
    return () => document.removeEventListener('open-map-upload', openPanel)
  }, [])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/site-api/map-moments', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(data.message || 'Upload failed')

      form.reset()
      setStatus('success')
      setMessage('Uploaded. It will appear on the map after admin approval.')
      onUploaded()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  return (
    <aside className={cn('fixed bottom-24 right-4 z-[9999] w-[min(380px,calc(100vw-32px))] transition-all', !open && 'pointer-events-none translate-y-4 opacity-0')}>
      <div className="overflow-hidden rounded-lg border border-white/20 bg-background/95 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Georgia Map</p>
            <h1 className="text-base font-bold tracking-tight">Hidden places</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close panel' : 'Open panel'}>
            <X className="size-4" />
          </Button>
        </div>

        {open && (
          <form onSubmit={submit} className="space-y-4 p-4">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Photo title</Label>
              <Input id="title" name="title" placeholder="Morning in Bobnevi" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="locationName">Village or place</Label>
              <Input id="locationName" name="locationName" placeholder="Bobnevi" required />
              <p className="text-xs text-muted-foreground">Write the hidden village, viewpoint, waterfall, trail, or valley name.</p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="file">Photo or video</Label>
              <Input id="file" name="file" type="file" accept="image/*,video/*" required />
              <p className="text-xs text-muted-foreground">Photos up to 15MB. Videos up to 100MB.</p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Story</Label>
              <Textarea id="description" name="description" placeholder="What can travelers discover here?" className="min-h-24" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="submittedByName">Name</Label>
                <Input id="submittedByName" name="submittedByName" placeholder="Optional" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="submittedByEmail">Email</Label>
                <Input id="submittedByEmail" name="submittedByEmail" type="email" placeholder="Optional" />
              </div>
            </div>
            {message && (
              <div className={cn('rounded-md px-3 py-2 text-sm', status === 'success' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive')}>
                {message}
              </div>
            )}
            <Button type="submit" className="w-full gap-2" disabled={status === 'loading'}>
              {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              Upload to map
            </Button>
          </form>
        )}
      </div>
    </aside>
  )
}

function RouteDrawer({ route, onClear }: { route: MapMoment[]; onClear: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-lg border border-white/20 bg-background/95 p-3 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Route className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Route builder</p>
            <p className="text-xs text-muted-foreground">Choose map moments and build a future trip route.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {route.length === 0 ? (
            <span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">No places selected</span>
          ) : (
            route.map((moment, index) => (
              <span key={moment.id} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                {index + 1}. {moment.locationName}
              </span>
            ))
          )}
        </div>
        <Button variant="outline" size="sm" onClick={onClear} disabled={route.length === 0}>Clear</Button>
      </div>
    </div>
  )
}

function MapMomentGallery({ moments, selectedId, onSelect }: { moments: MapMoment[]; selectedId?: string; onSelect: (moment: MapMoment) => void }) {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Discovery gallery</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Photos from hidden Georgia</h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">Scroll through traveler uploads. Choose a photo to move the map to that exact place.</p>
        </div>

        {moments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Approved photos will appear here after admin approval.
          </div>
        ) : (
          <Carousel className="w-full" opts={{ align: 'start', loop: moments.length > 3 }}>
            <CarouselContent className="-ml-3">
              {moments.map((moment) => {
                const mediaURL = getMediaURL(moment.media)
                const isSelected = selectedId === moment.id

                return (
                  <CarouselItem key={moment.id} className="basis-3/4 pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <button type="button" className="block w-full text-left" onClick={() => onSelect(moment)}>
                      <Card className={cn('overflow-hidden rounded-lg border transition shadow-sm hover:-translate-y-0.5 hover:shadow-lg', isSelected && 'border-primary ring-2 ring-primary/25')}>
                        <CardContent className="p-0">
                          <div className="relative aspect-[4/5] bg-muted">
                            {moment.mediaType === 'video' ? (
                              <video src={mediaURL} className="h-full w-full object-cover" muted playsInline />
                            ) : mediaURL ? (
                              <img src={mediaURL} alt={moment.title} className="h-full w-full object-cover" loading="lazy" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-muted-foreground">
                                <Camera className="size-8" />
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
                              <h3 className="line-clamp-1 text-sm font-semibold">{moment.title}</h3>
                              <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
                                <MapPin className="size-3" />
                                <span className="line-clamp-1">{moment.locationName}</span>
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1 p-3">
                            <p className="line-clamp-1 text-xs text-muted-foreground">Uploaded by {moment.submittedByName || 'Guest traveler'}</p>
                            <p className="text-xs font-medium text-primary">Show on map</p>
                          </div>
                        </CardContent>
                      </Card>
                    </button>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-background/95 shadow-lg" />
            <CarouselNext className="right-2 bg-background/95 shadow-lg" />
          </Carousel>
        )}
      </div>
    </section>
  )
}

function groupMoments(moments: MapMoment[]) {
  const grouped = new Map<string, MapMoment[]>()

  for (const moment of moments) {
    const [lng, lat] = moment.coordinates
    const key = lat.toFixed(5) + ',' + lng.toFixed(5)
    grouped.set(key, [...(grouped.get(key) || []), moment])
  }

  return Array.from(grouped.values())
}

export function GeorgiaDiscoveryMap() {
  const [moments, setMoments] = useState<MapMoment[]>([])
  const [route, setRoute] = useState<MapMoment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMoment, setSelectedMoment] = useState<MapMoment | null>(null)

  const groupedMoments = useMemo(() => groupMoments(moments), [moments])
  const routeLine = useMemo<[number, number][]>(() => route.map((moment) => [moment.coordinates[1], moment.coordinates[0]]), [route])

  const loadMoments = async () => {
    setLoading(true)
    try {
      const response = await fetch('/site-api/map-moments', { cache: 'no-store' })
      if (!response.ok) throw new Error('Map moments request failed')
      const data = await response.json()
      const docs = Array.isArray(data.docs) ? data.docs : []
      setMoments(docs)
      setSelectedMoment((current) => current || docs[0] || null)
    } catch (error) {
      console.error(error)
      setMoments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMoments()
  }, [])

  const addToRoute = (moment: MapMoment) => {
    setRoute((items) => (items.some((item) => item.id === moment.id) ? items : [...items, moment]))
  }

  return (
    <main className="bg-background">
      <UploadPanel onUploaded={loadMoments} />
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[9998] inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl hover:bg-primary/90"
        onClick={() => document.dispatchEvent(new CustomEvent('open-map-upload'))}
      >
        <Upload className="size-4" />
        Add photo
      </button>
      <section className="relative h-svh overflow-hidden bg-foreground pt-16 lg:pt-20">
        <div className="absolute right-4 top-28 z-40 rounded-full bg-background/95 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur">
          {loading ? 'Loading map moments...' : moments.length + ' approved discoveries'}
        </div>
        {selectedMoment && (
          <div className="absolute left-4 top-28 z-40 max-w-[min(360px,calc(100vw-32px))] rounded-lg border border-white/20 bg-background/95 p-3 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Selected place</p>
            <h2 className="mt-1 text-sm font-bold text-foreground">{selectedMoment.title}</h2>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {selectedMoment.locationName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Uploaded by {selectedMoment.submittedByName || 'Guest traveler'}</p>
          </div>
        )}
        <MapContainer center={GEORGIA_CENTER} zoom={8} scrollWheelZoom className="h-full w-full" maxBounds={GEORGIA_BOUNDS} minZoom={7}>
          <FitGeorgiaBounds />
          <FocusSelectedMoment moment={selectedMoment} />
          <TileLayer
            attribution="&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors"
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          />
          {groupedMoments.map((group) => {
            const first = group[0]
            return (
              <Marker key={group.map((moment) => moment.id).join('-')} position={[first.coordinates[1], first.coordinates[0]]} icon={markerIcon}>
                <Popup closeButton={false} className="map-moment-popup">
                  <MomentCarousel moments={group} onAddToRoute={addToRoute} />
                </Popup>
              </Marker>
            )
          })}
          {routeLine.length > 1 && <Polyline positions={routeLine} pathOptions={{ color: '#1f6b47', weight: 4, opacity: 0.75 }} />}
        </MapContainer>
        <RouteDrawer route={route} onClear={() => setRoute([])} />
        <div className="pointer-events-none absolute inset-x-0 top-16 z-30 h-28 bg-gradient-to-b from-black/25 to-transparent lg:top-20" />
      </section>
      <MapMomentGallery moments={moments} selectedId={selectedMoment?.id} onSelect={setSelectedMoment} />
      <style jsx global>{`
        .leaflet-container { font-family: inherit; }
        .map-moment-marker { display: grid; place-items: center; }
        .map-moment-marker span {
          display: block;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: #1f6b47;
          border: 3px solid white;
          box-shadow: 0 10px 28px rgba(0,0,0,.35);
        }
        .map-moment-marker span::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          margin: 6px;
          border-radius: 999px;
          background: white;
        }
        .map-moment-popup .leaflet-popup-content-wrapper { padding: 0; border-radius: 12px; overflow: hidden; }
        .map-moment-popup .leaflet-popup-content { margin: 0; }
        .map-moment-popup .leaflet-popup-tip { background: hsl(var(--background)); }
      `}</style>
    </main>
  )
}
