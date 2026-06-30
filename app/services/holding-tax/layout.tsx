import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Holding Tax Assessment & Payment Guide Bangladesh',
  description: 'Step-by-step guide to holding tax assessment, registration, and online payment in Bangladesh. City corporation and Pourashava property tax explained.',
  keywords: ['holding tax Bangladesh', 'property tax Dhaka', 'DNCC holding tax', 'city corporation tax Bangladesh', 'holding tax online payment', 'property assessment Bangladesh'],
  openGraph: {
    title: 'Holding Tax Guide Bangladesh | Docket',
    description: 'How to pay holding (property) tax in Bangladesh — city corporation assessment, online payment, and disputes.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/holding-tax',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
