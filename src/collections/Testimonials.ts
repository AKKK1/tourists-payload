import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Content',
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorCountry', 'rating', 'isFeatured'],
  },
  access: {
    read: ({ req }) => req.user ? true : { isActive: { equals: true } },
  },
  fields: [
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorCountry', type: 'text' },
    { name: 'authorAvatar', type: 'upload', relationTo: 'media' },
    { name: 'rating', type: 'number', defaultValue: 5, min: 1, max: 5 },
    { name: 'content', type: 'textarea', required: true, localized: true },
    { name: 'package', type: 'relationship', relationTo: 'tour-packages' },
    { name: 'tourDate', type: 'text' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}
