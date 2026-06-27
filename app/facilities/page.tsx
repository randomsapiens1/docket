'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { facilitiesData, CATEGORIES, AGE_GROUPS, AUDIENCES, Facility } from '@/lib/facilities'
import { Search, Filter, X, ArrowUpRight, GraduationCap, Coins, Activity, Sprout, Building, Users, RotateCcw, ChevronDown } from 'lucide-react'

const CATEGORY_ICONS: Record<string, any> = {
  financial: Coins,
  education: GraduationCap,
  healthcare: Activity,
  agriculture: Sprout,
  business: Building
}

const CATEGORY_COLORS: Record<string, string> = {
  financial: 'bg-amber-50 text-amber-700 ring-amber-200',
  education: 'bg-sky-50 text-sky-700 ring-sky-200',
  healthcare: 'bg-rose-50 text-rose-700 ring-rose-200',
  agriculture: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  business: 'bg-violet-50 text-violet-700 ring-violet-200',
}

const trans = {
  en: {
    heading: "Government Facilities & Benefits Finder",
    subheading: "Discover verified allowances, subsidies, grants, and support structures provided by the government of Bangladesh.",
    searchPlaceholder: "Search by keyword, title, or ministry...",
    allCategories: "All Categories",
    allAges: "All Age Groups",
    allAudiences: "All Beneficiaries",
    categoryLabel: "Category",
    ageLabel: "Age Group",
    audienceLabel: "Target Audience",
    ministry: "Ministry",
    benefits: "Benefits",
    eligibility: "Eligibility",
    applyButton: "Go to Official Portal",
    noResults: "No facilities found matching your current filter selections.",
    showingCount: (count: number) => `${count} facilities found`,
    resetFilters: "Reset Filters",
    filtersTitle: "Filters"
  },
  bn: {
    heading: "সরকারি সুবিধা ও ভাতা সন্ধানক",
    subheading: "বাংলাদেশের সরকারি ভাতা, ভর্তুকি, অনুদান ও সহায়তাসমূহ আপনার প্রোফাইল অনুযায়ী সহজে খুঁজে বের করুন।",
    searchPlaceholder: "কীওয়ার্ড, সুবিধা বা মন্ত্রণালয়ের নাম দিয়ে খুঁজুন...",
    allCategories: "সব বিভাগ",
    allAges: "সব বয়স গ্রুপ",
    allAudiences: "সব লক্ষ্যগ্রুপ",
    categoryLabel: "বিভাগ",
    ageLabel: "বয়স গ্রুপ",
    audienceLabel: "উপকারভোগী",
    ministry: "মন্ত্রণালয়",
    benefits: "সুবিধাসমূহ",
    eligibility: "যোগ্যতার শর্ত",
    applyButton: "অফিসিয়াল পোর্টালে যান",
    noResults: "আপনার ফিল্টার অনুযায়ী কোনো সরকারি সুবিধা পাওয়া যায়নি।",
    showingCount: (count: number) => `${count}টি সুবিধা পাওয়া গেছে`,
    resetFilters: "ফিল্টার রিসেট",
    filtersTitle: "ফিল্টারসমূহ"
  }
}

export const dynamic = 'force-dynamic'

