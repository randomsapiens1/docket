import { Header } from '@/components/landing/header'
import { PhaseBanner } from '@/components/landing/phase-banner'
import { Hero } from '@/components/landing/hero'
import { ServiceDirectory } from '@/components/landing/service-directory'
import { TrustSection } from '@/components/landing/trust-section'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

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
