import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Land Mutation (Namjari) Guide Bangladesh',
  description: 'Step-by-step guide to land mutation (Namjari) in Bangladesh. Transfer land ownership records at the AC Land office — required documents, fees, and timelines.',
  keywords: ['land mutation Bangladesh', 'Namjari Bangladesh', 'AC Land office', 'land ownership transfer Bangladesh', 'khatian mutation', 'land record Bangladesh'],
  openGraph: {
    title: 'Land Mutation (Namjari) Guide Bangladesh | Docket',
    description: 'How to complete land mutation (Namjari) in Bangladesh — AC Land office, documents, and timeline.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/land-mutation',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
