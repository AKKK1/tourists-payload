"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Clock, Users, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const packageImages: Record<string, string> = {
  'basic-escape': '/package-basic-escape.webp',
  'deep-georgia': '/package-deep-georgia.webp',
  'custom-soul-recovery': '/package-custom.webp',
}

const packageData = [
  {
    slug: 'basic-escape',
    badge: '7 Tage',
    badge_en: '7 days',
    price: '€ 890',
    highlight: false,
    features_de: ['Flughafentransfer', '7 Nächte Unterkunft', '2 geführte Touren', 'Tägliches Frühstück'],
    features_en: ['Airport transfer', '7 nights accommodation', '2 guided tours', 'Daily breakfast'],
  },
  {
    slug: 'deep-georgia',
    badge: '12 Tage',
    badge_en: '12 days',
    price: '€ 1.590',
    highlight: true,
    features_de: ['Flughafentransfer', '11 Nächte gemischt', 'Reiten & Weintasting', 'Ganztages-Führer'],
    features_en: ['Airport transfer', '11 nights mixed stay', 'Horse riding & wine tasting', 'Full-time guide'],
  },
  {
    slug: 'custom-soul-recovery',
    badge: 'Individuell',
    badge_en: 'Custom',
    price: null,
    highlight: false,
    features_de: ['Vollständig personalisiert', 'Flexibles Programm', 'Privatführer (opt.)', 'Alle Altersgruppen'],
    features_en: ['Fully personalized', 'Flexible itinerary', 'Private guide (opt.)', 'All age groups'],
  },
]

type PreviewPackage = (typeof packageData)[number] & {
  image?: string
  names?: Record<string, string>
  taglines?: Record<string, string>
}

export function PackagesPreview() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'de' | 'en' | 'ka'
  const [packages, setPackages] = useState<PreviewPackage[]>(packageData)

  useEffect(() => {
    let mounted = true

    async function loadPackages() {
      try {
        const response = await fetch('/site-api/tour-packages', { cache: 'no-store' })
        const data = await response.json().catch(() => ({ docs: [] }))
        const docs = Array.isArray(data.docs) ? data.docs.slice(0, 3) : []

        if (mounted && docs.length > 0) {
          setPackages(
            docs.map((pkg: any) => ({
              slug: pkg.slug,
              badge: pkg.type === 'custom' ? 'Individuell' : `${pkg.duration} Tage`,
              badge_en: pkg.type === 'custom' ? 'Custom' : `${pkg.duration} days`,
              price: pkg.price > 0 ? `€ ${Number(pkg.price).toLocaleString('de')}` : null,
              highlight: Boolean(pkg.highlight),
              image: pkg.image,
              names: pkg.names,
              taglines: pkg.taglines,
              features_de: (pkg.included?.de || []).slice(0, 4),
              features_en: (pkg.included?.en || pkg.included?.de || []).slice(0, 4),
            })),
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadPackages()

    return () => {
      mounted = false
    }
  }, [])

  const getName = (slug: string) => {
    if (slug === 'basic-escape') return lang === 'de' ? 'Basic Escape' : 'Basic Escape'
    if (slug === 'deep-georgia') return lang === 'de' ? 'Tiefes Georgien' : 'Deep Georgia'
    return lang === 'de' ? 'Individuelle Reise' : 'Custom Soul Recovery Trip'
  }

  const getTagline = (slug: string) => {
    if (slug === 'basic-escape') return lang === 'de'
      ? 'Ihr erster Vorgeschmack auf echtes Georgien.'
      : 'Your first taste of authentic Georgia.'
    if (slug === 'deep-georgia') return lang === 'de'
      ? 'Gehen Sie über die Oberfläche hinaus.'
      : 'Go beyond the surface.'
    return lang === 'de'
      ? 'Ihr Georgien. Ihr Tempo. Ihre Geschichte.'
      : 'Your Georgia. Your pace. Your story.'
  }

  const getPackageName = (pkg: PreviewPackage) => pkg.names?.[lang] || pkg.names?.en || getName(pkg.slug)
  const getPackageTagline = (pkg: PreviewPackage) => pkg.taglines?.[lang] || pkg.taglines?.en || getTagline(pkg.slug)

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            {t('nav.packages')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className={cn(
                'relative flex flex-col rounded-2xl overflow-hidden border transition-shadow hover:shadow-xl',
                pkg.highlight
                  ? 'border-[oklch(0.32_0.08_155)] ring-2 ring-[oklch(0.32_0.08_155)]/20 shadow-lg'
                  : 'border-border'
              )}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-0 right-0 z-20 bg-[oklch(0.32_0.08_155)] text-white text-xs font-semibold text-center py-1.5 tracking-wide">
                  {lang === 'de' ? '⭐ Empfohlen' : '⭐ Most Popular'}
                </div>
              )}

              {/* Image */}
              <div className={cn('relative overflow-hidden', pkg.highlight ? 'h-52 pt-7' : 'h-52')}>
                <img
                  src={pkg.image || packageImages[pkg.slug]}
                  alt={getPackageName(pkg)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Duration badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-white/90 text-foreground text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lang === 'de' ? pkg.badge : pkg.badge_en}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-foreground mb-1.5">{getPackageName(pkg)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{getPackageTagline(pkg)}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {(lang === 'de' ? pkg.features_de : pkg.features_en).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-[oklch(0.32_0.08_155)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      {pkg.price ? (
                        <>
                          <div className="text-xs text-muted-foreground mb-0.5">{t('packages.from')}</div>
                          <div className="text-2xl font-bold text-foreground">{pkg.price}</div>
                          <div className="text-xs text-muted-foreground">{t('packages.perPerson')}</div>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-muted-foreground">
                          {t('packages.priceOnRequest')}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span>1–12</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <Link href={`/packages/${pkg.slug}`}>{t('packages.learnMore')}</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(
                        'flex-1 text-xs',
                        pkg.highlight ? '' : 'bg-foreground text-background hover:bg-foreground/90'
                      )}
                    >
                      <Link href={`/booking?package=${pkg.slug}`}>{t('packages.bookThis')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/packages">
              {lang === 'de' ? 'Alle Pakete ansehen' : 'View all packages'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
