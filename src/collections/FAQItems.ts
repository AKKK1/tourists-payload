import type { CollectionConfig } from 'payload'

export const FAQItems: CollectionConfig = {
  slug: 'faq-items',
  admin: {
    group: 'Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'isActive', 'sortOrder'],
  },
  access: {
    read: ({ req }) => req.user ? true : { isActive: { equals: true } },
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'textarea', required: true, localized: true },
    { name: 'category', type: 'text', defaultValue: 'general' },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}
