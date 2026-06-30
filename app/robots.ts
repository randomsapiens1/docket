import { MetadataRoute } from 'next'

const siteUrl = 'https://docket.bd'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth', '/vault', '/auth/callback'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
