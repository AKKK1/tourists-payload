'use client'

import { useTranslation } from 'react-i18next'

const destinations = [
  { name: 'Svaneti', image: '/dest-svaneti.webp', emoji: '🏔️' },
  { name: 'Kazbegi', image: '/dest-kazbegi.webp', emoji: '⛪' },
  { name: 'Racha', image: '/racha1.png', emoji: '🌿' },
  { name: 'Tusheti', image: '/dest-tusheti.webp', emoji: '🐎' },
  { name: 'Kakheti', image: '/dest-kakheti.webp', emoji: '🍷' },
  { name: 'Tbilisi', image: '/tbilisi.png', emoji: '🏛️' },
  { name: 'Batumi', image: '/batumi.png', emoji: '🌊' },
  { name: 'Vardzia', image: '/vardzia.png', emoji: '🕌' },
  { name: 'Borjomi', image: '/borjomi.png', emoji: '💧' },
  { name: 'Shida Kartli', image: '/ateni.png', emoji: '🌿' },
]

function TickerItem({ name, image, emoji }: { name: string; image: string; emoji: string }) {
  return (
    <div className="flex-shrink-0 w-52 sm:w-64 mx-3 group cursor-default">
      <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{emoji}</span>
            <span className="text-white font-semibold text-sm tracking-wide">{name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DestinationTicker() {
  const { t } = useTranslation()

  // Double the items for seamless loop
  const items = [...destinations, ...destinations]

  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t('ticker.label')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Ticker */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex ticker-track">
          {items.map((dest, i) => (
            <TickerItem key={`${dest.name}-${i}`} {...dest} />
          ))}
        </div>
      </div>
    </section>
  )
}
