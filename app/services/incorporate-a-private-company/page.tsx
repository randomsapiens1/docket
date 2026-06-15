'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, Calculator } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const content = {
  en: {
    title: "Business Setup & Company Registration",
    dept: "Registrar of Joint Stock Companies & Firms (RJSC)",
    stats: [
      { label: "Estimated Time", value: "15-45 Days", icon: Clock },
      { label: "Government Fee", value: "Starts from ৳10,000", icon: CreditCard },
      { label: "Complexity", value: "High", icon: LayoutIcon }
    ],
    prepTitle: "Preparation Checklist",
    prepDesc: "Gather these documents and forms before you start the registration process.",
    docs: [
      "Proposed Company Name (for Clearance)",
      "NID / Passport of all Directors & Shareholders",
      "Passport sized photo of all Directors",
      "TIN Certificate of all Directors",
      "Registered Office Address & Lease Agreement",
      "Draft Memorandum & Articles of Association (MoA/AoA)",
      "Form I: Declaration on Registration of Company",
      "Form VI: Notice of Registered Office Situation",
      "Form IX: Consent of Director to Act",
      "Form X: List of Persons Consenting to be Directors",
      "Form XII: Particulars of Directors & Managers"
    ],
    stepsTitle: "Step-by-Step Pathway",
    steps: [
      {
        title: "Name Clearance Certificate",
        desc: "Apply to RJSC for name clearance. It's a pre-requisite for registration. Valid for 180 days.",
        action: "Apply Online",
        link: "https://www.roc.gov.bd/"
      },
      {
        title: "Pay Stamp Duty",
        desc: "Pay stamp duty at a designated bank (e.g., BRAC Bank). Fees depend on authorized share capital.",
        action: "Calculate Stamp Duty",
        link: "/calculators/fee-calculator"
      },
      {
        title: "Registration at RJSC",
        desc: "Submit MoA, AoA, and required forms (I, VI, IX, X, XII) online. Pay registration fees at the bank.",
        action: "Submit Application",
        link: "https://www.roc.gov.bd/"
      },
      {
        title: "Make a Company Seal",
        desc: "Once incorporated, procure an official company seal from any seal-making shop.",
        action: "Requirements",
        link: "#"
      },
      {
        title: "Open a Bank Account",
        desc: "Open a corporate bank account in the company's name. Required for VAT registration.",
        action: "Bank List",
        link: "#"
      },
      {
        title: "Obtain a Trade License",
        desc: "Apply to the respective City Corporation or Municipal Corporation for a trade license.",
        action: "Check Jurisdiction",
        link: "#"
      },
      {
        title: "TIN Certificate",
        desc: "Register with the National Board of Revenue (NBR) to receive the company's Tax Identification Number.",
        action: "NBR Portal",
        link: "https://secure.incometax.gov.bd/"
      },
      {
        title: "VAT Registration",
        desc: "Apply for a Business Identification Number (BIN) via the Customs, Excise, and VAT Commission.",
        action: "VAT Portal",
        link: "https://www.vat.gov.bd/"
      },
      {
        title: "Registration with BOI",
        desc: "Mandatory for foreign investors to access various licenses and incentives in Bangladesh.",
        action: "BOI Website",
        link: "http://www.boi.gov.bd/"
      }
    ],
    ctaTitle: "Ready to start?",
    ctaDesc: "Jump directly to the official RJSC portal to begin your application.",
    ctaButton: "Go to RJSC Portal",
    back: "Back to Directory",
    postTitle: "Ongoing Compliance",
    postSteps: [
      { name: "Annual Returns", desc: "Submit annual summary of share capital and list of shareholders to RJSC." },
      { name: "Tax Filings", desc: "Ensure monthly VAT returns and annual income tax filings are completed." },
      { name: "License Renewal", desc: "Trade licenses must be renewed annually before June 30th." },
      { name: "Audit Reports", desc: "Maintain audited financial statements as per the Companies Act 1994." }
    ]
  },
  bn: {
    title: "ব্যবসায়িক সেটআপ এবং কোম্পানি নিবন্ধন",
    dept: "যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)",
    stats: [
      { label: "আনুমানিক সময়", value: "১৫-৪৫ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳১০,০০০ থেকে শুরু", icon: CreditCard },
      { label: "জটিলতা", value: "উচ্চ", icon: LayoutIcon }
    ],
    prepTitle: "প্রস্তুতিমূলক চেকলিস্ট",
    prepDesc: "নিবন্ধন প্রক্রিয়া শুরু করার আগে এই নথি এবং ফর্মগুলো সংগ্রহ করুন।",
    docs: [
      "প্রস্তাবিত কোম্পানির নাম (ছাড়পত্রের জন্য)",
      "সকল পরিচালক ও শেয়ারহোল্ডারদের এনআইডি / পাসপোর্ট",
      "সকল পরিচালকের পাসপোর্ট সাইজ ছবি",
      "সকল পরিচালকের টিন (TIN) সার্টিফিকেট",
      "নিবন্ধিত অফিসের ঠিকানা ও ভাড়ার চুক্তিপত্র",
      "খসড়া মেমোরেন্ডাম ও আর্টিকেলস অফ অ্যাসোসিয়েশন (MoA/AoA)",
      "ফর্ম I: কোম্পানি নিবন্ধনের ঘোষণা",
      "ফর্ম VI: নিবন্ধিত অফিসের অবস্থানের নোটিশ",
      "ফর্ম IX: পরিচালক হিসেবে কাজ করার সম্মতি",
      "ফর্ম X: পরিচালক হতে ইচ্ছুক ব্যক্তিদের তালিকা",
      "ফর্ম XII: পরিচালক ও ব্যবস্থাপকদের বিবরণ"
    ],
    stepsTitle: "ধাপে ধাপে নির্দেশিকা",
    steps: [
      {
        title: "নামের ছাড়পত্র (Name Clearance)",
        desc: "RJSC থেকে নামের ছাড়পত্র নিন। এটি নিবন্ধনের পূর্বশর্ত। ছাড়পত্র ১৮০ দিন পর্যন্ত কার্যকর থাকে।",
        action: "অনলাইন আবেদন",
        link: "https://www.roc.gov.bd/"
      },
      {
        title: "স্ট্যাম্প ডিউটি প্রদান",
        desc: "নির্ধারিত ব্যাংকে (যেমন: ব্র্যাক ব্যাংক) স্ট্যাম্প ডিউটি জমা দিন। ফি অনুমোদিত মূলধনের ওপর নির্ভর করে।",
        action: "ফি ক্যালকুলেট করুন",
        link: "/calculators/fee-calculator"
      },
      {
        title: "RJSC-তে নিবন্ধন",
        desc: "MoA, AoA এবং প্রয়োজনীয় ফর্মসমূহ (I, VI, IX, X, XII) অনলাইনে জমা দিন। ব্যাংকে রেজিস্ট্রেশন ফি প্রদান করুন।",
        action: "আবেদন জমা দিন",
        link: "https://www.roc.gov.bd/"
      },
      {
        title: "কোম্পানির সিল তৈরি",
        desc: "নিবন্ধন সম্পন্ন হলে যেকোনো সিল তৈরির দোকান থেকে কোম্পানির দাপ্তরিক সিল তৈরি করে নিন।",
        action: "প্রয়োজনীয়তা",
        link: "#"
      },
      {
        title: "ব্যাংক অ্যাকাউন্ট খোলা",
        desc: "কোম্পানির নামে একটি কর্পোরেট ব্যাংক অ্যাকাউন্ট খুলুন। ভ্যাট নিবন্ধনের জন্য এটি প্রয়োজন।",
        action: "ব্যাংক তালিকা",
        link: "#"
      },
      {
        title: "ট্রেড লাইসেন্স সংগ্রহ",
        desc: "সংশ্লিষ্ট সিটি কর্পোরেশন বা পৌরসভা থেকে ট্রেড লাইসেন্সের জন্য আবেদন করুন।",
        action: "এলাকা যাচাই করুন",
        link: "#"
      },
      {
        title: "টিন (TIN) সার্টিফিকেট",
        desc: "কোম্পানির ট্যাক্স আইডেন্টিফিকেশন নম্বর পেতে এনবিআর (NBR)-এ নিবন্ধন করুন।",
        action: "এনবিআর পোর্টাল",
        link: "https://secure.incometax.gov.bd/"
      },
      {
        title: "ভ্যাট (VAT) নিবন্ধন",
        desc: "কাস্টমস, এক্সাইজ ও ভ্যাট কমিশনের মাধ্যমে বিজনেস আইডেন্টিফিকেশন নম্বর (BIN) সংগ্রহ করুন।",
        action: "ভ্যাট পোর্টাল",
        link: "https://www.vat.gov.bd/"
      },
      {
        title: "বিওআই (BOI) নিবন্ধন",
        desc: "বিদেশী বিনিয়োগকারীদের জন্য বিভিন্ন লাইসেন্স ও সুবিধা পেতে বিওআই-তে নিবন্ধন বাধ্যতামূলক।",
        action: "বিওআই ওয়েবসাইট",
        link: "http://www.boi.gov.bd/"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "আপনার আবেদন শুরু করতে সরাসরি অফিসিয়াল RJSC পোর্টালে যান।",
    ctaButton: "RJSC পোর্টালে যান",
    back: "ডিরেক্টরিতে ফিরে যান",
    postTitle: "চলমান কমপ্লায়েন্স",
    postSteps: [
      { name: "বার্ষিক রিটার্ন", desc: "শেয়ার মূলধনের সারাংশ এবং শেয়ারহোল্ডারদের তালিকা প্রতি বছর RJSC-তে জমা দিন।" },
      { name: "ট্যাক্স ফাইলিং", desc: "মাসিক ভ্যাট রিটার্ন এবং বার্ষিক আয়কর রিটার্ন জমা নিশ্চিত করুন।" },
      { name: "লাইসেন্স নবায়ন", desc: "ট্রেড লাইসেন্স প্রতি বছর ৩০ জুনের আগে নবায়ন করতে হবে।" },
      { name: "অডিট রিপোর্ট", desc: "কোম্পানি আইন ১৯৯৪ অনুযায়ী অডিট করা আর্থিক বিবরণী সংরক্ষণ করুন।" }
    ]
  }
}


export default function ServiceDetailPage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])

  const toggleDoc = (index: number) => {
    setCheckedDocs(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />
      
      {/* Breadcrumbs & Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#ff0000] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {s.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="order-last lg:order-first space-y-8 lg:col-span-2">
            {/* Hero Card */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff0000]">{s.dept}</span>
                <h1 className="text-3xl sm:text-4xl font-black text-black leading-tight">
                  {s.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-gray-100">
                {s.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 border border-black">
                      <stat.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500">{stat.label}</p>
                      <p className="text-sm font-bold text-black">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-black">{s.stepsTitle}</h2>
              <div className="space-y-0">
                {s.steps.map((step, i) => (
                  <div key={i} className="relative pl-8 pb-10 group">
                    {/* Vertical Line */}
                    {i !== s.steps.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-1 bg-black" />
                    )}
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-4 border-black rounded-full z-10 group-hover:bg-[#ff0000] transition-colors" />
                    
                    <div className="bg-white border-2 border-black p-6 space-y-4 transition-all">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <span className="bg-black text-white px-2 py-0.5 text-xs">{i + 1}</span>
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.desc}
                      </p>
                      {step.link !== "#" && (
                        <a 
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#ff0000] hover:underline"
                        >
                          {step.action} &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Post-Registration Compliance */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <h2 className="text-2xl font-black text-black">{s.postTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {s.postSteps.map((step, i) => (
                  <div key={i} className="p-4 bg-gray-50 border-l-4 border-[#ff0000] space-y-1">
                    <h4 className="font-bold text-black">{step.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-8">
            {/* Checklist Card */}
            <div className="bg-white border-2 border-black p-6 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-2">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {s.prepTitle}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.prepDesc}
                </p>
              </div>

              <div className="space-y-3">
                {s.docs.map((doc, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleDoc(i)}
                    className="flex items-start gap-3 w-full text-left group"
                  >
                    <div className="mt-0.5 shrink-0">
                      {checkedDocs.includes(i) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 group-hover:text-black" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${checkedDocs.includes(i) ? 'text-gray-400 line-through' : 'text-black'}`}>
                      {doc}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="bg-gray-50 p-4 border border-dashed border-gray-300">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-black">
                    {checkedDocs.length} of {s.docs.length} tasks completed
                  </p>
                  <div className="w-full h-2 bg-gray-200 mt-2">
                    <div 
                      className="h-full bg-[#ff0000] transition-all duration-500" 
                      style={{ width: `${(checkedDocs.length / s.docs.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-2 space-y-4">
                <a 
                  href="https://app.roc.gov.bd/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold h-12 rounded-none border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all">
                    {s.ctaButton}
                  </Button>
                </a>
                <Link href="/calculators/fee-calculator" className="block">
                  <Button className="w-full bg-white hover:bg-gray-50 text-black font-bold h-12 rounded-none border-2 border-black border-b-4 active:border-b-2 active:translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4 text-[#ff0000]" />
                    {language === 'en' ? 'Calculate Fees' : 'ফি ক্যালকুলেট করুন'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
