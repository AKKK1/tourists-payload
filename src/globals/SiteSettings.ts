import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Georgia Soul Travels', localized: true },
    { name: 'defaultSeoTitle', type: 'text', localized: true },
    { name: 'defaultSeoDescription', type: 'textarea', localized: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsappUrl', type: 'text' },
    { name: 'address', type: 'text', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
