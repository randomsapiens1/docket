'use client'

import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const content = {
  en: {
    title: "Incorporate a Private Company",
    dept: "Registrar of Joint Stock Companies & Firms (RJSC)",
    stats: [
      { label: "Estimated Time", value: "3-7 Days", icon: Clock },
      { label: "Government Fee", value: "Starts from ৳5,000", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: Layout }
    ],
    prepTitle: "Preparation Checklist",
    prepDesc: "Gather these documents before you start the online process.",
    docs: [
      "NID / Passport of all Directors",
      "Passport sized photo of all Directors",
      "Proposed Company Name",
      "Registered Office Address details",
      "TIN Certificate of all Directors"
    ],
    stepsTitle: "Step-by-Step Pathway",
    steps: [
      {
        title: "Name Clearance",
        desc: "Apply for name clearance on the RJSC portal. Note: Clearance is valid for 30 days and must be unique.",
        action: "Check Availability",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "Prepare Documents",
        desc: "Draft the MoA and AoA. For foreign shareholders, you MUST open a temporary bank account and get an Encashment Certificate before final submission.",
        action: "View Templates",
        link: "#"
      },
      {
        title: "Online Application",
        desc: "Upload all signed documents to the RJSC portal and fill out the digital application forms.",
        action: "Go to Portal",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "Pay Fees",
        desc: "Generate the payment slip and pay the registration fees at any scheduled bank or via the online payment gateway.",
        action: "Fee Calculator",
        link: "#"
      },
      {
        title: "Collect Certificate",
        desc: "Once RJSC verifies the documents, you will receive a digital Certificate of Incorporation via email.",
        action: "Check Status",
        link: "https://app.roc.gov.bd/"
      }
    ],
    ctaTitle: "Ready to start?",
    ctaDesc: "Jump directly to the official RJSC portal to begin your application.",
    ctaButton: "Go to RJSC Portal",
    back: "Back to Directory",
    postTitle: "Post-Registration Compliance",
    postSteps: [
      { name: "Trade License", desc: "Mandatory from local government to start operations." },
      { name: "Tax Registration (e-TIN)", desc: "Required for the company immediately after incorporation." },
      { name: "VAT Registration (BIN)", desc: "Required for commercial transactions and invoicing." },
      { name: "Bank Account", desc: "Regularize your temporary account to an operational one." }
    ]
  },
  bn: {
    title: "প্রাইভেট কোম্পানি ইনকরপোরেশন",
    dept: "যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC)",
    stats: [
      { label: "আনুমানিক সময়", value: "৩-৭ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳৫,০০০ থেকে শুরু", icon: CreditCard },
      { label: "জটিলতা", value: "মাঝারি", icon: Layout }
    ],
    prepTitle: "প্রস্তুতিমূলক চেকলিস্ট",
    prepDesc: "অনলাইন প্রক্রিয়া শুরু করার আগে এই নথিগুলো সংগ্রহ করুন।",
    docs: [
      "সকল পরিচালকের এনআইডি / পাসপোর্ট",
      "সকল পরিচালকের পাসপোর্ট সাইজ ছবি",
      "প্রস্তাবিত কোম্পানির নাম",
      "নিবন্ধিত অফিসের ঠিকানা",
      "সকল পরিচালকের টিন (TIN) সার্টিফিকেট"
    ],
    stepsTitle: "ধাপে ধাপে নির্দেশিকা",
    steps: [
      {
        title: "নামের ছাড়পত্র (Name Clearance)",
        desc: "RJSC পোর্টালে নামের ছাড়পত্রের জন্য আবেদন করুন। মনে রাখবেন: ছাড়পত্র ৩০ দিন পর্যন্ত কার্যকর থাকে।",
        action: "নাম যাচাই করুন",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "নথিপত্র প্রস্তুতকরণ",
        desc: "MoA এবং AoA ড্রাফট করুন। বিদেশী বিনিয়োগকারীদের ক্ষেত্রে সাবমিশনের আগে একটি সাময়িক ব্যাংক অ্যাকাউন্ট খুলে 'এনক্যাশমেন্ট সার্টিফিকেট' সংগ্রহ করা বাধ্যতামূলক।",
        action: "টেমপ্লেট দেখুন",
        link: "#"
      },
      {
        title: "অনলাইন আবেদন",
        desc: "সকল স্বাক্ষরিত নথি RJSC পোর্টালে আপলোড করুন এবং ডিজিটাল আবেদন ফর্ম পূরণ করুন।",
        action: "পোর্টালে যান",
        link: "https://app.roc.gov.bd/"
      },
      {
        title: "ফি প্রদান",
        desc: "পেমেন্ট স্লিপ তৈরি করুন এবং যেকোনো তফসিলি ব্যাংক বা অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে রেজিস্ট্রেশন ফি প্রদান করুন।",
        action: "ফি ক্যালকুলেটর",
        link: "#"
      },
      {
        title: "সার্টিফিকেট সংগ্রহ",
        desc: "RJSC নথিগুলো যাচাই করলে আপনি ইমেলের মাধ্যমে একটি ডিজিটাল 'Certificate of Incorporation' পাবেন।",
        action: "অবস্থা যাচাই করুন",
        link: "https://app.roc.gov.bd/"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "আপনার আবেদন শুরু করতে সরাসরি অফিসিয়াল RJSC পোর্টালে যান।",
    ctaButton: "RJSC পোর্টালে যান",
    back: "ডিরেক্টরিতে ফিরে যান",
    postTitle: "রেজিস্ট্রেশন পরবর্তী আনুষ্ঠানিকতা",
    postSteps: [
      { name: "ট্রেড লাইসেন্স", desc: "ব্যবসা শুরু করতে স্থানীয় সরকার থেকে ট্রেড লাইসেন্স সংগ্রহ করা বাধ্যতামূলক।" },
      { name: "ই-টিন (e-TIN)", desc: "নিবন্ধনের পরপরই কোম্পানির নামে ই-টিন গ্রহণ করতে হবে।" },
      { name: "ভ্যাট রেজিস্ট্রেশন (BIN)", desc: "বাণিজ্যিক লেনদেন এবং ইনভয়েস তৈরির জন্য ভ্যাট নিবন্ধন প্রয়োজনীয়।" },
      { name: "ব্যাংক অ্যাকাউন্ট", desc: "আপনার সাময়িক ব্যাংক অ্যাকাউন্টটিকে একটি পূর্ণাঙ্গ অ্যাকাউন্টে রূপান্তর করুন।" }
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
              <div className="pt-2">
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
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
