'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { serviceCategories } from '@/lib/services'
import { 
  Briefcase, 
  Receipt, 
  Map, 
  Fingerprint, 
  Car, 
  Globe, 
  ArrowRight,
  Plus,
  ChevronDown,
  ChevronUp,
  LucideIcon,
  Users,
  Award,
  GraduationCap,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BusinessMatchmaker } from '@/components/calculators/business-matchmaker'

const ICON_MAP: Record<string, LucideIcon> = {
  "Identity & Personal Documents": Fingerprint,
  "Family & Life Events": Users,
  "Business & Entrepreneurship": Briefcase,
  "Employment & Career": Award,
  "Property & Land": Map,
  "Vehicles & Transportation": Car,
  "Taxes & Finance": Receipt,
  "Education": GraduationCap,
  "Immigration & Travel": Globe,
  "Housing & Utilities": Home,
  // BN
  "পরিচয় ও ব্যক্তিগত নথিপত্র": Fingerprint,
  "পরিবার ও জীবনভিত্তিক সেবাসমূহ": Users,
  "ব্যবসা ও উদ্যোক্তা": Briefcase,
  "কর্মসংস্থান ও ক্যারিয়ার": Award,
  "সম্পত্তি ও ভূমি": Map,
  "যানবাহন ও পরিবহন": Car,
  "কর ও অর্থসংস্থান": Receipt,
  "শিক্ষা": GraduationCap,
  "ইমিগ্রেশন ও ভ্রমণ": Globe,
  "আবাসন ও ইউটিলিটি": Home
}

