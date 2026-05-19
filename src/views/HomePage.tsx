"use client"

import { useTranslation } from 'react-i18next'
import { HeroSection } from '@/components/sections/HeroSection'
import { DestinationTicker } from '@/components/sections/DestinationTicker'
import { PackagesPreview } from '@/components/sections/PackagesPreview'
import { WhyGeorgiaSection } from '@/components/sections/WhyGeorgiaSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BookingCTABanner } from '@/components/sections/BookingCTABanner'
import { SEO } from '@/components/SEO'

export function HomePage() {
  const { i18n } = useTranslation()

  return (
    <main>
      <SEO url="/" lang={i18n.language} />
      <HeroSection />
      <DestinationTicker />
      <PackagesPreview />
      <WhyGeorgiaSection />
      <TrustSection />
      <TestimonialsSection />
      <BookingCTABanner />
    </main>
  )
}
