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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Trade License in Bangladesh',
  description: 'Step-by-step guide to obtaining a trade license from your City Corporation or Pourashava in Bangladesh.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit Digital Portal', text: 'Go to your respective City Corporation portal (e.g., Dhaka North or Dhaka South e-trade portal) or municipal e-service portal.' },
    { '@type': 'HowToStep', position: 2, name: 'Create Merchant Account', text: 'Register with your name, mobile number, and email. Verify using the mobile OTP sent to your phone.' },
    { '@type': 'HowToStep', position: 3, name: 'Fill Application Form', text: 'Select business type, category, capital size, and ward number. Provide the exact business name and address details.' },
    { '@type': 'HowToStep', position: 4, name: 'Upload Supporting Documents', text: 'Scan and upload your NID, photo, TIN, rent agreement, and incorporation certificate if applicable.' },
    { '@type': 'HowToStep', position: 5, name: 'Pay License Fees Online', text: 'Once initial processing is complete, pay the trade license fee, signboard tax, and VAT online via bKash, card, or internet banking.' },
    { '@type': 'HowToStep', position: 6, name: 'Download Digital License', text: 'Upon successful payment verification, download and print the digitally signed official Trade License certificate.' },
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
