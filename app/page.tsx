import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { ProblemSection } from '@/components/landing/problem-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Features } from '@/components/landing/features'
import { TrustSection } from '@/components/landing/trust-section'
import { Roadmap } from '@/components/landing/roadmap'
import { WhoItsFor } from '@/components/landing/who-its-for'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

export default function Page() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <TrustSection />
      <Roadmap />
      <WhoItsFor />
      <CTA />
      <Footer />
    </main>
  )
}
