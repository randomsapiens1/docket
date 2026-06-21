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

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      {/* Breadcrumb Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#ff0000] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          {language === 'en' ? 'Back to Home' : 'হোমে ফিরে যান'}
        </Link>
      </div>

      {/* Full Services Directory Grid */}
      <div className="pb-24">
        <ServiceDirectory />
      </div>

      <Footer />
    </main>
  )
}
