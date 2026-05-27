"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Heart, Leaf, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  { key: 'value1', Icon: Heart, color: 'text-red-500' },
  { key: 'value2', Icon: Leaf, color: 'text-[oklch(0.32_0.08_155)]' },
  { key: 'value3', Icon: Users, color: 'text-[oklch(0.55_0.1_180)]' },
  { key: 'value4', Icon: Shield, color: 'text-[oklch(0.72_0.14_68)]' },
]

export function AboutPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/guesthouse-dinner.webp"
            alt="Georgian hospitality"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[oklch(0.18_0.01_60)]/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            GeorgianSoul
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">{t('about.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
              {lang === 'de' ? 'Unsere Geschichte' : 'Our Story'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {lang === 'de'
                ? 'Wir lieben Georgien. Wir teilen Georgien.'
                : 'We love Georgia. We share Georgia.'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('about.story')}</p>
              <p>
                {lang === 'de'
                  ? 'Wir sind keine große Tourismusagentur. Wir sind ein kleines Team aus Tbilisi, das jeden Gast persönlich begleitet — von der ersten Nachricht bis zum letzten Tag der Reise.'
                  : 'We are not a big tourism agency. We are a small team from Tbilisi that personally accompanies each guest — from the first message to the last day of the trip.'}
              </p>
              <p>
                {lang === 'de'
                  ? 'Für uns ist jede Reise einzigartig. Wir wählen unsere Partner, Unterkünfte und Routen sorgfältig — und wir empfehlen nur, was wir selbst lieben.'
                  : 'For us, every trip is unique. We carefully select our partners, accommodations and routes — and only recommend what we love ourselves.'}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="/dest-svaneti.webp"
                alt="Svaneti Georgia"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-[oklch(0.32_0.08_155)]">8+</div>
              <div className="text-xs text-muted-foreground font-medium">
                {lang === 'de' ? 'Jahre in Georgien' : 'Years in Georgia'}
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-[oklch(0.32_0.08_155)] rounded-2xl p-8 lg:p-12 text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            {t('about.mission')}
          </span>
          <p className="text-xl lg:text-2xl font-medium text-white leading-relaxed max-w-2xl mx-auto">
            {t('about.missionText')}
          </p>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">{t('about.values')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ key, Icon, color }) => (
              <div key={key} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground">{t(`about.${key}` as any)}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t('about.team')}</h2>
            <p className="text-muted-foreground">
              {lang === 'de' ? 'Echte Georgier. Leidenschaftliche Gastgeber.' : 'Real Georgians. Passionate hosts.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Giorgi Beridze', role: lang === 'de' ? 'Gründer & Chefführer' : 'Founder & Lead Guide', langs: 'DE / EN / KA' },
              { name: 'Nino Kvaratskhelia', role: lang === 'de' ? 'Reiseplanung & Kundenbetreuung' : 'Travel Planning & Guest Relations', langs: 'DE / EN' },
              { name: 'Luka Jgenti', role: lang === 'de' ? 'Fahrer & lokaler Experte' : 'Driver & Local Expert', langs: 'EN / KA' },
            ].map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.32_0.08_155)]/10 flex items-center justify-center text-lg font-bold text-[oklch(0.32_0.08_155)] shrink-0">
                  {member.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                  <div className="text-xs text-[oklch(0.45_0.08_150)] mt-1 font-medium">{member.langs}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {lang === 'de' ? 'Bereit, uns kennenzulernen?' : 'Ready to meet us?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {lang === 'de'
              ? 'Schreiben Sie uns — wir freuen uns auf Ihre Reiseideen.'
              : 'Write to us — we look forward to your travel ideas.'}
          </p>
          <Button asChild size="lg">
            <Link href="/booking">{t('common.contactUs')}</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
