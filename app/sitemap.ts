import { MetadataRoute } from 'next'

const siteUrl = 'https://docket.bd'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage
    {
      url: siteUrl,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Core directories
    {
      url: `${siteUrl}/services`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/facilities`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/facilities?group=senior`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/facilities?group=youth`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/facilities?group=women`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${siteUrl}/resources/templates`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${siteUrl}/calculators/fee-calculator`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.65,
    },

    // High-traffic service guides
    {
      url: `${siteUrl}/services/passport`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/nid`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/register-for-tin`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/trade-license`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/incorporate-a-private-company`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // Standard service guides
    {
      url: `${siteUrl}/services/land-mutation`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/holding-tax`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/driving-license`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/birth-and-death-registration`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/services/trademark-and-patent`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/services/scholarship-and-visa`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // Company pages
    {
      url: `${siteUrl}/about`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // Legal (low crawl priority)
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
