import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Docket',
  description: 'How Docket collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-400">Last updated: June 28, 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Who We Are</h2>
              <p className="text-sm">
                Docket (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a platform that provides verified, step-by-step guidance for official government processes in Bangladesh. We are not affiliated with any government agency. Our registered address is in Dhaka, Bangladesh.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Information We Collect</h2>
              <p className="text-sm">We collect information you provide directly to us, including:</p>
              <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                <li>Account information (email address, name) when you sign up</li>
                <li>Documents and files you upload to your Document Vault</li>
                <li>Usage data such as pages visited and features used</li>
                <li>Device and browser information for security and performance</li>
              </ul>
              <p className="text-sm">We do not collect your National ID number, TIN, or any sensitive government credentials unless you explicitly upload them to your Vault.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. How We Use Your Information</h2>
              <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                <li>To provide, operate, and improve the Docket platform</li>
                <li>To personalize your experience and pre-fill checklists based on your Vault documents</li>
                <li>To send service-related communications (not marketing, unless you opt in)</li>
                <li>To detect and prevent fraud or abuse</li>
              </ul>
              <p className="text-sm">We never sell your personal data to third parties.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. Document Vault</h2>
              <p className="text-sm">
                Documents stored in your Vault are encrypted at rest and in transit using industry-standard AES-256 encryption. Only you can access your Vault documents. Docket staff do not have access to your document contents. You may delete any document or your entire Vault at any time from your account settings.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. Cookies and Analytics</h2>
              <p className="text-sm">
                We use cookies and similar technologies to keep you signed in, remember your language preference, and understand how the platform is used. We use privacy-respecting analytics that do not track you across other websites. You can disable cookies in your browser settings, though some features may not function correctly.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Data Sharing</h2>
              <p className="text-sm">We only share your data with:</p>
              <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                <li><strong>Service providers</strong> who help us operate the platform (e.g., cloud hosting, authentication), bound by strict data processing agreements</li>
                <li><strong>Legal authorities</strong> if required by Bangladeshi law or a valid court order</li>
              </ul>
              <p className="text-sm">We do not share your data with government portals or any third-party service you access through Docket links.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Data Retention</h2>
              <p className="text-sm">
                We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where retention is required by law.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Your Rights</h2>
              <p className="text-sm">You have the right to:</p>
              <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                <li>Access and download a copy of your data</li>
                <li>Correct inaccurate information in your account</li>
                <li>Delete your account and all associated data</li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>
              <p className="text-sm">To exercise these rights, contact us at <a href="mailto:privacy@docket.com.bd" className="text-primary hover:underline">privacy@docket.com.bd</a>.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">9. Security</h2>
              <p className="text-sm">
                We implement technical and organizational measures to protect your data, including TLS encryption for all data in transit, encrypted storage, and access controls. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">10. Changes to This Policy</h2>
              <p className="text-sm">
                We may update this policy from time to time. We will notify you of significant changes by posting a notice on the platform or by email. Continued use of Docket after changes take effect constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">11. Contact</h2>
              <p className="text-sm">
                For privacy-related questions or requests, contact us at:<br />
                <a href="mailto:privacy@docket.com.bd" className="text-primary hover:underline">privacy@docket.com.bd</a>
              </p>
            </div>

          </div>

          <div className="flex gap-4 text-sm">
            <Link href="/terms-of-service" className="font-medium text-primary hover:underline">
              Terms of Service →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
