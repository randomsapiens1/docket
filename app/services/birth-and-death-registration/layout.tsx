import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birth & Death Registration Guide Bangladesh',
  description: 'Step-by-step guide to registering births and deaths in Bangladesh. Online BRIS portal, Union Parishad registration, digital certificates, and correction process.',
  keywords: ['birth certificate Bangladesh', 'death certificate Bangladesh', 'BRIS portal', 'birth registration online Bangladesh', 'online birth certificate', 'union parishad birth registration'],
  openGraph: {
    title: 'Birth & Death Registration Guide Bangladesh | Docket',
    description: 'How to register births and deaths in Bangladesh — BRIS portal, documents, and digital certificates.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/birth-and-death-registration',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register a Birth or Death in Bangladesh',
  description: 'Step-by-step guide to obtaining a birth or death certificate in Bangladesh via the BDRIS portal and your local Union Parishad or City Corporation office.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit BDRIS Portal', text: 'Go to the official e-Birth and Death Registration portal (bdris.gov.bd) and choose Birth or Death registration application.' },
    { '@type': 'HowToStep', position: 2, name: 'Fill Application Form', text: 'Select your address (Country, Division, District, Upazila/City Corporation, Union/Ward) and fill in the applicant\'s details in both English and Bengali.' },
    { '@type': 'HowToStep', position: 3, name: 'Add Parents/Informant Details', text: 'Enter parent details and their respective NID numbers exactly as registered. For death registration, enter the informant\'s NID.' },
    { '@type': 'HowToStep', position: 4, name: 'Upload Supporting Documents', text: 'Scan and upload the hospital discharge card/medical certificate, photos, and address proof documents.' },
    { '@type': 'HowToStep', position: 5, name: 'Submit & Print Application', text: 'Verify all information, submit the form online, and print the generated application containing the Application ID.' },
    { '@type': 'HowToStep', position: 6, name: 'Office Submission & Fee Payment', text: 'Visit your local Union Parishad, Pourashava, or City Corporation office within 15 days with physical copies to pay the fee and collect the certificate.' },
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
