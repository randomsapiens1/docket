'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import Image from "next/image"
import { useLanguage } from '@/lib/language-context'
import { trackEvent } from '@/lib/analytics'
import Link from 'next/link'
import { serviceCategories } from '@/lib/services'

export function Hero() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const content = {
    en: {
      title: "From birth to death, all paperwork on one platform",
      description: "Get verified, step-by-step guidance for official processes in Bangladesh. From company registration to land transfers.",
      placeholder: "Search for a service...",
      searchAlt: "Search",
      noResults: "No services found matching your search.",
      quickSearch: {
        title: "Quick Search:",
        startBusiness: "Start a Business",
        tinCertificate: "TIN Certificate",
        visaPortal: "Scholarship & Visa Portal"
      }
    },
    bn: {
      title: "জন্ম থেকে মৃত্যু সব পেপারওয়ার্ক এক প্ল্যাটফর্মে",
      description: "বাংলাদেশের অফিসিয়াল প্রক্রিয়াসমূহের জন্য যাচাইকৃত ও ধাপে ধাপে নির্দেশিকা পান। কোম্পানি রেজিস্ট্রেশন থেকে শুরু করে ভূমি স্থানান্তর পর্যন্ত।",
      placeholder: "সেবাটি খুঁজুন...",
      searchAlt: "খুঁজুন",
      noResults: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সেবা পাওয়া যায়নি।",
      quickSearch: {
        title: "কুইক সার্চ:",
        startBusiness: "ব্যবসা শুরু",
        tinCertificate: "টিন সার্টিফিকেট",
        visaPortal: "স্কলারশিপ ও ভিসা পোর্টাল"
      }
    }
  }

  const { title, description, placeholder, searchAlt, noResults, quickSearch } = content[language]

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
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  return (
    <section className="pt-10 pb-14 sm:pt-32 sm:pb-40 lg:pt-48 lg:pb-60 min-h-[auto] sm:min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 bg-background relative z-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title Row - 60% width on desktop */}
        <div className="w-full lg:w-[60%] mb-6 sm:mb-8 relative z-10 space-y-3 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-pretty text-foreground leading-[1.15] sm:leading-[1.2]">
            {title}
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground text-pretty max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4 lg:gap-8">
          {/* Left Column: Search */}
          <div className="w-full lg:w-[45%] text-left relative z-40 order-last lg:order-first animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <div className="relative max-w-lg" ref={resultsRef}>
              <label htmlFor="search-services" className="sr-only">{placeholder}</label>
              <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-black/8 ring-1 ring-black/8 focus-within:ring-2 focus-within:ring-primary/50 focus-within:shadow-xl focus-within:shadow-primary/10 transition-all duration-200">
                <Search className="ml-4 w-5 h-5 text-gray-400 shrink-0" />
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
                  className="flex-1 px-3 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-gray-900 bg-transparent placeholder:text-gray-400 focus:outline-none w-full"
                  autoComplete="off"
                />
                <button className="bg-black hover:bg-gray-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 m-1.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-150 shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{searchAlt}</span>
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-2xl shadow-xl shadow-black/10 ring-1 ring-black/8 mt-2 max-h-[400px] overflow-y-auto z-50 overflow-hidden">
                  {query.trim() === '' && filteredServices.length > 0 && (
                    <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        {language === 'en' ? 'Trending Services' : 'জনপ্রিয় সেবা'}
                      </span>
                    </div>
                  )}
                  {filteredServices.length > 0 ? (
                    <ul className="divide-y divide-gray-50">
                      {filteredServices.map((service, idx) => (
                        <li key={idx}>
                          <Link
                            href={service.href}
                            onClick={() => {
                              setShowResults(false)
                              trackEvent('search', { search_term: service.name, category: service.category })
                            }}
                            className={`flex flex-col px-4 py-3.5 hover:bg-gray-50 transition-colors ${service.status === 'Soon' ? 'pointer-events-none opacity-50' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-base text-gray-900">{service.name}</span>
                              {service.status === 'Live' && <ArrowRight className="w-4 h-4 text-primary" />}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-gray-500">{service.category}</span>
                              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                                service.status === 'Live'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                {service.status}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-400 text-sm font-medium">
                      {noResults}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Search */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-400 mr-1">{quickSearch.title}</span>
              <Link
                href="/services/incorporate-a-private-company"
                onClick={() => trackEvent('click_quick_search', { label: 'Start a Business' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full ring-1 ring-black/10 shadow-sm hover:shadow-md hover:ring-primary/30 hover:bg-primary/5 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-150"
              >
                {quickSearch.startBusiness}
              </Link>
              <Link
                href="/services/register-for-tin"
                onClick={() => trackEvent('click_quick_search', { label: 'TIN Certificate' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full ring-1 ring-black/10 shadow-sm hover:shadow-md hover:ring-primary/30 hover:bg-primary/5 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-150"
              >
                {quickSearch.tinCertificate}
              </Link>
              <Link
                href="/services/scholarship-and-visa"
                onClick={() => trackEvent('click_quick_search', { label: 'Scholarship & Visa Portal' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full ring-1 ring-black/10 shadow-sm hover:shadow-md hover:ring-primary/30 hover:bg-primary/5 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-150"
              >
                {quickSearch.visaPortal}
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-end lg:-mt-48 mb-2 sm:mb-4 lg:mb-0 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative w-full max-w-[280px] sm:max-w-[420px] mx-auto lg:max-w-none">
              <Image
                src="/docket-hero.webp"
                alt="Docket Hero Illustration"
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 420px, 60vw"
                className="w-full h-auto object-contain max-h-[240px] sm:max-h-[400px] lg:max-h-[850px] lg:translate-x-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
