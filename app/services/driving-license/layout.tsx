import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Driving License Application Guide Bangladesh',
  description: 'Complete guide to applying for a driving license in Bangladesh. Learner\'s permit, professional license, BRTA requirements, fees, and renewal.',
  keywords: ['driving license Bangladesh', 'BRTA driving license', 'learner permit Bangladesh', 'driving test Bangladesh', 'driving license renewal', 'professional driving license'],
  openGraph: {
    title: 'Driving License Guide Bangladesh | Docket',
    description: 'How to apply for a driving license in Bangladesh — BRTA process, learner\'s permit, fees, and renewal.',
  },
  alternates: {
    canonical: 'https://docket.bd/services/driving-license',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for a Driving License in Bangladesh',
  description: 'Step-by-step guide to getting a driving license via the BRTA Service Portal — learner license, driving exam, and smart card license.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Register on BRTA Portal', text: 'Go to the BRTA Service Portal (bsp.brta.gov.bd) and register with your mobile number and NID details.' },
    { '@type': 'HowToStep', position: 2, name: 'Apply for Learner License', text: 'Submit your personal details, select license category (non-professional/professional), upload medical certificate, NID, and pay the learner fee online.' },
    { '@type': 'HowToStep', position: 3, name: 'Sit for Driving Exam', text: 'Download and print your learner card. Prepare and attend the driving exam (written, oral, and practical) at the selected test center on the scheduled date.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply for Smart Card License', text: 'Once you pass the exam, the result is updated online. Log in to your BSP account and submit the online application for a Smart Card Driving License.' },
    { '@type': 'HowToStep', position: 5, name: 'Biometrics Slot Booking', text: 'Pay the license fee online and schedule a slot for biometric enrollment (fingerprints, photo) at your local BRTA circle office.' },
    { '@type': 'HowToStep', position: 6, name: 'Enroll Biometrics & Track Delivery', text: 'Visit the BRTA office on the slot date for biometrics. Track your license processing status online; it will be delivered via post.' },
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
