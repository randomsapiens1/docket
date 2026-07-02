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
    title: "National ID (NID) Services Guide",
    dept: "Bangladesh Election Commission",
    stats: [
      { label: "Estimated Time", value: "7-30 Days", icon: Clock },
      { label: "Government Fee", value: "৳230 - ৳575", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Gather these documents depending on your correction or duplicate NID request type.",
    docs: [
      { label: "Educational Certificates (SSC/HSC) for name/age corrections", docType: "ACADEMIC_CERT" },
      { label: "Land Mutation Khatian or Utility Bills for address updates", docType: null },
      { label: "Marriage or Divorce Certificate for spouse updates", docType: "MARRIAGE_CERT" },
      { label: "Copy of GD (General Diary) from Police Station for duplicate NID", docType: "GD_COPY" },
      { label: "Passport copy (if correction aligns with passport details)", docType: "PASSPORT" },
      { label: "NID copy / Voter number", docType: "NID" }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Process Pathway",
    steps: [
      {
        title: "Register on EC Portal",
        desc: "Go to the Election Commission NID services portal (services.nidw.gov.bd) and click Register. Enter your NID or Voter number.",
        action: "Go to Portal",
        link: "https://services.nidw.gov.bd/"
      },
      {
        title: "Facial Verification (NID Wallet)",
        desc: "Install the 'NID Wallet' app on your smartphone, scan the QR code from the portal, and complete facial verification to secure your account.",
        action: "App Details",
        link: "https://services.nidw.gov.bd/"
      },
      {
        title: "Select Change/Correction Request",
        desc: "Login, navigate to the Profile section, select 'Change' or 'Correction', and update NID details or request a duplicate copy.",
        action: "View Profile",
        link: "#"
      },
      {
        title: "Pay Processing Fees",
        desc: "Pay the required transaction fee online through mobile financial services (bKash, Rocket) or e-payment services.",
        action: "Fee Chart",
        link: "#"
      },
      {
        title: "Upload Supporting Documents",
        desc: "Scan and upload appropriate certificates, deeds, utility bills, or the police GD copy as evidence for the changes.",
        action: "Upload Info",
        link: "#"
      },
      {
        title: "Download Digital NID copy",
        desc: "Once Election Commission officials verify and approve your request, log in to download and print your newly updated NID.",
        action: "Get NID Copy",
        link: "#"
      }
    ],
    ctaTitle: "Need NID corrections or updates?",
    ctaDesc: "Initiate corrections, address updates, or duplicate requests online.",
    ctaButton: "Start NID Application",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Initial Enrollment Requirements", desc: "First-time enrollment and biometrics (fingerprints, eye scan) must be done physically at your local Election Commission office." },
      { name: "Supporting Evidence", desc: "Corrections to names and dates of birth heavily rely on SSC/HSC boards or digital birth registration records." }
    ],
    postTitle: "Compliance & Security",
    postSteps: [
      { name: "Verify Online Profile", desc: "Confirm your updated NID details are correctly synced in the NID database for bank/governmental verification." },
      { name: "Smart NID Card Collection", desc: "Collect your physical Smart Card from the local Election Commission office once it is printed." }
    ]
  },
  bn: {
    title: "জাতীয় পরিচয়পত্র (NID) সেবা নির্দেশিকা",
    dept: "বাংলাদেশ নির্বাচন কমিশন",
    stats: [
      { label: "আনুমানিক সময়", value: "৭-৩০ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳২৩০ - ৳৫৭৫", icon: CreditCard },
      { label: "জটিলতা", value: "মাঝারি", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "সংশোধন বা ডুপ্লিকেট কপির আবেদনের ধরন অনুযায়ী প্রয়োজনীয় কাগজপত্র সাথে রাখুন।",
    docs: [
      { label: "নাম/বয়স সংশোধনের জন্য শিক্ষাগত সনদ (এসএসসি/এইচএসসি)", docType: "ACADEMIC_CERT" },
      { label: "ঠিকানা সংশোধনের জন্য নামজারি খতিয়ান বা ইউটিলিটি বিল", docType: null },
      { label: "স্বামী/স্ত্রীর নাম সংশোধনের জন্য নিকাহনামা বা বিবাহ বিচ্ছেদ সনদ", docType: "MARRIAGE_CERT" },
      { label: "ডুপ্লিকেট এনআইডির জন্য স্থানীয় থানার জিডির কপি (GD copy)", docType: "GD_COPY" },
      { label: "পাসপোর্টের কপি (যদি পাসপোর্টের সাথে মিল রেখে সংশোধন করা হয়)", docType: "PASSPORT" },
      { label: "এনআইডি কার্ডের কপি / ভোটার নম্বর", docType: "NID" }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "আবেদন প্রক্রিয়া",
    steps: [
      {
        title: "নির্বাচন কমিশন পোর্টালে নিবন্ধন করুন",
        desc: "নির্বাচন কমিশনের এনআইডি সেবা পোর্টালে (services.nidw.gov.bd) প্রবেশ করে 'নিবন্ধন' অপশনে যান। আপনার এনআইডি বা ভোটার নম্বর দিন।",
        action: "পোর্টালে যান",
        link: "https://services.nidw.gov.bd/"
      },
      {
        title: "ফেস ভেরিফিকেশন (NID Wallet)",
        desc: "আপনার স্মার্টফোনে 'NID Wallet' অ্যাপটি ইনস্টল করুন, কম্পিউটার স্ক্রিনের কিউআর কোডটি স্ক্যান করে ফেস ভেরিফিকেশন সম্পন্ন করুন।",
        action: "অ্যাপের বিবরণ",
        link: "https://services.nidw.gov.bd/"
      },
      {
        title: "সংশোধন/আপডেট নির্বাচন করুন",
        desc: "প্রোফাইলে লগইন করার পর 'তথ্য পরিবর্তন' বা 'সংশোধন' অপশনটি বেছে নিয়ে প্রয়োজনীয় অংশগুলো সংশোধন করুন।",
        action: "প্রোফাইল দেখুন",
        link: "#"
      },
      {
        title: "অনলাইন ফি প্রদান করুন",
        desc: "মোবাইল ব্যাংকিং (বিকাশ, রকেট, নগদ) বা ই-পেমেন্টের মাধ্যমে নির্ধারিত সরকারি ফি পরিশোধ করুন।",
        action: "ফি তালিকা",
        link: "#"
      },
      {
        title: "নথিপত্র আপলোড করুন",
        desc: "সংশোধনের স্বপক্ষে প্রয়োজনীয় শিক্ষাগত সনদ, নিকাহনামা বা জিডির মূল কপি স্ক্যান করে আপলোড করুন।",
        action: "আপলোড তথ্য",
        link: "#"
      },
      {
        title: "ডিজিটাল কপি ডাউনলোড করুন",
        desc: "নির্বাচন কমিশন কর্মকর্তাদের যাচাই ও অনুমোদনের পর পোর্টালে লগইন করে আপনার আপডেট করা এনআইডি কার্ডের অনলাইন কপি ডাউনলোড ও প্রিন্ট করুন।",
        action: "এনআইডি ডাউনলোড",
        link: "#"
      }
    ],
    ctaTitle: "এনআইডি সংশোধন বা ডুপ্লিকেট কপি প্রয়োজন?",
    ctaDesc: "অনলাইনের মাধ্যমে খুব সহজেই তথ্য সংশোধন, ঠিকানা আপডেট বা ডুপ্লিকেট কপি সংগ্রহ করুন।",
    ctaButton: "এনআইডি আবেদন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "নতুন নিবন্ধনের শর্তাবলী", desc: "প্রথমবার ভোটার হওয়া এবং বায়োমেট্রিক প্রদান (আঙুলের ছাপ ও চোখের স্ক্যান) করার জন্য সশরীরে স্থানীয় নির্বাচন অফিসে যেতে হবে।" },
      { name: "সংশোধনের প্রমাণ", desc: "নাম ও জন্মতারিখ সংশোধনের ক্ষেত্রে এসএসসি/এইচএসসি বোর্ড ডাটাবেস বা ডিজিটাল জন্ম নিবন্ধনের বিবরণ যাচাই করা হবে।" }
    ],
    postTitle: "নিরাপত্তা ও কমপ্লায়েন্স",
    postSteps: [
      { name: "অনলাইন প্রোফাইল যাচাই", desc: "ব্যাংক বা বিভিন্ন ভেরিফিকেশনের জন্য নতুন সংশোধিত এনআইডি সঠিকভাবে ডাটাবেসে আপডেট হয়েছে কিনা যাচাই করে নিন।" },
      { name: "স্মার্ট কার্ড সংগ্রহ", desc: "কার্ড প্রিন্ট সম্পন্ন হলে আপনার স্থানীয় নির্বাচন অফিস থেকে সশরীরে স্মার্ট এনআইডি কার্ড সংগ্রহ করুন।" }
    ]
  }
}


export default function NIDRegistrationPage() {
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
                  href="https://services.nidw.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Digital NID Services</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    Most NID updates take a few weeks to review and process by verification officers before being downloadable.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://services.nidw.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">services.nidw.gov.bd</a>
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
