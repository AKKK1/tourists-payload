"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FaqItem = {
  id: string
  question_en: string
  question_de: string
  question_ka: string
  answer_en: string
  answer_de: string
  answer_ka: string
  category: string
  sort_order: number
}

const fallbackFaqs: FaqItem[] = [
  { id: '1', question_en: 'Do I need a visa to visit Georgia?', question_de: 'Brauche ich ein Visum für Georgien?', question_ka: 'მჭირდება ვიზა?', answer_en: 'Citizens of Germany and most EU countries can enter Georgia visa-free for up to 1 year.', answer_de: 'Bürger aus Deutschland und den meisten EU-Ländern können visumfrei für bis zu 1 Jahr nach Georgien einreisen.', answer_ka: 'გერმანიის მოქალაქეებს ვიზა არ სჭირდებათ.', category: 'visa', sort_order: 1 },
  { id: '2', question_en: 'Is Georgia safe?', question_de: 'Ist Georgien sicher?', question_ka: 'საქართველო უსაფრთხოა?', answer_en: 'Yes. Georgia is consistently rated as one of the safest countries in Europe for travelers.', answer_de: 'Ja. Georgien wird regelmäßig als eines der sichersten Länder Europas für Reisende eingestuft. Die Kriminalitätsrate ist sehr niedrig.', answer_ka: 'დიახ, საქართველო ერთ-ერთი ყველაზე უსაფრთხო ქვეყანაა.', category: 'safety', sort_order: 2 },
  { id: '3', question_en: 'What currency is used?', question_de: 'Welche Währung wird verwendet?', question_ka: 'რა ვალუტა გამოიყენება?', answer_en: 'Georgian Lari (GEL). ATMs are widely available. EUR and USD are easily exchanged.', answer_de: 'Georgisches Lari (GEL). Geldautomaten sind weit verbreitet. EUR und USD werden problemlos getauscht.', answer_ka: 'ქართული ლარი (GEL).', category: 'practical', sort_order: 3 },
  { id: '4', question_en: 'What is included in the price?', question_de: 'Was ist im Preis enthalten?', question_ka: 'რა შედის ფასში?', answer_en: 'All packages include airport pickup, accommodation, breakfast, guided tours and transport. Flights are not included.', answer_de: 'Alle Pakete beinhalten: Flughafenabholung, Unterkunft, Frühstück, geführte Touren und Transport. Internationale Flüge sind nicht inbegriffen.', answer_ka: 'ყველა პაკეტში შედის: დახვედრა, განთავსება, საუზმე, გიდი.', category: 'pricing', sort_order: 4 },
  { id: '5', question_en: 'Can I cancel my booking?', question_de: 'Kann ich stornieren?', question_ka: 'შემიძლია გაუქმება?', answer_en: 'Free cancellation up to 30 days before departure. 50% refund 15-29 days before. No refund within 14 days.', answer_de: 'Kostenlose Stornierung bis 30 Tage vor Abreise. 50% Erstattung 15-29 Tage vorher. Keine Erstattung innerhalb von 14 Tagen.', answer_ka: 'გაუქმება უფასოა 30 დღით ადრე.', category: 'booking', sort_order: 5 },
  { id: '6', question_en: 'Best time to visit Georgia?', question_de: 'Beste Reisezeit?', question_ka: 'საუკეთესო პერიოდი?', answer_en: 'May–June and September–October are ideal. July–August is peak summer. Winter offers ski resorts.', answer_de: 'Mai–Juni und September–Oktober sind ideal — mildes Wetter, grüne Landschaften. Juli–August ist Hochsommer. Im Winter gibt es Skigebiete.', answer_ka: 'საუკეთესოა მაისი-ივნისი და სექტემბერი-ოქტომბერი.', category: 'planning', sort_order: 6 },
]

const categories = ['all', 'visa', 'safety', 'practical', 'pricing', 'booking', 'planning']

function FaqItem({ item, lang }: { item: FaqItem; lang: string }) {
  const [open, setOpen] = useState(false)
  const q = lang === 'de' ? item.question_de : lang === 'ka' ? item.question_ka : item.question_en
  const a = lang === 'de' ? item.answer_de : lang === 'ka' ? item.answer_ka : item.answer_en

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FaqPage() {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState<FaqItem[]>(fallbackFaqs)
  const [activeCategory, setActiveCategory] = useState('all')
  const lang = i18n.language

  const filtered = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)] mb-3 block">
            FAQ
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('faq.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                activeCategory === cat
                  ? 'bg-[oklch(0.32_0.08_155)] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              )}
            >
              {t(`faq.categories.${cat}` as any)}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-3 mb-14">
          {filtered.map((item) => (
            <FaqItem key={item.id} item={item} lang={lang} />
          ))}
        </div>

        {/* Still have questions */}
        <div className="bg-[oklch(0.32_0.08_155)]/5 border border-[oklch(0.32_0.08_155)]/20 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-foreground text-lg mb-2">
            {lang === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            {lang === 'de'
              ? 'Wir antworten gerne auf alle Ihre Fragen — schreiben Sie uns einfach.'
              : 'We\'re happy to answer all your questions — just write to us.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/booking">{t('common.contactUs')}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://wa.me/995599000000" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
