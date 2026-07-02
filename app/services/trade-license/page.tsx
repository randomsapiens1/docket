'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { CheckCircle2, Circle, Clock, CreditCard, FileText, Layout as LayoutIcon, ArrowLeft, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'

const content = {
  en: {
    title: "Trade License Registration Guide",
    dept: "City Corporations / Municipalities / Local Government Division",
    stats: [
      { label: "Estimated Time", value: "3-7 Days", icon: Clock },
      { label: "Government Fee", value: "৳1,000 - ৳50,000+", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Prepare these documents to submit your Trade License application online.",
    docs: [
      { label: "NID of the Business Owner / Managing Director", docType: "NID" },
      { label: "Recent Passport-sized Photograph of the applicant", docType: "PHOTO" },
      { label: "TIN Certificate of the Business or Owner", docType: "TIN" },
      { label: "Registered Rent Agreement or Property Ownership Deed of premises", docType: null },
      { label: "Incorporation Certificate & MoA (for Limited Companies)", docType: "INC_CERT" },
      { label: "Holding Tax receipt of the business location", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Process Pathway",
    steps: [
      {
        title: "Visit Digital Portal",
        desc: "Go to your respective City Corporation portal (e.g., Dhaka North or Dhaka South e-trade portal) or municipal e-service portal.",
        action: "Go to Portal",
        link: "https://dncc.gov.bd/"
      },
      {
        title: "Create Merchant Account",
        desc: "Register with your name, mobile number, and email. Verify using the mobile OTP sent to your phone.",
        action: "Create Account",
        link: "https://dncc.gov.bd/"
      },
      {
        title: "Fill Application Form",
        desc: "Select business type, category, capital size, and ward number. Provide the exact business name and address details.",
        action: "Sector Guidelines",
        link: "#"
      },
      {
        title: "Upload Supporting Documents",
        desc: "Scan and upload your NID, photo, TIN, rent agreement, and incorporation certificate if applicable.",
        action: "Upload Requirements",
        link: "#"
      },
      {
        title: "Pay License Fees Online",
        desc: "Once initial processing is complete, pay the trade license fee, signboard tax, and VAT online via bKash, card, or internet banking.",
        action: "Online Payment",
        link: "#"
      },
      {
        title: "Download Digital License",
        desc: "Upon successful payment verification, download and print the digitally signed official Trade License certificate.",
        action: "Download Copy",
        link: "#"
      }
    ],
    ctaTitle: "Ready to start your business?",
    ctaDesc: "Most City Corporations and Municipalities now process applications fully online.",
    ctaButton: "Apply for Trade License",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Digital City Corporation Services", desc: "Online applications are widely supported in major cities (e.g., Dhaka North/South). Other municipalities might still require physical verification." },
      { name: "Commercial Address Mismatch", desc: "Your business must operate from a designated commercial area. Residential addresses can lead to rejection." }
    ],
    postTitle: "Annual Renewal & Compliance",
    postSteps: [
      { name: "Annual Renewal", desc: "Renew your trade license every fiscal year (before July 30th) to avoid late penalties and legal complications." },
      { name: "VAT & Tax Filing", desc: "Ensure your commercial activities comply with NBR guidelines using the active trade license." }
    ]
  },
  bn: {
    title: "ট্রেড লাইসেন্স নিবন্ধন নির্দেশিকা",
    dept: "সিটি কর্পোরেশন / পৌরসভা / স্থানীয় সরকার বিভাগ",
    stats: [
      { label: "আনুমানিক সময়", value: "৩-৭ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳১,০০০ - ৳৫০,০০০+", icon: CreditCard },
      { label: "জটীলতা", value: "মাঝারি", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "অনলাইন ট্রেড লাইসেন্স আবেদন শুরু করার আগে এই তথ্য ও নথিগুলো সাথে রাখুন।",
    docs: [
      { label: "ব্যবসার মালিক / ব্যবস্থাপনা পরিচালকের এনআইডি (NID)", docType: "NID" },
      { label: "আবেদনকারীর সাম্প্রতিক পাসপোর্ট সাইজ ছবি", docType: "PHOTO" },
      { label: "ব্যবসা প্রতিষ্ঠান বা মালিকের করদাতা সনাক্তকরণ নম্বর (TIN)", docType: "TIN" },
      { label: "ব্যবসায়িক ঠিকানার নিবন্ধিত ভাড়ার চুক্তি বা মালিকানার দলিল", docType: null },
      { label: "লিমিটেড কোম্পানির ক্ষেত্রে ইনকর্পোরেশন সনদ ও এমওএ (MoA)", docType: "INC_CERT" },
      { label: "ব্যবসায়িক ঠিকানার হোল্ডিং ট্যাক্স পরিশোধের রশিদ", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "আবেদন প্রক্রিয়া",
    steps: [
      {
        title: "ডিজিটাল পোর্টালে প্রবেশ করুন",
        desc: "আপনার সংশ্লিষ্ট সিটি কর্পোরেশন (যেমন- ঢাকা উত্তর/দক্ষিণ সিটি কর্পোরেশন ই-ট্রেড পোর্টাল) বা পৌরসভার ওয়েবসাইটে প্রবেশ করুন।",
        action: "পোর্টালে যান",
        link: "https://dncc.gov.bd/"
      },
      {
        title: "মার্চেন্ট অ্যাকাউন্ট তৈরি করুন",
        desc: "আপনার নাম, মোবাইল নম্বর এবং ইমেল দিয়ে অ্যাকাউন্ট তৈরি করুন এবং ওটিপি (OTP) দিয়ে তা সক্রিয় করুন।",
        action: "অ্যাকাউন্ট তৈরি",
        link: "https://dncc.gov.bd/"
      },
      {
        title: "আবেদন ফর্ম পূরণ করুন",
        desc: "ব্যবসার ধরন, শ্রেণীবিভাগ, মূলধনের পরিমাণ এবং ওয়ার্ড নম্বর নির্বাচন করুন। ব্যবসার সঠিক নাম ও ঠিকানা দিন।",
        action: "ক্যাটাগরি নির্দেশিকা",
        link: "#"
      },
      {
        title: "প্রয়োজনীয় নথিপত্র আপলোড করুন",
        desc: "এনআইডি, ছবি, টিআইএন, ভাড়ার চুক্তি এবং প্রযোজ্য ক্ষেত্রে ইনকর্পোরেশন সার্টিফিকেট স্ক্যান করে আপলোড করুন।",
        action: "আপলোড তথ্য",
        link: "#"
      },
      {
        title: "অনলাইনে লাইসেন্স ফি প্রদান",
        desc: "আবেদন প্রক্রিয়া শেষে ই-পেমেন্ট বা মোবাইল ব্যাংকিং (বিকাশ, রকেট, নগদ)-এর মাধ্যমে নির্ধারিত লাইসেন্স ফি, সাইনবোর্ড ট্যাক্স এবং ভ্যাট পরিশোধ করুন।",
        action: "অনলাইন পেমেন্ট",
        link: "#"
      },
      {
        title: "ডিজিটাল লাইসেন্স ডাউনলোড",
        desc: "ফি সফলভাবে পরিশোধিত হলে পোর্টাল থেকে আপনার ডিজিটাল ট্রেড লাইসেন্স সার্টিফিকেটটি ডাউনলোড ও প্রিন্ট করে নিন।",
        action: "ডাউনলোড কপি",
        link: "#"
      }
    ],
    ctaTitle: "নতুন ব্যবসা শুরু করতে প্রস্তুত?",
    ctaDesc: "প্রধান প্রধান সিটি কর্পোরেশন ও পৌরসভায় এখন সম্পূর্ণ অনলাইনেই ট্রেড লাইসেন্স প্রদান করা হয়।",
    ctaButton: "ট্রেড লাইসেন্স আবেদন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "ডিজিটাল সিটি কর্পোরেশন সেবা", desc: "ঢাকা উত্তর/দক্ষিণ সিটি কর্পোরেশন সহ প্রধান বড় শহরগুলোতে এটি সম্পূর্ণ অনলাইনভিত্তিক। তবে অন্য পৌরসভাগুলোতে এখনও ম্যানুয়াল যাচাই লাগতে পারে।" },
      { name: "ঠিকানার বাণিজ্যিক ব্যবহার", desc: "ব্যবসা প্রতিষ্ঠানটি অবশ্যই বাণিজ্যিক এলাকায় অবস্থিত হতে হবে। আবাসিক ঠিকানায় আবেদন করলে তা বাতিল হতে পারে।" }
    ],
    postTitle: "বার্ষিক নবায়ন ও কমপ্লায়েন্স",
    postSteps: [
      { name: "বার্ষিক নবায়ন", desc: "প্রতি অর্থবছর শেষ হওয়ার পূর্বে (৩০শে জুলাইয়ের মধ্যে) জরিমানা এড়াতে ট্রেড লাইসেন্স নবায়ন করতে হবে।" },
      { name: "ভ্যাট ও ট্যাক্স দাখিল", desc: "সক্রিয় ট্রেড লাইসেন্স দিয়ে ব্যবসার বাণিজিক্য কার্যক্রম জাতীয় রাজস্ব বোর্ডের নির্দেশনা মোতাবেক পরিচালনা নিশ্চিত করুন।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function TradeLicensePage() {
  const { language } = useLanguage()
  const s = content[language]
  const [checkedDocs, setCheckedDocs] = useState<number[]>([])
  const [vaultDocs, setVaultDocs] = useState<string[]>([])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const q = query(collection(db, 'documents'), where('user_id', '==', firebaseUser.uid))
        const snapshot = await getDocs(q)
        setVaultDocs(snapshot.docs.map(d => d.data().doc_type as string))
      }
      unsubscribe()
    })
    return unsubscribe
  }, [])

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
                  href="https://dncc.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Digital Trade Registration</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    Once paid, digital trade licenses are typically issued instantly or within 48 hours for immediate printing.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://dncc.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">dncc.gov.bd</a>
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
