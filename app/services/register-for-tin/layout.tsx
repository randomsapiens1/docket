import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'e-TIN Registration Guide Bangladesh | Docket',
  description: 'Complete guide to registering for a Tax Identification Number (TIN) in Bangladesh. Step-by-step instructions for individuals and companies via the NBR portal.',
  keywords: ['TIN registration Bangladesh', 'e-TIN NBR', 'income tax certificate', 'tax identification number', 'NBR portal guide', 'Bangladesh tax registration'],
  alternates: {
    canonical: 'https://docket.bd/services/register-for-tin',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register for e-TIN in Bangladesh',
  description: 'Step-by-step guide to obtaining a Tax Identification Number (TIN) for individuals and businesses via the NBR e-TIN portal.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Create e-TIN Account', text: 'Visit the NBR e-TIN portal and register with a unique username, password, and security question.' },
    { '@type': 'HowToStep', position: 2, name: 'User Activation', text: 'An OTP will be sent to your mobile. Enter the code to activate your account for the first time.' },
    { '@type': 'HowToStep', position: 3, name: 'Taxpayer Purpose', text: 'Select the purpose (e.g., individual, company, firm) and the reason for obtaining a TIN (e.g., getting a trade license).' },
    { '@type': 'HowToStep', position: 4, name: 'Fill Application Form', text: 'Enter your personal/business details exactly as they appear on your NID or Incorporation Certificate.' },
    { '@type': 'HowToStep', position: 5, name: 'Verify & Submit', text: 'The system will verify your NID details with the National Election Commission database instantly.' },
    { '@type': 'HowToStep', position: 6, name: 'Download Certificate', text: 'Once verified, your TIN will be generated. You can download and print the certificate immediately.' },
  ],
}

export default function TINRegistrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
