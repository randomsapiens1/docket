'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const serviceCategories = {
  en: [
    {
      title: "Business",
      description: "Register your company, file returns, stay compliant.",
      items: [
        { name: "Incorporate a private company", status: "Live", href: "/services/incorporate-a-private-company" },
        { name: "File annual returns", status: "Soon", href: "#" },
        { name: "Change a director", status: "Soon", href: "#" },
      ]
    },
    {
      title: "Land & Property",
      description: "Transfer ownership, verify records, pay land tax.",
      items: [
        { name: "Land mutation (namjari)", status: "Soon", href: "#" },
        { name: "Get a khatian", status: "Soon", href: "#" },
      ]
    },
    {
      title: "Identity",
      description: "NID, passport, birth and death certificates.",
      items: [
        { name: "Correct your NID", status: "Soon", href: "#" },
        { name: "Apply for a passport", status: "Soon", href: "#" },
      ]
    },
    {
      title: "Tax",
      description: "TIN, income tax, VAT.",
      items: [
        { name: "Register for TIN", status: "Soon", href: "#" },
      ]
    },
    {
      title: "Vehicles",
      description: "BRTA license, registration, fitness.",
      items: [
        { name: "Get a driving license", status: "Soon", href: "#" },
      ]
    },
    {
      title: "Travel",
      description: "Passport, police clearance, NOC.",
      items: [
        { name: "Apply for police clearance", status: "Soon", href: "#" },
      ]
    }
  ],
  bn: [
    {
      title: "ব্যবসা",
      description: "আপনার কোম্পানি নিবন্ধন করুন, রিটার্ন জমা দিন, নিয়ম মেনে চলুন।",
      items: [
        { name: "প্রাইভেট কোম্পানি ইনকরপোরেশন", status: "Live", href: "/services/incorporate-a-private-company" },
        { name: "বার্ষিক রিটার্ন দাখিল", status: "Soon", href: "#" },
        { name: "পরিচালক পরিবর্তন", status: "Soon", href: "#" },
      ]
    },
    {
      title: "ভূমি ও সম্পত্তি",
      description: "মালিকানা পরিবর্তন করুন, রেকর্ড যাচাই করুন, ভূমি উন্নয়ন কর পরিশোধ করুন।",
      items: [
        { name: "নামজারি (মিউটেশন)", status: "Soon", href: "#" },
        { name: "খতিয়ান সংগ্রহ", status: "Soon", href: "#" },
      ]
    },
    {
      title: "পরিচয়পত্র",
      description: "এনআইডি, পাসপোর্ট, জন্ম ও মৃত্যু নিবন্ধন।",
      items: [
        { name: "এনআইডি সংশোধন", status: "Soon", href: "#" },
        { name: "পাসপোর্টের জন্য আবেদন", status: "Soon", href: "#" },
      ]
    },
    {
      title: "কর",
      description: "টিন (TIN), আয়কর, ভ্যাট।",
      items: [
        { name: "টিন (TIN) রেজিস্ট্রেশন", status: "Soon", href: "#" },
      ]
    },
    {
      title: "যানবাহন",
      description: "বিআরটিএ লাইসেন্স, রেজিস্ট্রেশন, ফিটনেস।",
      items: [
        { name: "ড্রাইভিং লাইসেন্স সংগ্রহ", status: "Soon", href: "#" },
      ]
    },
    {
      title: "ভ্রমণ",
      description: "পাসপোর্ট, পুলিশ ক্লিয়ারেন্স, এনওসি।",
      items: [
        { name: "পুলিশ ক্লিয়ারেন্সের জন্য আবেদন", status: "Soon", href: "#" },
      ]
    }
  ]
}

const labels = {
  en: {
    heading: "How docket can help you",
    live: "Live",
    soon: "Soon"
  },
  bn: {
    heading: "ডকেট আপনাকে যেভাবে সাহায্য করতে পারে",
    live: "লাইভ",
    soon: "শীঘ্রই আসছে"
  }
}

export function ServiceDirectory() {
  const { language } = useLanguage()
  const categories = serviceCategories[language]
  const { heading, live, soon } = labels[language]

  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-16 text-foreground">{heading}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {categories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground underline decoration-4 decoration-[#ff0000] underline-offset-8">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground pt-2">
                  {category.description}
                </p>
              </div>
              
              <ul className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="group">
                    <a 
                      href={item.href} 
                      className={`flex items-center justify-between py-2 border-b border-gray-200 group-hover:border-[#ff0000] transition-colors ${item.status === 'Soon' ? 'pointer-events-none' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className={`w-4 h-4 ${item.status === 'Live' ? 'text-[#ff0000]' : 'text-gray-300'}`} />
                        <span className={`font-bold ${item.status === 'Live' ? 'text-[#ff0000] group-hover:underline' : 'text-gray-500'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                        item.status === 'Live' 
                          ? 'bg-[#ff0000] text-white border-[#ff0000]' 
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {item.status === 'Live' ? live : soon}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
