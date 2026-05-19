import type { CollectionConfig } from 'payload'

export const MapMoments: CollectionConfig = {
  slug: 'map-moments',
  admin: {
    group: 'Discovery Map',
    useAsTitle: 'title',
    defaultColumns: ['title', 'locationName', 'status', 'mediaType', 'createdAt'],
    components: {
      edit: {
        beforeDocumentControls: ['@/components/admin/MapMomentApprovalControls#MapMomentApprovalControls'],
      },
    },
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      if (req.user) return true

      return {
        status: {
          equals: 'approved',
        },
      }
    },
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'locationName',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Example: Bobnevi, Racha, Svaneti, hidden waterfall near Oni.',
      },
    },
    {
      name: 'coordinates',
      type: 'point',
      required: true,
      admin: {
        description: 'Stored as [longitude, latitude]. Filled automatically from location search.',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'photo',
      options: ['photo', 'video'],
      required: true,
    },
    {
      name: 'submittedByName',
      type: 'text',
    },
    {
      name: 'submittedByEmail',
      type: 'email',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: ['pending', 'approved', 'rejected'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}


