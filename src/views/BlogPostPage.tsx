"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const blogPosts: Record<string, {
  slug: string
  title_de: string
  title_en: string
  cover: string
  readTime: number
  tags: string[]
  date: string
  content_de: string
  content_en: string
}> = {
  'svaneti-travel-guide': {
    slug: 'svaneti-travel-guide',
    title_de: 'Swanetien: Der ultimative Reiseführer für Ihren Bergurlaub',
    title_en: 'Svaneti: The Ultimate Travel Guide for Your Mountain Escape',
    cover: '/dest-svaneti.webp',
    readTime: 8,
    tags: ['Svaneti', 'Wandern', 'Natur'],
    date: '2025-03-15',
    content_de: `Swanetien ist nicht nur ein Reiseziel — es ist eine andere Welt. Wer die Grenze dieser abgelegenen Bergregion im Nordwesten Georgiens überquert, betritt ein Land, das von der Zeit fast vergessen wurde.

## Was ist Swanetien?

Swanetien ist eine Hochgebirgsregion in der Großen Kaukasuskette, bekannt für ihre mittelalterlichen Wehrtürme (Svan Towers), die noch heute in fast jedem Dorf stehen. Die Region liegt auf einer Höhe von 1.000 bis über 2.000 Metern und ist eines der am besten erhaltenen Beispiele mittelalterlicher georgischer Kultur.

## Die Highlights

**Ushguli** — Das höchste dauerhaft bewohnte Dorf Europas (2.200 m) mit über 20 erhaltenen Türmen. Ein UNESCO-Weltkulturerbe.

**Mestia** — Das Zentrum der Region. Von hier aus starten die meisten Wanderungen. Der Hauptort hat ein hervorragendes kleines Museum, Cafés und Guesthouses.

**Hatsvali & Tetnuldi** — Im Winter ein Skizentrum. Im Sommer starten von hier atemberaubende Wanderungen zu Gletschern.

## Wanderungen

Die bekannteste Route ist die **Mestia–Ushguli-Mehrtageswanderung** (4 Tage, ca. 60 km). Sie führt durch alpinen Wald, über Pässe mit Gletscherblick und durch authentische Dörfer, in denen man noch die traditionelle Svan-Gastfreundschaft erlebt.

Kürzere Optionen: Koruldi Lakes (Tagesausflug), Chalaadi Glacier (3 Stunden), Zuruldi-Panoramapfad.

## Beste Reisezeit

**Juni bis September** ist die ideale Wanderzeit. Im Oktober beginnt der erste Schnee auf den Pässen. Im Winter ist Ushguli oft von der Außenwelt abgeschnitten.

## Anreise

Entweder per Marschrutka-Bus von Kutaisi (ca. 5–6 Stunden) oder — komfortabler — mit einem privaten Transfer, wie wir ihn für unsere Gäste organisieren. Es gibt auch einen kleinen Flughafen in Mestia mit Flügen ab Tiflis.

## Unterkunft

Traditionelle Guesthouses sind die beste Wahl. Lokale Familien öffnen ihre Häuser und servieren selbst gemachte Svan-Küche: Kubdari (Fleischpie), Tashmijabi (Käsepüree) und den lokalen Svaneti-Salz-Würzmix, der in ganz Georgien berühmt ist.

## Unsere Empfehlung

Planen Sie mindestens **5–7 Tage** für Swanetien. Wer kommt und nur 2 Nächte bleibt, bereut es immer. Die Region braucht Zeit — und belohnt Geduld mit unvergesslichen Momenten.`,
    content_en: `Svaneti is not just a destination — it's another world. Crossing the border into this remote mountain region in northwestern Georgia means entering a land almost forgotten by time.

## What is Svaneti?

Svaneti is a high-mountain region in the Greater Caucasus range, famous for its medieval defense towers (Svan Towers) that still stand in almost every village. The region sits between 1,000 and over 2,000 meters altitude and is one of the best-preserved examples of medieval Georgian culture.

## The Highlights

**Ushguli** — The highest permanently inhabited village in Europe (2,200m) with over 20 preserved towers. A UNESCO World Heritage Site.

**Mestia** — The regional center. Most hikes start from here. The main town has an excellent small museum, cafes and guesthouses.

**Hatsvali & Tetnuldi** — A ski center in winter. In summer, breathtaking hikes to glaciers start from here.

## Hikes

The most famous route is the **Mestia–Ushguli multi-day hike** (4 days, ~60 km). It passes through alpine forest, over passes with glacier views, and through authentic villages where you experience traditional Svan hospitality.

Shorter options: Koruldi Lakes (day trip), Chalaadi Glacier (3 hours), Zuruldi panorama trail.

## Best Time to Visit

**June through September** is the ideal hiking season. In October the first snow begins on the passes. In winter, Ushguli is often cut off from the outside world.

## Getting There

Either by marshrutka bus from Kutaisi (~5–6 hours) or — more comfortably — with a private transfer as we arrange for our guests. There is also a small airport in Mestia with flights from Tbilisi.

## Accommodation

Traditional guesthouses are the best choice. Local families open their homes and serve homemade Svan cuisine: Kubdari (meat pie), Tashmijabi (cheese mash) and the local Svaneti salt spice mix famous throughout Georgia.

## Our Recommendation

Plan at least **5–7 days** for Svaneti. Those who come and stay only 2 nights always regret it. The region needs time — and rewards patience with unforgettable moments.`,
  },
  'georgian-wine-guide': {
    slug: 'georgian-wine-guide',
    title_de: 'Georgischer Wein: 8.000 Jahre in Einer Flasche',
    title_en: 'Georgian Wine: 8,000 Years in One Bottle',
    cover: '/dest-kakheti.webp',
    readTime: 6,
    tags: ['Wein', 'Kachetien', 'Kultur'],
    date: '2025-02-28',
    content_de: `Die Welt entdeckt gerade das älteste Weinland der Erde. Georgien macht Wein seit über 8.000 Jahren — und die Methoden, die heute hier angewandt werden, sind so alt wie die Geschichte selbst.

## Die Qvevri-Methode

Das Herzstück des georgischen Weins ist der **Qvevri** — ein eiförmiges Tongefäß, das in die Erde eingegraben wird. Der Wein fermentiert darin mit Schalen, Kernen und Stielen (Maische) für Monate. Das Ergebnis ist ein tanninhaltiger, orangefarbener Weißwein, der in der Weingastronomie der Welt gerade als "Amber Wine" Furore macht.

## Kachetien — Das Herz des georgischen Weins

Kachetien im Osten Georgiens ist die wichtigste Weinregion. Die Alazani-Ebene, flankiert von den Ausläufern des Großen Kaukasus und dem Kleinen Kaukasus, produziert die bekanntesten georgischen Rebsorten:

- **Rkatsiteli** — die Königin der weißen Trauben Georgiens
- **Saperavi** — die wichtigste rote Rebsorte, intensive Farbe und Tannine
- **Kisi** — für elegante Amber Wines
- **Mtsvane** — frisch und aromatisch

## Kleinwinzer abseits des Mainstreams

Die interessantesten Weine kommen nicht von den großen Kellereien, sondern von Kleinerzeugern in Dörfern wie **Signagi**, **Telavi** und **Kvareli**. Familienbetriebe, die ihre Weinberge seit Generationen bewirtschaften und Wein nach traditioneller Methode keltern.

## Weintourismus in Kachetien

Kombinieren Sie Weinverkostungen mit Klosterbesuchen. Das Kloster **Bodbe** und die Festungsstadt **Gremi** liegen mitten in den Weinbergen. Das **Château Mukhrani** bietet Führungen und Verkostungen in einem historischen Fürstenpalast.

## Unser Tipp

Besuchen Sie Kachetien zur **Weinlese im Oktober** — die Rtveli-Feier ist eines der lebendigsten Volksfeste Georgiens. Familien laden Fremde ein, gemeinsam zu ernten und zu feiern.`,
    content_en: `The world is just discovering the oldest wine country on earth. Georgia has been making wine for over 8,000 years — and the methods used here today are as old as history itself.

## The Qvevri Method

The heart of Georgian wine is the **Qvevri** — an egg-shaped clay vessel buried in the ground. Wine ferments in it with skins, seeds, and stems (pomace) for months. The result is a tannic, orange-colored white wine that is currently making waves in the world's wine scene as "Amber Wine."

## Kakheti — The Heart of Georgian Wine

Kakheti in eastern Georgia is the most important wine region. The Alazani Valley, flanked by the foothills of the Greater and Lesser Caucasus, produces the most famous Georgian grape varieties.

## Small Producers off the Beaten Path

The most interesting wines come not from the large wineries but from small producers in villages like **Sighnaghi**, **Telavi**, and **Kvareli**. Family operations that have farmed their vineyards for generations and ferment wine using traditional methods.

## Wine Tourism in Kakheti

Combine wine tastings with monastery visits. The **Bodbe Monastery** and fortified town of **Gremi** sit right in the middle of the vineyards.

## Our Tip

Visit Kakheti during the **grape harvest in October** — the Rtveli celebration is one of Georgia's most vibrant folk festivals. Families invite strangers to harvest and celebrate together.`,
  },
  'kazbegi-gergeti-hike': {
    slug: 'kazbegi-gergeti-hike',
    title_de: 'Die Wanderung zur Gergeti-Kirche: Alles, Was Sie Wissen Müssen',
    title_en: 'The Gergeti Trinity Church Hike: Everything You Need to Know',
    cover: '/dest-kazbegi.webp',
    readTime: 5,
    tags: ['Kazbegi', 'Wandern', 'Kirchen'],
    date: '2025-01-20',
    content_de: `Die Gergeti-Dreifaltigkeitskirche ist das ikonischste Bild Georgiens. Auf einem 2.170 Meter hohen Felsvorsprung, vor der Kulisse des 5.047 Meter hohen Mount Kazbek — dieses Bild kennt man. Wie man hinkommt, ist eine andere Frage.

## Die Route

**Start:** Stepantsminda (ehemals Kazbegi), 1.740 m
**Ziel:** Gergeti Trinity Church, 2.170 m
**Distanz:** ca. 6 km (hin und zurück)
**Höhenmeter:** ca. 430 m Aufstieg
**Zeit:** 2–4 Stunden je nach Tempo

Es gibt zwei Wege: einen direkten, steilen Pfad direkt vom Dorf aus (schwieriger, kürzer) und einen sanfteren Weg über die Brücke und dann den Hügel hinauf (empfohlen für alle Fitness-Level).

## Die Kirche

Die Dreifaltigkeitskirche (Tsminda Sameba) wurde im 14. Jahrhundert erbaut. Sie ist noch aktiv — Mönche leben und arbeiten dort. Beim Besuch bitte angemessene Kleidung (Schultern und Knie bedeckt). Der Eintritt ist kostenlos.

## Beste Zeit

**Morgens früh** (vor 9 Uhr) sind Sie meistens allein. Die Hauptsaison Juli–August ist voll. September–Oktober: perfektes Herbstlicht, weniger Besucher.

## Wichtige Hinweise

- Kein Hund erlaubt am Eingang
- Der Weg ist teilweise glatt bei Regen
- Wasser und Snacks mitbringen
- Wetterumschläge im Gebirge sind schnell — Regenjacke einpacken

## Kazbegi darüber hinaus

Wer mehr Zeit hat: Wanderung zum **Gveleti-Wasserfall**, Besuch der **Dariali-Schlucht** an der russischen Grenze oder ein Tag bei lokalen Hirtenfamilien im Hochgebirge.`,
    content_en: `Gergeti Trinity Church is Georgia's most iconic image. Perched on a 2,170-meter rocky spur against the backdrop of the 5,047-meter Mount Kazbek — this image is world-famous. How to get there is another question.

## The Route

**Start:** Stepantsminda (formerly Kazbegi), 1,740m
**Destination:** Gergeti Trinity Church, 2,170m
**Distance:** ~6 km (round trip)
**Elevation gain:** ~430m ascent
**Time:** 2–4 hours depending on pace

There are two paths: a direct, steep trail from the village (harder, shorter) and a gentler route over the bridge and then up the hill (recommended for all fitness levels).

## The Church

The Trinity Church (Tsminda Sameba) was built in the 14th century. It is still active — monks live and work there. Please dress appropriately when visiting (shoulders and knees covered). Entry is free.

## Best Time

**Early morning** (before 9am) you're usually alone. The peak season July–August is crowded. September–October: perfect autumn light, fewer visitors.

## Important Notes

- No dogs allowed at the entrance
- The path can be slippery in rain
- Bring water and snacks
- Mountain weather can change quickly — pack a rain jacket`,
  },
}

