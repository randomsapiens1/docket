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
    title: "Birth & Death Registration Guide",
    dept: "Directorate General of Health Services (DGHS) & Local Government Division",
    stats: [
      { label: "Estimated Time", value: "15-30 Days", icon: Clock },
      { label: "Government Fee", value: "৳0 - ৳100", icon: CreditCard },
      { label: "Complexity", value: "Medium", icon: LayoutIcon }
    ],
    prepTitle: "Requirements",
    prepDesc: "Ensure you have these details and documents ready before starting your online application.",
    docs: [
      { label: "Medical Birth/Death Certificate (from clinic or hospital)", docType: "MEDICAL_CERT" },
      { label: "NID of Mother (for Birth Registration)", docType: "NID" },
      { label: "NID of Father (for Birth Registration)", docType: "NID" },
      { label: "Informant's NID (for Death Registration)", docType: "NID" },
      { label: "Passport-sized photograph", docType: "PHOTO" },
      { label: "Rent Receipt or Land Mutation Khatian (as address proof)", docType: null }
    ],
    foundInVault: "Found in Vault",
    stepsTitle: "Registration Pathway",
    steps: [
      {
        title: "Visit BDRIS Portal",
        desc: "Go to the official e-Birth and Death Registration portal (bdris.gov.bd) and choose Birth or Death registration application.",
        action: "Go to Portal",
        link: "https://bdris.gov.bd/"
      },
      {
        title: "Fill Application Form",
        desc: "Select your address (Country, Division, District, Upazila/City Corporation, Union/Ward) and fill in the applicant's details in both English and Bengali.",
        action: "Portal Guidance",
        link: "https://bdris.gov.bd/"
      },
      {
        title: "Add Parents/Informant Details",
        desc: "Enter parent details and their respective NID numbers exactly as registered. For death registration, enter the informant's NID.",
        action: "View Guidelines",
        link: "#"
      },
      {
        title: "Upload Supporting Documents",
        desc: "Scan and upload the hospital discharge card/medical certificate, photos, and address proof documents.",
        action: "Upload Info",
        link: "#"
      },
      {
        title: "Submit & Print Application",
        desc: "Verify all information, submit the form online, and print the generated application containing the Application ID.",
        action: "Check Application",
        link: "#"
      },
      {
        title: "Office Submission & Fee Payment",
        desc: "Visit your local Union Parishad, Pourashava, or City Corporation office within 15 days with physical copies to pay the fee and collect the certificate.",
        action: "Local Office Info",
        link: "#"
      }
    ],
    ctaTitle: "Ready to register?",
    ctaDesc: "Obtain verified digital birth or death certificates fully online.",
    ctaButton: "Start Registration",
    back: "Back to Directory",
    extraTitle: "Key Considerations",
    extraSteps: [
      { name: "Delay Penalty", desc: "Registration is free within 45 days of birth/death. Fees apply for delayed registration up to ৳100." },
      { name: "Language Uniformity", desc: "Ensure names are spelled identically to educational or parent documents in both English and Bengali." }
    ],
    postTitle: "Post-Registration Compliance",
    postSteps: [
      { name: "Digital Certificate Verification", desc: "Always check the online BDRIS portal to verify the generated digital certificate using the registration number." },
      { name: "NID Linking", desc: "Ensure the digital birth certificate is linked when enrolling for the National ID (NID) card later." }
    ]
  },
  bn: {
    title: "জন্ম ও মৃত্যু নিবন্ধন নির্দেশিকা",
    dept: "স্বাস্থ্য অধিদপ্তর (DGHS) এবং স্থানীয় সরকার বিভাগ",
    stats: [
      { label: "আনুমানিক সময়", value: "১৫-৩০ দিন", icon: Clock },
      { label: "সরকারি ফি", value: "৳০ - ৳১০০", icon: CreditCard },
      { label: "জটিলতা", value: "মাঝারি", icon: LayoutIcon }
    ],
    prepTitle: "প্রয়োজনীয় তথ্য ও নথিপত্র",
    prepDesc: "অনলাইন আবেদন শুরু করার আগে এই তথ্য ও নথিগুলো সাথে রাখুন।",
    docs: [
      { label: "মেডিকেল জন্ম/মৃত্যু সনদ (ক্লিনিক বা হাসপাতাল থেকে প্রাপ্ত)", docType: "MEDICAL_CERT" },
      { label: "মাতার এনআইডি (জন্ম নিবন্ধনের জন্য)", docType: "NID" },
      { label: "পিতার এনআইডি (জন্ম নিবন্ধনের জন্য)", docType: "NID" },
      { label: "তথ্য প্রদানকারীর এনআইডি (মৃত্যু নিবন্ধনের জন্য)", docType: "NID" },
      { label: "পাসপোর্ট সাইজ ছবি", docType: "PHOTO" },
      { label: "ভাড়া রশিদ বা নামজারি খতিয়ান (ঠিকানার প্রমাণস্বরূপ)", docType: null }
    ],
    foundInVault: "ভল্টে পাওয়া গেছে",
    stepsTitle: "নিবন্ধন প্রক্রিয়া",
    steps: [
      {
        title: "বিডিআরআইএস (BDRIS) পোর্টালে যান",
        desc: "অফিসিয়াল জন্ম ও মৃত্যু নিবন্ধন পোর্টালে (bdris.gov.bd) প্রবেশ করে জন্ম বা মৃত্যু নিবন্ধন অপশনটি নির্বাচন করুন।",
        action: "পোর্টালে যান",
        link: "https://bdris.gov.bd/"
      },
      {
        title: "আবেদন ফর্ম পূরণ করুন",
        desc: "আপনার স্থায়ী/বর্তমান ঠিকানা নির্বাচন করুন এবং আবেদনকারীর নাম ও প্রয়োজনীয় তথ্য ইংরেজি এবং বাংলা উভয় ভাষায় সঠিকভাবে পূরণ করুন।",
        action: "পোর্টাল নির্দেশিকা",
        link: "https://bdris.gov.bd/"
      },
      {
        title: "পিতা-মাতা/তথ্য প্রদানকারীর বিবরণ দিন",
        desc: "পিতা-মাতার এনআইডি এবং সঠিক তথ্য দিন। মৃত্যু নিবন্ধনের ক্ষেত্রে তথ্য প্রদানকারীর এনআইডি নম্বর ইনপুট দিন।",
        action: "নির্দেশনাবলী দেখুন",
        link: "#"
      },
      {
        title: "প্রয়োজনীয় নথিপত্র আপলোড করুন",
        desc: "হাসপাতালের ছাড়পত্র/মেডিকেল সার্টিফিকেট, ছবি এবং ঠিকানার প্রমাণের স্ক্যান কপি আপলোড করুন।",
        action: "আপলোড তথ্য",
        link: "#"
      },
      {
        title: "আবেদন জমা দিন ও প্রিন্ট করুন",
        desc: "সকল তথ্য যাচাই করে অনলাইন আবেদনটি সাবমিট করুন এবং অ্যাপ্লিকেশন আইডি সহ আবেদনপত্রটি প্রিন্ট করে নিন।",
        action: "আবেদন যাচাই",
        link: "#"
      },
      {
        title: "অফিসে যোগাযোগ ও ফি প্রদান",
        desc: "আবেদনপত্রের প্রিন্ট কপি ও মূল নথিপত্র সহ ১৫ দিনের মধ্যে স্থানীয় ইউনিয়ন পরিষদ, পৌরসভা বা সিটি কর্পোরেশন অফিসে গিয়ে ফি জমা দিয়ে ডিজিটাল সনদ সংগ্রহ করুন।",
        action: "স্থানীয় অফিস তথ্য",
        link: "#"
      }
    ],
    ctaTitle: "আপনি কি প্রস্তুত?",
    ctaDesc: "অনলাইনের মাধ্যমে যাচাইকৃত ডিজিটাল জন্ম বা মৃত্যু সনদ সংগ্রহ করুন।",
    ctaButton: "নিবন্ধন শুরু করুন",
    back: "ডিরেক্টরিতে ফিরে যান",
    extraTitle: "গুরুত্বপূর্ণ বিষয়াবলী",
    extraSteps: [
      { name: "বিলম্ব জরিমানা", desc: "জন্ম বা মৃত্যুর ৪৫ দিনের মধ্যে নিবন্ধন সম্পূর্ণ ফ্রি। এরপর নিবন্ধনের জন্য সর্বোচ্চ ৳১০০ পর্যন্ত সরকারি ফি প্রযোজ্য।" },
      { name: "ভাষার সামঞ্জস্যতা", desc: "ইংরেজি ও বাংলা উভয় ভাষায় নামের বানান যেন অন্যান্য শিক্ষাগত বা পারিবারিক দলিলের সাথে হুবহু মিল থাকে।" }
    ],
    postTitle: "নিবন্ধন পরবর্তী নিয়মাবলী",
    postSteps: [
      { name: "ডিজিটাল সনদ যাচাই", desc: "সনদ সংগ্রহের পর বিডিআরআইএস পোর্টাল থেকে সার্টিফিকেট নম্বর দিয়ে অনলাইন ভেরিফিকেশন চেক করুন।" },
      { name: "জাতীয় পরিচয়পত্রের সাথে লিংক", desc: "ভবিষ্যতে জাতীয় পরিচয়পত্র (NID) তৈরির সময় এই ডিজিটাল জন্ম সনদটি সংযুক্ত করা নিশ্চিত করুন।" }
    ]
  }
}

export const dynamic = 'force-dynamic'

export default function BirthDeathRegistrationPage() {
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
                  href="https://bdris.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  {s.ctaButton}
                </a>
                <div className="p-4 bg-amber-50 rounded-xl ring-1 ring-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-amber-700">Digital Certificate System</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    Verify that your local ward, union parishad, or municipality has digital services enabled to issue digitally-signed certificates.
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
