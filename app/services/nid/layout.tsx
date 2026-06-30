import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NID Card Registration & Smart Card Guide Bangladesh',
  description: 'Step-by-step guide to registering for a National Identity Card (NID) in Bangladesh. Online voter registration, smart NID correction, and re-issuance explained.',
  keywords: ['NID Bangladesh', 'national ID card Bangladesh', 'smart NID', 'voter registration Bangladesh', 'NID correction', 'EC Bangladesh'],
  openGraph: {
    title: 'NID Card Registration Guide Bangladesh | Docket',
    description: 'Complete guide to NID registration, smart card application, and corrections in Bangladesh.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/nid',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
