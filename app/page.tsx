import type { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { PhaseBanner } from '@/components/landing/phase-banner'
import { Hero } from '@/components/landing/hero'
import nextDynamic from 'next/dynamic'

const Features = nextDynamic(() => import('@/components/landing/features').then(mod => mod.Features), {
  loading: () => <div className="h-[300px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg my-8" />,
})
const ServiceDirectory = nextDynamic(() => import('@/components/landing/service-directory').then(mod => mod.ServiceDirectory), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg my-8" />,
})
const LifeEventsSection = nextDynamic(() => import('@/components/landing/life-events').then(mod => mod.LifeEventsSection), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg my-8" />,
})
const FacilitiesPreview = nextDynamic(() => import('@/components/landing/facilities-preview').then(mod => mod.FacilitiesPreview), {
  loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg my-8" />,
})
const TrustSection = nextDynamic(() => import('@/components/landing/trust-section').then(mod => mod.TrustSection), {
  loading: () => <div className="h-[200px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg my-8" />,
})
const Footer = nextDynamic(() => import('@/components/landing/footer').then(mod => mod.Footer), {
  loading: () => <div className="h-[300px] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg mt-8" />,
})

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://docket.bd',
  },
}


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Docket',
  url: 'https://docket.bd',
  description: 'Verified, step-by-step guidance for official government processes in Bangladesh.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://docket.bd/services?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function Page() {
  return (
    <main className="bg-background pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PhaseBanner />
      <Hero />
      <Features />
      <ServiceDirectory preview />
      <LifeEventsSection />
      <FacilitiesPreview />
      <TrustSection />
      <Footer />
    </main>
  )
}
