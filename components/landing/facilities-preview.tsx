'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { Sparkles, ArrowRight, Coins, GraduationCap, Heart } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const content = {
  en: {
    title: "Browse Allowances & Benefits",
    subtitle: "Quickly scan key government allowances, subsidies, and grants active in Bangladesh.",
    viewAll: "Explore All Facilities & Benefits",
    features: [
      {
        id: "senior",
        title: "Old Age Allowance",
        desc: "Monthly support securing basic livelihood, healthcare, and security for elderly citizens.",
        tag: "Seniors (60+)",
        tagBg: "bg-yellow-300",
        icon: Coins
      },
      {
        id: "youth",
        title: "Youth Skill Training",
        desc: "Vocational courses in IT, electrics, and entrepreneurship with low-interest start-up loans.",
        tag: "Youth (13-25)",
        tagBg: "bg-green-300",
        icon: GraduationCap
      },
      {
        id: "women",
        title: "Maternity & Widow Aid",
        desc: "Direct maternal health benefits, nutritional security, and widow allowances.",
        tag: "Women",
        tagBg: "bg-[#ff0000] text-white",
        icon: Heart
      }
    ]
  },
  bn: {
    title: "ভাতা ও সামাজিক সুবিধা খুঁজুন",
    subtitle: "বাংলাদেশে চলমান প্রধান সরকারি ভাতা ও সাহায্য কর্মসূচীসমূহ এক নজরে দেখে নিন।",
    viewAll: "সবগুলো সরকারি সুবিধা ও ভাতা দেখুন",
    features: [
      {
        id: "senior",
        title: "বয়স্ক ভাতা",
        desc: "দরিদ্র ও পিছিয়ে পড়া বয়োজ্যেষ্ঠ নাগরিকদের মৌলিক জীবিকা ও সামাজিক নিরাপত্তা নিশ্চিতকরণের জন্য মাসিক ভাতা।",
        tag: "জেষ্ঠ্য নাগরিক (৬০+)",
        tagBg: "bg-yellow-300",
        icon: Coins
      },
      {
        id: "youth",
        title: "জাতীয় যুব প্রশিক্ষণ",
        desc: "তথ্যপ্রযুক্তি ও উদ্যোক্তা উন্নয়ন বিষয়ক বৃত্তিমূলক প্রশিক্ষণ ও সহজ শর্তে স্টার্ট-আপ ঋণ পাওয়ার সুযোগ।",
        tag: "তরুণ ও যুব (১৩-২৫)",
        tagBg: "bg-green-300",
        icon: GraduationCap
      },
      {
        id: "women",
        title: "মাতৃত্বকাল ও বিধবা ভাতা",
        desc: "অসহায় ও দুস্থ মায়েদের পুষ্টির নিরাপত্তা এবং সামাজিক সুরক্ষার জন্য সরাসরি আর্থিক সহায়তা।",
        tag: "নারী",
        tagBg: "bg-[#ff0000] text-white",
        icon: Heart
      }
    ]
  }
}

export function FacilitiesPreview() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/10 border-t border-border">
      <ScrollReveal animation="slide-up">
        <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white border-2 border-black font-bold uppercase text-[10px] tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            {language === 'en' ? 'New Directory' : 'নতুন ডিরেক্টরি'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Card Row */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {t.features.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx}
                className="p-6 sm:p-8 border-[3px] border-black bg-white space-y-5 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="space-y-4">
                  {/* Icon Block */}
                  <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-black">
                    <Icon className="w-6 h-6 text-[#ff0000]" />
                  </div>
                  
                  {/* Tag */}
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 border-2 border-black text-[9px] font-black uppercase tracking-wider ${item.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4">
                  <Link 
                    href={`/facilities?group=${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-[#ff0000] hover:underline"
                  >
                    {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center pt-4">
          <Link 
            href="/facilities"
            className="inline-flex items-center gap-2 text-base font-black uppercase tracking-wider text-[#ff0000] hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        </div>
      </ScrollReveal>
    </section>
  )
}
