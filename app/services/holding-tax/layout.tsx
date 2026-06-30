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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Pay Holding Tax in Bangladesh',
  description: 'Step-by-step guide to registering for and paying holding (property) tax via your City Corporation or Pourashava e-revenue portal in Bangladesh.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Online Registration & Application', text: 'Sign up on the official holding tax portal of your City Corporation or Pourashava and submit the new holding application form.' },
    { '@type': 'HowToStep', position: 2, name: 'Submit Valuation Documents', text: 'Upload copies of your approved building plan, mutation khatian, purchase deeds, and enter details of property floor area and usage type.' },
    { '@type': 'HowToStep', position: 3, name: 'Physical Verification by Inspector', text: 'A Revenue Inspector or Assistant Tax Officer will visit your property to verify building dimensions, number of floors, and usage type for tax calculation.' },
    { '@type': 'HowToStep', position: 4, name: 'Assessment & Holding Number Issuance', text: 'The tax department reviews the inspection report, calculates the annual rental valuation, sets the quarterly tax rate, and issues a unique Holding Number.' },
    { '@type': 'HowToStep', position: 5, name: 'Pay Holding Tax Online', text: 'Receive your tax challan/bill. Pay your quarterly or annual holding tax online via the e-revenue portal using mobile banking (bKash, Nagad) or bank cards.' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
