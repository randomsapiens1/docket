'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { TemplateLibrary } from '@/components/resources/template-library'
import { useLanguage } from '@/lib/language-context'
import { ArrowLeft, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { templates } from '@/lib/templates'

export default function TemplatesPage() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  
  const t = {
    en: {
      back: "Back to Home",
      title: "Legal & Operational Templates",
      desc: "Download verified document drafts for company registration, banking, and daily business operations in Bangladesh.",
      searchPlaceholder: "Search templates (e.g. MoA, Lease...)",
      all: "All Resources"
    },
    bn: {
      back: "হোমে ফিরে যান",
      title: "আইনি এবং অপারেশনাল টেমপ্লেট",
      desc: "বাংলাদেশে কোম্পানি নিবন্ধন, ব্যাংকিং এবং দৈনন্দিন ব্যবসায়িক কার্যক্রমের জন্য যাচাইকৃত ডকুমেন্ট ড্রাফট ডাউনলোড করুন।",
      searchPlaceholder: "টেমপ্লেট খুঁজুন (যেমন: MoA, চুক্তিপত্র...)",
      all: "সকল রিসোর্স"
    }
  }[language]

  const filteredTemplates = templates[language].filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#ff0000] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {/* Hero Section */}
        <div className="bg-white border-2 border-black p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight">
              {t.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              {t.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-black font-bold focus:bg-white outline-none rounded-none"
              />
            </div>
            <button className="h-14 px-8 bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <Filter className="w-5 h-5" />
              {language === 'en' ? 'Filter' : 'ফিল্টার'}
            </button>
          </div>
        </div>

        {/* Library */}
        <div className="bg-white border-2 border-black p-8 sm:p-12">
          <TemplateLibrary items={filteredTemplates} />
        </div>

        {/* Help Banner */}
        <div className="bg-[#ff0000] border-2 border-black p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-black">Can't find what you need?</h2>
            <p className="font-bold text-red-100">Our legal team can draft custom documents for any industry.</p>
          </div>
          <button className="px-8 py-4 bg-white text-black font-black border-2 border-black hover:bg-gray-100 transition-colors whitespace-nowrap">
            Contact Legal Team
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
