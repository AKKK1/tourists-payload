import type { Metadata } from 'next'
import { BlogPage } from '@/views/BlogPage'

export const metadata: Metadata = {
  title: 'Georgia Travel Blog',
  description: 'Georgia travel guides, practical tips, routes and inspiration for your trip.',
}

export default function Page() {
  return <BlogPage />
}
