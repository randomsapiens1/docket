'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { trackEvent } from '@/lib/analytics'
import { serviceCategories } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Search, X,
  IdCard, Users, Briefcase, Building2, MapPin, Car,
  Receipt, GraduationCap, Plane, Zap
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const categoryMeta = [
  { icon: IdCard,        color: 'bg-blue-50 text-blue-600' },
  { icon: Users,         color: 'bg-rose-50 text-rose-600' },
  { icon: Briefcase,     color: 'bg-amber-50 text-amber-700' },
  { icon: Building2,     color: 'bg-emerald-50 text-emerald-700' },
  { icon: MapPin,        color: 'bg-orange-50 text-orange-600' },
  { icon: Car,           color: 'bg-sky-50 text-sky-600' },
  { icon: Receipt,       color: 'bg-purple-50 text-purple-600' },
  { icon: GraduationCap, color: 'bg-indigo-50 text-indigo-600' },
  { icon: Plane,         color: 'bg-teal-50 text-teal-600' },
  { icon: Zap,           color: 'bg-violet-50 text-violet-600' },
]

const categoryGifs = [
  '/document.gif',         // Identity & Personal Documents
  '/family.gif',           // Family & Life Events
  '/business-plan.gif',    // Business & Entrepreneurship
  '/soft-skills.gif',      // Employment & Career
  '/landscape.gif',        // Property & Land
  '/car.gif',              // Vehicles & Transportation
  '/growth.gif',           // Taxes & Finance
  '/life-skills.gif',      // Education
  '/travel.gif',           // Immigration & Travel
  '/house.gif',            // Housing & Utilities
]

const content = {
  en: {
    heading: 'Government Services Guide',
    subheading: 'Step-by-step guidance for every official government process in Bangladesh.',
    searchPlaceholder: 'Search services...',
    all: 'All categories',
    live: 'Live',
    soon: 'Soon',
    liveOf: 'live',
    noResults: 'No services match your search.',
    clearSearch: 'Clear search',
    servicesLive: 'services live',
    comingSoon: 'coming soon',
    trending: 'Trending Services',
    noSuggestions: 'No results found',
  },
  bn: {
    heading: 'সরকারি সেবা নির্দেশিকা',
    subheading: 'বাংলাদেশের প্রতিটি সরকারি প্রক্রিয়ার জন্য ধাপে ধাপে নির্দেশিকা।',
    searchPlaceholder: 'সেবা খুঁজুন...',
    all: 'সব বিভাগ',
    live: 'লাইভ',
    soon: 'শীঘ্রই',
    liveOf: 'লাইভ',
    noResults: 'কোনো সেবা পাওয়া যায়নি।',
    clearSearch: 'সার্চ মুছুন',
    servicesLive: 'সেবা লাইভ',
    comingSoon: 'শীঘ্রই আসছে',
    trending: 'জনপ্রিয় সেবা',
    noSuggestions: 'কোনো ফলাফল পাওয়া যায়নি',
  },
}

