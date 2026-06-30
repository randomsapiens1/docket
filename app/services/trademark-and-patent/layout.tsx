import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trademark & Patent Registration Guide Bangladesh',
  description: 'Step-by-step guide to registering a trademark or patent in Bangladesh. DPDT application process, fees, classes, and opposition periods explained.',
  keywords: ['trademark registration Bangladesh', 'patent Bangladesh', 'DPDT trademark', 'intellectual property Bangladesh', 'brand registration Bangladesh', 'trademark search Bangladesh'],
  openGraph: {
    title: 'Trademark & Patent Registration Guide Bangladesh | Docket',
    description: 'How to register a trademark or patent in Bangladesh — DPDT process, fees, and timelines.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/trademark-and-patent',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
