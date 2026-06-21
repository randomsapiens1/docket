'use client'

import { useLanguage } from '@/lib/language-context'
import { CheckSquare, HelpCircle, ClipboardList } from 'lucide-react'

const content = {
  en: {
    heading: "How docket works for you",
    subheading: "Three simple steps to navigate any government process without stress.",
    steps: [
      {
        num: "1",
        title: "Pick Your Process",
        desc: "Select what you need to do—register a private company, apply for e-TIN, mutate land, or track major life events.",
        icon: HelpCircle
      },
      {
        num: "2",
        title: "Follow the Guide",
        desc: "Read our verified, plain-language checklists sourced directly from official gazettes and circulars.",
        icon: ClipboardList
      },
      {
        num: "3",
        title: "Mark as Done",
        desc: "Check off items as you complete them to automatically update and save your persistent progress log.",
        icon: CheckSquare
      }
    ]
  },
  bn: {
    heading: "ডকেট যেভাবে কাজ করে",
    subheading: "যেকোনো সরকারি প্রক্রিয়া বিনা ঝামেলায় সম্পন্ন করার তিনটি সহজ ধাপ।",
    steps: [
      {
        num: "1",
        title: "প্রক্রিয়া নির্বাচন করুন",
        desc: "আপনার প্রয়োজনীয় কাজটি সিলেক্ট করুন—কোম্পানি নিবন্ধন, ই-টিন রেজিস্ট্রেশন, নামজারি অথবা জীবনভিত্তিক ঘটনা।",
        icon: HelpCircle
      },
      {
        num: "2",
        title: "নির্দেশিকা অনুসরণ করুন",
        desc: "অফিশিয়াল সার্কুলার থেকে তৈরি আমাদের যাচাইকৃত এবং সহজ ভাষায় লেখা নির্দেশনাসমূহ দেখুন।",
        icon: ClipboardList
      },
      {
        num: "3",
        title: "সম্পন্ন হিসেবে চিহ্নিত করুন",
        desc: "আপনার সম্পন্ন হওয়া কাজগুলো টিক চিহ্ন দিয়ে আপনার স্থায়ী অগ্রগতি ট্র্যাক ও সংরক্ষণ করুন।",
        icon: CheckSquare
      }
    ]
  }
}

export function HowItWorks() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div 
                key={idx}
                className="p-6 sm:p-8 border-[3px] border-black bg-white space-y-5 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all select-none"
              >
                <div className="space-y-4">
                  {/* Step Header Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#ff0000] text-white flex items-center justify-center border-2 border-black font-black text-lg">
                      {step.num}
                    </div>
                    <Icon className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  {/* Step Info */}
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic leading-tight pt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
