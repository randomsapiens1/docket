'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { facilitiesData, CATEGORIES, AGE_GROUPS, AUDIENCES, Facility } from '@/lib/facilities'
import { Search, Filter, X, ArrowUpRight, GraduationCap, Coins, Activity, Sprout, Building, Users } from 'lucide-react'

const CATEGORY_ICONS: Record<string, any> = {
  financial: Coins,
  education: GraduationCap,
  healthcare: Activity,
  agriculture: Sprout,
  business: Building
}

const trans = {
  en: {
    heading: "Government Facilities & Benefits Finder",
    subheading: "Discover verified allowances, subsidies, grants, and support structures provided by the government of Bangladesh.",
    searchPlaceholder: "Search by keyword, title, or ministry...",
    allCategories: "All Categories",
    allAges: "All Age Groups",
    allAudiences: "All Beneficiaries",
    categoryLabel: "Filter by Category",
    ageLabel: "Filter by Age Group",
    audienceLabel: "Target Audience",
    ministry: "Ministry/Department",
    benefits: "Benefits Provided",
    eligibility: "Eligibility Criteria",
    applyButton: "Go to Official Portal",
    noResults: "No facilities found matching your current filter selections.",
    showingCount: (count: number) => `Showing ${count} government facilities`,
    resetFilters: "Reset All Filters",
    filtersTitle: "Filters Finder"
  },
  bn: {
    heading: "সরকারি সুবিধা ও ভাতা সন্ধানক",
    subheading: "বাংলাদেশের সরকারি ভাতা, ভর্তুকি, অনুদান ও সহায়তাসমূহ আপনার প্রোফাইল অনুযায়ী সহজে খুঁজে বের করুন।",
    searchPlaceholder: "কীওয়ার্ড, সুবিধা বা মন্ত্রণালয়ের নাম দিয়ে খুঁজুন...",
    allCategories: "সব বিভাগ",
    allAges: "সব বয়স গ্রুপ",
    allAudiences: "সব লক্ষ্যগ্রুপ",
    categoryLabel: "বিভাগ অনুযায়ী ফিল্টার",
    ageLabel: "বয়স অনুযায়ী ফিল্টার",
    audienceLabel: "উপকারভোগী গ্রুপ",
    ministry: "মন্ত্রণালয়/দপ্তর",
    benefits: "প্রদেয় সুবিধাসমূহ",
    eligibility: "যোগ্যতার শর্তাবলী",
    applyButton: "অফিসিয়াল পোর্টালে যান",
    noResults: "আপনার ফিল্টার অনুযায়ী কোনো সরকারি সুবিধা পাওয়া যায়নি।",
    showingCount: (count: number) => `${count}টি সরকারি সুবিধা পাওয়া গেছে`,
    resetFilters: "সব ফিল্টার রিসেট করুন",
    filtersTitle: "ফিল্টারসমূহ"
  }
}

export const dynamic = 'force-dynamic'

