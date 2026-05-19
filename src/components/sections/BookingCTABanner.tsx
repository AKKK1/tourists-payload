"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BookingCTABanner() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-foreground">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/dest-kazbegi.webp"
          alt="Georgia mountains"
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[oklch(0.18_0.01_60)]/80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.85_0.12_68)] mb-4 block">
          {lang === 'de' ? 'Bereit für Georgien?' : 'Ready for Georgia?'}
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
          {lang === 'de'
            ? 'Ihre Reise beginnt mit einer Nachricht.'
            : 'Your journey starts with a message.'}
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
          {lang === 'de'
            ? 'Schreiben Sie uns. Wir antworten innerhalb von 24 Stunden und helfen Ihnen, die perfekte Reise zu gestalten.'
            : 'Write to us. We\'ll reply within 24 hours and help you design the perfect trip.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 font-semibold text-base gap-2"
          >
            <Link href="/booking">
              {t('common.bookNow')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent font-medium text-base"
          >
            <a href="https://wa.me/995599000000" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