export function BlogPostPage({ slug }: { slug?: string }) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const post = slug ? blogPosts[slug] : null

  if (!post) {
    return (
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {lang === 'de' ? 'Artikel nicht gefunden' : 'Article not found'}
          </h1>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {lang === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const title = lang === 'de' ? post.title_de : post.title_en
  const content = lang === 'de' ? post.content_de : post.content_en

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const contentHtml = content
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-foreground mt-10 mb-4">${block.slice(3)}</h2>`
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((line) => {
          if (line.startsWith('- ')) {
            const parts = line.slice(2).split('**')
            const formatted = parts.map((p, i) => i % 2 === 1 ? `<strong>${p}</strong>` : p).join('')
            return `<li>${formatted}</li>`
          }
          return ''
        }).join('')
        return `<ul class="list-disc ml-6 space-y-1 text-muted-foreground leading-relaxed">${items}</ul>`
      }
      const withBold = block.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      return `<p class="text-muted-foreground leading-relaxed">${withBold}</p>`
    })
    .join('\n')

  return (
    <main className="pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <img src={post.cover} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <div className="flex gap-2 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">{title}</h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime} {lang === 'de' ? 'Min. Lesezeit' : 'min read'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose-sm space-y-5"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Back + CTA */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'de' ? 'Alle Artikel' : 'All Articles'}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/booking">
              {lang === 'de' ? 'Reise anfragen' : 'Request a trip'}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
