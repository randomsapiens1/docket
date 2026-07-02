import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Setup & Company Registration in Bangladesh | Docket',
  description: 'Complete 9-step guide to starting a business in Bangladesh. From RJSC name clearance and incorporation to trade licenses, TIN, and VAT registration.',
  keywords: ['company registration Bangladesh', 'RJSC incorporation', 'trade license Dhaka', 'start business in Bangladesh', 'VAT registration BIN', 'private limited company setup'],
  alternates: {
    canonical: 'https://docket.bd/services/incorporate-a-private-company',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register a Private Limited Company in Bangladesh',
  description: 'Complete guide to incorporating a private limited company in Bangladesh via the RJSC portal, including name clearance, stamp duty, TIN, trade license, and VAT registration.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Search Entity Name', text: 'Use the Search Entity Names tool on the RJSC portal to ensure your proposed company name is not already in use.' },
    { '@type': 'HowToStep', position: 2, name: 'Name Clearance Certificate', text: 'Go to Pre-Registration Activities and apply for Name Clearance. This certificate is a prerequisite valid for 30 days.' },
    { '@type': 'HowToStep', position: 3, name: 'Pay Stamp Duty', text: 'Pay stamp duty at a designated bank (e.g., BRAC Bank). Fees depend on authorized share capital.' },
    { '@type': 'HowToStep', position: 4, name: 'Registration at RJSC', text: 'Under Registration, select Apply for Registration. Upload your MoA, AoA, and required forms (I, VI, IX, X, XII).' },
    { '@type': 'HowToStep', position: 5, name: 'Make a Company Seal', text: 'Once incorporated, procure an official company seal from any seal-making shop.' },
    { '@type': 'HowToStep', position: 6, name: 'Open a Bank Account', text: 'Open a corporate bank account. Foreign-owned companies must open a temporary Capital Remittance account before registration.' },
    { '@type': 'HowToStep', position: 7, name: 'Obtain a Trade License', text: 'Apply to the respective City Corporation or Municipal Corporation for a trade license.' },
    { '@type': 'HowToStep', position: 8, name: 'TIN Certificate', text: 'Register with the National Board of Revenue (NBR) to receive the company Tax Identification Number.' },
    { '@type': 'HowToStep', position: 9, name: 'VAT Registration', text: 'Apply for a Business Identification Number (BIN) via the Customs, Excise, and VAT Commission.' },
    { '@type': 'HowToStep', position: 10, name: 'BIDA Registration', text: 'Mandatory for industrial enterprises and foreign investors to access various licenses and incentives.' },
  ],
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
