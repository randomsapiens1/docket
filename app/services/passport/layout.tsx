import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Passport Application Guide Bangladesh',
  description: 'Complete step-by-step guide to applying for a Bangladesh passport (MRP & e-Passport). Requirements, fees, and online appointment booking explained.',
  keywords: ['Bangladesh passport', 'e-passport application', 'MRP passport Bangladesh', 'passport renewal Bangladesh', 'DIP online appointment'],
  openGraph: {
    title: 'Passport Application Guide Bangladesh | Docket',
    description: 'Complete guide to applying for a Bangladesh passport — MRP & e-Passport, online booking, fees, and documents.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/passport',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