export default function ServicesPage() {
  const { language } = useLanguage()
  const t = content[language]
  const categories = serviceCategories[language]

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    const all = categories.flatMap(cat =>
      cat.items.flatMap(item => {
        if (item.subItems?.length) {
          return item.subItems.map(sub => ({ ...sub, category: cat.title }))
        }
        return [{ ...item, category: cat.title }]
      })
    )
    if (!q) return all.filter(s => s.status === 'Live').slice(0, 5)
    return all
      .filter(s => s.name.toLowerCase().includes(q))
      .slice(0, 7)
  }, [categories, query])

  const allLiveCount = useMemo(() => {
    let count = 0
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.subItems?.length) {
          item.subItems.forEach(sub => { if (sub.status === 'Live') count++ })
        } else {
          if (item.status === 'Live') count++
        }
      })
    })
    return count
  }, [categories])

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase()

    return categories.map((cat, idx) => {
      const flatItems = cat.items.flatMap(item => {
        if (item.subItems?.length) {
          const subs = q
            ? item.subItems.filter(s =>
                s.name.toLowerCase().includes(q) ||
                item.keywords?.some(k => k.toLowerCase().includes(q))
              )
            : item.subItems
          return subs
        }
        if (q && !item.name.toLowerCase().includes(q) && !item.keywords?.some(k => k.toLowerCase().includes(q))) {
          return []
        }
        return [item]
      })

      const liveCount = flatItems.filter(i => i.status === 'Live').length

      return { cat, idx, flatItems, liveCount }
    }).filter(({ flatItems, cat }) => {
      if (activeCategory && cat.title !== activeCategory) return false
      return flatItems.length > 0
    })
  }, [categories, query, activeCategory])

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Hero */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">

          <span className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            {allLiveCount} {t.servicesLive}
          </span>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              {t.heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              {t.subheading}
            </p>
          </div>

          {/* Search */}
          <div className="relative mt-2" ref={searchRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 text-base"
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setShowSuggestions(false) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-black/10 ring-1 ring-black/8 overflow-hidden z-50 text-left">
                <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {query.trim() ? (language === 'en' ? 'Results' : 'ফলাফল') : t.trending}
                  </span>
                </div>
                {suggestions.length > 0 ? (
                  <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {suggestions.map((s, i) => {
                      const isLive = s.status === 'Live'
                      return (
                        <li key={i}>
                          {isLive ? (
                            <Link
                              href={s.href}
                              onClick={() => {
                                setShowSuggestions(false)
                                trackEvent('search_suggestion_click', { service_name: s.name, category: s.category })
                              }}
                              className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors group"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{s.category}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                  {t.live}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform duration-150" />
                              </div>
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between px-4 py-3.5 opacity-45 cursor-default">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-500 truncate">{s.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{s.category}</p>
                              </div>
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 shrink-0 ml-3">
                                {t.soon}
                              </span>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="px-4 py-6 text-sm text-gray-400 text-center font-medium">{t.noSuggestions}</p>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Category filter strip */}
      <div className="bg-white border-t border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {t.all}
          </button>
          {categories.map((cat, idx) => {
            const meta = categoryMeta[idx] ?? categoryMeta[0]
            const Icon = meta.icon
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat.title
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {cat.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {visibleCategories.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-lg font-semibold text-gray-900">{t.noResults}</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(null) }}
              className="text-sm text-primary font-medium hover:underline"
            >
              {t.clearSearch}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleCategories.map(({ cat, idx, flatItems, liveCount }) => {
              const gif = categoryGifs[idx] ?? categoryGifs[0]

              return (
                <div
                  key={cat.title}
                  className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Card header */}
                  <div className="p-5 pb-4 border-b border-gray-100 flex items-start gap-4">
                    <Image
                      src={gif}
                      alt={cat.title}
                      width={56}
                      height={56}
                      className="w-14 h-14 shrink-0 object-contain"
                      unoptimized
                    />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{cat.title}</h3>
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/8 text-primary">
                          {liveCount} {t.liveOf}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>

                  {/* Service list */}
                  <ul className="p-3 space-y-0.5 flex-1">
                    {flatItems.map((item, i) => {
                      const isLive = item.status === 'Live'
                      return (
                        <li key={i}>
                          {isLive ? (
                            <Link
                              href={item.href}
                              onClick={() => trackEvent('click_service', { service_name: item.name, category: cat.title })}
                              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-all duration-150"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-primary group-hover:translate-x-0.5 transition-transform duration-150" />
                                <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors duration-150 truncate">
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 bg-primary/10 text-primary">
                                {t.live}
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl opacity-45">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-gray-300" />
                                <span className="text-sm font-medium text-gray-400 truncate">{item.name}</span>
                              </div>
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 bg-gray-100 text-gray-400">
                                {t.soon}
                              </span>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
