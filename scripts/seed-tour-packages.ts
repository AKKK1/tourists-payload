import 'dotenv/config'
import config from '../src/payload.config'
import { getPayload } from 'payload'

const packages = [
  {
    slug: 'basic-escape',
    sortOrder: 1,
    isFeatured: false,
    durationDays: 7,
    priceFromEUR: 890,
    packageType: 'fixed',
    difficultyLevel: 'easy',
    de: {
      title: 'Basic Escape',
      tagline: 'Ihr erster Vorgeschmack auf das echte Georgien.',
      description:
        'Sieben Tage, um abzuschalten, zu atmen und wirklich anzukommen. Von Tiflis in die Berge, durch Dorfer und zu Familienpensionen, wo Gastfreundschaft echt gelebt wird.',
      included: ['Flughafentransfer', '7 Nachte Unterkunft', 'Tagliches Fruhstuck', '2 gefuhrte Tagesausfluge', 'Bodentransport'],
      notIncluded: ['Internationale Fluge', 'Mittag- und Abendessen', 'Reiseversicherung', 'Personliche Ausgaben'],
      itinerary: [
        ['Ankunft in Tiflis', 'Flughafenabholung, Hotel-Check-in und Willkommensessen.'],
        ['Tiflis entdecken', 'Altstadt, Schwefelbader, Narikala-Festung und Seilbahn.'],
        ['Fahrt nach Kazbegi', 'Georgische Heerstrasse, Ananuri-Festung und Ankunft in Kazbegi.'],
        ['Kazbegi-Berge', 'Gergeti-Dreifaltigkeitskirche, Bergblick und lokales Mittagessen.'],
        ['Dorftag', 'Traditionelles Dorf, Begegnung mit lokaler Familie und Kochkurs.'],
        ['Ruckkehr nach Tiflis', 'Malerische Fahrt, Weinprobe und freier Nachmittag.'],
        ['Abreise', 'Fruhstuck und Transfer zum Flughafen.'],
      ],
    },
    en: {
      title: 'Basic Escape',
      tagline: 'Your first taste of authentic Georgia.',
      description:
        'Seven days to disconnect, breathe and truly arrive. From Tbilisi into the mountains, through villages and family guesthouses where hospitality is real.',
      included: ['Airport pickup and drop-off', '7 nights accommodation', 'Daily breakfast', '2 guided day tours', 'Ground transportation'],
      notIncluded: ['International flights', 'Lunch and dinners', 'Travel insurance', 'Personal expenses'],
      itinerary: [
        ['Arrival in Tbilisi', 'Airport pickup, hotel check-in and welcome dinner.'],
        ['Tbilisi Discovery', 'Old Tbilisi, sulfur baths, Narikala fortress and cable car.'],
        ['Drive to Kazbegi', 'Georgian Military Highway, Ananuri fortress and arrival in Kazbegi.'],
        ['Kazbegi Mountains', 'Gergeti Trinity Church, mountain views and local lunch.'],
        ['Village Day', 'Traditional village, local family visit and cooking class.'],
        ['Return to Tbilisi', 'Scenic drive, wine tasting and free afternoon.'],
        ['Departure', 'Breakfast and airport transfer.'],
      ],
    },
  },
  {
    slug: 'deep-georgia',
    sortOrder: 2,
    isFeatured: true,
    durationDays: 12,
    priceFromEUR: 1590,
    packageType: 'fixed',
    difficultyLevel: 'moderate',
    de: {
      title: 'Tiefes Georgien',
      tagline: 'Gehen Sie uber die Oberflache hinaus.',
      description:
        'Zwolf Tage tief eingetaucht in das georgische Leben: Tiflis, Kachetien, Swanetien, Hochland, Wein und alte Hohlenstadte.',
      included: ['Flughafentransfer', '11 Nachte Unterkunft', 'Fruhstuck taglich', 'Privater Van', 'Professioneller Guide', 'Weinprobe'],
      notIncluded: ['Internationale Fluge', 'Einige Mittagessen', 'Reiseversicherung', 'Optionale Aktivitaten'],
      itinerary: [
        ['Ankunft Tiflis', 'Flughafenwillkommen, Boutique-Hotel und Stadtspaziergang.'],
        ['Tiflis Tiefer Einblick', 'Altstadt, Kunstgalerien, Schwefelbezirk und Abendessen.'],
        ['Kachetisches Weintal', 'Familienweinguter und traditionelle Weinprobe.'],
        ['Kachetische Kloster', 'Bodbe, Sighnaghi und Blick auf das Alazani-Tal.'],
        ['Flug nach Swanetien', 'Mestia, Turme und Svan-Kultur.'],
        ['Swanetien-Wanderung', 'Gletscherweg und Mittagessen in der Wildnis.'],
        ['Swanetische Dorfer', 'Ushguli, alte Kirchen und Panoramablick.'],
        ['Ruckkehr nach Tiflis', 'Ruckflug und freier Nachmittag.'],
        ['Ranch und Hochland', 'Reiten, Lagerfeuer und Sternbeobachtung.'],
        ['Sudgeorgien', 'Vardzia-Hohlenstadt und Borjomi.'],
        ['Kultur und Handwerk', 'Galerien, Markt und Kochworkshop.'],
        ['Abschiedstag', 'Abschiedsbrunch und Flughafentransfer.'],
      ],
    },
    en: {
      title: 'Deep Georgia',
      tagline: 'Go beyond the surface.',
      description:
        'Twelve days immersed in Georgian life: Tbilisi, Kakheti, Svaneti, highlands, wine and ancient cave cities.',
      included: ['Airport transfer', '11 nights accommodation', 'Daily breakfast', 'Private van', 'Professional guide', 'Wine tasting'],
      notIncluded: ['International flights', 'Some lunches', 'Travel insurance', 'Optional activities'],
      itinerary: [
        ['Arrival Tbilisi', 'Airport welcome, boutique hotel and city walk.'],
        ['Tbilisi Deep Dive', 'Old town, art galleries, sulfur district and dinner.'],
        ['Kakheti Wine Valley', 'Family wineries and traditional wine tasting.'],
        ['Kakheti Monasteries', 'Bodbe, Signagi and Alazani valley views.'],
        ['Flight to Svaneti', 'Mestia, towers and Svan culture.'],
        ['Svaneti Hike', 'Glacier trail and lunch in the wild.'],
        ['Svaneti Villages', 'Ushguli, ancient churches and panoramic views.'],
        ['Return to Tbilisi', 'Flight back and free afternoon.'],
        ['Ranch and Highlands', 'Horse riding, campfire and stargazing.'],
        ['South Georgia', 'Vardzia cave city and Borjomi.'],
        ['Culture and Craft', 'Galleries, market and cooking workshop.'],
        ['Farewell Day', 'Farewell brunch and airport transfer.'],
      ],
    },
  },
  {
    slug: 'custom-soul-recovery',
    sortOrder: 3,
    isFeatured: false,
    durationDays: 0,
    priceFromEUR: 0,
    packageType: 'custom',
    difficultyLevel: 'easy',
    de: {
      title: 'Individuelle Seelen-Erholung',
      tagline: 'Ihr Georgien. Ihr Tempo. Ihre Geschichte.',
      description:
        'Fur Reisende, die wissen, was sie wollen, oder Hilfe beim Entdecken brauchen. Wir gestalten Ihre Reise von Grund auf.',
      included: ['Personalisiertes Reiseprogramm', 'Handverlesene Unterkunft', 'Flexible Daten', 'Dedizierter Ansprechpartner'],
      notIncluded: ['Internationale Fluge', 'Reiseversicherung', 'Personliche Ausgaben'],
      itinerary: [],
    },
    en: {
      title: 'Custom Soul Recovery Trip',
      tagline: 'Your Georgia. Your pace. Your story.',
      description:
        'For travelers who know what they want, or want help discovering it. We design your journey from scratch.',
      included: ['Personalized itinerary', 'Hand-picked accommodation', 'Flexible dates', 'Dedicated contact person'],
      notIncluded: ['International flights', 'Travel insurance', 'Personal expenses'],
      itinerary: [],
    },
  },
]

