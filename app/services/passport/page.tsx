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
    title: "e-Passport Application Guide",
    dept: "Department of Immigration and Passports (DIP)",
    stats: [
      { label: "Estimated Time", value: "7-21 Days", icon: Clock },
      { label: "Government Fee", value: "৳4,025 - ৳10,350", icon: CreditCard },
      { label: "Complexity", value: "High", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Verify you have these documents printed and ready to submit during your physical biometrics appointment.",
    docs: [
      { label: "NID Card Copy (or Digital Birth Certificate for minors under 18)", docType: "NID" },
      { label: "Printed copy of the Online Application Form summary page", docType: null },
      { label: "Copy of e-Challan / online payment confirmation slip", docType: "CHALLAN" },
      { label: "Previous Passport copy (for MRP/e-Passport renewals)", docType: "PASSPORT" },
      { label: "NOC (No Objection Certificate) or GO (Government Order) for gov/semi-gov staff", docType: "NOC" },
      { label: "Profession proof (e.g. Student ID, Employee ID, Trade License)", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Process Pathway",
    steps: [
      {
        title: "Check Office Jurisdiction",
        desc: "Visit the e-Passport portal (epassport.gov.bd), enter your present and permanent address to locate your regional passport office.",
        action: "Go to Portal",
        link: "https://www.epassport.gov.bd/"
      },
      {
        title: "Submit Online Form",
        desc: "Register on the portal, fill out the step-by-step application form with personal, parent, and emergency contact details exactly as written on NID.",
        action: "Fill Form",
        link: "https://www.epassport.gov.bd/"
      },
      {
        title: "Pay Passport Fees",
        desc: "Select e-Passport page size (48 or 64 pages), validity (5 or 10 years), and delivery speed. Pay online via cards/MFS or via an offline bank challan.",
        action: "Payment Guide",
        link: "#"
      },
      {
        title: "Schedule Biometrics Slot",
        desc: "Log in to your account dashboard and select a date and time slot for physical biometric enrollment at your regional passport office.",
        action: "Book Appointment",
        link: "#"
      },
      {
        title: "Attend Biometrics & Verification",
        desc: "Visit the passport office on your appointment date. Submit printed forms and challans, enroll fingerprints, iris scans, and facial photographs.",
        action: "What to carry",
        link: "#"
      },
      {
        title: "Police Verification & Delivery",
        desc: "Special Branch (SB) police will verify your address details. Once verified and printed, you will receive an SMS to collect the passport.",
        action: "Track Status",
        link: "#"
      }
    ],
    ctaTitle: "Need to apply for or renew a passport?",
    ctaDesc: "Most application submissions and payments are fully digitized through the DIP portal.",
    ctaButton: "Start e-Passport Application",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Police Verification", desc: "First-time adult applicants require physical verification by local police. Address discrepancies can delay passport generation." },
      { name: "Name Consistency", desc: "Ensure your name, date of birth, and parents' names match your NID or digital birth registration exactly." }
    ],
    postTitle: "Compliance & Post-Receipt",
    postSteps: [
      { name: "Verify Passport Details", desc: "Check printed spelling, validity dates, and passport number immediately upon collection to report any printing errors." },
      { name: "Visa Applications", desc: "Keep passport valid for at least 6 months when planning international travel or applying for foreign visas." }
    ]
  },
  bn: {
    title: "ই-পাসপোর্ট আবেদন নির্দেশিকা",
    dept: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর (DIP)",
    stats: [
      { label: "আনুমানিক সময়", value: "৭-২১ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳৪,০২৫ - ৳১০,৩৫০", icon: CreditCard },
      { label: "জটিলতা", value: "উচ্চ", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "সশরীরে পাসপোর্ট অফিসে বায়োমেট্রিক প্রদানের দিনে এই নথিপত্রগুলো প্রিন্ট করে সাথে নিয়ে যান।",
    docs: [
      { label: "এনআইডি কার্ডের কপি (১৮ বছরের কম বয়সীদের জন্য ডিজিটাল জন্ম নিবন্ধন সনদ)", docType: "NID" },
      { label: "অনলাইন আবেদনের সামারি পেজ ও আবেদনপত্রের প্রিন্ট কপি", docType: null },
      { label: "অনলাইন পেমেন্ট বা ই-চালান পরিশোধের রশিদ", docType: "CHALLAN" },
      { label: "পূর্ববর্তী পাসপোর্টের কপি (এমআরপি বা ই-পাসপোর্ট নবায়নের ক্ষেত্রে)", docType: "PASSPORT" },
      { label: "সরকারি/স্বায়ত্তশাসিত চাকুরিজীবীদের জন্য এনওসি (NOC) বা জিও (GO)", docType: "NOC" },
      { label: "পেশার প্রমাণপত্র (যেমন- স্টুডেন্ট আইডি, এমপ্লয়ি আইডি, ট্রেড লাইসেন্স)", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "আবেদন প্রক্রিয়া",
    steps: [
      {
        title: "আঞ্চলিক পাসপোর্ট অফিস নির্বাচন",
        desc: "ই-পাসপোর্ট পোর্টালে (epassport.gov.bd) প্রবেশ করে বর্তমান ও স্থায়ী ঠিকানা দিয়ে আপনার এলাকাভিত্তিক পাসপোর্ট অফিসটি জেনে নিন।",
        action: "পোর্টালে যান",
        link: "https://www.epassport.gov.bd/"
      },
      {
        title: "অনলাইন ফর্ম পূরণ করুন",
        desc: "পোর্টালে অ্যাকাউন্ট তৈরি করে আপনার এনআইডি অনুযায়ী ব্যক্তিগত বিবরণ, পিতা-মাতা ও জরুরি যোগাযোগের সঠিক তথ্য দিয়ে আবেদনপত্রটি সম্পন্ন করুন।",
        action: "আবেদন ফর্ম পূরণ",
        link: "https://www.epassport.gov.bd/"
      },
      {
        title: "পাসপোর্ট ফি পরিশোধ করুন",
        desc: "পাসপোর্টের পৃষ্ঠা সংখ্যা (৪৮ বা ৬৪ পৃষ্ঠা), মেয়াদ (৫ বা ১০ বছর) এবং ডেলিভারির ধরন নির্ধারণ করুন। এরপর কার্ড, মোবাইল ব্যাংকিং বা ব্যাংকে চালানের মাধ্যমে ফি পরিশোধ করুন।",
        action: "পেমেন্ট গাইড",
        link: "#"
      },
      {
        title: "বায়োমেট্রিক অ্যাপয়েন্টমেন্ট বুকিং",
        desc: "আবেদনপত্র সাবমিট করার পর বায়োমেট্রিক (আঙুলের ছাপ ও ছবি) প্রদানের জন্য আপনার সুবিধাজনক তারিখ ও সময় নির্বাচন করে অ্যাপয়েন্টমেন্ট বুক করুন।",
        action: "অ্যাপয়েন্টমেন্ট বুকিং",
        link: "#"
      },
      {
        title: "বায়োমেট্রিক প্রদান",
        desc: "অ্যাপয়েন্টমেন্টের নির্দিষ্ট দিনে প্রিন্ট করা আবেদনপত্র, পেমেন্ট স্লট ও অন্যান্য মূল কাগজপত্র নিয়ে পাসপোর্ট অফিসে যান এবং ছবি, ফিঙ্গারপ্রিন্ট ও চোখের মণি স্ক্যান দিন।",
        action: "যা যা সাথে নিতে হবে",
        link: "#"
      },
      {
        title: "পুলিশ ভেরিফিকেশন ও ডেলিভারি",
        desc: "নতুন পাসপোর্ট গ্রহীতাদের ক্ষেত্রে স্পেশাল ব্রাঞ্চ (SB) পুলিশ ঠিকানা ভেরিফিকেশন করবে। ভেরিফিকেশন ও প্রিন্ট সফল হলে এসএমএস পাওয়ার পর পাসপোর্ট সংগ্রহ করুন।",
        action: "স্ট্যাটাস ট্র্যাকিং",
        link: "#"
      }
    ],
    ctaTitle: "নতুন পাসপোর্ট করতে বা নবায়ন করতে চান?",
    ctaDesc: "পাসপোর্ট পোর্টাল থেকে আবেদন জমা ও সরকারি ফি প্রদান এখন সম্পূর্ণ ডিজিটাল পদ্ধতিতে করা সম্ভব।",
    ctaButton: "ই-পাসপোর্ট আবেদন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "পুলিশ ভেরিফিকেশন", desc: "প্রথমবার আবেদনকারীদের ক্ষেত্রে পুলিশ ভেরিফিকেশন করা হয়। বর্তমান ঠিকানায় বসবাস না থাকলে বা অমিল থাকলে পাসপোর্ট আটকে যেতে পারে।" },
      { name: "নামের বানান ও সঠিকতা", desc: "আবেদনে আপনার নাম, জন্মতারিখ এবং পিতা-মাতার নাম যেন হুবহু আপনার জাতীয় পরিচয়পত্রের (NID) সাথে মিল থাকে।" }
    ],
    postTitle: "পাসপোর্ট সংগ্রহ ও ব্যবহার",
    postSteps: [
      { name: "পাসপোর্টের তথ্য যাচাই", desc: "পাসপোর্ট সংগ্রহের সাথে সাথেই মুদ্রিত নামের বানান, মেয়াদের তারিখ ও পাসপোর্ট নম্বর ভালো করে দেখে নিন এবং কোনো ভুল থাকলে দ্রুত সংশোধন বিভাগে যোগাযোগ করুন।" },
      { name: "পাসপোর্টের মেয়াদ", desc: "যেকোনো আন্তর্জাতিক ভ্রমণের আগে পাসপোর্টের মেয়াদ কমপক্ষে ৬ মাস থাকা বাধ্যতামূলক।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function PassportPage() {
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
                  href="https://www.epassport.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Online Tracking Supported</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    Once biometric enrollment is complete, you can track the status of printing and delivery on the portal using your enrollment ID.
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
