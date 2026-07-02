import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RJSC Fee Calculator | Business Registration Fees Bangladesh',
  description: 'Calculate official RJSC registration fees and stamp duties for Private/Public companies, Partnerships, and Societies in Bangladesh based on 2023 rates.',
  alternates: {
    canonical: 'https://docket.bd/calculators/fee-calculator',
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
