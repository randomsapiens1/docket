import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Docket',
  description: 'The terms and conditions governing your use of the Docket platform.',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            Back to Home
          </Link>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-400">Last updated: June 28, 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

            <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 text-sm text-amber-800">
              <strong>Important:</strong> Docket is an independent guidance platform. We are not affiliated with, endorsed by, or representing any Bangladesh government agency. All service links direct you to official government portals where you complete your applications directly.
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-sm">
                By accessing or using Docket (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform. These terms apply to all visitors, registered users, and others who access or use Docket.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Description of Service</h2>
              <p className="text-sm">
                Docket provides informational guidance, checklists, fee calculators, and document organization tools to help users navigate official government processes in Bangladesh. We do not submit applications on your behalf, act as a legal representative, or guarantee any government outcome.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. Accuracy of Information</h2>
              <p className="text-sm">
                We make every effort to keep guidance accurate and up to date. However, government procedures, fees, and requirements change frequently. You are responsible for verifying current requirements on official government portals before submitting any application. Docket is not liable for errors or omissions in our guidance content.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. User Accounts</h2>
              <p className="text-sm">
                You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:docket.bd@gmail.com" className="text-primary hover:underline">docket.bd@gmail.com</a> if you suspect unauthorized access.
              </p>
              <p className="text-sm">
                You must be at least 18 years old to create an account. By creating an account, you represent that you meet this requirement.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. Document Vault</h2>
              <p className="text-sm">
                The Document Vault allows you to upload and store copies of personal documents. You retain full ownership of all documents you upload. By uploading documents, you grant Docket a limited license to store and display them to you within the Platform. We do not use your documents for any other purpose.
              </p>
              <p className="text-sm">
                Do not upload documents belonging to others without their consent. You are solely responsible for the content you store in your Vault.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Prohibited Uses</h2>
              <p className="text-sm">You agree not to:</p>
              <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                <li>Use the Platform for any unlawful purpose or in violation of any Bangladeshi law</li>
                <li>Upload false, misleading, or fraudulent documents</li>
                <li>Attempt to gain unauthorized access to any part of the Platform or its infrastructure</li>
                <li>Scrape, crawl, or systematically extract data from the Platform</li>
                <li>Impersonate any person or entity</li>
                <li>Transmit malware, viruses, or any malicious code</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Third-Party Links</h2>
              <p className="text-sm">
                Docket contains links to official government websites and third-party services. These links are provided for your convenience. We have no control over those websites and are not responsible for their content, privacy practices, or availability. Visiting external links is at your own risk.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Disclaimer of Warranties</h2>
              <p className="text-sm">
                The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components. Use of the Platform is at your own risk.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">9. Limitation of Liability</h2>
              <p className="text-sm">
                To the maximum extent permitted by applicable law, Docket shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of revenue, or any government processing delays or rejections, arising out of or in connection with your use of the Platform.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">10. Intellectual Property</h2>
              <p className="text-sm">
                All content on the Platform — including text, design, graphics, and software — is owned by or licensed to Docket and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our prior written consent.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">11. Termination</h2>
              <p className="text-sm">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms. You may delete your account at any time from your account settings. Upon termination, your right to use the Platform ceases immediately.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">12. Governing Law</h2>
              <p className="text-sm">
                These Terms are governed by the laws of the People&apos;s Republic of Bangladesh. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">13. Changes to These Terms</h2>
              <p className="text-sm">
                We may update these Terms at any time. We will notify you of material changes by posting an updated version on the Platform. Your continued use of the Platform after changes are posted constitutes acceptance of the new Terms.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">14. Contact</h2>
              <p className="text-sm">
                For questions about these Terms, contact us at:<br />
                <a href="mailto:docket.bd@gmail.com" className="text-primary hover:underline">docket.bd@gmail.com</a>
              </p>
            </div>

          </div>

          <div className="flex gap-4 text-sm">
            <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
              Privacy Policy →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
