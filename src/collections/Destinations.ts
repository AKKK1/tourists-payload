import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    group: 'Tourism',
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'isFeatured', 'isActive'],
  },
  access: {
    read: ({ req }) => req.user ? true : { isActive: { equals: true } },
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'region', type: 'text' },
    { name: 'shortDescription', type: 'textarea', localized: true },
    { name: 'description', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'bestSeason', type: 'text', localized: true },
    { name: 'latitude', type: 'number' },
    { name: 'longitude', type: 'number' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}
