'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, ArrowRight, ShieldCheck, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'

import { TemplateLibrary } from '@/components/resources/template-library'
import { templates } from '@/lib/templates'

const content = {
  en: {
    title: "Holding Tax Assessment & Payment",
    dept: "Local Government Department / City Corporation / Pourashava",
    stats: [
      { label: "Estimated Time", value: "15-30 Days", icon: Clock },
      { label: "Government Fee", value: "Assessment is Free", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: LayoutIcon }
    ],
    prepTitle: "Preparation Checklist",
    prepDesc: "Gather and upload these documents to begin the Holding Tax registration process.",
    docs: [
      { label: "NID of the Property Owner", docType: "NID" },
      { label: "Passport-sized photograph of the Owner", docType: "PHOTO" },
      { label: "Latest Land Mutation Khatian (Namjari)", docType: null },
      { label: "Approved Building Plan from RAJUK / CDA / Authority", docType: null },
      { label: "Occupancy Certificate / Construction Completion Certificate", docType: null },
      { label: "Copy of Registered Purchase Deed (Dalil) or Allocation Letter", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Step-by-Step Process",
    steps: [
      {
        title: "Online Registration & Application",
        desc: "Sign up on the official holding tax portal of your respective City Corporation or Pourashava (e.g. sweb.gov.bd or local e-revenue portal) and submit the new holding application form.",
        action: "LGD Portal",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "Submit Valuation Documents",
        desc: "Upload copies of your approved building plan, mutation khatian, purchase deeds, and enter details of property floor area and usage type (residential or commercial).",
        action: "Upload Documents",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "Physical Verification by Inspector",
        desc: "A Revenue Inspector or Assistant Tax Officer will visit your property to verify building dimensions, number of floors, and usage type for tax calculation.",
        action: "Inspection Protocol",
        link: "#"
      },
      {
        title: "Assessment & Holding Number Issuance",
        desc: "The tax department reviews the inspection report, calculates the annual rental valuation, sets the quarterly tax rate, and issues a unique Holding Number.",
        action: "Check Status",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "Pay Holding Tax Online",
        desc: "Receive your tax challan/bill. Pay your quarterly or annual holding tax online via the e-revenue portal using mobile banking (bKash, Nagad) or bank cards.",
        action: "Pay Holding Tax",
        link: "https://sweb.gov.bd/"
      }
    ],
    ctaTitle: "Ready to register?",
    ctaDesc: "Submit your Holding Tax application on the official local government portal.",
    ctaButton: "Go to Holding Tax Portal",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Residential vs Commercial Rates", desc: "Commercial usage (shops, offices, clinics) is assessed at a significantly higher tax rate compared to residential usage." },
      { name: "Self-Occupied vs Rented", desc: "If you reside in the house yourself, you are eligible for self-occupancy tax rebates compared to if the property is rented out." },
      { name: "Approved building plan mismatch", desc: "Construction that deviates from the approved RAJUK/CDA plan can lead to penalties and delays in holding number assignment." }
    ],
    postTitle: "Post-Registration Compliance",
    postSteps: [
      { name: "Annual Holding Tax Payment", desc: "Pay holding tax quarterly or annually before the deadline to avoid a 10% surcharge on late payments." },
      { name: "Tax Assessment Appeal", desc: "If you disagree with the annual valuation, you can file an appeal with the assessment review board within 30 days of receiving the notice." }
    ]
  },
  bn: {
    title: "হোল্ডিং ট্যাক্স নির্ধারণ ও পরিশোধ",
    dept: "স্থানীয় সরকার বিভাগ / সিটি কর্পোরেশন / পৌরসভা",
    stats: [
      { label: "আনুমানিক সময়", value: "১৫-৩০ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "কর নির্ধারণ সম্পূর্ণ ফ্রি", icon: CreditCard },
      { label: "জটিলতা", value: "মাঝারি", icon: LayoutIcon }
    ],
    prepTitle: "প্রস্তুতিমূলক চেকলিস্ট",
    prepDesc: "হোল্ডিং ট্যাক্স নিবন্ধন প্রক্রিয়া শুরু করতে এই নথিগুলো সংগ্রহ ও আপলোড করুন।",
    docs: [
      { label: "আবেদনকারীর এনআইডি (NID)", docType: "NID" },
      { label: "আবেদনকারীর পাসপোর্ট সাইজ ছবি", docType: "PHOTO" },
      { label: "সর্বশেষ নামজারি খতিয়ান (মিউটেশন)", docType: null },
      { label: "রাজউক / সিডিএ অনুমোদিত ভবনের নকশা (বিল্ডিং প্ল্যান)", docType: null },
      { label: "অকুপেন্সি সার্টিফিকেট (ভবন ব্যবহারের সনদ)", docType: null },
      { label: "নিবন্ধিত ক্রয় দলিলের কপি অথবা বরাদ্দপত্র", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "ধাপে ধাপে নির্দেশিকা",
    steps: [
      {
        title: "অনলাইন রেজিস্ট্রেশন ও আবেদন",
        desc: "আপনার সংশ্লিষ্ট সিটি কর্পোরেশন বা পৌরসভার হোল্ডিং ট্যাক্স পোর্টালে (যেমন: sweb.gov.bd বা লোকাল ই-রাজস্ব পোর্টাল) অ্যাকাউন্ট খুলে নতুন হোল্ডিং আবেদন ফর্মটি পূরণ করুন।",
        action: "এলজিডি পোর্টাল",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "ভবন মূল্যায়ন নথি জমা দান",
        desc: "অনুমোদিত ভবনের নকশা, নামজারি খতিয়ান, ক্রয়ের দলিল আপলোড করুন এবং ভবনের মেঝে আয়তন ও ব্যবহারের ধরন (আবাসিক বা বাণিজ্যিক) সংক্রান্ত তথ্য প্রদান করুন।",
        action: "ডকুমেন্ট আপলোড",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "রাজস্ব পরিদর্শক দ্বারা সরজমিন পরিদর্শন",
        desc: "কর নির্ধারণের জন্য রাজস্ব পরিদর্শক বা সহকারী কর কর্মকর্তা ভবনের আয়তন, তলা সংখ্যা এবং ব্যবহারিক অবস্থা যাচাই করতে সরজমিনে পরিদর্শন করবেন।",
        action: "পরিদর্শন নির্দেশিকা",
        link: "#"
      },
      {
        title: "কর নির্ধারণ ও হোল্ডিং নম্বর প্রদান",
        desc: "পরিদর্শন প্রতিবেদনের ওপর ভিত্তি করে বার্ষিক ভাড়া নির্ধারণ করা হবে, ত্রৈমাসিক করের পরিমাণ ধার্য করা হবে এবং একটি অনন্য হোল্ডিং নম্বর ইস্যু করা হবে।",
        action: "অবস্থা ট্র্যাক করুন",
        link: "https://sweb.gov.bd/"
      },
      {
        title: "অনলাইনে হোল্ডিং ট্যাক্স পরিশোধ",
        desc: "হোল্ডিং নম্বর ইস্যু হওয়ার পর ত্রৈমাসিক বা বার্ষিক কর অনলাইন পোর্টালে মোবাইল ব্যাংকিং (বিকাশ, রকেট, নগদ) বা ব্যাংকের কার্ডের মাধ্যমে পরিশোধ করুন।",
        action: "কর পরিশোধ করুন",
        link: "https://sweb.gov.bd/"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "অফিসিয়াল লোকাল গভর্নমেন্ট পোর্টালে আপনার হোল্ডিং ট্যাক্স আবেদন সম্পন্ন করুন।",
    ctaButton: "হোল্ডিং ট্যাক্স পোর্টালে যান",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিবেচনা",
    extraSteps: [
      { name: "আবাসিক বনাম বাণিজ্যিক করের হার", desc: "বাণিজ্যিক ব্যবহারের ক্ষেত্রে (দোকান, অফিস, হাসপাতাল ইত্যাদি) আবাসিক ব্যবহারের তুলনায় করের হার অনেক বেশি হয়ে থাকে।" },
      { name: "নিজস্ব বাসস্থান বনাম ভাড়া প্রদান", desc: "ভবন মালিক নিজে বসবাস করলে কর রেয়াত পাওয়া যায়, তবে ভাড়া দিলে সে হার ভাড়া মূল্যের সাথে সামঞ্জস্য রেখে নির্ধারিত হয়।" },
      { name: "অনুমোদিত নকশা বহির্ভূত নির্মাণ", desc: "রাজউক বা অনুমোদিত সংস্থার মূল নকশার বাইরে অতিরিক্ত অংশ নির্মাণ করা হলে জরিমানা বা কর নির্ধারণে জটিলতা দেখা দিতে পারে।" }
    ],
    postTitle: "কর নির্ধারণ পরবর্তী নিয়মাবলী",
    postSteps: [
      { name: "বার্ষিক হোল্ডিং ট্যাক্স পরিশোধ", desc: "ধার্যকৃত কর ত্রৈমাসিক বা বাৎসরিক ভিত্তিতে সময়সীমার মধ্যে পরিশোধ করুন, বিলম্বে পরিশোধে ১০% সারচার্জ যুক্ত হতে পারে।" },
      { name: "কর মূল্যায়নে আপত্তি ও আপিল", desc: "অতিরিক্ত কর নির্ধারিত হয়েছে বলে মনে হলে হোল্ডিং নোটিশ পাওয়ার ৩০ দিনের মধ্যে মূল্যায়ন রিভিউ বোর্ডে আপিল দায়ের করতে পারেন।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function HoldingTaxPage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchVault = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('documents')
          .select('doc_type')
        if (data) {
          setVaultDocs(data.map(d => d.doc_type))
        }
      }
    }
    fetchVault()
  }, [supabase])

  // Auto-check docs found in vault
  useEffect(() => {
    const vaultIndices = s.docs
      .map((doc, idx) => (doc.docType && vaultDocs.includes(doc.docType) ? idx : -1))
      .filter(idx => idx !== -1)

    if (vaultIndices.length > 0) {
      setTimeout(() => {
        setCheckedDocs(prev => {
          const hasNew = vaultIndices.some(idx => !prev.includes(idx))
          if (!hasNew) return prev
          const combined = Array.from(new Set([...prev, ...vaultIndices]))
          return combined
        })
      }, 0)
    }
  }, [vaultDocs, s.docs])

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

            {/* Additional Formalities / Key Considerations */}
            <div className="bg-white border-2 border-black p-8 space-y-6">
              <h2 className="text-2xl font-black text-black">{s.extraTitle}</h2>
              <div className="space-y-4">
                {s.extraSteps.map((step, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-gray-100 hover:border-black transition-colors gap-4">
                    <div>
                      <h4 className="font-black text-black">{step.name}</h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                    <div className="text-[10px] font-bold uppercase bg-black text-white px-2 py-1 self-start sm:self-center">
                      Essential
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Library Preview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-black">
                  {language === 'en' ? 'Essential Templates' : 'প্রয়োজনীয় টেমপ্লেট'}
                </h2>
                <Link href="/resources/templates" className="text-sm font-bold text-[#ff0000] hover:underline flex items-center gap-1">
                  {language === 'en' ? 'View Full Library' : 'সম্পূর্ণ লাইব্রেরি দেখুন'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white border-2 border-black p-8">
                <TemplateLibrary items={templates[language]} />
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
                {s.docs.map((doc, i) => {
                  const isInVault = doc.docType && vaultDocs.includes(doc.docType)
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <button 
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
                          {doc.label}
                        </span>
                      </button>
                      {isInVault && (
                        <div className="ml-8 flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-green-600" />
                          <span className="text-[10px] font-black uppercase text-green-600">
                            {s.foundInVault}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
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
                  href="https://sweb.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold h-12 rounded-none border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all">
                    {s.ctaButton}
                  </Button>
                </a>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://sweb.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">sweb.gov.bd</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
