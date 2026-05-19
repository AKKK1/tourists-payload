"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Destination = {
  id: string
  slug: string
  name_en: string
  name_de: string
  name_ka: string
  region: string
  short_desc_en: string
  short_desc_de: string
  description_en: string
  description_de: string
  cover_image_url: string
  is_featured: boolean
  sort_order: number
}

const destinationTourLinks: Record<string, string> = {
  svaneti: '/packages/deep-georgia#deep-georgia',
  kazbegi: '/packages/basic-escape#basic-escape',
  kakheti: '/packages/deep-georgia#deep-georgia',
  tusheti: '/packages/deep-georgia#deep-georgia',
  tbilisi: '/packages/basic-escape#basic-escape',
  racha: '/packages/custom-soul-recovery#custom-soul-recovery',
  'black-sea': '/packages/custom-soul-recovery#custom-soul-recovery',
  vardzia: '/packages/deep-georgia#deep-georgia',
}

const destinationImages: Record<string, string> = {
  svaneti: '/dest-svaneti.webp',
  kazbegi: '/dest-kazbegi.webp',
  kakheti: '/dest-kakheti.webp',
  tusheti: '/dest-tusheti.webp',
  racha: '/dest-tusheti.webp',
  tbilisi: '/dest-kazbegi.webp',
  'black-sea': '/package-basic-escape.webp',
  vardzia: '/package-custom.webp',
}

const fallbackDestinations: Destination[] = [
  { id: '1', slug: 'svaneti', name_en: 'Svaneti', name_de: 'Swanetien', name_ka: 'სვანეთი', region: 'Upper Svaneti', short_desc_en: 'Ancient towers rise above glacial valleys.', short_desc_de: 'Uralte Türme über Gletschertälern.', description_en: '', description_de: '', cover_image_url: '', is_featured: true, sort_order: 1 },
  { id: '2', slug: 'kazbegi', name_en: 'Kazbegi', name_de: 'Kazbegi', name_ka: 'ყაზბეგი', region: 'Greater Caucasus', short_desc_en: 'Gergeti Trinity Church above the clouds.', short_desc_de: 'Gergeti-Kirche über den Wolken.', description_en: '', description_de: '', cover_image_url: '', is_featured: true, sort_order: 2 },
  { id: '3', slug: 'kakheti', name_en: 'Kakheti', name_de: 'Kachetien', name_ka: 'კახეთი', region: 'Eastern Georgia', short_desc_en: 'Wine heartland with rolling vineyards.', short_desc_de: 'Georgiens Weinheimatland.', description_en: '', description_de: '', cover_image_url: '', is_featured: true, sort_order: 5 },
  { id: '4', slug: 'tusheti', name_en: 'Tusheti', name_de: 'Tuschetien', name_ka: 'თუშეთი', region: 'Eastern Georgia', short_desc_en: 'Remote highland paradise, summer only.', short_desc_de: 'Abgelegenes Hochlandparadies, nur im Sommer.', description_en: '', description_de: '', cover_image_url: '', is_featured: true, sort_order: 4 },
  { id: '5', slug: 'tbilisi', name_en: 'Tbilisi', name_de: 'Tiflis', name_ka: 'თბილისი', region: 'Central Georgia', short_desc_en: 'Ancient baths, modern art and street food.', short_desc_de: 'Alte Bäder, moderne Kunst, Street Food.', description_en: '', description_de: '', cover_image_url: '', is_featured: true, sort_order: 6 },
  { id: '6', slug: 'racha', name_en: 'Racha', name_de: 'Ratscha', name_ka: 'რაჭა', region: 'Western Georgia', short_desc_en: 'Hidden gem of untouched nature.', short_desc_de: 'Verborgenes Juwel unberührter Natur.', description_en: '', description_de: '', cover_image_url: '', is_featured: false, sort_order: 3 },
  { id: '7', slug: 'black-sea', name_en: 'Black Sea', name_de: 'Schwarzmeerküste', name_ka: 'შავი ზღვა', region: 'Western Georgia', short_desc_en: 'Subtropical coast and vibrant Batumi.', short_desc_de: 'Subtropische Küste und lebhaftes Batumi.', description_en: '', description_de: '', cover_image_url: '', is_featured: false, sort_order: 7 },
  { id: '8', slug: 'vardzia', name_en: 'Vardzia & Canyons', name_de: 'Wardsia & Canyons', name_ka: 'ვარძია', region: 'Southern Georgia', short_desc_en: 'Ancient cave city carved into volcanic rock.', short_desc_de: 'Uralte Höhlenstadt in Vulkangestein.', description_en: '', description_de: '', cover_image_url: '', is_featured: false, sort_order: 8 },
]

export function DestinationsPage() {
  const { t, i18n } = useTranslation()
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations)
  const lang = i18n.language as 'de' | 'en' | 'ka'

  const getName = (d: Destination) =>
    lang === 'de' ? d.name_de : lang === 'ka' ? d.name_ka : d.name_en

  const getDesc = (d: Destination) =>
    lang === 'de' ? d.short_desc_de : d.short_desc_en

  const featured = destinations.filter((d) => d.is_featured)
  const others = destinations.filter((d) => !d.is_featured)

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            Georgia
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t('destinations.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Featured destinations — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((dest, i) => (
            <div
              id={dest.slug}
              key={dest.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer scroll-mt-24 ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
                <img
                  src={destinationImages[dest.slug] || '/dest-kazbegi.webp'}
                  alt={getName(dest)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs text-white/70">{dest.region}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{getName(dest)}</h3>
                <p className="text-sm text-white/75 leading-snug mb-3">{getDesc(dest)}</p>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-fit border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm gap-1.5 text-xs"
                >
                  <Link href={destinationTourLinks[dest.slug] || '/packages'}>
                    {t('destinations.explore')}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Other destinations */}
        <h2 className="text-xl font-bold text-foreground mb-6">
          {lang === 'de' ? 'Weitere Reiseziele' : 'More destinations'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((dest) => (
            <div key={dest.id} className="group relative overflow-hidden rounded-xl cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={destinationImages[dest.slug] || '/dest-kazbegi.webp'}
                  alt={getName(dest)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-sm font-bold text-white">{getName(dest)}</h3>
                <p className="text-xs text-white/70 mt-0.5">{dest.region}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {lang === 'de' ? 'Nicht sicher, welches Ziel?' : 'Not sure which destination?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {lang === 'de'
              ? 'Erzählen Sie uns von Ihren Wünschen — wir erstellen Ihnen die perfekte Route.'
              : 'Tell us about your wishes — we\'ll create the perfect route for you.'}
          </p>
          <Button asChild size="lg">
            <Link href="/booking?package=custom-soul-recovery">
              {lang === 'de' ? 'Individuelle Reise planen' : 'Plan custom trip'}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
