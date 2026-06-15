'use client'

import { Search, Calculator } from 'lucide-react'
import Image from "next/image"
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function Hero() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Government paperwork made easy",
      description: "Get verified, step-by-step guidance for official processes in Bangladesh. From company registration to land transfers.",
      placeholder: "Search for a service...",
      searchAlt: "Search",
      tools: {
        title: "Quick Tools:",
        calculator: "Fee Calculator"
      }
    },
    bn: {
      title: "সরকারি কাগজপত্র এখন আরো সহজ",
      description: "বাংলাদেশের অফিসিয়াল প্রক্রিয়াসমূহের জন্য যাচাইকৃত ও ধাপে ধাপে নির্দেশিকা পান। কোম্পানি রেজিস্ট্রেশন থেকে শুরু করে ভূমি স্থানান্তর পর্যন্ত।",
      placeholder: "সেবাটি খুঁজুন...",
      searchAlt: "খুঁজুন",
      tools: {
        title: "কুইক টুলস:",
        calculator: "ফি ক্যালকুলেটর"
      }
    }
  }

  const { title, description, placeholder, searchAlt, tools } = content[language]

  return (
    <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title Row - 60% width on desktop */}
        <div className="w-full lg:w-[60%] mb-8 relative z-10 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-pretty text-foreground leading-[1.2]">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground text-pretty max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-end justify-between gap-2 lg:gap-8">
          {/* Left Column: Search */}
          <div className="w-full lg:w-[40%] text-left">
            <div className="relative max-w-lg group">
              <label htmlFor="search-services" className="sr-only">{placeholder}</label>
              <div className="flex">
                <input
                  type="text"
                  id="search-services"
                  placeholder={placeholder}
                  className="flex-1 px-5 py-4 text-xl font-medium text-black bg-white border-[3px] border-r-0 border-black focus:outline-none focus:ring-4 focus:yellow-400 w-full"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-7 py-4 flex items-center justify-center border-[3px] border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 shrink-0">
                  <Search className="w-7 h-7" />
                  <span className="sr-only">{searchAlt}</span>
                </button>
              </div>
            </div>

            {/* Quick Tools */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-bold text-gray-500 uppercase">{tools.title}</span>
              <Link 
                href="/calculators/fee-calculator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#ff0000]" />
                {tools.calculator}
              </Link>
            </div>
          </div>
...

          {/* Right Column: Image (Pulled up to overlap text, but bottom-aligned with search) */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-end lg:-mt-48">
            <div className="relative w-full max-w-[480px] mx-auto lg:max-w-none">
              <Image
                src="/docket-hero.webp"
                alt="Docket Hero Illustration"
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px] lg:max-h-[850px] lg:translate-x-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
