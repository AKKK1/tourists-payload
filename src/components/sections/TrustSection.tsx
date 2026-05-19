"use client"

import { useTranslation } from 'react-i18next'
import { Truck, Hop as Home, UserCheck, CreditCard } from 'lucide-react'

const stats = [
  { key: 'stat1', value: '200+' },
  { key: 'stat2', value: '8+' },
  { key: 'stat3', value: '12+' },
  { key: 'stat4', value: '3' },
]

const trustItems = [
  { key: 'transport', Icon: Truck },
  { key: 'accommodation', Icon: Home },
  { key: 'guide', Icon: UserCheck },
  { key: 'payment', Icon: CreditCard },
]

export function TrustSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: image + stats */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="/guesthouse-dinner.webp"
                alt="Georgian guesthouse experience"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map(({ key, value }) => (
                <div
                  key={key}
                  className="bg-background border border-border rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-[oklch(0.32_0.08_155)] mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {t(`trust.${key}` as any)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
              {t('trust.title')}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-5">
              {t('trust.subtitle')}
            </h2>

            <div className="space-y-3 mb-8">
              {trustItems.map(({ key, Icon }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[oklch(0.32_0.08_155)]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[oklch(0.32_0.08_155)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {t(`trust.${key}` as any)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promise box */}
            <div className="bg-background border border-[oklch(0.32_0.08_155)]/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.32_0.08_155)]" />
                <span className="text-sm font-semibold text-foreground">{t('trust.promise')}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('trust.promiseText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
