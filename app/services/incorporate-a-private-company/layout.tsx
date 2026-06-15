import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Setup & Company Registration in Bangladesh | Docket',
  description: 'Complete 9-step guide to starting a business in Bangladesh. From RJSC name clearance and incorporation to trade licenses, TIN, and VAT registration.',
  keywords: ['company registration Bangladesh', 'RJSC incorporation', 'trade license Dhaka', 'start business in Bangladesh', 'VAT registration BIN', 'private limited company setup'],
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
