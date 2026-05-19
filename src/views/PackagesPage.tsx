"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Clock, Users, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const packages = [
  {
    slug: 'basic-escape',
    image: '/package-basic-escape.webp',
    duration: 7,
    price: 890,
    type: 'fixed',
    highlight: false,
    names: { de: 'Basic Escape', en: 'Basic Escape', ka: 'Basic Escape' },
    taglines: {
      de: 'Ihr erster Vorgeschmack auf das echte Georgien — Natur, Familiengastfreundschaft und Bergluft.',
      en: 'Your first taste of authentic Georgia — nature, family hospitality and mountain air.',
      ka: 'საქართველოს პირველი გემო — ბუნება, ოჯახური სტუმართმოყვარეობა.',
    },
    descriptions: {
      de: 'Sieben Tage, um abzuschalten, zu atmen und wirklich anzukommen. Von dem Moment an, in dem wir Sie am Flughafen abholen, sind Sie in guten Händen. Wir bringen Sie von Tiflis in die Berge, durch Dörfer, wo die Zeit stillzustehen scheint, zu Familienpensionen, wo das Abendessen ein Ereignis ist.',
      en: 'Seven days to disconnect, breathe and truly arrive. From the moment we meet you at the airport, you\'re in good hands. We take you from Tbilisi to the mountains, through villages where time seems to stand still.',
    },
    included: {
      de: ['Flughafentransfer (An- & Abreise)', 'Hotel + Familienpension (7 Nächte)', 'Tägliches Frühstück', '2 geführte Tagesausflüge', 'Gesamter Bodentransport', 'Englisch/Deutsch Guide', 'Willkommensessen'],
      en: ['Airport pickup & drop-off', '7 nights accommodation', 'Daily breakfast', '2 guided day tours', 'All ground transportation', 'English/German guide', 'Welcome dinner'],
    },
    notIncluded: {
      de: ['Internationale Flüge', 'Mittag- & Abendessen', 'Reiseversicherung', 'Persönliche Ausgaben'],
      en: ['International flights', 'Lunch & dinners', 'Travel insurance', 'Personal expenses'],
    },
    itinerary: {
      de: [
        { day: 1, title: 'Ankunft in Tiflis', desc: 'Flughafenabholung, Hotel-Check-in, Willkommensessen in der Altstadt' },
        { day: 2, title: 'Tiflis entdecken', desc: 'Altes Tiflis, Schwefelbäder, Narikala-Festung, Seilbahn' },
        { day: 3, title: 'Fahrt nach Kazbegi', desc: 'Georgische Heerstraße, Ananuri-Festung, Ankunft in Kazbegi' },
        { day: 4, title: 'Kazbegi-Berge', desc: 'Wanderung zur Gergeti-Dreifaltigkeitskirche, Bergblick, lokales Mittagessen' },
        { day: 5, title: 'Dorftag', desc: 'Traditionelles kaukasisches Dorf, Begegnung mit lokaler Familie, Kochkurs' },
        { day: 6, title: 'Rückkehr nach Tiflis', desc: 'Malerische Fahrt, Weinprobe, freier Nachmittag' },
        { day: 7, title: 'Abreise', desc: 'Frühstück, Transfer zum Flughafen' },
      ],
      en: [
        { day: 1, title: 'Arrival in Tbilisi', desc: 'Airport pickup, hotel check-in, welcome dinner in old town' },
        { day: 2, title: 'Tbilisi Discovery', desc: 'Old Tbilisi, sulfur baths, Narikala fortress, cable car' },
        { day: 3, title: 'Drive to Kazbegi', desc: 'Georgian Military Highway, Ananuri fortress, arrive Kazbegi' },
        { day: 4, title: 'Kazbegi Mountains', desc: 'Gergeti Trinity Church hike, mountain views, local lunch' },
        { day: 5, title: 'Village Day', desc: 'Traditional Caucasian village, meet local family, cooking class' },
        { day: 6, title: 'Return to Tbilisi', desc: 'Scenic drive, wine tasting, free afternoon' },
        { day: 7, title: 'Departure', desc: 'Breakfast, airport transfer' },
      ],
    },
  },
  {
    slug: 'deep-georgia',
    image: '/package-deep-georgia.webp',
    duration: 12,
    price: 1590,
    type: 'fixed',
    highlight: true,
    names: { de: 'Tiefes Georgien', en: 'Deep Georgia', ka: 'ღრმა საქართველო' },
    taglines: {
      de: 'Gehen Sie über die Oberfläche hinaus. Entdecken Sie das Georgien, das nur Einheimische kennen.',
      en: 'Go beyond the surface. Discover the Georgia only locals know.',
      ka: 'ზედაპირის მიღმა. ადგილობრივების საქართველოს აღმოჩენა.',
    },
    descriptions: {
      de: 'Zwölf Tage tief eingetaucht in das gesamte Spektrum des georgischen Lebens. Von Tiflisʼ kulturellen Schichten über die Weintäler von Kachetien, die wilden Gipfel Swanetiens und die alten Höhlenstädte des Südens.',
      en: 'Twelve days immersed in the full spectrum of Georgian life. From Tbilisi\'s cultural layers to the wine valleys of Kakheti, the wild peaks of Svaneti and the ancient cave cities of the south.',
    },
    included: {
      de: ['Flughafentransfer', '11 Nächte gemischte Unterkunft', 'Frühstück täglich + 4 Abendessen', 'Privater Van', 'Professioneller Guide', 'Reitstunde im Hochland', 'Weinprobe (2 Weingüter)', 'Höhlenstadtführung', 'Willkommens- & Abschiedsessen'],
      en: ['Airport transfer', '11 nights mixed accommodation', 'Breakfast daily + 4 dinners', 'Private van', 'Professional guide', 'Horse riding in highlands', 'Wine tasting (2 wineries)', 'Cave city tour', 'Welcome & farewell dinner'],
    },
    notIncluded: {
      de: ['Internationale Flüge', 'Einige Mittagessen', 'Reiseversicherung', 'Optionale Aktivitäten'],
      en: ['International flights', 'Some lunches', 'Travel insurance', 'Optional activities'],
    },
    itinerary: {
      de: [
        { day: 1, title: 'Ankunft Tiflis', desc: 'Flughafenwillkommen, Boutique-Hotel, Stadtspaziergang' },
        { day: 2, title: 'Tiflis Tiefer Einblick', desc: 'Altstadt, Kunstgalerien, Schwefelbezirk, Dachterrassen-Dinner' },
        { day: 3, title: 'Kachetisches Weintal', desc: 'Fahrt in die Weinregion, Familienweingüter, Tonkrug-Weinprobe' },
        { day: 4, title: 'Kachetische Klöster', desc: 'Bodbe, Stadt Sighnaghi, Blick auf das Alazan-Tal' },
        { day: 5, title: 'Flug nach Swanetien', desc: 'Morgenflug nach Mestia, Turmspaziergang, Svan-Kultur' },
        { day: 6, title: 'Swanetien-Wanderung', desc: 'Gletscherweg-Tageswanderung, Mittagessen in der Wildnis' },
        { day: 7, title: 'Swanetische Dörfer', desc: 'Ushguli (UNESCO), alte Kirchen, Panoramablick' },
        { day: 8, title: 'Rückkehr nach Tiflis', desc: 'Rückflug, freier Nachmittag' },
        { day: 9, title: 'Ranch & Hochland', desc: 'Reiten, Lagerfeuer, Sternbeobachtung' },
        { day: 10, title: 'Südgeorgien', desc: 'Wardsia-Höhlenstadt, Borjomi-Mineralquellen' },
        { day: 11, title: 'Kultur & Handwerk', desc: 'Tifliser Galerien, lokaler Markt, Kochworkshop' },
        { day: 12, title: 'Abschiedstag', desc: 'Abschiedsbrunch, Flughafentransfer' },
      ],
      en: [
        { day: 1, title: 'Arrival Tbilisi', desc: 'Airport welcome, boutique hotel, city walk' },
        { day: 2, title: 'Tbilisi Deep Dive', desc: 'Old town, art galleries, sulfur district, rooftop dinner' },
        { day: 3, title: 'Kakheti Wine Valley', desc: 'Wine region, family winery, clay jar tasting' },
        { day: 4, title: 'Kakheti Monasteries', desc: 'Bodbe, Signagi town, Alazani valley' },
        { day: 5, title: 'Flight to Svaneti', desc: 'Morning flight to Mestia, tower walk, Svan culture' },
        { day: 6, title: 'Svaneti Hike', desc: 'Glacier trail day hike, lunch in the wild' },
        { day: 7, title: 'Svaneti Villages', desc: 'Ushguli (UNESCO), ancient churches, panoramic views' },
        { day: 8, title: 'Return to Tbilisi', desc: 'Flight back, afternoon free' },
        { day: 9, title: 'Ranch & Highlands', desc: 'Horse riding, campfire, stargazing' },
        { day: 10, title: 'South Georgia', desc: 'Vardzia cave city, Borjomi springs' },
        { day: 11, title: 'Culture & Craft', desc: 'Tbilisi galleries, market, cooking workshop' },
        { day: 12, title: 'Farewell Day', desc: 'Farewell brunch, airport transfer' },
      ],
    },
  },
  {
    slug: 'custom-soul-recovery',
    image: '/package-custom.webp',
    duration: 0,
    price: 0,
    type: 'custom',
    highlight: false,
    names: { de: 'Individuelle Seelen-Erholung', en: 'Custom Soul Recovery Trip', ka: 'ინდივიდუალური ტური' },
    taglines: {
      de: 'Ihr Georgien. Ihr Tempo. Ihre Geschichte.',
      en: 'Your Georgia. Your pace. Your story.',
      ka: 'თქვენი საქართველო. თქვენი ტემპი. თქვენი ამბავი.',
    },
    descriptions: {
      de: 'Für diejenigen, die wissen, was sie wollen — oder Hilfe beim Entdecken benötigen. Wir gestalten Ihre Reise von Grund auf: Ihre Ziele, Ihr Unterkunftsstil, Ihre Aktivitäten, Ihr Rhythmus.',
      en: 'For those who know what they want — or want help discovering it. We design your journey from scratch: your destinations, your accommodation style, your activities, your rhythm.',
    },
    included: {
      de: ['Vollständig personalisiertes Reiseprogramm', 'Handverlesene Unterkunft', 'Privatführer (optional)', 'Alle Logistik geregelt', 'Flexible Daten', 'Dedizierter Ansprechpartner', 'Beratungsgespräch vor der Reise'],
      en: ['Fully personalized itinerary', 'Hand-picked accommodation', 'Private guide (optional)', 'All logistics arranged', 'Flexible dates', 'Dedicated contact person', 'Pre-trip consultation call'],
    },
    notIncluded: {
      de: ['Internationale Flüge', 'Reiseversicherung', 'Persönliche Ausgaben'],
      en: ['International flights', 'Travel insurance', 'Personal expenses'],
    },
    itinerary: { de: [], en: [] },
  },
]

