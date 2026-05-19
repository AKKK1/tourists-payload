"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const galleryItems = [
  { src: '/hero-svaneti.webp', caption_de: 'Swanetien — Ushguli aus der Luft', caption_en: 'Svaneti — Ushguli from the air', category: 'mountains', span: 'col-span-2 row-span-2' },
  { src: '/dest-kazbegi.webp', caption_de: 'Kazbegi — Gergeti-Kirche', caption_en: 'Kazbegi — Gergeti Church', category: 'churches', span: '' },
  { src: '/dest-kakheti.webp', caption_de: 'Kachetien — Weinberge', caption_en: 'Kakheti — Vineyards', category: 'wine', span: '' },
  { src: '/dest-tusheti.webp', caption_de: 'Tuschetien — Hochlanddorf', caption_en: 'Tusheti — Highland village', category: 'mountains', span: '' },
  { src: '/dest-svaneti.webp', caption_de: 'Swanetien — Ushguli', caption_en: 'Svaneti — Ushguli', category: 'mountains', span: '' },
  { src: '/guesthouse-dinner.webp', caption_de: 'Georgische Gastfreundschaft', caption_en: 'Georgian hospitality', category: 'culture', span: 'col-span-2' },
  { src: '/package-deep-georgia.webp', caption_de: 'Trekking im Hochgebirge', caption_en: 'Trekking in the highlands', category: 'adventure', span: '' },
  { src: '/package-basic-escape.webp', caption_de: 'Ranch im Bergtal', caption_en: 'Ranch in the mountain valley', category: 'accommodation', span: '' },
  { src: '/package-custom.webp', caption_de: 'Freiheit auf dem Gipfel', caption_en: 'Freedom on the summit', category: 'adventure', span: '' },
]

const categories = ['all', 'mountains', 'churches', 'wine', 'culture', 'adventure', 'accommodation']

export function GalleryPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            {lang === 'de' ? 'Galerie' : 'Gallery'}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {lang === 'de' ? 'Georgien in Bildern' : 'Georgia in Pictures'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {lang === 'de'
              ? 'Ein Blick auf die Landschaften, Kulturen und Momente, die unsere Reisen unvergesslich machen.'
              : 'A glimpse of the landscapes, cultures and moments that make our trips unforgettable.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="cursor-pointer px-3 py-1.5 text-xs font-semibold capitalize"
            >
              {lang === 'de'
                ? { all: 'Alle', mountains: 'Berge', churches: 'Kirchen', wine: 'Wein', culture: 'Kultur', adventure: 'Abenteuer', accommodation: 'Unterkunft' }[cat] || cat
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={lang === 'de' ? item.caption_de : item.caption_en}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white font-medium">
                  {lang === 'de' ? item.caption_de : item.caption_en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-5">
            {lang === 'de'
              ? 'Bereit, diese Orte selbst zu erleben?'
              : 'Ready to experience these places yourself?'}
          </p>
          <Button asChild size="lg">
            <Link href="/packages">
              {lang === 'de' ? 'Reisepakete entdecken' : 'Explore tour packages'}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
