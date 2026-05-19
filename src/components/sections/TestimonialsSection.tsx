"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star } from 'lucide-react'

type Testimonial = {
  id: string
  author_name: string
  author_country: string
  rating: number
  content_en: string
  content_de: string
  content_ka: string
  tour_date: string
}

const fallbackTestimonials: Testimonial[] = [
  { id: '1', author_name: 'Klaus & Petra M.', author_country: 'Deutschland', rating: 5, content_de: 'Wir buchten die „Tiefes Georgien"-Tour und sie übertraf alle Erwartungen. Der Guide war außergewöhnlich, die Pensionen warm und einladend, und das Essen... unbeschreiblich. Georgien hat unsere Herzen gestohlen.', content_en: 'We booked the Deep Georgia tour and it completely exceeded our expectations.', content_ka: 'ჩვენ დავჯავშნეთ ღრმა საქართველოს ტური.', tour_date: 'September 2024' },
  { id: '2', author_name: 'Sarah L.', author_country: 'Österreich', rating: 5, content_de: 'Das Basic Escape war genau das, was ich nach monatelangem Stadtstress brauchte. Sieben Tage in den Bergen, frische Luft, ehrliches Essen und Menschen, denen es wirklich wichtig ist. Ich kam als anderer Mensch zurück.', content_en: 'The Basic Escape was exactly what I needed.', content_ka: 'Basic Escape ზუსტად ის იყო.', tour_date: 'Juli 2024' },
  { id: '3', author_name: 'Thomas H.', author_country: 'Schweiz', rating: 5, content_de: 'Wir organisierten unsere individuelle Reise für eine Gruppe von 6. Jedes Detail wurde perfekt gehandhabt. Das Ranch-Erlebnis war der Höhepunkt — Pferde, Lagerfeuer, Sterne. Einfach unvergesslich.', content_en: 'Organized our custom trip for a group of 6. Every detail handled perfectly.', content_ka: 'ინდივიდუალური ტური 6-კაციანი ჯგუფისთვის.', tour_date: 'August 2024' },
  { id: '4', author_name: 'Anna K.', author_country: 'Deutschland', rating: 5, content_de: 'Als Alleinreisende Frau fühlte ich mich völlig sicher und unglaublich gut betreut. Das Team war immer erreichbar, immer hilfsbereit. Georgien ist jetzt mein Lieblingsland.', content_en: 'As a solo female traveler, I felt completely safe and well looked after.', content_ka: 'როგორც ქალი-სოლო-მოგზაური, ვგრძნობდი სრულ უსაფრთხოებას.', tour_date: 'Juni 2024' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'fill-[oklch(0.72_0.14_68)] text-[oklch(0.72_0.14_68)]' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ item, lang }: { item: Testimonial; lang: string }) {
  const content = lang === 'de' ? item.content_de : lang === 'ka' ? item.content_ka : item.content_en

  const initials = item.author_name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow h-full">
      <StarRating rating={item.rating} />
      <p className="text-sm text-foreground leading-relaxed flex-1 italic">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="w-9 h-9 rounded-full bg-[oklch(0.32_0.08_155)]/10 flex items-center justify-center text-xs font-semibold text-[oklch(0.32_0.08_155)]">
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{item.author_name}</div>
          <div className="text-xs text-muted-foreground">
            {item.author_country} · {item.tour_date}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials)
  const lang = i18n.language

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            Reviews
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
