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
        tagColor: "bg-amber-100 text-amber-700",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        icon: Coins
      },
      {
        id: "youth",
        title: "Youth Skill Training",
        desc: "Vocational courses in IT, electrics, and entrepreneurship with low-interest start-up loans.",
        tag: "Youth (13-25)",
        tagColor: "bg-emerald-100 text-emerald-700",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        icon: GraduationCap
      },
      {
        id: "women",
        title: "Maternity & Widow Aid",
        desc: "Direct maternal health benefits, nutritional security, and widow allowances.",
        tag: "Women",
        tagColor: "bg-rose-100 text-rose-600",
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
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
        desc: "দরিদ্র ও পিছিয়ে পড়া বয়োজ্যেষ্ঠ নাগরিকদের মৌলিক জীবিকা ও সামাজিক নিরাপত্তা নিশ্চিতকরণের জন্য মাসিক ভাতা।",
        tag: "জেষ্ঠ্য নাগরিক (৬০+)",
        tagColor: "bg-amber-100 text-amber-700",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        icon: Coins
      },
      {
        id: "youth",
        title: "জাতীয় যুব প্রশিক্ষণ",
        desc: "তথ্যপ্রযুক্তি ও উদ্যোক্তা উন্নয়ন বিষয়ক বৃত্তিমূলক প্রশিক্ষণ ও সহজ শর্তে স্টার্ট-আপ ঋণ পাওয়ার সুযোগ।",
        tag: "তরুণ ও যুব (১৩-২৫)",
        tagColor: "bg-emerald-100 text-emerald-700",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        icon: GraduationCap
      },
      {
        id: "women",
        title: "মাতৃত্বকাল ও বিধবা ভাতা",
        desc: "অসহায় ও দুস্থ মায়েদের পুষ্টির নিরাপত্তা এবং সামাজিক সুরক্ষার জন্য সরাসরি আর্থিক সহায়তা।",
        tag: "নারী",
        tagColor: "bg-rose-100 text-rose-600",
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        icon: Heart
      }
    ]
  }
}

export function FacilitiesPreview() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="benefits" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <ScrollReveal animation="slide-up">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {language === 'en' ? 'New Directory' : 'নতুন ডিরেক্টরি'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Card Row */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {t.features.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="group p-6 sm:p-8 rounded-2xl bg-white ring-1 ring-black/8 shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 hover:ring-primary/20 transition-all duration-300 ease-out flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon Block */}
                    <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>

                    {/* Tag */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.tagColor}`}>
                      {item.tag}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5">
                    <Link
                      href={`/facilities?group=${item.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all duration-150"
                    >
                      {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/15 text-primary font-semibold text-sm transition-all duration-150 hover:gap-3"
            >
              {t.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </ScrollReveal>
    </section>
  )
}
