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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Complete Land Mutation (Namjari) in Bangladesh',
  description: 'Step-by-step guide to transferring land ownership records via the e-Mutation portal and AC Land office in Bangladesh.',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'BDT', minValue: 1170, maxValue: 1170 },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Authority Mutation (If Applicable)', text: 'For leasehold properties (e.g., RAJUK, CDA, or NHA plots), obtain a Mutation Letter from the respective authority before applying to the land office.' },
    { '@type': 'HowToStep', position: 2, name: 'Online Application', text: 'Visit the e-Mutation portal and fill in the land details including District, Upazila, Mouza, and Plot numbers.' },
    { '@type': 'HowToStep', position: 3, name: 'Pay Initial Fees', text: 'Pay the initial application fee (৳20) and notice issuance fee (৳50) online via mobile banking.' },
    { '@type': 'HowToStep', position: 4, name: 'Verification & Investigation', text: 'The Union Land Assistant Officer (Tehsildar) will conduct a field investigation to verify possession and documents.' },
    { '@type': 'HowToStep', position: 5, name: 'Hearing at AC Land Office', text: 'You will receive an SMS with a hearing date. Attend with all original documents for verification by the AC (Land).' },
    { '@type': 'HowToStep', position: 6, name: 'Final Payment (DCR)', text: 'Once approved, pay the record correction fee (৳1,000) and ledger fee (৳100) online to generate the DCR.' },
    { '@type': 'HowToStep', position: 7, name: 'Download Khatian', text: 'After final payment, download your newly generated Khatian (Record of Rights) featuring a verifiable QR code.' },
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
