import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { BlogPostPage } from '@/views/BlogPostPage'
import { Button } from '@/components/ui/button'
import {
  getMediaURL,
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
  getReadTime,
  getTags,
  type BlogPostWithCover,
} from '@/lib/payload-blog'

export const revalidate = 60

type Args = {
  params: Promise<{ slug: string }>
}

type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  format?: number
  children?: LexicalNode[]
  listType?: string
}

function renderChildren(children?: LexicalNode[]) {
  return children?.map((child, index) => renderLexicalNode(child, index)) || null
}

function renderText(node: LexicalNode, key: React.Key) {
  let content: React.ReactNode = node.text || ''

  if (node.format && node.format & 1) {
    content = <strong>{content}</strong>
  }
  if (node.format && node.format & 2) {
    content = <em>{content}</em>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderLexicalNode(node: LexicalNode, key: React.Key): React.ReactNode {
  if (node.type === 'text') return renderText(node, key)

  if (node.type === 'heading') {
    const Tag = node.tag === 'h3' ? 'h3' : 'h2'
    const className = Tag === 'h3'
      ? 'mt-8 text-xl font-bold text-foreground'
      : 'mt-10 text-2xl font-bold text-foreground'
    return <Tag key={key} className={className}>{renderChildren(node.children)}</Tag>
  }

  if (node.type === 'list') {
    const ordered = node.listType === 'number'
    const Tag = ordered ? 'ol' : 'ul'
    return <Tag key={key} className="ml-6 list-disc space-y-2 text-muted-foreground">{renderChildren(node.children)}</Tag>
  }

  if (node.type === 'listitem') {
    return <li key={key} className="leading-relaxed">{renderChildren(node.children)}</li>
  }

  if (node.type === 'quote') {
    return <blockquote key={key} className="border-l-4 border-primary pl-4 text-lg italic text-muted-foreground">{renderChildren(node.children)}</blockquote>
  }

  if (node.children) {
    return <p key={key} className="leading-relaxed text-muted-foreground">{renderChildren(node.children)}</p>
  }

  return null
}

function RichText({ content, fallback }: { content: unknown; fallback?: string | null }) {
  const root = content as { root?: { children?: LexicalNode[] }; children?: LexicalNode[] } | null
  const children = root?.root?.children || root?.children || []
  const rendered = children.map((node, index) => renderLexicalNode(node, index)).filter(Boolean)

  if (!rendered.length) {
    if (fallback) {
      return <p className="text-lg leading-relaxed text-muted-foreground">{fallback}</p>
    }

    return <p className="text-muted-foreground">This post has no body content yet. Add text in the Content field in Payload admin and publish it again.</p>
  }

  return <div className="space-y-5">{rendered}</div>
}

function RelatedPostCard({ post }: { post: BlogPostWithCover }) {
  const cover = getMediaURL(post.coverImage) || '/dest-kazbegi.webp'

  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="h-36 overflow-hidden">
        <img src={cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground group-hover:text-primary">{post.title}</h3>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Georgia Travel Article',
      description: 'Read a Georgia travel guide from GeorgianSoul.',
    }
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || 'Read a Georgia travel guide from GeorgianSoul.',
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || undefined,
      images: getMediaURL(post.coverImage) ? [getMediaURL(post.coverImage)] : undefined,
    },
  }
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const post = await getPublishedBlogPostBySlug(slug)

  if (!post) {
    return <BlogPostPage slug={slug} />
  }

  const allPosts = await getPublishedBlogPosts(8)
  const relatedPosts = allPosts.filter((item) => item.id !== post.id).slice(0, 3)
  const cover = getMediaURL(post.coverImage) || '/dest-svaneti.webp'
  const tags = getTags(post)
  const readTime = getReadTime(post)
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <main className="pt-20">
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <img src={cover} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border-white/30 bg-white/20 text-xs text-white">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formattedDate}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {readTime} min read
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <RichText content={post.content} fallback={post.excerpt} />

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              All articles
            </Link>
          </Button>
          <Button asChild>
            <Link href="/booking">Request a trip</Link>
          </Button>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">More stories</p>
                <h2 className="mt-1 text-2xl font-bold text-foreground">Read next</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">All blog posts</Link>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((item) => <RelatedPostCard key={item.id} post={item} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

