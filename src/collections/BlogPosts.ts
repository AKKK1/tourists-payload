import type { CollectionConfig } from 'payload'

const georgianMap: Record<string, string> = {
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z', თ: 't', ი: 'i', კ: 'k', ლ: 'l', მ: 'm', ნ: 'n', ო: 'o', პ: 'p', ჟ: 'zh', რ: 'r', ს: 's', ტ: 't', უ: 'u', ფ: 'p', ქ: 'k', ღ: 'gh', ყ: 'q', შ: 'sh', ჩ: 'ch', ც: 'ts', ძ: 'dz', წ: 'ts', ჭ: 'ch', ხ: 'kh', ჯ: 'j', ჰ: 'h',
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split('')
    .map((char) => georgianMap[char] || char)
    .join('')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req }) => req.user ? true : { _status: { equals: 'published' } },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title. Use Latin letters, numbers, and hyphens for clean URLs.',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData, operation }) => {
            const currentValue = typeof value === 'string' ? value : ''
            const shouldRegenerate = operation === 'create' || !currentValue.trim()
            const source = shouldRegenerate && typeof siblingData?.title === 'string' ? siblingData.title : currentValue
            const next = slugify(source)
            return next || currentValue
          },
        ],
      },
    },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'authorName', type: 'text', defaultValue: 'Georgia Soul Travels' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'shareTitle', type: 'text', localized: true },
        { name: 'shareDescription', type: 'textarea', localized: true },
        { name: 'youtubeUrl', type: 'text' },
        { name: 'shareImages', type: 'upload', relationTo: 'media', hasMany: true },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
  versions: { drafts: true },
  timestamps: true,
}
