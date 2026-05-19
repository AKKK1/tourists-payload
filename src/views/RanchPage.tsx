"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features_de = [
  'Traditionelles georgisches Abendessen mit der Familie',
  'Reiten durch Hochlandwiesen (kein Vorwissen nötig)',
  'Begleitung zu lokalen Hirten und Schafherden',
  'Frische Produkte direkt vom Hof',
  'Nächte in rustikalem Guesthaus mit Kaminfeuer',
  'Wanderungen zu Wasserfällen und Gletschern',
  'Kein WLAN im Zimmer — volle Ruhe garantiert',
  'Transfer von und nach Tiflis oder Mestia',
]

const features_en = [
  'Traditional Georgian dinner with the family',
  'Horse riding through highland meadows (no experience needed)',
  'Accompanied visits to local shepherds and sheep herds',
  'Fresh products directly from the farm',
  'Nights in a rustic guesthouse with fireplace',
  'Hikes to waterfalls and glaciers',
  'No WiFi in rooms — complete peace guaranteed',
  'Transfer to and from Tbilisi or Mestia',
]

const experiences_de = [
  { title: 'Khinkali-Kochen', desc: 'Lernen Sie, wie georgische Teigtaschen von Hand geformt werden — mit der Hausherrin als Lehrerin.' },
  { title: 'Hirtenalltag', desc: 'Ein Tag mit lokalen Hirten in der Hochweide, 2.400 m. Echt, uninszeniert, unvergesslich.' },
  { title: 'Chacha-Brennen', desc: 'Begleiten Sie den traditionellen Destillationsprozess des georgischen Tresterbrandweins.' },
  { title: 'Naturwanderung', desc: 'Private geführte Wanderung zu den Gletscherzungen des großen Kaukasus — 3–6 Stunden je Wunsch.' },
]

const experiences_en = [
  { title: 'Khinkali cooking', desc: 'Learn how Georgian dumplings are shaped by hand — with the landlady as teacher.' },
  { title: 'Shepherd\'s daily life', desc: 'A day with local shepherds in the high pasture, 2,400m. Real, unstaged, unforgettable.' },
  { title: 'Chacha distilling', desc: 'Join the traditional distillation process of Georgian pomace brandy.' },
  { title: 'Nature hike', desc: 'Private guided hike to the glacier tongues of the Greater Caucasus — 3–6 hours as desired.' },
]

export function RanchPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const features = lang === 'de' ? features_de : features_en
  const experiences = lang === 'de' ? experiences_de : experiences_en

  return (
    <main className="pt-20">
      {/* Hero */}
      <div className="relative h-[65vh] min-h-[400px] overflow-hidden">
        <img
          src="/package-basic-escape.webp"
          alt={lang === 'de' ? 'Georgische Ranch' : 'Georgian Ranch'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              {lang === 'de' ? 'Besonderes Erlebnis' : 'Special Experience'}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              {lang === 'de' ? 'Ranch & Guesthouse-Erlebnis' : 'Ranch & Guesthouse Experience'}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {lang === 'de'
                ? 'Georgisches Landleben hautnah — Pferde, Feuer, Familien und die Stille der Berge.'
                : 'Georgian rural life up close — horses, fire, families and the silence of the mountains.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
              {lang === 'de' ? 'Das Konzept' : 'The Concept'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {lang === 'de' ? 'Kein Hotel. Eine Familie.' : 'Not a hotel. A family.'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {lang === 'de'
                  ? 'Unser Ranch- und Guesthaus-Erlebnis bringt Sie in die Bergregion Georgiens — zu Familien, die seit Generationen das gleiche Land bewirtschaften. Sie schlafen im Gästehaus der Familie, essen an ihrem Tisch und begleiten sie durch ihren Alltag.'
                  : 'Our ranch and guesthouse experience brings you to Georgia\'s mountain region — to families that have farmed the same land for generations. You sleep in the family guesthouse, eat at their table and accompany them through their daily life.'}
              </p>
              <p>
                {lang === 'de'
                  ? 'Das ist kein Performance-Tourismus. Die Familien empfangen echte Gäste — Sie sind kein Publikum, sondern Teilnehmer. Der Unterschied ist für alle spürbar.'
                  : 'This is not performance tourism. The families receive real guests — you are not an audience, but a participant. The difference is tangible for everyone.'}
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
            <img
              src="/guesthouse-dinner.webp"
              alt={lang === 'de' ? 'Georgisches Guesthaus-Dinner' : 'Georgian guesthouse dinner'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {lang === 'de' ? 'Was ist inklusive' : 'What is included'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <Check className="w-4 h-4 text-[oklch(0.32_0.08_155)] shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experiences */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {lang === 'de' ? 'Besondere Erlebnisse' : 'Special experiences'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-lg bg-[oklch(0.32_0.08_155)]/10 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-[oklch(0.32_0.08_155)]">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{exp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-muted/40 rounded-2xl p-8 lg:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {lang === 'de' ? 'Preise & Optionen' : 'Prices & Options'}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm font-medium text-foreground">
                    {lang === 'de' ? '2 Nächte (Kurzauszeit)' : '2 nights (short retreat)'}
                  </span>
                  <span className="font-bold text-[oklch(0.32_0.08_155)]">ab €280 p.P.</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm font-medium text-foreground">
                    {lang === 'de' ? '4 Nächte (Vollprogramm)' : '4 nights (full program)'}
                  </span>
                  <span className="font-bold text-[oklch(0.32_0.08_155)]">ab €490 p.P.</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium text-foreground">
                    {lang === 'de' ? '7 Nächte (Tiefe Verbindung)' : '7 nights (deep connection)'}
                  </span>
                  <span className="font-bold text-[oklch(0.32_0.08_155)]">ab €790 p.P.</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {lang === 'de'
                  ? '* Preise inkl. Unterkunft, Vollpension, Aktivitäten und Transfer. Exkl. Flug.'
                  : '* Prices incl. accommodation, full board, activities and transfer. Excl. flights.'}
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {lang === 'de'
                  ? 'Bereit für das authentischste Georgien-Erlebnis? Schreiben Sie uns — wir planen Ihren Aufenthalt gemeinsam.'
                  : 'Ready for the most authentic Georgia experience? Write to us — we\'ll plan your stay together.'}
              </p>
              <Button asChild size="lg">
                <Link href="/booking?package=ranch-experience">
                  {lang === 'de' ? 'Ranch-Aufenthalt anfragen' : 'Request ranch stay'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
