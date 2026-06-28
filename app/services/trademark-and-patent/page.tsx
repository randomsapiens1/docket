'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const content = {
  en: {
    title: "Trademark & Patent Registration Guide",
    dept: "Department of Patents, Designs and Trademarks (DPDT), Ministry of Industries",
    stats: [
      { label: "Estimated Time", value: "6-18 Months", icon: Clock },
      { label: "Government Fee", value: "৳5,000 - ৳25,000+", icon: CreditCard },
      { label: "Complexity", value: "High", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Gather these documents depending on whether you are registering a Trademark, Design, or Patent.",
    docs: [
      { label: "Soft copy of Logo/Artwork (for Trademark)", docType: "ARTWORK" },
      { label: "Technical specifications, Abstract, and Claims (for Patent)", docType: null },
      { label: "Visual drawings / representations (for Design)", docType: null },
      { label: "NID of the applicant(s) / partners", docType: "NID" },
      { label: "Trade License or Incorporation Certificate (if registering under business name)", docType: "INC_CERT" },
      { label: "Power of Attorney (Form TM-48) if filing through an IP agent", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Process Pathway",
    steps: [
      {
        title: "Search DPDT Database",
        desc: "Before applying, run an online Search in the DPDT database to make sure your logo, brand name, design, or patent is unique and not already registered.",
        action: "Search DPDT Portal",
        link: "http://www.dpdt.gov.bd/"
      },
      {
        title: "Register on DPDT Portal",
        desc: "Go to the DPDT e-filing portal, register an account, and verify with your details and mobile number.",
        action: "Go to Portal",
        link: "http://www.dpdt.gov.bd/"
      },
      {
        title: "Submit e-Application",
        desc: "Select the appropriate filing type (Trademark, Design, Patent). Provide applicant profile, select classes (e.g. Nice Classification for Trademarks), and enter descriptions.",
        action: "Form Guidance",
        link: "#"
      },
      {
        title: "Pay Filing Fees online",
        desc: "Complete the online fee payment via mobile banking or e-payment gateways, or attach the Treasury Challan copy.",
        action: "Fee Chart",
        link: "#"
      },
      {
        title: "Journal Publication & Opposition",
        desc: "Upon passing exam, your application is published in the Trademark Journal. Anyone can file an opposition within 120 days of publication.",
        action: "Journal Information",
        link: "#"
      },
      {
        title: "Issuance of Certificate",
        desc: "If no opposition is received, or once resolved in your favor, DPDT issues your official Registration Certificate granting legal IP protection.",
        action: "IP Protection Details",
        link: "#"
      }
    ],
    ctaTitle: "Ready to protect your intellectual property?",
    ctaDesc: "Most filings and payments can be initiated online directly through the DPDT portal.",
    ctaButton: "Start DPDT Application",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "First-to-File Rule", desc: "Bangladesh follows a 'first-to-file' system. You should register your brand, design, or patent as early as possible to secure rights." },
      { name: "Mandatory Trademark Classes", desc: "Ensure you register in the correct classification classes corresponding to your products or services." }
    ],
    postTitle: "IP Validity & Renewals",
    postSteps: [
      { name: "Trademark Validity", desc: "Trademarks are valid for 7 years initially and must be renewed every 10 years." },
      { name: "Patent Validity", desc: "Patents are protected for 20 years from the date of application, requiring annual maintenance fee payments." }
    ]
  },
  bn: {
    title: "ট্রেডমার্ক ও পেটেন্ট নিবন্ধন নির্দেশিকা",
    dept: "পেটেন্ট, ডিজাইন ও ট্রেডমার্ক অধিদপ্তর (DPDT), শিল্প মন্ত্রণালয়",
    stats: [
      { label: "আনুমানিক সময়", value: "৬-১৮ মাস", icon: Clock },
      { label: "সরকারি ফি", value: "৳৫,০০০ - ৳২৫,০০০+", icon: CreditCard },
      { label: "জটিলতা", value: "উচ্চ", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "ট্রেডমার্ক, ডিজাইন অথবা পেটেন্ট নিবন্ধনের ধরণ অনুযায়ী প্রয়োজনীয় কাগজপত্র সাথে রাখুন।",
    docs: [
      { label: "লোগো/আর্টওয়ার্কের সফ্ট কপি (ট্রেডমার্কের জন্য)", docType: "ARTWORK" },
      { label: "পেটেন্টের জন্য টেকনিক্যাল স্পেসিফিকেশন ও ক্লেইম শিট", docType: null },
      { label: "ডিজাইন ড্রয়িং বা ভিজ্যুয়াল রিপ্রেজেন্টেশন (ডিজাইনের জন্য)", docType: null },
      { label: "আবেদনকারীর এনআইডি (NID) কার্ডের কপি", docType: "NID" },
      { label: "প্রতিষ্ঠানের নামে আবেদনের ক্ষেত্রে ট্রেড লাইসেন্স বা ইনকর্পোরেশন সনদ", docType: "INC_CERT" },
      { label: "আইপি এজেন্টের মাধ্যমে আবেদনের জন্য পাওয়ার অব অ্যাটর্নি (ফরম TM-48)", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "আবেদন প্রক্রিয়া",
    steps: [
      {
        title: "ডিপিডিটি ডাটাবেস অনুসন্ধান",
        desc: "আবেদন করার পূর্বে ডিপিডিটি পোর্টালে অনলাইন সার্চ করে নিশ্চিত হয়ে নিন যে আপনার প্রস্তাবিত লোগো বা নাম পূর্বেই নিবন্ধিত হয়নি।",
        action: "পোর্টালে সার্চ করুন",
        link: "http://www.dpdt.gov.bd/"
      },
      {
        title: "ডিপিডিটি পোর্টালে নিবন্ধন করুন",
        desc: "ডিপিডিটি অনলাইন ই-ফাইলিং পোর্টালে প্রবেশ করে ব্যক্তিগত বিবরণ ও মোবাইল ওটিপি দিয়ে অ্যাকাউন্ট তৈরি করুন।",
        action: "পোর্টালে যান",
        link: "http://www.dpdt.gov.bd/"
      },
      {
        title: "অনলাইন আবেদন দাখিল",
        desc: "আবেদনের ধরণ নির্বাচন করুন (ট্রেডমার্ক, ডিজাইন বা পেটেন্ট)। আবেদনকারীর বিবরণ, সঠিক ক্লাস (ট্রেডমার্কের জন্য নাইস ক্লাসিফিকেশন) এবং ডিসক্রিপশন দিন।",
        action: "আবেদন নির্দেশিকা",
        link: "#"
      },
      {
        title: "অনলাইন ফি পরিশোধ",
        desc: "মোবাইল ব্যাংকিং বা অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে আবেদন ফি পরিশোধ করুন, অথবা অফলাইনে পে-করলে ট্রেজারি চালানের স্ক্যান কপি যুক্ত করুন।",
        action: "ফি চার্ট",
        link: "#"
      },
      {
        title: "জার্নাল প্রকাশনা ও আপত্তি",
        desc: "আবেদন যাচাই সফল হলে তা ডিপিডিটি ট্রেডমার্ক জার্নালে প্রকাশিত হয়। জার্নালে প্রকাশের ১২০ দিনের মধ্যে যে কেউ আপত্তি (Opposition) দাখিল করতে পারে।",
        action: "জার্নাল বিবরণ",
        link: "#"
      },
      {
        title: "নিবন্ধন সনদপত্র সংগ্রহ",
        desc: "নির্ধারিত সময়ের মধ্যে কোনো আপত্তি পাওয়া না গেলে বা আপত্তি নিষ্পত্তি আপনার পক্ষে আসলে ডিপিডিটি আপনাকে অফিশিয়াল আইপি রেজিস্ট্রেশন সার্টিফিকেট ইস্যু করবে।",
        action: "আইপি অধিকার তথ্য",
        link: "#"
      }
    ],
    ctaTitle: "আপনার মেধা সম্পদ সুরক্ষিত করতে চান?",
    ctaDesc: "ডিপিডিটি পোর্টাল থেকে বেশিরভাগ আবেদন এবং পেমেন্ট এখন সম্পূর্ণ অনলাইনেই সম্পন্ন করা যায়।",
    ctaButton: "ডিপিডিটি আবেদন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "ফার্স্ট-টু-ফাইল নীতি", desc: "বাংলাদেশ ফার্স্ট-টু-ফাইল বা আগে এলে আগে পাবেন নীতি অনুসরণ করে। তাই অন্যের নকল রোধে দ্রুত আবেদন দাখিল করা বাঞ্ছনীয়।" },
      { name: "ট্রেডমার্কের সঠিক শ্রেণী নির্বাচন", desc: "আপনার পণ্য বা সেবার সাথে সামঞ্জস্যপূর্ণ নির্দিষ্ট ট্রেডমার্ক শ্রেণীভুক্ত (Class) করে আবেদন নিশ্চিত করুন।" }
    ],
    postTitle: "আইপি মেয়াদ ও নবায়ন",
    postSteps: [
      { name: "ট্রেডমার্ক মেয়াদ", desc: "ট্রেডমার্কের মেয়াদ প্রথমবার ৭ বছর এবং পরবর্তীতে প্রতি ১০ বছর পর পর নবায়ন করতে হয়।" },
      { name: "পেটেন্ট মেয়াদ", desc: "আবেদনের তারিখ থেকে পেটেন্ট অধিকার ২০ বছরের জন্য সংরক্ষিত থাকে এবং প্রতি বছর নির্দিষ্ট মেইনটেন্যান্স ফি দিয়ে তা সচল রাখতে হয়।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function TrademarkPatentPage() {
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

  useEffect(() => {
    const vaultIndices = s.docs
      .map((doc, idx) => (doc.docType && vaultDocs.includes(doc.docType) ? idx : -1))
      .filter(idx => idx !== -1)

    if (vaultIndices.length > 0) {
      setTimeout(() => {
        setCheckedDocs(prev => {
          const hasNew = vaultIndices.some(idx => !prev.includes(idx))
          if (!hasNew) return prev
          return Array.from(new Set([...prev, ...vaultIndices]))
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
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors group">
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

            {/* Post-Registration Compliance */}
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
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl ring-1 ring-black/8 hover:ring-primary/20 transition-all duration-150">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
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
                <a
                  href="http://www.dpdt.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Digital DPDT Registry</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    IP applications require extensive search checks and have statutory wait times (journals are published periodically).
                  </p>
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
