'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
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
        forWho: "Seniors, Retirees, Elderly",
        iconBg: "bg-amber-50",
        gif: "/walking.gif"
      },
      {
        id: "youth",
        title: "Youth Skill Training",
        desc: "Vocational courses in IT, electrics, and entrepreneurship with low-interest start-up loans.",
        forWho: "Students, Youth, Job Seekers",
        iconBg: "bg-emerald-50",
        gif: "/soft-skills.gif"
      },
      {
        id: "women",
        title: "Maternity & Widow Aid",
        desc: "Direct maternal health benefits, nutritional security, and widow allowances.",
        forWho: "Mothers, Widows, Women",
        iconBg: "bg-rose-50",
        gif: "/relaxed.gif"
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
        forWho: "প্রবীণ, অবসরপ্রাপ্ত, বয়োজ্যেষ্ঠ",
        iconBg: "bg-amber-50",
        gif: "/walking.gif"
      },
      {
        id: "youth",
        title: "জাতীয় যুব প্রশিক্ষণ",
        desc: "তথ্যপ্রযুক্তি ও উদ্যোক্তা উন্নয়ন বিষয়ক বৃত্তিমূলক প্রশিক্ষণ ও সহজ শর্তে স্টার্ট-আপ ঋণ পাওয়ার সুযোগ।",
        forWho: "শিক্ষার্থী, তরুণ, চাকরিপ্রার্থী",
        iconBg: "bg-emerald-50",
        gif: "/soft-skills.gif"
      },
      {
        id: "women",
        title: "মাতৃত্বকাল ও বিধবা ভাতা",
        desc: "অসহায় ও দুস্থ মায়েদের পুষ্টির নিরাপত্তা এবং সামাজিক সুরক্ষার জন্য সরাসরি আর্থিক সহায়তা।",
        forWho: "মা, বিধবা, নারী",
        iconBg: "bg-rose-50",
        gif: "/relaxed.gif"
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
              return (
                <div
                  key={idx}
                  className="group p-6 sm:p-8 rounded-2xl bg-white ring-1 ring-black/8 shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 hover:ring-primary/20 transition-all duration-300 ease-out flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon Block */}
                    <Image src={item.gif} alt={item.title} width={56} height={56} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300" unoptimized />

                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">{item.forWho}</p>
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-all duration-150"
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
