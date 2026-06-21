import { Header } from '@/components/landing/header'
import { PhaseBanner } from '@/components/landing/phase-banner'
import { Hero } from '@/components/landing/hero'
import { TaskTabs } from '@/components/landing/task-tabs'
import { LifeEventsSection } from '@/components/landing/life-events'
import { FacilitiesPreview } from '@/components/landing/facilities-preview'
import { TrustSection } from '@/components/landing/trust-section'
import { Footer } from '@/components/landing/footer'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <main className="bg-background pt-16">
      <Header />
      <PhaseBanner />
      <Hero />
      <TaskTabs />
      <LifeEventsSection />
      <FacilitiesPreview />
      <TrustSection />
      <Footer />
    </main>
  )
}
