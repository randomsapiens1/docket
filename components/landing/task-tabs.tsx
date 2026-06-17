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
        <div className="bg-white border-[3px] sm:border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[400px] sm:min-h-[500px]">
          
          {/* Tab Bar - Scrollable on mobile */}
          <div className="flex overflow-x-auto no-scrollbar border-b-[3px] sm:border-b-[4px] border-black bg-gray-100 snap-x snap-mandatory">
            {categories.map((cat, idx) => {
              const Icon = ICON_MAP[cat.title] || Plus
              const isActive = activeTab === idx
              
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
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
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 h-full">
              
              {/* Info Column */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff0000] text-white border-2 border-black font-bold uppercase text-[9px] sm:text-[10px] tracking-widest">
                    {categories[activeTab].title}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    {categories[activeTab].description}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 bg-[#ff0000]" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Services in this Pathway</span>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {categories[activeTab].items.map((item, i) => (
                      <li key={i} className="group">
                        <a 
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between p-3 sm:p-4 border-2 border-black transition-all",
                            item.status === 'Live' 
                              ? "bg-white hover:bg-gray-50 sm:hover:translate-x-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none sm:shadow-none" 
                              : "bg-gray-50 opacity-50 pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", item.status === 'Live' ? "bg-green-500" : "bg-gray-300")} />
                            <span className="font-bold text-base sm:text-lg">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black",
                              item.status === 'Live' ? "bg-black text-white" : "bg-white text-gray-400 border-gray-200"
                            )}>
                              {item.status === 'Live' ? t.live : t.soon}
                            </span>
                            {item.status === 'Live' && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" />}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Matchmaker for Business, Decorative for others */}
              <div className="flex items-center justify-center">
                {(categories[activeTab].title === "Business" || categories[activeTab].title === "ব্যবসা") ? (
                  <div className="w-full scale-90 sm:scale-100 origin-top lg:origin-center">
                    <BusinessMatchmaker />
                  </div>
                ) : (
                  <div className="hidden lg:flex w-full h-full items-center justify-center bg-gray-50 border-2 border-black border-dashed relative overflow-hidden group">
                    <div className="relative z-10 text-center space-y-4 transform group-hover:scale-105 transition-transform">
                      {React.createElement(ICON_MAP[categories[activeTab].title] || Plus, {
                        className: "w-32 h-32 mx-auto text-[#ff0000] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                      })}
                      <div className="space-y-1">
                        <p className="font-black text-2xl uppercase italic">{categories[activeTab].title}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Docket Pathway Verified</p>
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute bottom-4 right-4 text-[60px] font-black text-gray-200 select-none leading-none">
                      0{activeTab + 1}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
