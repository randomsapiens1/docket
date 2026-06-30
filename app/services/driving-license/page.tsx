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
    title: "Driving License Guide (BRTA)",
    dept: "Bangladesh Road Transport Authority (BRTA)",
    stats: [
      { label: "Estimated Time", value: "15-90 Days", icon: Clock },
      { label: "Government Fee", value: "৳2,300 - ৳5,200", icon: CreditCard },
      { label: "Complexity", value: "High", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Make sure you have these documents scanned and ready before beginning the application.",
    docs: [
      { label: "NID Card Copy of the applicant", docType: "NID" },
      { label: "Medical Certificate signed by a registered doctor (using BRTA form)", docType: "MEDICAL_CERT" },
      { label: "Recent Passport-sized Photograph", docType: "PHOTO" },
      { label: "Utility Bill / Rent Receipt (as proof of present address if different from NID)", docType: null },
      { label: "Educational Qualification Certificate (Minimum Class VIII / SSC)", docType: "ACADEMIC_CERT" },
      { label: "Learner Driving License copy", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Process Pathway",
    steps: [
      {
        title: "Register on BRTA Portal",
        desc: "Go to the BRTA Service Portal (bsp.brta.gov.bd) and register with your mobile number and NID details.",
        action: "Go to BSP Portal",
        link: "https://bsp.brta.gov.bd/"
      },
      {
        title: "Apply for Learner License",
        desc: "Submit your personal details, select license category (non-professional/professional), upload medical certificate, NID, and pay the learner fee online.",
        action: "Apply Learner",
        link: "https://bsp.brta.gov.bd/"
      },
      {
        title: "Sit for Driving Exam",
        desc: "Download and print your learner card. Prepare and attend the driving exam (written, oral, and practical) at the selected test center on the scheduled date (approx. 2-3 months).",
        action: "Exam Preparation",
        link: "#"
      },
      {
        title: "Apply for Smart Card License",
        desc: "Once you pass the exam, the result is updated online. Log in to your BSP account and submit the online application for a Smart Card Driving License.",
        action: "Apply Smart Card",
        link: "#"
      },
      {
        title: "Biometrics Slot Booking",
        desc: "Pay the license fee online and schedule a slot for biometric enrollment (fingerprints, photo) at your local BRTA circle office.",
        action: "Book Slot",
        link: "#"
      },
      {
        title: "Enroll Biometrics & Track Delivery",
        desc: "Visit the BRTA office on the slot date for biometrics. Track your license processing status online; it will be delivered via post.",
        action: "Track License",
        link: "#"
      }
    ],
    ctaTitle: "Ready to get on the road?",
    ctaDesc: "BRTA provides online applications, tracking, and renewal appointments via BSP.",
    ctaButton: "Apply for Driving License",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Learner License Period", desc: "You must wait for the mandatory 2-month training period from the date of learner issue before taking the driving test." },
      { name: "Medical Certification", desc: "The medical certificate must use the official BRTA template and be certified by a registered MBBS physician." }
    ],
    postTitle: "License Validity & Renewal",
    postSteps: [
      { name: "Validity", desc: "Non-professional licenses are valid for 10 years; professional licenses must be renewed every 5 years with fresh biometrics." },
      { name: "Renewal Appointments", desc: "Book your renewal appointment online before expiry to avoid late surcharges and driving with an invalid permit." }
    ]
  },
  bn: {
    title: "ড্রাইভিং লাইসেন্স নির্দেশিকা (BRTA)",
    dept: "বাংলাদেশ রোড ট্রান্সপোর্ট অথরিটি (BRTA)",
    stats: [
      { label: "আনুমানিক সময়", value: "১৫-৯০ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳২,৩০০ - ৳৫,২০০", icon: CreditCard },
      { label: "জটিলতা", value: "উচ্চ", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "অনলাইন আবেদন শুরু করার আগে এই তথ্য ও নথিগুলো স্ক্যান করে সাথে রাখুন।",
    docs: [
      { label: "আবেদনকারীর এনআইডি (NID) কার্ডের কপি", docType: "NID" },
      { label: "নিবন্ধিত ডাক্তার কর্তৃক স্বাক্ষরিত মেডিকেল সার্টিফিকেট (বিআরটিএ ফরম)", docType: "MEDICAL_CERT" },
      { label: "আবেদনকারীর সাম্প্রতিক পাসপোর্ট সাইজ ছবি", docType: "PHOTO" },
      { label: "ইউটিলিটি বিল / বাসার ভাড়া রশিদ (বর্তমান ঠিকানার প্রমাণের জন্য)", docType: null },
      { label: "ন্যূনতম ৮ম শ্রেণী বা তদূর্ধ্ব শিক্ষাগত যোগ্যতা পরীক্ষার সনদপত্র", docType: "ACADEMIC_CERT" },
      { label: "লার্নার ড্রাইভিং লাইসেন্সের কপি", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "আবেদন প্রক্রিয়া",
    steps: [
      {
        title: "বিআরটিএ পোর্টালে নিবন্ধন করুন",
        desc: "বিআরটিএ সার্ভিস পোর্টালে (bsp.brta.gov.bd) প্রবেশ করে আপনার মোবাইল নম্বর ও এনআইডি দিয়ে রেজিস্ট্রেশন করুন।",
        action: "পোর্টালে যান",
        link: "https://bsp.brta.gov.bd/"
      },
      {
        title: "লার্নার লাইসেন্সের জন্য আবেদন করুন",
        desc: "ব্যক্তিগত তথ্য দিন, লাইসেন্সের ক্যাটাগরি (অপেশাদার/পেশাদার) নির্বাচন করুন, মেডিকেল সার্টিফিকেট ও এনআইডি আপলোড করুন এবং লার্নার ফি অনলাইনে পরিশোধ করুন।",
        action: "লার্নার আবেদন",
        link: "https://bsp.brta.gov.bd/"
      },
      {
        title: "ড্রাইভিং পরীক্ষায় অংশগ্রহণ করুন",
        desc: "আপনার লার্নার কার্ডটি ডাউনলোড ও প্রিন্ট করে নিন। নির্ধারিত দিনে নির্ধারিত কেন্দ্রে গিয়ে লিখিত, মৌখিক এবং ব্যবহারিক পরীক্ষায় অংশ নিন (সাধারণত ২-৩ মাস পর)।",
        action: "পরীক্ষার প্রস্তুতি",
        link: "#"
      },
      {
        title: "স্মার্ট কার্ড লাইসেন্সের আবেদন",
        desc: "পরীক্ষায় উত্তীর্ণ হলে তা অনলাইনে আপডেট হবে। এরপর বিএসপি অ্যাকাউন্টে লগইন করে স্মার্ট কার্ড ড্রাইভিং লাইসেন্সের জন্য অনলাইন ফর্মটি সাবমিট করুন।",
        action: "স্মার্ট কার্ড আবেদন",
        link: "#"
      },
      {
        title: "বায়োমেট্রিক স্লট বুকিং করুন",
        desc: "স্মার্ট কার্ড লাইসেন্স ফি অনলাইনে পরিশোধ করুন এবং আপনার স্থানীয় বিআরটিএ সার্কেল অফিসে ফিঙ্গারপ্রিন্ট ও ছবি দেওয়ার স্লট নির্ধারণ করুন।",
        action: "স্লট বুকিং",
        link: "#"
      },
      {
        title: "বায়োমেট্রিক প্রদান ও ট্র্যাকিং",
        desc: "স্লট অনুযায়ী বিআরটিএ অফিসে গিয়ে বায়োমেট্রিক এনরোলমেন্ট সম্পন্ন করুন। ডাকযোগে লাইসেন্স ডেলিভারি পাওয়ার আগ পর্যন্ত অনলাইনে স্ট্যাটাস ট্র্যাক করতে পারবেন।",
        action: "লাইসেন্স ট্র্যাকিং",
        link: "#"
      }
    ],
    ctaTitle: "সড়কে নিরাপদে গাড়ি চালাতে চান?",
    ctaDesc: "বিআরটিএ পোর্টালে অনলাইনের মাধ্যমে ড্রাইভিং লাইসেন্সের আবেদন, ট্র্যাকিং ও নবায়নের অ্যাপয়েন্টমেন্ট নেওয়া যায়।",
    ctaButton: "লাইসেন্স আবেদন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "লার্নার লাইসেন্সের মেয়াদ", desc: "লার্নার কার্ড ইস্যুর পর ন্যূনতম ২ মাস ড্রাইভিং প্র্যাকটিস ও প্রশিক্ষণের জন্য অপেক্ষা করতে হবে পরীক্ষা দেওয়ার আগে।" },
      { name: "মেডিকেল সার্টিফিকেশন", desc: "মেডিকেল সার্টিফিকেটটি অবশ্যই বিআরটিএ-এর নির্ধারিত ফরমে রেজিস্টার্ড এমবিবিএস চিকিৎসক দ্বারা প্রত্যায়িত হতে হবে।" }
    ],
    postTitle: "লাইসেন্সের মেয়াদ ও নবায়ন",
    postSteps: [
      { name: "মেয়াদ", desc: "অপেশাদার ড্রাইভিং লাইসেন্সের মেয়াদ ১০ বছর; পেশাদার লাইসেন্স প্রতি ৫ বছর পর পর নতুন বায়োমেট্রিক দিয়ে নবায়ন করতে হয়।" },
      { name: "নবায়ন অ্যাপয়েন্টমেন্ট", desc: "মেয়াদ শেষ হওয়ার আগেই অনলাইনে নবায়নের আবেদন করুন যেন অতিরিক্ত জরিমানা বা অবৈধ পারমিটের সমস্যায় পড়তে না হয়।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function DrivingLicensePage() {
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
                  href="https://bsp.brta.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Mobile OTP & Tracking</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    OTP validation is required at each login on the BRTA BSP portal. Make sure your BSP profile number remains active.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Source:</span>
                  <a href="https://bsp.brta.gov.bd/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-primary hover:underline">bsp.brta.gov.bd</a>
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
