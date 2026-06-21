'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
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
  LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BusinessMatchmaker } from '@/components/calculators/business-matchmaker'

const ICON_MAP: Record<string, LucideIcon> = {
  "Business": Briefcase,
  "Tax": Receipt,
  "Land & Property": Map,
  "Identity": Fingerprint,
  "Vehicles": Car,
  "Travel": Globe,
  // BN
  "ব্যবসা": Briefcase,
  "কর": Receipt,
  "ভূমি ও সম্পত্তি": Map,
  "পরিচয়পত্র": Fingerprint,
  "যানবাহন": Car,
  "ভ্রমণ": Globe
}

export function TaskTabs() {
  const { language } = useLanguage()
  const categories = serviceCategories[language]
  const [activeTab, setActiveTab] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground px-4">
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t.subheading}
          </p>
        </div>

        {/* Windows Tab Style Container */}
        <div className="bg-white border-[3px] sm:border-[4px] border-black flex flex-col min-h-[400px] sm:min-h-[500px]">
          
          {/* Tab Bar - Scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar border-b-[3px] sm:border-b-[4px] border-black bg-gray-100 snap-x snap-mandatory">
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
                    "flex-none snap-start min-w-[140px] sm:flex-1 px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 font-bold text-xs uppercase tracking-tight transition-all border-r-[3px] sm:border-r-[4px] border-black last:border-r-0",
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

          {/* Content Area */}
          <div className="flex-1 p-4 sm:p-12 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="space-y-8">
              
              {/* Top Row: Title/Description on Left, Matchmaker/Decorative Badge on Right */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b-2 border-dashed border-gray-200 pb-8">
                {/* Left Side Info */}
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff0000] text-white border-2 border-black font-bold uppercase text-[9px] sm:text-[10px] tracking-widest">
                    {categories[activeTab].title}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    {categories[activeTab].description}
                  </h3>
                </div>

                {/* Right Side Compact Widget */}
                <div className="w-full lg:max-w-md shrink-0">
                  {(categories[activeTab].title === "Business" || categories[activeTab].title === "ব্যবসা") ? (
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
    </section>
  )
}
