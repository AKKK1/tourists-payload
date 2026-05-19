"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Leaf, Shield, Wine, TrendingDown, Smartphone, Heart, Mountain, Sun, Utensils, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reasons = [
  {
    Icon: TrendingDown,
    color: 'text-[oklch(0.45_0.08_150)]',
    title_de: 'Günstig für Europäer',
    title_en: 'Affordable for Europeans',
    text_de: 'Georgien ist eines der günstigsten Länder Europas. Ein gutes Abendessen kostet 8–15€, eine Übernachtung im Guesthouse 20–50€. Ihr Budget geht viel weiter als in Westeuropa.',
    text_en: 'Georgia is one of the most affordable countries in Europe. A good dinner costs €8–15, a guesthouse stay €20–50. Your budget goes much further than in Western Europe.',
  },
  {
    Icon: Shield,
    color: 'text-[oklch(0.32_0.08_155)]',
    title_de: 'Extrem sicher',
    title_en: 'Extremely safe',
    text_de: 'Georgien gehört zu den sichersten Ländern für Touristen weltweit. Gewaltkriminalität ist extrem selten. Frauen reisen allein ohne Probleme. Das Sicherheitsgefühl ist besser als in vielen westeuropäischen Städten.',
    text_en: 'Georgia is among the safest countries for tourists worldwide. Violent crime is extremely rare. Women travel alone without problems. The sense of safety is better than in many Western European cities.',
  },
  {
    Icon: Leaf,
    color: 'text-[oklch(0.32_0.08_155)]',
    title_de: 'Unberührte Natur',
    title_en: 'Untouched nature',
    text_de: 'Fast 40% Georgiens sind Nationalparks oder Schutzgebiete. Die Landschaften reichen von subtropischen Wäldern am Schwarzen Meer bis zu 5.000-Meter-Gipfeln im Kaukasus — auf kleinstem Raum.',
    text_en: 'Almost 40% of Georgia is national parks or protected areas. Landscapes range from subtropical forests on the Black Sea to 5,000-meter peaks in the Caucasus — within a tiny space.',
  },
  {
    Icon: Wine,
    color: 'text-[oklch(0.72_0.14_68)]',
    title_de: '8.000 Jahre Weinkultur',
    title_en: '8,000 years of wine culture',
    text_de: 'Georgien ist die Wiege des Weins. Die Qvevri-Methode (Tongefäß-Fermentation) ist UNESCO-Kulturerbe. Amber Wine und natürlicher Wein — was in Europa gerade trendet, ist in Georgien seit Jahrtausenden normal.',
    text_en: 'Georgia is the cradle of wine. The Qvevri method (clay vessel fermentation) is UNESCO cultural heritage. Amber wine and natural wine — what\'s trending in Europe has been normal in Georgia for millennia.',
  },
  {
    Icon: Heart,
    color: 'text-red-500',
    title_de: 'Gastfreundschaft als Kulturgut',
    title_en: 'Hospitality as cultural treasure',
    text_de: 'Das georgische Konzept "Mgzavri" (Gast als Geschenk Gottes) ist keine Phrase — es ist gelebte Kultur. Ein georgischer Gastgeber gibt Ihnen sein Bestes, selbst wenn er wenig hat. Das erlebt man selten.',
    text_en: 'The Georgian concept "Mgzavri" (guest as a gift from God) is not a phrase — it\'s lived culture. A Georgian host gives you their best, even if they have little. That\'s a rare experience.',
  },
  {
    Icon: Smartphone,
    color: 'text-[oklch(0.55_0.1_180)]',
    title_de: 'Digital Detox möglich',
    title_en: 'Digital detox possible',
    text_de: 'In Swanetien, Tuschetien und Racha ist der Empfang schlecht oder inexistent. Das ist kein Bug — das ist das Feature. Die Stille dieser Orte ist ein Luxus, für den man in Europa sehr viel zahlen würde.',
    text_en: 'In Svaneti, Tusheti and Racha, signal is poor or nonexistent. That\'s not a bug — it\'s the feature. The silence of these places is a luxury you would pay a great deal for in Europe.',
  },
  {
    Icon: Mountain,
    color: 'text-[oklch(0.45_0.08_150)]',
    title_de: 'Echter Abenteuer-Tourismus',
    title_en: 'Real adventure tourism',
    text_de: 'Georgien ist noch nicht überlaufen. In Tusheti begegnen Sie auf mehrtägigen Wanderungen vielleicht 10 andere Wanderer. In Swanetien schlafen Sie in Häusern, die seit 500 Jahren stehen. Das ist echter Abenteuer-Tourismus.',
    text_en: 'Georgia is not yet overrun. In Tusheti you might meet 10 other hikers on multi-day treks. In Svaneti you sleep in houses that have stood for 500 years. That\'s real adventure tourism.',
  },
  {
    Icon: Utensils,
    color: 'text-[oklch(0.72_0.14_68)]',
    title_de: 'Eine der besten Küchen der Welt',
    title_en: 'One of the world\'s best cuisines',
    text_de: 'Georgische Küche ist für Europäer sofort zugänglich — Khachapuri (Käse-Brot), Khinkali (Teigtaschen), Badrijani (Auberginen mit Walnusspaste). Keine extremen Schärfen, Frische als Basis, Gewürze als Kunst.',
    text_en: 'Georgian cuisine is immediately accessible for Europeans — Khachapuri (cheese bread), Khinkali (dumplings), Badrijani (eggplant with walnut paste). No extreme spice, freshness as the base, spices as art.',
  },
  {
    Icon: Sun,
    color: 'text-[oklch(0.72_0.14_68)]',
    title_de: '300 Sonnentage im Jahr',
    title_en: '300 sunny days per year',
    text_de: 'Tiflis und Kachetien haben über 300 Sonnentage pro Jahr. Das Klima ist warm-mediterran, Regen hauptsächlich im Frühjahr. Ein perfektes Reiseziel für Europäer, die Sonne suchen.',
    text_en: 'Tbilisi and Kakheti have over 300 sunny days per year. The climate is warm-Mediterranean, rain mainly in spring. A perfect destination for Europeans seeking sunshine.',
  },
  {
    Icon: Globe,
    color: 'text-[oklch(0.55_0.1_180)]',
    title_de: 'Visafrei für EU-Bürger',
    title_en: 'Visa-free for EU citizens',
    text_de: 'Deutsche und EU-Bürger können ohne Visum für bis zu 1 Jahr in Georgien bleiben. Kein Antrag, keine Wartezeit, keine Gebühren. Einfach hinfahren.',
    text_en: 'Germans and EU citizens can stay in Georgia visa-free for up to 1 year. No application, no waiting time, no fees. Just go.',
  },
]

