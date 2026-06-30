import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Directory',
  description: 'Step-by-step guides for every official government process in Bangladesh — passport, NID, TIN, trade license, company registration, and more.',
  keywords: ['Bangladesh government services', 'service directory Bangladesh', 'government process guide', 'official process Bangladesh'],
  openGraph: {
    title: 'Service Directory | Docket',
    description: 'Step-by-step guides for every official government process in Bangladesh.',
  },
  alternates: {
    canonical: 'https://docket.bd/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
