import { Header } from '@/components/landing/header'
import { PhaseBanner } from '@/components/landing/phase-banner'
import { Hero } from '@/components/landing/hero'
import { ServiceDirectory } from '@/components/landing/service-directory'
import { BusinessMatchmaker } from '@/components/calculators/business-matchmaker'
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
      <section id="matchmaker-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <BusinessMatchmaker />
        </div>
      </section>
      <TrustSection />
      <CTA />
      <Footer />
    </main>
  )
}
