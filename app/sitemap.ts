import { MetadataRoute } from 'next'

const siteUrl = 'https://docket.bd'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/facilities', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/resources/templates', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/calculators/fee-calculator', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const servicePages = [
    '/services/passport',
    '/services/nid',
    '/services/register-for-tin',
    '/services/trade-license',
    '/services/incorporate-a-private-company',
    '/services/land-mutation',
    '/services/holding-tax',
    '/services/driving-license',
    '/services/birth-and-death-registration',
    '/services/trademark-and-patent',
    '/services/scholarship-and-visa',
  ]

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url: `${siteUrl}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...servicePages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
