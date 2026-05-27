"use client"

import { useTranslation } from 'react-i18next'
import { Leaf, Heart, Shield, Wine, TrendingDown, Smartphone } from 'lucide-react'

const reasons = [
  { key: 'reason1', Icon: Leaf },
  { key: 'reason2', Icon: Heart },
  { key: 'reason3', Icon: Shield },
  { key: 'reason4', Icon: Wine },
  { key: 'reason5', Icon: TrendingDown },
  { key: 'reason6', Icon: Smartphone },
]

export function WhyGeorgiaSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28 bg-[oklch(0.32_0.08_155)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            Georgia
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('whyGeorgia.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            {t('whyGeorgia.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ key, Icon }, i) => (
            <div
              key={key}
              className="group p-6 rounded-2xl bg-white/8 border border-white/12 hover:bg-white/12 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.14_68)]/20 flex items-center justify-center shrink-0 group-hover:bg-[oklch(0.72_0.14_68)]/30 transition-colors">
                  <Icon className="w-5 h-5 text-[oklch(0.85_0.12_68)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-white/30 font-mono">0{i + 1}</span>
                    <h3 className="font-semibold text-white text-base leading-snug">
                      {t(`whyGeorgia.${key}Title` as any)}
                    </h3>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {t(`whyGeorgia.${key}Desc` as any)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-14 text-center">
          <blockquote className="text-xl sm:text-2xl font-medium text-white/90 italic max-w-2xl mx-auto leading-relaxed">
            "Georgien ist nicht nur ein Reiseziel — es ist ein Gefühl."
          </blockquote>
          <p className="mt-3 text-sm text-white/50">— GeorgianSoul</p>
        </div>
      </div>
    </section>
  )
}
