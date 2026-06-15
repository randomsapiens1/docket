'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Calculator, FileText, ArrowRight, Zap } from 'lucide-react'
import Image from "next/image"
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { serviceCategories } from '@/lib/services'

export function Hero() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const content = {
    en: {
      title: "Government paperwork made easy",
      description: "Get verified, step-by-step guidance for official processes in Bangladesh. From company registration to land transfers.",
      placeholder: "Search for a service...",
      searchAlt: "Search",
      noResults: "No services found matching your search.",
      tools: {
        title: "Quick Tools:",
        calculator: "Fee Calculator",
        templates: "Templates",
        matchmaker: "Matchmaker"
      }
    },
    bn: {
      title: "সরকারি কাগজপত্র এখন আরো সহজ",
      description: "বাংলাদেশের অফিসিয়াল প্রক্রিয়াসমূহের জন্য যাচাইকৃত ও ধাপে ধাপে নির্দেশিকা পান। কোম্পানি রেজিস্ট্রেশন থেকে শুরু করে ভূমি স্থানান্তর পর্যন্ত।",
      placeholder: "সেবাটি খুঁজুন...",
      searchAlt: "খুঁজুন",
      noResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সেবা পাওয়া যায়নি।",
      tools: {
        title: "কুইক টুলস:",
        calculator: "ফি ক্যালকুলেটর",
        templates: "টেমপ্লেট",
        matchmaker: "ম্যাচমেকার"
      }
    }
  }

  const { title, description, placeholder, searchAlt, noResults, tools } = content[language]

  // Flatten all services for easier searching
  const allServices = serviceCategories[language].flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.title }))
  )

  const filteredServices = query.trim() === '' 
    ? allServices.filter(s => s.status === 'Live').slice(0, 3) // Suggest live services if empty
    : allServices.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase()) ||
        service.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
          <div className="w-full lg:w-[45%] text-left relative z-20">
            <div className="relative max-w-lg group" ref={resultsRef}>
              <label htmlFor="search-services" className="sr-only">{placeholder}</label>
              <div className="flex">
                <input
                  type="text"
                  id="search-services"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowResults(true)
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder={placeholder}
                  className="flex-1 px-5 py-4 text-xl font-medium text-black bg-white border-[3px] border-r-0 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 w-full"
                  autoComplete="off"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-7 py-4 flex items-center justify-center border-[3px] border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 shrink-0">
                  <Search className="w-7 h-7" />
                  <span className="sr-only">{searchAlt}</span>
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 bg-white border-[3px] border-black mt-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[400px] overflow-y-auto">
                  {query.trim() === '' && filteredServices.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50 border-b-2 border-gray-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {language === 'en' ? 'Trending Services' : 'জনপ্রিয় সেবা'}
                      </span>
                    </div>
                  )}
                  {filteredServices.length > 0 ? (
                    <ul className="divide-y-2 divide-gray-100">
                      {filteredServices.map((service, idx) => (
                        <li key={idx}>
                          <Link
                            href={service.href}
                            onClick={() => setShowResults(false)}
                            className={`flex flex-col p-4 hover:bg-gray-50 transition-colors ${service.status === 'Soon' ? 'pointer-events-none opacity-60' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-lg">{service.name}</span>
                              {service.status === 'Live' && <ArrowRight className="w-5 h-5 text-[#ff0000]" />}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold uppercase text-gray-500">{service.category}</span>
                              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${
                                service.status === 'Live' 
                                  ? 'bg-[#ff0000] text-white border-[#ff0000]' 
                                  : 'bg-gray-100 text-gray-500 border-gray-200'
                              }`}>
                                {service.status}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground font-medium">
                      {noResults}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Tools */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-sm font-bold text-gray-500 uppercase">{tools.title}</span>
              <Link 
                href="/calculators/fee-calculator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#ff0000]" />
                {tools.calculator}
              </Link>
              <Link 
                href="/resources/templates"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#ff0000]" />
                {tools.templates}
              </Link>
              <button 
                onClick={() => {
                  const el = document.getElementById('matchmaker-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <Zap className="w-4 h-4 text-[#ff0000]" />
                {tools.matchmaker}
              </button>
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
