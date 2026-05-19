import config from '@payload-config'
import { getPayload } from 'payload'
import type { BlogPost, Media } from '@/payload-types'

export type BlogPostWithCover = BlogPost & {
  coverImage?: string | Media | null
}

export async function getPublishedBlogPosts(limit = 20) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blog-posts',
    depth: 1,
    limit,
    locale: 'de',
    fallbackLocale: 'en',
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs as BlogPostWithCover[]
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const payload = await getPayload({ config })
  const decodedSlug = decodeURIComponent(slug)
  const result = await payload.find({
    collection: 'blog-posts',
    depth: 1,
    limit: 1,
    locale: 'de',
    fallbackLocale: 'en',
    where: {
      and: [
        {
          or: [
            { slug: { equals: slug } },
            { slug: { equals: decodedSlug } },
          ],
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return (result.docs[0] || null) as BlogPostWithCover | null
}

export function getMediaURL(media: BlogPostWithCover['coverImage']) {
  if (!media || typeof media === 'string') return ''

  return media.url || ''
}

export function getTags(post: BlogPostWithCover) {
  return (post.tags || [])
    .map((item) => item?.tag)
    .filter((tag): tag is string => Boolean(tag))
}

export function getReadTime(post: BlogPostWithCover) {
  const contentText = JSON.stringify(post.content || '')
  const words = contentText.split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.ceil(words / 220))
}

