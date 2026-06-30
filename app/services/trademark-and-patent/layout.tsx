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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register a Trademark or Patent in Bangladesh',
  description: 'Step-by-step guide to filing a trademark, design, or patent application via the DPDT e-filing portal in Bangladesh.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Search DPDT Database', text: 'Run an online search in the DPDT database to ensure your logo, brand name, design, or patent is unique and not already registered.' },
    { '@type': 'HowToStep', position: 2, name: 'Register on DPDT Portal', text: 'Go to the DPDT e-filing portal, register an account, and verify with your details and mobile number.' },
    { '@type': 'HowToStep', position: 3, name: 'Submit e-Application', text: 'Select the appropriate filing type (Trademark, Design, Patent). Provide applicant profile, select classes, and enter descriptions.' },
    { '@type': 'HowToStep', position: 4, name: 'Pay Filing Fees Online', text: 'Complete the online fee payment via mobile banking or e-payment gateways, or attach the Treasury Challan copy.' },
    { '@type': 'HowToStep', position: 5, name: 'Journal Publication & Opposition', text: 'Upon passing exam, your application is published in the Trademark Journal. Anyone can file an opposition within 120 days of publication.' },
    { '@type': 'HowToStep', position: 6, name: 'Issuance of Certificate', text: 'If no opposition is received, or once resolved in your favor, DPDT issues your official Registration Certificate granting legal IP protection.' },
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
