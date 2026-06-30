import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Driving License Application Guide Bangladesh',
  description: 'Complete guide to applying for a driving license in Bangladesh. Learner\'s permit, professional license, BRTA requirements, fees, and renewal.',
  keywords: ['driving license Bangladesh', 'BRTA driving license', 'learner permit Bangladesh', 'driving test Bangladesh', 'driving license renewal', 'professional driving license'],
  openGraph: {
    title: 'Driving License Guide Bangladesh | Docket',
    description: 'How to apply for a driving license in Bangladesh — BRTA process, learner\'s permit, fees, and renewal.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/driving-license',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