export default function FacilitiesPage() {
  const { language } = useLanguage()
  const t = trans[language]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<string>('all')
  const [selectedAudience, setSelectedAudience] = useState<string>('all')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const group = params.get('group')
    if (group) {
      if (group === 'senior') setSelectedAge('senior')
      else if (group === 'youth') setSelectedAge('youth')
      else if (group === 'women') setSelectedAudience('women')
    }
  }, [])

  const items = facilitiesData[language]

  const filteredFacilities = useMemo(() => {
    return items.filter((item: Facility) => {
      const matchesSearch = searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.benefits.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.eligibility.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesAge = selectedAge === 'all' || item.ageGroups.includes(selectedAge as any)
      const matchesAudience = selectedAudience === 'all' || item.audiences.includes(selectedAudience as any)
      return matchesSearch && matchesCategory && matchesAge && matchesAudience
    })
  }, [items, searchQuery, selectedCategory, selectedAge, selectedAudience])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedAge('all')
    setSelectedAudience('all')
  }

  const isFiltered = searchQuery !== '' || selectedCategory !== 'all' || selectedAge !== 'all' || selectedAudience !== 'all'

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {language === 'en' ? 'Live Services' : 'লাইভ সেবা'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            {t.heading}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-3xl leading-relaxed">
            {t.subheading}
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8 items-start">

          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-5 space-y-6">
              {/* Header — toggle on mobile */}
              <button
                onClick={() => setFiltersOpen(o => !o)}
                className="lg:cursor-default w-full flex items-center justify-between"
              >
                <span className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                  <Filter className="w-4 h-4 text-primary" />
                  {t.filtersTitle}
                  {isFiltered && <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold">!</span>}
                </span>
                <div className="flex items-center gap-2">
                  {isFiltered && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleResetFilters() }}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">{t.resetFilters}</span>
                    </button>
                  )}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 lg:hidden ${filtersOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Filter body — hidden on mobile until toggled */}
              <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block space-y-6`}>

              {/* Category */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {t.categoryLabel}
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      selectedCategory === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t.allCategories}
                  </button>
                  {CATEGORIES[language].map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.value]
                    const isActive = selectedCategory === cat.value
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-150 ${
                          isActive
                            ? 'bg-primary/10 text-primary ring-1 ring-primary/25'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {Icon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-60" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Age Group */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {t.ageLabel}
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedAge('all')}
                    className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      selectedAge === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t.allAges}
                  </button>
                  {AGE_GROUPS[language].map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setSelectedAge(age.value)}
                      className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                        selectedAge === age.value
                          ? 'bg-primary/10 text-primary ring-1 ring-primary/25'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Audience */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {t.audienceLabel}
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedAudience('all')}
                    className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      selectedAudience === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t.allAudiences}
                  </button>
                  {AUDIENCES[language].map((aud) => (
                    <button
                      key={aud.value}
                      onClick={() => setSelectedAudience(aud.value)}
                      className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                        selectedAudience === aud.value
                          ? 'bg-primary/10 text-primary ring-1 ring-primary/25'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              </div>{/* end filter body */}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-5">

            {/* Search */}
            <div className="flex items-center bg-white rounded-2xl ring-1 ring-black/8 shadow-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-md transition-all duration-200 px-4 gap-3">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 py-3.5 text-sm font-medium text-gray-900 bg-transparent placeholder:text-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Count */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium text-gray-400">
                {t.showingCount(filteredFacilities.length)}
              </span>
            </div>

            {/* Cards */}
            {filteredFacilities.length > 0 ? (
              <div className="space-y-4">
                {filteredFacilities.map((fac) => {
                  const CatIcon = CATEGORY_ICONS[fac.category] || Users
                  const catColor = CATEGORY_COLORS[fac.category] || 'bg-gray-100 text-gray-600 ring-gray-200'
                  return (
                    <div
                      key={fac.id}
                      className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:ring-primary/15 transition-all duration-200 p-6 sm:p-8 flex flex-col gap-5 group"
                    >
                      {/* Tags row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${catColor}`}>
                          <CatIcon className="w-3 h-3" />
                          {CATEGORIES[language].find(c => c.value === fac.category)?.label}
                        </span>
                        {fac.ageGroups.map(age => (
                          <span
                            key={age}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                          >
                            {AGE_GROUPS[language].find(a => a.value === age)?.label}
                          </span>
                        ))}
                        {fac.audiences.map(aud => (
                          <span
                            key={aud}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-600 ring-1 ring-rose-200"
                          >
                            {AUDIENCES[language].find(a => a.value === aud)?.label}
                          </span>
                        ))}
                      </div>

                      {/* Title + Ministry */}
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 leading-snug">
                          {fac.title}
                        </h2>
                        <p className="text-xs text-gray-400 font-medium">
                          {t.ministry}: <span className="text-gray-600">{fac.ministry}</span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        {fac.description}
                      </p>

                      {/* Benefits + Eligibility */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-4 space-y-1.5 border-l-2 border-primary">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            {t.benefits}
                          </span>
                          <p className="text-sm font-medium text-gray-800 leading-snug">
                            {fac.benefits}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-1.5 border-l-2 border-gray-300">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            {t.eligibility}
                          </span>
                          <p className="text-sm font-medium text-gray-800 leading-snug">
                            {fac.eligibility}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex justify-end pt-1">
                        <a
                          href={fac.actionUrl}
                          target={fac.isExternal ? "_blank" : "_self"}
                          rel={fac.isExternal ? "noopener noreferrer" : ""}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-all duration-150 shadow-sm hover:shadow-md group/btn"
                        >
                          {t.applyButton}
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-150" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl ring-1 ring-black/8 ring-dashed p-14 text-center space-y-4">
                <p className="text-base font-medium text-gray-400">
                  {t.noResults}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t.resetFilters}
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
