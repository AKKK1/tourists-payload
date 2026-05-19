import { getMediaURL, getPublishedBlogPosts, getReadTime, getTags } from '@/lib/payload-blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getPublishedBlogPosts(50)

    return Response.json({
      docs: posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        cover: getMediaURL(post.coverImage) || '',
        readTime: getReadTime(post),
        tags: getTags(post),
        date: post.publishedAt || post.createdAt,
      })),
    })
  } catch (error) {
    console.error(error)
    return Response.json({ docs: [] }, { status: 200 })
  }
}
