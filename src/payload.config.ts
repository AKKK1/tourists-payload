import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage, commonPresets } from 'payload-storage-cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { BlogPosts } from './collections/BlogPosts'
import { BookingRequests } from './collections/BookingRequests'
import { Destinations } from './collections/Destinations'
import { FAQItems } from './collections/FAQItems'
import { MapMoments } from './collections/MapMoments'
import { Media } from './collections/Media'
import { Testimonials } from './collections/Testimonials'
import { TourPackages } from './collections/TourPackages'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudinaryEnabled = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    MapMoments,
    TourPackages,
    Destinations,
    BlogPosts,
    FAQItems,
    Testimonials,
    BookingRequests,
  ],
  globals: [SiteSettings],
  localization: {
    locales: [
      { code: 'de', label: 'Deutsch' },
      { code: 'en', label: 'English' },
      { code: 'ka', label: 'ქართული' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    ...(cloudinaryEnabled
      ? [
          cloudinaryStorage({
            cloudConfig: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
            },
            collections: {
              media: {
                folder: {
                  path: 'tourists',
                  enableDynamic: true,
                },
                transformations: {
                  default: {
                    quality: 'auto',
                    fetch_format: 'auto',
                  },
                  presets: commonPresets,
                  enablePresetSelection: true,
                  preserveOriginal: true,
                },
                resourceType: 'auto',
                deleteFromCloudinary: true,
              },
            },
          }),
        ]
      : []),
  ],
})