function PackageCard({ pkg, lang }: { pkg: typeof packages[0]; lang: string }) {
  const { t } = useTranslation()
  const [showItinerary, setShowItinerary] = useState(false)
  const l = lang === 'de' ? 'de' : 'en'

  const name = pkg.names[l as keyof typeof pkg.names] || pkg.names.en
  const tagline = pkg.taglines[l as keyof typeof pkg.taglines] || pkg.taglines.en
  const desc = pkg.descriptions[l as keyof typeof pkg.descriptions] || pkg.descriptions.en
  const included = pkg.included[l] || pkg.included.en
  const notIncluded = pkg.notIncluded[l] || pkg.notIncluded.en
  const itinerary = pkg.itinerary[l] || pkg.itinerary.en

  return (
    <div
      id={pkg.slug}
      className={cn(
        'rounded-2xl border overflow-hidden',
        pkg.highlight ? 'border-[oklch(0.32_0.08_155)] ring-2 ring-[oklch(0.32_0.08_155)]/15 shadow-xl' : 'border-border shadow-sm'
      )}
    >
      {pkg.highlight && (
        <div className="bg-[oklch(0.32_0.08_155)] text-white text-xs font-semibold text-center py-2 tracking-wide">
          ⭐ {lang === 'de' ? 'Empfohlen · Beliebtestes Paket' : 'Recommended · Most Popular'}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden h-64 lg:h-auto min-h-80">
          <img src={pkg.image} alt={name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 lg:bg-gradient-to-b lg:from-transparent lg:to-black/30" />
          {pkg.type !== 'custom' && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge className="bg-white/90 text-foreground flex items-center gap-1.5 text-xs font-semibold">
                <Clock className="w-3 h-3" />
                {pkg.duration} {t('common.days')}
              </Badge>
              <Badge className="bg-white/90 text-foreground flex items-center gap-1.5 text-xs font-semibold">
                <Users className="w-3 h-3" />
                1–12
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{name}</h2>
          <p className="text-sm font-medium text-[oklch(0.45_0.08_150)] mb-3 italic">{tagline}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{desc}</p>

          {/* Price */}
          <div className="mb-6">
            {pkg.price > 0 ? (
              <div>
                <span className="text-3xl font-bold text-foreground">€ {pkg.price.toLocaleString('de')}</span>
                <span className="text-sm text-muted-foreground ml-2">/ {t('packages.perPerson')}</span>
              </div>
            ) : (
              <div className="text-lg font-semibold text-muted-foreground">{t('packages.priceOnRequest')}</div>
            )}
          </div>

          {/* Included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('packages.included')}</h4>
              <ul className="space-y-1.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-[oklch(0.32_0.08_155)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t('packages.notIncluded')}</h4>
              <ul className="space-y-1.5">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto flex gap-2">
            <Button asChild size="lg" className="flex-1 font-semibold">
              <Link href={`/booking?package=${pkg.slug}`}>{t('packages.bookThis')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Itinerary accordion */}
      {itinerary.length > 0 && (
        <div className="border-t border-border">
          <button
            onClick={() => setShowItinerary(!showItinerary)}
            className="w-full flex items-center justify-between px-6 lg:px-8 py-4 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
          >
            <span>{t('packages.itinerary')}</span>
            {showItinerary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showItinerary && (
            <div className="px-6 lg:px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {itinerary.map((day) => (
                <div key={day.day} className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[oklch(0.32_0.08_155)] bg-[oklch(0.32_0.08_155)]/10 px-2 py-0.5 rounded-full">
                      {t('packages.day')} {day.day}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-foreground">{day.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{day.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function PackagesPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      {/* Page header */}
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            Georgia Soul Travels
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t('packages.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('packages.subtitle')}</p>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-10">
        {packages.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} lang={lang} />
        ))}
      </div>
    </main>
  )
}
