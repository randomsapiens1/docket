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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {/* Windows Tab Style Container */}
        <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[500px]">
          
          {/* Tab Bar */}
          <div className="flex flex-wrap border-b-[4px] border-black bg-gray-100">
            {categories.map((cat, idx) => {
              const Icon = ICON_MAP[cat.title] || Plus
              const isActive = activeTab === idx
              
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "flex-1 min-w-[150px] sm:min-w-0 px-6 py-4 flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-tight transition-all border-r-[4px] border-black last:border-r-0",
                    isActive 
                      ? "bg-white text-black translate-y-[0px]" 
                      : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-[#ff0000]" : "text-gray-400")} />
                  {cat.title}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 sm:p-12 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="grid lg:grid-cols-2 gap-12 h-full">
              
              {/* Info Column */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff0000] text-white border-2 border-black font-bold uppercase text-[10px] tracking-widest">
                    {categories[activeTab].title}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    {categories[activeTab].description}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1.5 bg-[#ff0000]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Services in this Pathway</span>
                  </div>
                  <ul className="space-y-4">
                    {categories[activeTab].items.map((item, i) => (
                      <li key={i} className="group">
                        <a 
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between p-4 border-2 border-black transition-all",
                            item.status === 'Live' 
                              ? "bg-white hover:bg-gray-50 hover:translate-x-2" 
                              : "bg-gray-50 opacity-50 pointer-events-none"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", item.status === 'Live' ? "bg-green-500" : "bg-gray-300")} />
                            <span className="font-bold text-lg">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black",
                              item.status === 'Live' ? "bg-black text-white" : "bg-white text-gray-400 border-gray-200"
                            )}>
                              {item.status === 'Live' ? t.live : t.soon}
                            </span>
                            {item.status === 'Live' && <ArrowRight className="w-5 h-5 text-[#ff0000]" />}
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
