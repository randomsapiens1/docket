'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, Calculator, ArrowRight, ShieldCheck, MapPin } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

import { TemplateLibrary } from '@/components/resources/template-library'
import { templates } from '@/lib/templates'

const content = {
  en: {
    title: "Land Mutation (Namjari)",
    dept: "Ministry of Land / Assistant Commissioner (Land)",
    stats: [
      { label: "Estimated Time", value: "28-45 Days", icon: Clock },
      { label: "Government Fee", value: "৳1,170 (Fixed)", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: LayoutIcon }
    ],
    prepTitle: "Preparation Checklist",
    prepDesc: "Gather these documents before you start the e-Mutation process.",
    docs: [
      { label: "NID of the Applicant", docType: "NID" },
      { label: "Passport-sized photograph & Scanned Signature", docType: "PHOTO" },
      { label: "TIN Certificate of the Applicant", docType: "TIN" },
      { label: "Latest Land Development Tax Receipt (Khajna Dakhila)", docType: null },
      { label: "Previous Khatian (CS, SA, RS, or BS/City Survey)", docType: null },
      { label: "Certified copy of Registered Sale Deed (Dalil)", docType: null },
      { label: "Baya Dalil (Complete chain of previous deeds)", docType: null },
      { label: "Succession/Warisan Certificate (for inheritance)", docType: null },
      { label: "Authority Mutation Letter (for RAJUK/CDA/NHA plots)", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Step-by-Step Pathway",
    steps: [
      {
        title: "Authority Mutation (If Applicable)",
        desc: "For leasehold properties (e.g., RAJUK, CDA, or NHA plots), you must first obtain a Mutation Letter from the respective authority before applying to the land office.",
        action: "Check Authority",
        link: "#"
      },
      {
        title: "Online Application",
        desc: "Visit the e-Mutation portal and fill in the land details including District, Upazila, Mouza, and Plot numbers.",
        action: "Apply Online",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "Pay Initial Fees",
        desc: "Pay the initial application fee (৳20) and notice issuance fee (৳50) online via mobile banking.",
        action: "Payment Portal",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "Verification & Investigation",
        desc: "The Union Land Assistant Officer (Tehsildar) will conduct a field investigation to verify possession and documents.",
        action: "Track Status",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "Hearing at AC Land Office",
        desc: "You will receive an SMS with a hearing date. Attend with all original documents for verification by the AC (Land).",
        action: "Requirements",
        link: "#"
      },
      {
        title: "Final Payment (DCR)",
        desc: "Once approved, pay the record correction fee (৳1,000) and ledger fee (৳100) online to generate the DCR.",
        action: "Pay Final Fee",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "Download Khatian",
        desc: "After final payment, download your newly generated Khatian (Record of Rights) featuring a verifiable QR code.",
        action: "Download Portal",
        link: "https://mutation.land.gov.bd/"
      }
    ],
    ctaTitle: "Ready to start?",
    ctaDesc: "Begin your land mutation process directly on the official e-Mutation portal.",
    ctaButton: "Go to Mutation Portal",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Physical Possession", desc: "Mutation is often rejected if the applicant does not have physical possession, especially in inheritance cases." },
      { name: "Partition Deed", desc: "For inherited property, it is highly recommended to complete a registered Partition Deed (Bonton-nama) before mutation." },
      { name: "Baya Deeds (Chain)", desc: "Missing 'Via Deeds' (history of ownership transfers) is a primary reason for mutation rejection." }
    ],
    postTitle: "Post-Mutation Steps",
    postSteps: [
      { name: "Pay Land Tax", desc: "Update your holding with the new Khatian and pay the annual Land Development Tax." },
      { name: "Inheritance Tax Tip", desc: "If you mutate only your share of inherited land, ensure the remaining heirs' tax liabilities are clear." }
    ]
  },
  bn: {
    title: "নামজারি (মিউটেশন)",
    dept: "ভূমি মন্ত্রণালয় / সহকারী কমিশনার (ভূমি)",
    stats: [
      { label: "আনুমানিক সময়", value: "২৮-৪৫ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳১,১৭০ (নির্ধারিত)", icon: CreditCard },
      { label: "জটিলতা", value: "মাঝারি", icon: LayoutIcon }
    ],
    prepTitle: "প্রস্তুতিমূলক চেকলিস্ট",
    prepDesc: "ই-নামজারি প্রক্রিয়া শুরু করার আগে এই নথিগুলো সংগ্রহ করুন।",
    docs: [
      { label: "আবেদনকারীর এনআইডি (NID)", docType: "NID" },
      { label: "পাসপোর্ট সাইজ ছবি ও স্ক্যান করা স্বাক্ষর", docType: "PHOTO" },
      { label: "আবেদনকারীর টিন (TIN) সার্টিফিকেট", docType: "TIN" },
      { label: "সর্বশেষ ভূমি উন্নয়ন করের দাখিলা (খাজনা রশিদ)", docType: null },
      { label: "পূর্ববর্তী খতিয়ান (CS, SA, RS, বা BS/City Survey)", docType: null },
      { label: "নিবন্ধিত বিক্রয় দলিলের সার্টিফাইড কপি", docType: null },
      { label: "বায়া দলিল (পূর্ববর্তী দলিলের ধারাবাহিকতা)", docType: null },
      { label: "উত্তরাধিকার সনদ (উত্তরাধিকার সূত্রের ক্ষেত্রে)", docType: null },
      { label: "অথরিটি মিউটেশন লেটার (রাজউক/সিডিএ প্লটের জন্য)", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "ধাপে ধাপে নির্দেশিকা",
    steps: [
      {
        title: "অথরিটি মিউটেশন (প্রয়োজ্য ক্ষেত্রে)",
        desc: "লীজহোল্ড সম্পত্তির ক্ষেত্রে (যেমন: রাজউক, সিডিএ বা এনএইচএ প্লট), ভূমি অফিসে আবেদনের আগে সংশ্লিষ্ট কর্তৃপক্ষ থেকে মিউটেশন লেটার সংগ্রহ করতে হবে।",
        action: "কর্তৃপক্ষ যাচাই করুন",
        link: "#"
      },
      {
        title: "অনলাইন আবেদন",
        desc: "ই-নামজারি পোর্টালে গিয়ে জেলা, উপজেলা, মৌজা এবং দাগ নম্বরসহ ভূমির তথ্য দিয়ে আবেদন করুন।",
        action: "অনলাইন আবেদন",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "প্রাথমিক ফি প্রদান",
        desc: "আবেদন ফি (৳২০) এবং নোটিশ জারি ফি (৳৫০) অনলাইন বা মোবাইল ব্যাংকিংয়ের মাধ্যমে প্রদান করুন।",
        action: "পেমেন্ট পোর্টাল",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "যাচাই ও তদন্ত",
        desc: "ইউনিয়ন ভূমি সহকারী কর্মকর্তা (তহশিলদার) দখল এবং নথিপত্র যাচাইয়ের জন্য সরেজমিনে তদন্ত করবেন।",
        action: "অবস্থা যাচাই করুন",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "এসি ল্যান্ড অফিসে শুনানি",
        desc: "এসএমএস-এর মাধ্যমে শুনানির তারিখ জানানো হবে। মূল নথিপত্রসহ এসি ল্যান্ড (AC Land) অফিসে উপস্থিত হন।",
        action: "প্রয়োজনীয়তা",
        link: "#"
      },
      {
        title: "চূড়ান্ত ফি প্রদান (DCR)",
        desc: "আবেদন অনুমোদিত হলে রেকর্ড সংশোধন ফি (৳১,০০০) এবং খতিয়ান ফি (৳১০০) অনলাইনে পরিশোধ করুন।",
        action: "চূড়ান্ত ফি প্রদান",
        link: "https://mutation.land.gov.bd/"
      },
      {
        title: "খতিয়ান ডাউনলোড",
        desc: "চূড়ান্ত পেমেন্টের পর কিউআর কোড (QR Code) যুক্ত নতুন খতিয়ান এবং ডিসিআর (DCR) ডাউনলোড করুন।",
        action: "ডাউনলোড পোর্টাল",
        link: "https://mutation.land.gov.bd/"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "অফিসিয়াল ই-নামজারি পোর্টালের মাধ্যমে আপনার নামজারি প্রক্রিয়া শুরু করুন।",
    ctaButton: "নামজারি পোর্টালে যান",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়",
    extraSteps: [
      { name: "সরেজমিন দখল", desc: "আবেদনকারীর ভূমির ওপর সরেজমিন দখল না থাকলে নামজারি বাতিল হতে পারে, বিশেষ করে উত্তরাধিকারের ক্ষেত্রে।" },
      { name: "বণ্টননামা দলিল", desc: "উত্তরাধিকার সূত্রে প্রাপ্ত জমির ক্ষেত্রে নামজারির আগে একটি নিবন্ধিত বণ্টননামা (Partition Deed) সম্পন্ন করা জরুরি।" },
      { name: "বায়া দলিল (ধারাবাহিকতা)", desc: "মালিকানা হস্তান্তরের ধারাবাহিক বা বায়া দলিল না থাকা নামজারি বাতিলের অন্যতম প্রধান কারণ।" }
    ],
    postTitle: "নামজারি পরবর্তী ধাপ",
    postSteps: [
      { name: "ভূমি কর প্রদান", desc: "নতুন খতিয়ান অনুযায়ী আপনার হোল্ডিং আপডেট করুন এবং বার্ষিক ভূমি উন্নয়ন কর পরিশোধ করুন।" },
      { name: "উত্তরাধিকার কর টিপস", desc: "উত্তরাধিকার সূত্রে প্রাপ্ত জমির আপনার অংশটুকু নামজারি করার সময় বাকি ওয়ারিশদের বকেয়া খাজনার বিষয়টি নিশ্চিত করুন।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function LandMutationPage() {
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
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
          {s.back}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="order-last lg:order-first space-y-6 lg:col-span-2">

            {/* Hero Card */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400">{s.dept}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{s.title}</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                {s.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-black/8 flex items-center justify-center shrink-0">
                      <stat.icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">{s.stepsTitle}</h2>
              <div className="space-y-0">
                {s.steps.map((step, i) => (
                  <div key={i} className="relative pl-9 pb-5">
                    {i !== s.steps.length - 1 && (
                      <div className="absolute left-[17px] top-8 bottom-0 w-px bg-gray-200" />
                    )}
                    <div className="absolute left-0 top-1.5 w-[34px] h-[34px] rounded-full bg-white ring-1 ring-black/10 flex items-center justify-center z-10 shadow-sm">
                      <span className="text-xs font-semibold text-gray-500">{i + 1}</span>
                    </div>
                    <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-5 space-y-3">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      {step.link !== "#" && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150"
                        >
                          {step.action}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Steps */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.postTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {s.postSteps.map((step, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border-l-2 border-primary space-y-1">
                    <h4 className="font-semibold text-sm text-gray-900">{step.name}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Considerations */}
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-gray-900">{s.extraTitle}</h2>
              <div className="space-y-3">
                {s.extraSteps.map((step, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-xl ring-1 ring-black/8 hover:ring-primary/20 transition-all duration-150">
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">
                      Essential
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Library */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'en' ? 'Essential Templates' : 'প্রয়োজনীয় টেমপ্লেট'}
                </h2>
                <Link href="/resources/templates" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all duration-150">
                  {language === 'en' ? 'View Full Library' : 'সম্পূর্ণ লাইব্রেরি দেখুন'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 sm:p-8">
                <TemplateLibrary items={templates[language]} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-6">
            <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-5 lg:sticky lg:top-24">
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {s.prepTitle}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">{s.prepDesc}</p>
              </div>

              <div className="space-y-2.5">
                {s.docs.map((doc, i) => {
                  const isInVault = doc.docType && vaultDocs.includes(doc.docType)
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleDoc(i)}
                        className="flex items-start gap-2.5 w-full text-left group"
                      >
                        <div className="mt-0.5 shrink-0">
                          {checkedDocs.includes(i) ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <span className={`text-sm leading-snug ${checkedDocs.includes(i) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {doc.label}
                        </span>
                      </button>
                      {isInVault && (
                        <div className="ml-7 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          <span className="text-[10px] font-semibold text-green-600">{s.foundInVault}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Progress</span>
                  <span>{checkedDocs.length} / {s.docs.length}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(checkedDocs.length / s.docs.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-1 space-y-3">
                <a href="https://mutation.land.gov.bd/" target="_blank" rel="noopener noreferrer" className="block">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm">
                    {s.ctaButton}
                  </button>
                </a>
                <Link href="/calculators/fee-calculator" className="block">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ring-1 ring-black/10 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all">
                    <Calculator className="w-4 h-4 text-primary" />
                    {language === 'en' ? 'Calculate Fees' : 'ফি ক্যালকুলেট করুন'}
                  </button>
                </Link>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://mutation.land.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">mutation.land.gov.bd</a>
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
