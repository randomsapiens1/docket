'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { ServiceDirectory } from '@/components/landing/service-directory'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export const dynamic = 'force-dynamic'

export default function ServicesPage() {
  const { language } = useLanguage()

  const content = {
    en: {
      back: 'Back to Home',
      heading: 'Service Directory',
      subheading: 'Step-by-step guidance for every official government process in Bangladesh.',
    },
    bn: {
      back: 'হোমে ফিরে যান',
      heading: 'সেবা ডিরেক্টরি',
      subheading: 'বাংলাদেশের প্রতিটি সরকারি প্রক্রিয়ার জন্য ধাপে ধাপে নির্দেশিকা।',
    }
  }

  const t = content[language]

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Page Hero */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors duration-150 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            {t.back}
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {t.heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
              {t.subheading}
            </p>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <ServiceDirectory />
      </div>

      <Footer />
    </main>
  )
}
