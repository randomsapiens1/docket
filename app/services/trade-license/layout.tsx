import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trade License Guide Bangladesh',
  description: 'Step-by-step guide to obtaining a trade license in Bangladesh. City Corporation and Pourashava applications, required documents, and renewal process.',
  keywords: ['trade license Bangladesh', 'trade license Dhaka', 'DNCC trade license', 'business license Bangladesh', 'trade license renewal', 'pourashava trade license'],
  openGraph: {
    title: 'Trade License Guide Bangladesh | Docket',
    description: 'How to get a trade license in Bangladesh — city corporation, documents, fees, and renewal.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/trade-license',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