function localizedData(pkg: (typeof packages)[number], locale: 'de' | 'en') {
  const content = pkg[locale]

  return {
    title: content.title,
    tagline: content.tagline,
    description: content.description,
    included: content.included.map((item) => ({ item })),
    notIncluded: content.notIncluded.map((item) => ({ item })),
    itinerary: content.itinerary.map(([title, description], index) => ({
      day: index + 1,
      title,
      description,
    })),
  }
}

async function seed() {
  const payload = await getPayload({ config })

  for (const pkg of packages) {
    const existing = await payload.find({
      collection: 'tour-packages',
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: pkg.slug,
        },
      },
    })

    const baseData = {
      slug: pkg.slug,
      durationDays: pkg.durationDays,
      priceFromEUR: pkg.priceFromEUR,
      pricePerPerson: true,
      minGroupSize: 1,
      maxGroupSize: 12,
      difficultyLevel: pkg.difficultyLevel,
      packageType: pkg.packageType,
      isFeatured: pkg.isFeatured,
      isActive: true,
      sortOrder: pkg.sortOrder,
      ...localizedData(pkg, 'de'),
    }

    const doc =
      existing.docs[0] ||
      (await payload.create({
        collection: 'tour-packages',
        data: baseData as any,
        locale: 'de',
        overrideAccess: true,
      }))

    if (existing.docs[0]) {
      await payload.update({
        collection: 'tour-packages',
        id: doc.id,
        data: baseData as any,
        locale: 'de',
        overrideAccess: true,
      })
    }

    await payload.update({
      collection: 'tour-packages',
      id: doc.id,
      data: localizedData(pkg, 'en') as any,
      locale: 'en',
      overrideAccess: true,
    })

    console.log(`Seeded ${pkg.slug}`)
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
