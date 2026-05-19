"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowDown, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const { t } = useTranslation()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-foreground">
      {/* Parallax background image */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <img
          src="/hero-svaneti.webp"
          alt="Svaneti towers in Georgian mountains"
          className="w-full h-[120%] object-cover object-center"
          fetchPriority="high"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Pre-headline badge */}
            <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-1.5">
              <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
                🇬🇪 Georgia Soul Travels
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              <span className="block animate-fade-up-1">{t('hero.headline1')}</span>
              <span className="block animate-fade-up-2 text-[oklch(0.82_0.12_70)]">
                {t('hero.headline2')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl animate-fade-up-3">
              {t('hero.subheadline')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold text-base shadow-lg"
              >
                <Link href="/packages">
                  {t('hero.cta')}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-medium text-base"
              >
                <Link href="/about">
                  <Play className="w-4 h-4 mr-1.5" />
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <ArrowDown className="w-4 h-4 text-white/50" />
      </div>
    </section>
  )
}
