import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'e-TIN Registration Guide Bangladesh | Docket',
  description: 'Complete guide to registering for a Tax Identification Number (TIN) in Bangladesh. Step-by-step instructions for individuals and companies via the NBR portal.',
  keywords: ['TIN registration Bangladesh', 'e-TIN NBR', 'income tax certificate', 'tax identification number', 'NBR portal guide', 'Bangladesh tax registration'],
}

export default function TINRegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
