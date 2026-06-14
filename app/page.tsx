import dynamic from 'next/dynamic'
import { Header } from '@/components/landing/header'
import { PhaseBanner } from '@/components/landing/phase-banner'
import { Hero } from '@/components/landing/hero'

const ServiceDirectory = dynamic(() => import('@/components/landing/service-directory').then(mod => mod.ServiceDirectory))
const TrustSection = dynamic(() => import('@/components/landing/trust-section').then(mod => mod.TrustSection))
const CTA = dynamic(() => import('@/components/landing/cta').then(mod => mod.CTA))
const Footer = dynamic(() => import('@/components/landing/footer').then(mod => mod.Footer))

export default function Page() {
  return (
    <main className="bg-background pt-16">
      <Header />
      <PhaseBanner />
      <Hero />
      <ServiceDirectory />
      <TrustSection />
      <CTA />
      <Footer />
    </main>
  )
}