export default function FacilitiesPage() {
  const { language } = useLanguage()
  const t = trans[language]

  // Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<string>('all')
  const [selectedAudience, setSelectedAudience] = useState<string>('all')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const group = params.get('group')
    if (group) {
      if (group === 'senior') {
        setSelectedAge('senior')
      } else if (group === 'youth') {
        setSelectedAge('youth')
      } else if (group === 'women') {
        setSelectedAudience('women')
      }
    }
  }, [])

  const items = facilitiesData[language]

  // Filtered List
  const filteredFacilities = useMemo(() => {
    return items.filter((item: Facility) => {
      // Search text match
      const matchesSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.benefits.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.eligibility.toLowerCase().includes(searchQuery.toLowerCase())

      // Category match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory

      // Age group match
      const matchesAge = selectedAge === 'all' || item.ageGroups.includes(selectedAge as any)

      // Audience match
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
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />

      {/* Hero Section */}
      <section className="bg-white border-b-[4px] border-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff0000] text-white border-2 border-black font-bold uppercase text-[10px] tracking-wider">
            {language === 'en' ? 'Live Services' : 'লাইভ সেবা'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-none">
            {t.heading}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl font-medium">
            {t.subheading}
          </p>
        </div>
      </section>

      {/* Layout Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 border-[3px] border-black bg-white p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <span className="font-black uppercase tracking-tight text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#ff0000]" />
                {t.filtersTitle}
              </span>
              {isFiltered && (
                <button 
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#ff0000] hover:underline"
                >
                  {t.resetFilters}
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-gray-500 tracking-wider">
                {t.categoryLabel}
              </label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left px-3 py-2 text-sm font-bold border-2 border-black transition-colors ${
                    selectedCategory === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {t.allCategories}
                </button>
                {CATEGORY_ICONS && CATEGORIES[language].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`text-left px-3 py-2 text-sm font-bold border-2 border-black flex items-center justify-between transition-colors ${
                      selectedCategory === cat.value ? 'bg-[#ff0000] text-white border-black' : 'bg-white text-black hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {(() => {
                      const Icon = CATEGORY_ICONS[cat.value]
                      return Icon ? <Icon className="w-4 h-4 shrink-0 ml-2" /> : null
                    })()}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-gray-500 tracking-wider">
                {t.ageLabel}
              </label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedAge('all')}
                  className={`text-left px-3 py-2 text-sm font-bold border-2 border-black transition-colors ${
                    selectedAge === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {t.allAges}
                </button>
                {AGE_GROUPS[language].map((age) => (
                  <button
                    key={age.value}
                    onClick={() => setSelectedAge(age.value)}
                    className={`text-left px-3 py-2 text-sm font-bold border-2 border-black transition-colors ${
                      selectedAge === age.value ? 'bg-[#ff0000] text-white border-black' : 'bg-white text-black hover:bg-gray-50'
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience Filter */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-gray-500 tracking-wider">
                {t.audienceLabel}
              </label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedAudience('all')}
                  className={`text-left px-3 py-2 text-sm font-bold border-2 border-black transition-colors ${
                    selectedAudience === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {t.allAudiences}
                </button>
                {AUDIENCES[language].map((aud) => (
                  <button
                    key={aud.value}
                    onClick={() => setSelectedAudience(aud.value)}
                    className={`text-left px-3 py-2 text-sm font-bold border-2 border-black transition-colors ${
                      selectedAudience === aud.value ? 'bg-[#ff0000] text-white border-black' : 'bg-white text-black hover:bg-gray-50'
                    }`}
                  >
                    {aud.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search Input bar */}
            <div className="flex border-[3px] border-black bg-white focus-within:ring-4 focus-within:ring-yellow-400">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-medium text-black focus:outline-none w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-3 hover:text-[#ff0000] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="bg-black text-white px-5 sm:px-7 py-3 sm:py-4 flex items-center justify-center border-l-2 border-black shrink-0">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Showing Count */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-gray-500 tracking-wider">
                {t.showingCount(filteredFacilities.length)}
              </span>
            </div>

            {/* List of Facilities */}
            {filteredFacilities.length > 0 ? (
              <div className="space-y-6">
                {filteredFacilities.map((fac) => {
                  const CatIcon = CATEGORY_ICONS[fac.category] || Users
                  return (
                    <div 
                      key={fac.id}
                      className="border-[3px] border-black bg-white p-6 sm:p-8 flex flex-col justify-between relative group hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <div className="space-y-4">
                        
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black text-white text-[10px] font-black uppercase tracking-wider">
                            <CatIcon className="w-3.5 h-3.5" />
                            {CATEGORIES[language].find(c => c.value === fac.category)?.label}
                          </div>
                          
                          {fac.ageGroups.map(age => (
                            <span 
                              key={age}
                              className="px-2.5 py-1 border-2 border-black bg-yellow-300 text-black text-[10px] font-black uppercase tracking-wider"
                            >
                              {AGE_GROUPS[language].find(a => a.value === age)?.label}
                            </span>
                          ))}

                          {fac.audiences.map(aud => (
                            <span 
                              key={aud}
                              className="px-2.5 py-1 border-2 border-black bg-[#ff0000] text-white text-[10px] font-black uppercase tracking-wider"
                            >
                              {AUDIENCES[language].find(a => a.value === aud)?.label}
                            </span>
                          ))}
                        </div>

                        {/* Title and Ministry */}
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-black text-black group-hover:text-[#ff0000] transition-colors leading-tight">
                            {fac.title}
                          </h2>
                          <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase">
                            {t.ministry}: <span className="text-black">{fac.ministry}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {fac.description}
                        </p>

                        {/* Benefits and Eligibility Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                              {t.benefits}
                            </span>
                            <p className="text-sm font-bold text-black bg-gray-50 p-3 border-l-[3px] border-[#ff0000]">
                              {fac.benefits}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                              {t.eligibility}
                            </span>
                            <p className="text-sm font-bold text-black bg-gray-50 p-3 border-l-[3px] border-black">
                              {fac.eligibility}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-6 flex justify-end">
                        <a
                          href={fac.actionUrl}
                          target={fac.isExternal ? "_blank" : "_self"}
                          rel={fac.isExternal ? "noopener noreferrer" : ""}
                          className="inline-flex items-center gap-2 px-5 py-3 border-[3px] border-black bg-white hover:bg-black hover:text-white transition-all text-sm font-black uppercase tracking-wider active:translate-y-0.5 active:translate-x-0.5"
                        >
                          {t.applyButton}
                          <ArrowUpRight className="w-4 h-4 shrink-0 text-[#ff0000] group-hover/btn:text-white" />
                        </a>
                      </div>

                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="border-[3px] border-black border-dashed bg-white p-12 text-center space-y-4">
                <p className="text-lg font-bold text-muted-foreground">
                  {t.noResults}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-3 bg-[#ff0000] text-white border-2 border-black font-black uppercase text-sm tracking-wider active:translate-y-0.5"
                >
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