export function WhyGeorgiaPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/hero-svaneti.webp"
            alt="Georgia mountains"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[oklch(0.18_0.01_60)]/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            {lang === 'de' ? 'Warum Georgien?' : 'Why Georgia?'}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {lang === 'de'
              ? '10 Gründe, warum Georgien das beste Reiseziel Europas ist'
              : '10 reasons why Georgia is Europe\'s best travel destination'}
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">
            {lang === 'de'
              ? 'Ein Land, das alles hat — und noch niemand kennt. Bis jetzt.'
              : 'A country that has everything — and nobody knows yet. Until now.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Reasons grid */}
        <div className="space-y-8">
          {reasons.map(({ Icon, color, title_de, title_en, text_de, text_en }, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-muted-foreground/50 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {lang === 'de' ? title_de : title_en}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === 'de' ? text_de : text_en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div className="mt-16 bg-[oklch(0.32_0.08_155)] rounded-2xl p-8 lg:p-12 text-center">
          <p className="text-xl lg:text-2xl font-medium text-white leading-relaxed max-w-2xl mx-auto mb-8">
            {lang === 'de'
              ? '"Georgien ist das bestgehütete Reisegeheimnis Europas. Wer es einmal besucht hat, kommt wieder."'
              : '"Georgia is Europe\'s best-kept travel secret. Once you\'ve visited, you\'ll come back."'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/packages">
                {lang === 'de' ? 'Reisepakete ansehen' : 'View tour packages'}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/booking">
                {lang === 'de' ? 'Jetzt anfragen' : 'Request now'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
