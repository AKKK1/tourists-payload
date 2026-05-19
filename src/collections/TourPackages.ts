import type { CollectionConfig } from 'payload'

export const TourPackages: CollectionConfig = {
  slug: 'tour-packages',
  admin: {
    group: 'Tourism',
    useAsTitle: 'title',
    defaultColumns: ['title', 'packageType', 'durationDays', 'priceFromEUR', 'isActive'],
  },
  access: {
    read: ({ req }) => req.user ? true : { isActive: { equals: true } },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'durationDays', type: 'number', defaultValue: 7 },
    { name: 'priceFromEUR', type: 'number', defaultValue: 0 },
    { name: 'pricePerPerson', type: 'checkbox', defaultValue: true },
    { name: 'minGroupSize', type: 'number', defaultValue: 1 },
    { name: 'maxGroupSize', type: 'number', defaultValue: 12 },
    {
      name: 'difficultyLevel',
      type: 'select',
      defaultValue: 'easy',
      options: ['easy', 'moderate', 'challenging', 'strenuous'],
    },
    {
      name: 'packageType',
      type: 'select',
      defaultValue: 'fixed',
      options: ['fixed', 'custom', 'group'],
    },
    {
      name: 'included',
      type: 'array',
      localized: true,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'notIncluded',
      type: 'array',
      localized: true,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'itinerary',
      type: 'array',
      localized: true,
      fields: [
        { name: 'day', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
  timestamps: true,
}
