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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register or Update a National ID Card (NID) in Bangladesh',
  description: 'Step-by-step guide to NID registration, corrections, and duplicate card requests via the Bangladesh Election Commission portal.',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'BDT', minValue: 230, maxValue: 575 },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Register on EC Portal', text: 'Go to the Election Commission NID services portal (services.nidw.gov.bd) and click Register. Enter your NID or Voter number.' },
    { '@type': 'HowToStep', position: 2, name: 'Facial Verification (NID Wallet)', text: 'Install the NID Wallet app on your smartphone, scan the QR code from the portal, and complete facial verification to secure your account.' },
    { '@type': 'HowToStep', position: 3, name: 'Select Change/Correction Request', text: 'Login, navigate to the Profile section, select Change or Correction, and update NID details or request a duplicate copy.' },
    { '@type': 'HowToStep', position: 4, name: 'Pay Processing Fees', text: 'Pay the required transaction fee online through mobile financial services (bKash, Rocket) or e-payment services.' },
    { '@type': 'HowToStep', position: 5, name: 'Upload Supporting Documents', text: 'Scan and upload appropriate certificates, deeds, utility bills, or the police GD copy as evidence for the changes.' },
    { '@type': 'HowToStep', position: 6, name: 'Download Digital NID Copy', text: 'Once Election Commission officials verify and approve your request, log in to download and print your newly updated NID.' },
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
