"use client"

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type BlogCardPost = {
  id?: string
  slug: string
  title_de: string
  title_en: string
  excerpt_de: string
  excerpt_en: string
  cover: string
  readTime: number
  tags: string[]
  date: string
  source?: 'curated' | 'cms'
}

const curatedBlogPosts: BlogCardPost[] = [
  {
    slug: 'svaneti-travel-guide',
    title_de: 'Swanetien: Der ultimative Reiseführer für Ihren Bergurlaub',
    title_en: 'Svaneti: The Ultimate Travel Guide for Your Mountain Escape',
    excerpt_de: 'Swanetien ist nicht nur ein Reiseziel - es ist eine andere Welt. Uralte Türme, Gletscherwanderwege und eine Gastfreundschaft, die Sie vergessen lassen, wo Sie herkommen.',
    excerpt_en: 'Svaneti is not just a destination - it is another world. Ancient towers, glacier trails and a hospitality that makes you forget where you came from.',
    cover: '/dest-svaneti.webp',
    readTime: 8,
    tags: ['Svaneti', 'Wandern', 'Natur'],
    date: '2025-03-15',
    source: 'curated',
  },
  {
    slug: 'georgian-wine-guide',
    title_de: 'Georgischer Wein: 8.000 Jahre in Einer Flasche',
    title_en: 'Georgian Wine: 8,000 Years in One Bottle',
    excerpt_de: 'Die Welt entdeckt gerade das älteste Weinland der Welt. Amber Wine, Qvevri-Methode und Weingüter, die noch niemand kennt - hier ist Ihr Einstieg.',
    excerpt_en: 'The world is just discovering the oldest wine country in the world. Amber wine, Qvevri method and wineries nobody knows yet - here is your guide.',
    cover: '/dest-kakheti.webp',
    readTime: 6,
    tags: ['Wein', 'Kachetien', 'Kultur'],
    date: '2025-02-28',
    source: 'curated',
  },
  {
    slug: 'kazbegi-gergeti-hike',
    title_de: 'Die Wanderung zur Gergeti-Kirche: Alles, Was Sie Wissen Müssen',
    title_en: 'The Gergeti Trinity Church Hike: Everything You Need to Know',
    excerpt_de: 'Die Gergeti-Dreifaltigkeitskirche ist das ikonischste Bild Georgiens. Wie man hinkommt, wann man geht und was Sie erwartet - ein ehrlicher Reisebericht.',
    excerpt_en: 'Gergeti Trinity Church is Georgia\'s most iconic image. How to get there, when to go and what awaits you - an honest travel report.',
    cover: '/dest-kazbegi.webp',
    readTime: 5,
    tags: ['Kazbegi', 'Wandern', 'Kirchen'],
    date: '2025-01-20',
    source: 'curated',
  },
]

function BlogCard({ post, featured, lang }: { post: BlogCardPost; featured?: boolean; lang: string }) {
  const { t } = useTranslation()
  const title = lang === 'de' ? post.title_de : post.title_en
  const excerpt = lang === 'de' ? post.excerpt_de : post.excerpt_en

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl lg:grid-cols-2"
      >
        <div className="relative h-64 overflow-hidden lg:h-auto">
          <img
            src={post.cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-foreground lg:text-3xl">{title}</h2>
          <p className="mb-5 leading-relaxed text-muted-foreground">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readTime} {t('blog.minRead')}
            </div>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[oklch(0.32_0.08_155)] group-hover:underline">
              {t('blog.readMore')}
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.cover}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-[oklch(0.32_0.08_155)]">{title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {post.readTime} {t('blog.minRead')}
          </div>
          <span className="text-xs font-medium text-[oklch(0.32_0.08_155)]">{t('blog.readMore')}</span>
        </div>
      </div>
    </Link>
  )
}

export function BlogPage() {
  const { t, i18n } = useTranslation()
  const [cmsPosts, setCmsPosts] = useState<BlogCardPost[]>([])
  const [visibleCount, setVisibleCount] = useState(3)
  const lang = i18n.language

  useEffect(() => {
    let cancelled = false

    fetch('/site-api/blog-posts')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return
        const mapped = (data.docs || [])
          .filter((post: any) => !curatedBlogPosts.some((curated) => curated.slug === post.slug))
          .map((post: any) => ({
            id: post.id,
            slug: post.slug,
            title_de: post.title,
            title_en: post.title,
            excerpt_de: post.excerpt || '',
            excerpt_en: post.excerpt || '',
            cover: post.cover || '/dest-svaneti.webp',
            readTime: post.readTime || 4,
            tags: post.tags?.length ? post.tags : ['Georgia'],
            date: post.date || new Date().toISOString(),
            source: 'cms' as const,
          }))
        setCmsPosts(mapped)
      })
      .catch(() => setCmsPosts([]))

    return () => {
      cancelled = true
    }
  }, [])

  const posts = useMemo(() => [...curatedBlogPosts, ...cmsPosts], [cmsPosts])
  const visiblePosts = posts.slice(0, visibleCount)
  const [featuredPost, ...gridPosts] = visiblePosts
  const hasMore = visibleCount < posts.length

  return (
    <main className="pt-20">
      <div className="border-b border-border bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.45_0.08_150)]">Blog</span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{t('blog.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('blog.subtitle')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {featuredPost && (
          <div className="mb-12">
            <BlogCard post={featuredPost} featured lang={lang} />
          </div>
        )}

        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {gridPosts.map((post) => <BlogCard key={post.slug} post={post} lang={lang} />)}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" onClick={() => setVisibleCount((count) => count + 3)}>
              Show more
            </Button>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">
            {lang === 'de' ? 'Inspiriert? Planen Sie Ihre Reise.' : 'Inspired? Plan your trip.'}
          </p>
          <Button asChild size="lg">
            <Link href="/packages">{t('nav.packages')}</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

