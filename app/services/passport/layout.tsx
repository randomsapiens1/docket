import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Passport Application Guide Bangladesh',
  description: 'Complete step-by-step guide to applying for a Bangladesh passport (MRP & e-Passport). Requirements, fees, and online appointment booking explained.',
  keywords: ['Bangladesh passport', 'e-passport application', 'MRP passport Bangladesh', 'passport renewal Bangladesh', 'DIP online appointment'],
  openGraph: {
    title: 'Passport Application Guide Bangladesh | Docket',
    description: 'Complete guide to applying for a Bangladesh passport — MRP & e-Passport, online booking, fees, and documents.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/passport',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for a Bangladesh e-Passport',
  description: 'Step-by-step guide to applying for a Bangladesh e-Passport via the Department of Immigration and Passports (DIP) portal.',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'BDT', minValue: 4025, maxValue: 10350 },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check Office Jurisdiction', text: 'Visit the e-Passport portal (epassport.gov.bd), enter your present and permanent address to locate your regional passport office.' },
    { '@type': 'HowToStep', position: 2, name: 'Submit Online Form', text: 'Register on the portal, fill out the application form with personal, parent, and emergency contact details exactly as written on NID.' },
    { '@type': 'HowToStep', position: 3, name: 'Pay Passport Fees', text: 'Select e-Passport page size (48 or 64 pages), validity (5 or 10 years), and delivery speed. Pay online via cards, MFS, or offline bank challan.' },
    { '@type': 'HowToStep', position: 4, name: 'Schedule Biometrics Slot', text: 'Log in to your account dashboard and select a date and time slot for physical biometric enrollment at your regional passport office.' },
    { '@type': 'HowToStep', position: 5, name: 'Attend Biometrics & Verification', text: 'Visit the passport office on your appointment date. Submit printed forms and challans, enroll fingerprints, iris scans, and facial photographs.' },
    { '@type': 'HowToStep', position: 6, name: 'Police Verification & Delivery', text: 'Special Branch (SB) police will verify your address details. Once verified and printed, you will receive an SMS to collect the passport.' },
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
