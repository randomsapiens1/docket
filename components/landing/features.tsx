'use client'

import { useLanguage } from '@/lib/language-context'
import { trackEvent } from '@/lib/analytics'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const content = {
  en: {
    title: "What you can do with Docket",
    subtitle: "Navigate government services, find financial benefits, and manage your official papers in one unified dashboard.",
    features: [
      {
        title: "Service Pathways",
        desc: "Get verified, step-by-step guidance and checklists for official processes like land mutation, trade licenses, and company setup.",
        btnText: "Browse Services",
        href: "#services",
        gif: "/customer-care.gif",
        isExternal: false
      },
      {
        title: "Life Events Guides",
        desc: "Find all the required procedures and tasks triggered by major life events such as birth registration, marriage, and inheritance.",
        btnText: "Explore Life Events",
        href: "#life-events",
        gif: "/life-skills.gif",
        isExternal: false
      },
      {
        title: "Allowances & Benefits",
        desc: "Quickly search, scan, and check your eligibility for active government grants, subsidies, and training programs in Bangladesh.",
        btnText: "Search Benefits",
        href: "#benefits",
        gif: "/growth.gif",
        isExternal: false
      },
      {
        title: "Secure Document Vault",
        desc: "Store your NID, TIN, photos, and trade licenses in an encrypted vault to auto-complete requirements on any official pathway.",
        btnText: "Go to Vault",
        href: "/vault",
        gif: "/storage-security.gif",
        isExternal: true
      }
    ]
  },
  bn: {
    title: "ডকেট-এর প্রধান সুবিধাসমূহ",
    subtitle: "একটি মাত্র প্ল্যাটফর্মে সরকারি সেবা গ্রহণ করুন, সামাজিক সুযোগ-সুবিধা খুঁজুন এবং আপনার প্রয়োজনীয় নথিপত্র সুরক্ষিতভাবে সংরক্ষণ করুন।",
    features: [
      {
        title: "সেবা নির্দেশিকা ও চেকলিস্ট",
        desc: "কোম্পানি নিবন্ধন, ই-টিন, নামজারি ও অন্যান্য অফিসিয়াল কাজের জন্য ধাপে ধাপে যাচাইকৃত নির্দেশিকা ও চেকলিস্ট পান।",
        btnText: "সেবাগুলো দেখুন",
        href: "#services",
        gif: "/customer-care.gif",
        isExternal: false
      },
      {
        title: "জীবনভিত্তিক নির্দেশিকা",
        desc: "জন্ম নিবন্ধন, বিবাহ এবং উত্তরাধিকারের মতো জীবনের বড় ঘটনাগুলোতে প্রয়োজনীয় সরকারি কাজের ধাপগুলো জানুন।",
        btnText: "লাইফ ইভেন্ট দেখুন",
        href: "#life-events",
        gif: "/life-skills.gif",
        isExternal: false
      },
      {
        title: "সুবিধা ও ভাতা সন্ধানক",
        desc: "বাংলাদেশে চলমান সরকারি সামাজিক নিরাপত্তা কর্মসূচী, যুব প্রশিক্ষণ কোর্স ও বৃত্তির তথ্য খুঁজুন।",
        btnText: "ভাতা ও সুবিধা দেখুন",
        href: "#benefits",
        gif: "/growth.gif",
        isExternal: false
      },
      {
        title: "সুরক্ষিত ডকুমেন্ট ভল্ট",
        desc: "আপনার এনআইডি, ই-টিন এবং অন্যান্য ফাইল ভল্টে আপলোড করে রাখুন, যাতে যেকোনো সেবা গ্রহণের সময় স্বয়ংক্রিয়ভাবে ব্যবহার করা যায়।",
        btnText: "ভল্টে প্রবেশ করুন",
        href: "/vault",
        gif: "/storage-security.gif",
        isExternal: true
      }
    ]
  }
}

export function Features() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/60 border-t border-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {t.features.map((item, idx) => {
            const CardComponent = item.isExternal ? Link : 'a'

            return (
              <CardComponent
                key={idx}
                href={item.href}
                onClick={() => trackEvent('click_feature', { feature_name: item.title })}
                className="group bg-white dark:bg-zinc-900 rounded-2xl ring-1 ring-black/8 shadow-sm hover:shadow-md hover:ring-primary/15 transition-all duration-150 flex flex-col cursor-pointer"
              >
                {/* Card header */}
                <div className="p-6 space-y-3 flex-1">
                  <Image src={item.gif} alt={item.title} width={80} height={80} className="w-20 h-20 object-contain" unoptimized loading="lazy" />
                  <div className="space-y-1.5 pb-4 border-b border-gray-100 dark:border-white/8">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-6 pb-5">
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2 transition-all duration-150">
                    {item.btnText}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </div>
                </div>
              </CardComponent>
            )
          })}
        </div>
      </div>
    </section>
  )
}
