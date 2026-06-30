import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birth & Death Registration Guide Bangladesh',
  description: 'Step-by-step guide to registering births and deaths in Bangladesh. Online BRIS portal, Union Parishad registration, digital certificates, and correction process.',
  keywords: ['birth certificate Bangladesh', 'death certificate Bangladesh', 'BRIS portal', 'birth registration online Bangladesh', 'online birth certificate', 'union parishad birth registration'],
  openGraph: {
    title: 'Birth & Death Registration Guide Bangladesh | Docket',
    description: 'How to register births and deaths in Bangladesh — BRIS portal, documents, and digital certificates.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/birth-and-death-registration',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