export function TaskTabs() {
  const { language } = useLanguage()
  const categories = serviceCategories[language]
  const [activeTab, setActiveTab] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }, [])

  React.useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      checkScroll()
      const timer = setTimeout(checkScroll, 150)
      window.addEventListener('resize', checkScroll)
      return () => {
        el.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
        clearTimeout(timer)
      }
    }
  }, [checkScroll])

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 240
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const t = {
    en: {
      heading: "How docket can help you",
      subheading: "Select a category to see how we guide you through each process.",
      live: "Live",
      soon: "Soon",
      viewAll: "View All"
    },
    bn: {
      heading: "ডকেট আপনাকে যেভাবে সাহায্য করতে পারে",
      subheading: "প্রতিটি প্রক্রিয়ায় আমরা আপনাকে কীভাবে নির্দেশিকা দেই তা দেখতে একটি বিভাগ নির্বাচন করুন।",
      live: "লাইভ",
      soon: "শীঘ্রই",
      viewAll: "সবগুলো দেখুন"
    }
  }[language]

  return (
    <section className="py-16 sm:py-20 px-2 sm:px-6 lg:px-8 bg-white border-t border-border relative z-10">
      <ScrollReveal animation="slide-up">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground px-4">
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t.subheading}
          </p>
          <div className="pt-2">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#ff0000] hover:underline"
            >
              {language === 'en' ? 'View All Services' : 'সবগুলো সেবা দেখুন'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Windows Tab Style Container */}
        <div className="bg-white border-[3px] sm:border-[4px] border-black flex flex-col min-h-[400px] sm:min-h-[500px]">
          
          {/* Tab Bar Container with Scroll Indications */}
          <div className="border-b-[3px] sm:border-b-[4px] border-black bg-gray-100 flex items-stretch select-none relative">
            
            {/* Scroll Indicator / Scroll Left Button */}
            <button 
              onClick={() => handleScroll('left')}
              className={cn(
                "flex items-center justify-center w-10 border-r-[3px] border-black bg-gray-200 hover:bg-gray-300 text-black shrink-0 transition-all active:bg-white",
                showLeftArrow ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed pointer-events-none"
              )}
              disabled={!showLeftArrow}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5 text-black stroke-[3px]" />
            </button>

            {/* Tab Bar - Scrollable */}
            <div 
              ref={scrollRef}
              className="flex-1 flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
            >
              {categories.map((cat, idx) => {
                const Icon = ICON_MAP[cat.title] || Plus
                const isActive = activeTab === idx
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(idx)
                      setExpandedIndex(null)
                    }}
                    className={cn(
                      "flex-none snap-start min-w-[145px] sm:flex-1 px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 font-bold text-xs uppercase tracking-tight transition-all border-r-[3px] sm:border-r-[4px] border-black last:border-r-0",
                      isActive 
                        ? "bg-white text-black translate-y-[0px]" 
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", isActive ? "text-[#ff0000]" : "text-gray-400")} />
                    {cat.title}
                  </button>
                )
              })}
            </div>

            {/* Scroll Indicator / Scroll Right Button */}
            <button 
              onClick={() => handleScroll('right')}
              className={cn(
                "flex items-center justify-center w-10 border-l-[3px] border-black bg-gray-200 hover:bg-gray-300 text-black shrink-0 transition-all active:bg-white",
                showRightArrow ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed pointer-events-none"
              )}
              disabled={!showRightArrow}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5 text-black stroke-[3px]" />
            </button>
          </div>

          {/* Content Area */}
          <div 
            key={activeTab}
            className="flex-1 p-4 sm:p-12 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out"
          >
            <div className="space-y-8">
              
              {/* Top Row: Title/Description on Left, Matchmaker/Decorative Badge on Right */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b-2 border-dashed border-gray-200 pb-8">
                {/* Left Side Info */}
                <div className="space-y-4 max-w-xl">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    {categories[activeTab].description}
                  </h3>
                </div>

                {/* Right Side Compact Widget */}
                <div className="w-full lg:max-w-md shrink-0">
                  {(categories[activeTab].title === "Business & Entrepreneurship" || categories[activeTab].title === "ব্যবসা ও উদ্যোক্তা") ? (
                    <BusinessMatchmaker compact={true} />
                  ) : (
                    <div className="hidden lg:flex w-full h-full min-h-[140px] items-center justify-center bg-gray-50 border-2 border-black border-dashed relative overflow-hidden group p-6">
                      <div className="relative z-10 text-center space-y-2 transform group-hover:scale-105 transition-transform flex items-center gap-4">
                        {React.createElement(ICON_MAP[categories[activeTab].title] || Plus, {
                          className: "w-12 h-12 text-[#ff0000] shrink-0"
                        })}
                        <div className="text-left space-y-0.5">
                          <p className="font-black text-lg uppercase italic leading-none">{categories[activeTab].title}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Docket Pathway Verified</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 text-[36px] font-black text-gray-200 select-none leading-none">
                        0{activeTab + 1}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: List of services in 2 columns side by side */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1.5 bg-[#ff0000]" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Services in this Pathway</span>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories[activeTab].items.map((item, i) => {
                    const hasSubItems = item.subItems && item.subItems.length > 0
                    const isExpanded = expandedIndex === i

                    if (hasSubItems) {
                      return (
                        <li key={i} className="group flex flex-col space-y-1 h-fit">
                          {/* Main Accordion Trigger */}
                          <button
                            onClick={() => setExpandedIndex(isExpanded ? null : i)}
                            className="w-full flex items-center justify-between p-3 border-2 border-black bg-white hover:bg-gray-50 transition-all text-left font-bold"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={cn("w-2 h-2 rounded-full shrink-0", item.status === 'Live' ? "bg-green-500" : "bg-gray-300")} />
                              <span className="text-sm sm:text-base truncate">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={cn(
                                "text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 border border-black",
                                item.status === 'Live' ? "bg-black text-white" : "bg-white text-gray-400 border-gray-200"
                              )}>
                                {item.status === 'Live' ? t.live : t.soon}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-black shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-black shrink-0" />
                              )}
                            </div>
                          </button>

                          {/* Dropdown Container */}
                          {isExpanded && (
                            <div className="border-2 border-black bg-gray-50 p-3 border-t-0 -mt-1 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200 z-10">
                              <ul className="space-y-1.5">
                                {item.subItems!.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <a
                                      href={sub.status === 'Live' ? sub.href : '#'}
                                      className={cn(
                                        "flex items-center justify-between p-2 border border-black transition-all text-xs font-bold bg-white",
                                        sub.status === 'Live'
                                          ? "hover:bg-gray-50 hover:border-[#ff0000] active:translate-y-0.5 cursor-pointer"
                                          : "opacity-60 cursor-not-allowed pointer-events-none"
                                      )}
                                    >
                                      <span className="text-foreground truncate mr-2">{sub.name}</span>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={cn(
                                          "text-[7px] font-black uppercase px-1.5 py-0.5 border border-black",
                                          sub.status === 'Live' ? "bg-black text-white" : "bg-white text-gray-400 border-gray-200"
                                        )}>
                                          {sub.status === 'Live' ? t.live : t.soon}
                                        </span>
                                        {sub.status === 'Live' && <ArrowRight className="w-3.5 h-3.5 text-[#ff0000]" />}
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      )
                    }

                    return (
                      <li key={i} className="group h-fit">
                        <a 
                          href={item.status === 'Live' ? item.href : '#'}
                          className={cn(
                            "flex items-center justify-between p-3 border-2 border-black transition-all",
                            item.status === 'Live' 
                              ? "bg-white hover:bg-gray-50 cursor-pointer" 
                              : "bg-gray-50 opacity-50 pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={cn("w-2 h-2 rounded-full shrink-0", item.status === 'Live' ? "bg-green-500" : "bg-gray-300")} />
                            <span className="font-bold text-sm sm:text-base truncate">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={cn(
                              "text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 border border-black",
                              item.status === 'Live' ? "bg-black text-white" : "bg-white text-gray-400 border-gray-200"
                            )}>
                              {item.status === 'Live' ? t.live : t.soon}
                            </span>
                            {item.status === 'Live' && <ArrowRight className="w-4 h-4 text-[#ff0000]" />}
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </ScrollReveal>
  </section>
  )
}
